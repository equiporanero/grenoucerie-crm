"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LogicFunctionResolver", {
    enumerable: true,
    get: function() {
        return LogicFunctionResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _preventnesttoautologgraphqlerrorsfilter = require("../../core-modules/graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../../core-modules/graphql/pipes/resolver-validation.pipe");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _featureflagguard = require("../../guards/feature-flag.guard");
const _nopermissionguard = require("../../guards/no-permission.guard");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _workspacemanyorallflatentitymapscacheservice = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _createlogicfunctionfromsourceinput = require("./dtos/create-logic-function-from-source.input");
const _executelogicfunctioninput = require("./dtos/execute-logic-function.input");
const _logicfunctionexecutionresultdto = require("./dtos/logic-function-execution-result.dto");
const _logicfunctionidinput = require("./dtos/logic-function-id.input");
const _logicfunctionlogsdto = require("./dtos/logic-function-logs.dto");
const _logicfunctionlogsinput = require("./dtos/logic-function-logs.input");
const _logicfunctiondto = require("./dtos/logic-function.dto");
const _updatelogicfunctionfromsourceinput = require("./dtos/update-logic-function-from-source.input");
const _logicfunctionfromsourceservice = require("./services/logic-function-from-source.service");
const _findflatlogicfunctionorthrowutil = require("./utils/find-flat-logic-function-or-throw.util");
const _fromflatlogicfunctiontologicfunctiondtoutil = require("./utils/from-flat-logic-function-to-logic-function-dto.util");
const _logicfunctiongraphqlapiexceptionhandlerutils = require("./utils/logic-function-graphql-api-exception-handler.utils");
const _subscriptionchannelenum = require("../../subscriptions/enums/subscription-channel.enum");
const _subscriptionservice = require("../../subscriptions/subscription.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let LogicFunctionResolver = class LogicFunctionResolver {
    async findOneLogicFunction({ id }, { id: workspaceId }) {
        try {
            const { flatLogicFunctionMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatLogicFunctionMaps'
                ]
            });
            const flatLogicFunction = (0, _findflatlogicfunctionorthrowutil.findFlatLogicFunctionOrThrow)({
                id,
                flatLogicFunctionMaps
            });
            return (0, _fromflatlogicfunctiontologicfunctiondtoutil.fromFlatLogicFunctionToLogicFunctionDto)({
                flatLogicFunction
            });
        } catch (error) {
            return (0, _logicfunctiongraphqlapiexceptionhandlerutils.logicFunctionGraphQLApiExceptionHandler)(error);
        }
    }
    async findManyLogicFunctions({ id: workspaceId }) {
        try {
            const { flatLogicFunctionMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatLogicFunctionMaps'
                ]
            });
            return Object.values(flatLogicFunctionMaps.byUniversalIdentifier).filter((flatLogicFunction)=>(0, _utils.isDefined)(flatLogicFunction) && !(0, _utils.isDefined)(flatLogicFunction.deletedAt)).map((flatLogicFunction)=>(0, _fromflatlogicfunctiontologicfunctiondtoutil.fromFlatLogicFunctionToLogicFunctionDto)({
                    flatLogicFunction
                }));
        } catch (error) {
            return (0, _logicfunctiongraphqlapiexceptionhandlerutils.logicFunctionGraphQLApiExceptionHandler)(error);
        }
    }
    async getAvailablePackages({ id }, { id: workspaceId }) {
        try {
            const { flatLogicFunctionMaps, flatApplicationMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatLogicFunctionMaps',
                    'flatApplicationMaps'
                ]
            });
            const logicFunctionUniversalIdentifier = flatLogicFunctionMaps.universalIdentifierById[id];
            if (!logicFunctionUniversalIdentifier) {
                return {};
            }
            const logicFunction = flatLogicFunctionMaps.byUniversalIdentifier[logicFunctionUniversalIdentifier];
            if (!logicFunction) {
                return {};
            }
            const application = flatApplicationMaps.byId[logicFunction.applicationId];
            return application?.availablePackages ?? {};
        } catch (error) {
            return (0, _logicfunctiongraphqlapiexceptionhandlerutils.logicFunctionGraphQLApiExceptionHandler)(error);
        }
    }
    async deleteOneLogicFunction({ id }, { id: workspaceId }) {
        try {
            return await this.logicFunctionFromSourceService.deleteOneWithSource({
                id,
                workspaceId
            });
        } catch (error) {
            return (0, _logicfunctiongraphqlapiexceptionhandlerutils.logicFunctionGraphQLApiExceptionHandler)(error);
        }
    }
    async createOneLogicFunction(input, { id: workspaceId }) {
        try {
            return await this.logicFunctionFromSourceService.createOneFromSource({
                input,
                workspaceId
            });
        } catch (error) {
            return (0, _logicfunctiongraphqlapiexceptionhandlerutils.logicFunctionGraphQLApiExceptionHandler)(error);
        }
    }
    async executeOneLogicFunction({ id, payload }, { id: workspaceId }) {
        try {
            return await this.logicFunctionFromSourceService.executeOneFromSource({
                id,
                payload,
                workspaceId
            });
        } catch (error) {
            return (0, _logicfunctiongraphqlapiexceptionhandlerutils.logicFunctionGraphQLApiExceptionHandler)(error);
        }
    }
    async getLogicFunctionSourceCode({ id }, { id: workspaceId }) {
        try {
            return await this.logicFunctionFromSourceService.getSourceCode({
                id,
                workspaceId
            });
        } catch (error) {
            return (0, _logicfunctiongraphqlapiexceptionhandlerutils.logicFunctionGraphQLApiExceptionHandler)(error);
        }
    }
    async updateOneLogicFunction(updateLogicFunctionFromSourceInput, { id: workspaceId }) {
        try {
            await this.logicFunctionFromSourceService.updateOneFromSource({
                updateLogicFunctionFromSourceInput,
                workspaceId
            });
            return true;
        } catch (error) {
            return (0, _logicfunctiongraphqlapiexceptionhandlerutils.logicFunctionGraphQLApiExceptionHandler)(error);
        }
    }
    logicFunctionLogs(_, workspace) {
        return this.subscriptionService.subscribe({
            channel: _subscriptionchannelenum.SubscriptionChannel.LOGIC_FUNCTION_LOGS_CHANNEL,
            workspaceId: workspace.id
        });
    }
    constructor(logicFunctionFromSourceService, flatEntityMapsCacheService, subscriptionService){
        this.logicFunctionFromSourceService = logicFunctionFromSourceService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.subscriptionService = subscriptionService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>_logicfunctiondto.LogicFunctionDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _logicfunctionidinput.LogicFunctionIdInput === "undefined" ? Object : _logicfunctionidinput.LogicFunctionIdInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], LogicFunctionResolver.prototype, "findOneLogicFunction", null);
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _logicfunctiondto.LogicFunctionDTO
        ]),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], LogicFunctionResolver.prototype, "findManyLogicFunctions", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_graphqltypejson.default),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKFLOWS)),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _logicfunctionidinput.LogicFunctionIdInput === "undefined" ? Object : _logicfunctionidinput.LogicFunctionIdInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], LogicFunctionResolver.prototype, "getAvailablePackages", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_logicfunctiondto.LogicFunctionDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKFLOWS)),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _logicfunctionidinput.LogicFunctionIdInput === "undefined" ? Object : _logicfunctionidinput.LogicFunctionIdInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], LogicFunctionResolver.prototype, "deleteOneLogicFunction", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_logicfunctiondto.LogicFunctionDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKFLOWS)),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createlogicfunctionfromsourceinput.CreateLogicFunctionFromSourceInput === "undefined" ? Object : _createlogicfunctionfromsourceinput.CreateLogicFunctionFromSourceInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], LogicFunctionResolver.prototype, "createOneLogicFunction", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_logicfunctionexecutionresultdto.LogicFunctionExecutionResultDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKFLOWS)),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _executelogicfunctioninput.ExecuteOneLogicFunctionInput === "undefined" ? Object : _executelogicfunctioninput.ExecuteOneLogicFunctionInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], LogicFunctionResolver.prototype, "executeOneLogicFunction", null);
