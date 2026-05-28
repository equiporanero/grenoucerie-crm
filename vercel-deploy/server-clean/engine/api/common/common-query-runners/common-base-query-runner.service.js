"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommonBaseQueryRunnerService", {
    enumerable: true,
    get: function() {
        return CommonBaseQueryRunnerService;
    }
});
const _common = require("@nestjs/common");
const _dataargprocessorservice = require("../common-args-processors/data-arg-processor/data-arg-processor.service");
const _filterargprocessorservice = require("../common-args-processors/filter-arg-processor/filter-arg-processor.service");
const _groupbyargprocessorservice = require("../common-args-processors/group-by-arg-processor/group-by-arg-processor.service");
const _orderbyargprocessorservice = require("../common-args-processors/order-by-arg-processor/order-by-arg-processor.service");
const _orderbywithgroupbyargprocessorservice = require("../common-args-processors/order-by-with-group-by-arg-processor/order-by-with-group-by-arg-processor.service");
const _queryrunnerargsfactory = require("../common-args-processors/query-runner-args.factory");
const _processnestedrelationshelper = require("../common-nested-relations-processor/process-nested-relations.helper");
const _commonqueryrunnerexception = require("./errors/common-query-runner.exception");
const _standarderrormessageconstant = require("./errors/standard-error-message.constant");
const _commonresultgettersservice = require("../common-result-getters/common-result-getters.service");
const _objectswithsettingspermissionsrequirements = require("../../graphql/graphql-query-runner/constants/objects-with-settings-permissions-requirements");
const _graphqlqueryparser = require("../../graphql/graphql-query-runner/graphql-query-parsers/graphql-query.parser");
const _workspacequeryhookservice = require("../../graphql/workspace-query-runner/workspace-query-hook/workspace-query-hook.service");
const _isapikeyauthcontextguard = require("../../../core-modules/auth/guards/is-api-key-auth-context.guard");
const _isuserauthcontextguard = require("../../../core-modules/auth/guards/is-user-auth-context.guard");
const _featureflagservice = require("../../../core-modules/feature-flag/services/feature-flag.service");
const _metricsservice = require("../../../core-modules/metrics/metrics.service");
const _metricskeystype = require("../../../core-modules/metrics/types/metrics-keys.type");
const _throttlerservice = require("../../../core-modules/throttler/throttler.service");
const _twentyconfigservice = require("../../../core-modules/twenty-config/twenty-config.service");
const _permissionsexception = require("../../../metadata-modules/permissions/permissions.exception");
const _permissionsservice = require("../../../metadata-modules/permissions/permissions.service");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _ormworkspacecontextstorage = require("../../../twenty-orm/storage/orm-workspace-context.storage");
const _resolverolepermissionconfigutil = require("../../../twenty-orm/utils/resolve-role-permission-config.util");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CommonBaseQueryRunnerService = class CommonBaseQueryRunnerService {
    async execute(args, queryRunnerContext) {
        const { authContext, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps } = queryRunnerContext;
        await this.throttleQueryExecution(authContext);
        await this.validate(args, queryRunnerContext);
        if (flatObjectMetadata.isSystem === true) {
            await this.validateSettingsPermissionsOnObjectOrThrow(authContext, queryRunnerContext);
        }
        const commonQueryParser = new _graphqlqueryparser.GraphqlQueryParser(flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps);
        const selectedFieldsResult = commonQueryParser.parseSelectedFields(args.selectedFields);
        const processedArgs = {
            ...await this.processArgs(args, queryRunnerContext, this.operationName),
            selectedFieldsResult
        };
        this.validateQueryComplexity(selectedFieldsResult, processedArgs, queryRunnerContext);
        const results = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>this.executeQueryAndEnrichResults(processedArgs, queryRunnerContext, commonQueryParser), authContext);
        return {
            results,
            args: processedArgs
        };
    }
    computeQueryComplexity(selectedFieldsResult, _args, _queryRunnerContext) {
        const simpleFieldsComplexity = 1;
        const selectedFieldsComplexity = simpleFieldsComplexity + (selectedFieldsResult.relationFieldsCount ?? 0);
        return selectedFieldsComplexity;
    }
    async processArgs(args, queryRunnerContext, operationName) {
        const { authContext, flatObjectMetadata } = queryRunnerContext;
        const computedArgs = await this.computeArgs(args, queryRunnerContext);
        const hookedArgs = await this.workspaceQueryHookService.executePreQueryHooks(authContext, flatObjectMetadata.nameSingular, operationName, computedArgs);
        return hookedArgs;
    }
    async executeQueryAndEnrichResults(processedArgs, queryRunnerContext, commonQueryParser) {
        const extendedQueryRunnerContext = await this.prepareExtendedQueryRunnerContextWithGlobalDatasource(queryRunnerContext);
        const results = await this.run(processedArgs, {
            ...extendedQueryRunnerContext,
            commonQueryParser
        });
        return this.enrichResultsWithGettersAndHooks({
            results,
            operationName: this.operationName,
            authContext: extendedQueryRunnerContext.authContext,
            flatObjectMetadata: queryRunnerContext.flatObjectMetadata,
            flatObjectMetadataMaps: queryRunnerContext.flatObjectMetadataMaps,
            flatFieldMetadataMaps: queryRunnerContext.flatFieldMetadataMaps
        });
    }
    async enrichResultsWithGettersAndHooks({ results, operationName, authContext, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps }) {
        const resultWithGetters = await this.processQueryResult(results, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext);
        await this.workspaceQueryHookService.executePostQueryHooks(authContext, flatObjectMetadata.nameSingular, operationName, resultWithGetters);
        return resultWithGetters;
    }
    async validateSettingsPermissionsOnObjectOrThrow(authContext, queryRunnerContext) {
        const { flatObjectMetadata } = queryRunnerContext;
        const workspace = authContext.workspace;
        if (Object.keys(_objectswithsettingspermissionsrequirements.OBJECTS_WITH_SETTINGS_PERMISSIONS_REQUIREMENTS).includes(flatObjectMetadata.nameSingular)) {
            const permissionRequired = _objectswithsettingspermissionsrequirements.OBJECTS_WITH_SETTINGS_PERMISSIONS_REQUIREMENTS[flatObjectMetadata.nameSingular];
            const userHasPermission = await this.permissionsService.userHasWorkspaceSettingPermission({
                userWorkspaceId: (0, _isuserauthcontextguard.isUserAuthContext)(authContext) ? authContext.userWorkspaceId : undefined,
                setting: permissionRequired,
                workspaceId: workspace.id,
                apiKeyId: (0, _isapikeyauthcontextguard.isApiKeyAuthContext)(authContext) ? authContext.apiKey.id : undefined
            });
            if (!userHasPermission) {
                throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED);
            }
        }
    }
    async prepareExtendedQueryRunnerContextWithGlobalDatasource(queryRunnerContext) {
        const context = (0, _ormworkspacecontextstorage.getWorkspaceContext)();
        const rolePermissionConfig = (0, _resolverolepermissionconfigutil.resolveRolePermissionConfig)({
            authContext: context.authContext,
            userWorkspaceRoleMap: context.userWorkspaceRoleMap,
            apiKeyRoleMap: context.apiKeyRoleMap
        });
        if (!rolePermissionConfig) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Invalid auth context', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_AUTH_CONTEXT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        const globalWorkspaceDataSource = this.isReadOnly ? await this.globalWorkspaceOrmManager.getGlobalWorkspaceDataSourceReplica() : await this.globalWorkspaceOrmManager.getGlobalWorkspaceDataSource();
        const repository = globalWorkspaceDataSource.getRepository(queryRunnerContext.flatObjectMetadata.nameSingular, rolePermissionConfig);
        return {
            ...queryRunnerContext,
            authContext: context.authContext,
            workspaceDataSource: globalWorkspaceDataSource,
            rolePermissionConfig,
            repository
        };
    }
    async throttleQueryExecution(authContext) {
        try {
            if (!(0, _isapikeyauthcontextguard.isApiKeyAuthContext)(authContext)) return;
            const workspaceId = authContext.workspace.id;
            const shortConfig = {
                key: `api:throttler:${workspaceId}-short-limit`,
                maxTokens: this.twentyConfigService.get('API_RATE_LIMITING_SHORT_LIMIT'),
                timeWindow: this.twentyConfigService.get('API_RATE_LIMITING_SHORT_TTL_IN_MS')
            };
            const longConfig = {
                key: `api:throttler:${workspaceId}-long-limit`,
                maxTokens: this.twentyConfigService.get('API_RATE_LIMITING_LONG_LIMIT'),
                timeWindow: this.twentyConfigService.get('API_RATE_LIMITING_LONG_TTL_IN_MS')
            };
            await this.throttlerService.tokenBucketThrottleOrThrow(shortConfig.key, 1, shortConfig.maxTokens, shortConfig.timeWindow);
            await this.throttlerService.tokenBucketThrottleOrThrow(longConfig.key, 1, longConfig.maxTokens, longConfig.timeWindow);
        } catch (error) {
            await this.metricsService.incrementCounterForEvent({
                key: _metricskeystype.MetricsKeys.CommonApiQueryRateLimited,
                shouldStoreInCache: false
            });
            throw error;
        }
    }
    validateQueryComplexity(selectedFieldsResult, args, queryRunnerContext) {
        const maximumComplexity = this.twentyConfigService.get('COMMON_QUERY_COMPLEXITY_LIMIT');
        if (selectedFieldsResult.hasAtLeastTwoNestedOneToManyRelations) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Query complexity is too high. One-to-Many relation cannot be nested in another One-to-Many relation.`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.TOO_COMPLEX_QUERY, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        const queryComplexity = this.computeQueryComplexity(selectedFieldsResult, args, queryRunnerContext);
        if (queryComplexity > maximumComplexity) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Query complexity is too high. Please, reduce the amount of relation fields requested. Query complexity: ${queryComplexity}. Maximum complexity: ${maximumComplexity}.`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.TOO_COMPLEX_QUERY, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
    }
    constructor(){
        this.isReadOnly = false;
    }
};
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _workspacequeryhookservice.WorkspaceQueryHookService === "undefined" ? Object : _workspacequeryhookservice.WorkspaceQueryHookService)
], CommonBaseQueryRunnerService.prototype, "workspaceQueryHookService", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _queryrunnerargsfactory.QueryRunnerArgsFactory === "undefined" ? Object : _queryrunnerargsfactory.QueryRunnerArgsFactory)
], CommonBaseQueryRunnerService.prototype, "queryRunnerArgsFactory", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _dataargprocessorservice.DataArgProcessorService === "undefined" ? Object : _dataargprocessorservice.DataArgProcessorService)
], CommonBaseQueryRunnerService.prototype, "dataArgProcessor", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _filterargprocessorservice.FilterArgProcessorService === "undefined" ? Object : _filterargprocessorservice.FilterArgProcessorService)
], CommonBaseQueryRunnerService.prototype, "filterArgProcessor", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _groupbyargprocessorservice.GroupByArgProcessorService === "undefined" ? Object : _groupbyargprocessorservice.GroupByArgProcessorService)
], CommonBaseQueryRunnerService.prototype, "groupByArgProcessor", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _orderbyargprocessorservice.OrderByArgProcessorService === "undefined" ? Object : _orderbyargprocessorservice.OrderByArgProcessorService)
], CommonBaseQueryRunnerService.prototype, "orderByArgProcessor", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _orderbywithgroupbyargprocessorservice.OrderByWithGroupByArgProcessorService === "undefined" ? Object : _orderbywithgroupbyargprocessorservice.OrderByWithGroupByArgProcessorService)
], CommonBaseQueryRunnerService.prototype, "orderByWithGroupByArgProcessor", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager)
], CommonBaseQueryRunnerService.prototype, "globalWorkspaceOrmManager", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _processnestedrelationshelper.ProcessNestedRelationsHelper === "undefined" ? Object : _processnestedrelationshelper.ProcessNestedRelationsHelper)
], CommonBaseQueryRunnerService.prototype, "processNestedRelationsHelper", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _permissionsservice.PermissionsService === "undefined" ? Object : _permissionsservice.PermissionsService)
], CommonBaseQueryRunnerService.prototype, "permissionsService", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService)
], CommonBaseQueryRunnerService.prototype, "workspaceCacheService", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _commonresultgettersservice.CommonResultGettersService === "undefined" ? Object : _commonresultgettersservice.CommonResultGettersService)
], CommonBaseQueryRunnerService.prototype, "commonResultGettersService", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _throttlerservice.ThrottlerService === "undefined" ? Object : _throttlerservice.ThrottlerService)
], CommonBaseQueryRunnerService.prototype, "throttlerService", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService)
], CommonBaseQueryRunnerService.prototype, "twentyConfigService", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService)
], CommonBaseQueryRunnerService.prototype, "metricsService", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _featureflagservice.FeatureFlagService === "undefined" ? Object : _featureflagservice.FeatureFlagService)
], CommonBaseQueryRunnerService.prototype, "featureFlagService", void 0);
CommonBaseQueryRunnerService = _ts_decorate([
    (0, _common.Injectable)()
], CommonBaseQueryRunnerService);

//# sourceMappingURL=common-base-query-runner.service.js.map