_ts_decorate([
    (0, _graphql.Query)(()=>String, {
        nullable: true
    }),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKFLOWS)),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _logicfunctionidinput.LogicFunctionIdInput === "undefined" ? Object : _logicfunctionidinput.LogicFunctionIdInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], LogicFunctionResolver.prototype, "getLogicFunctionSourceCode", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKFLOWS)),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updatelogicfunctionfromsourceinput.UpdateLogicFunctionFromSourceInput === "undefined" ? Object : _updatelogicfunctionfromsourceinput.UpdateLogicFunctionFromSourceInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], LogicFunctionResolver.prototype, "updateOneLogicFunction", null);
_ts_decorate([
    (0, _graphql.Subscription)(()=>_logicfunctionlogsdto.LogicFunctionLogsDTO, {
        filter: (payload, variables)=>{
            const { logicFunctionLogs } = payload;
            const { id, universalIdentifier, applicationId, applicationUniversalIdentifier, name } = logicFunctionLogs;
            const { id: inputId, universalIdentifier: inputUniversalIdentifier, name: inputName, applicationId: inputApplicationId, applicationUniversalIdentifier: inputApplicationUniversalIdentifier } = variables.input;
            return (!(0, _utils.isDefined)(inputId) || inputId === id) && (!(0, _utils.isDefined)(inputUniversalIdentifier) || inputUniversalIdentifier === universalIdentifier) && (!(0, _utils.isDefined)(inputName) || inputName === name) && (!(0, _utils.isDefined)(inputApplicationId) || inputApplicationId === applicationId) && (!(0, _utils.isDefined)(inputApplicationUniversalIdentifier) || inputApplicationUniversalIdentifier === applicationUniversalIdentifier);
        }
    }),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKFLOWS)),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _logicfunctionlogsinput.LogicFunctionLogsInput === "undefined" ? Object : _logicfunctionlogsinput.LogicFunctionLogsInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", void 0)
], LogicFunctionResolver.prototype, "logicFunctionLogs", null);
LogicFunctionResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _featureflagguard.FeatureFlagGuard, _nopermissionguard.NoPermissionGuard),
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseFilters)(_preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _logicfunctionfromsourceservice.LogicFunctionFromSourceService === "undefined" ? Object : _logicfunctionfromsourceservice.LogicFunctionFromSourceService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _subscriptionservice.SubscriptionService === "undefined" ? Object : _subscriptionservice.SubscriptionService
    ])
], LogicFunctionResolver);

//# sourceMappingURL=logic-function.resolver.js.map