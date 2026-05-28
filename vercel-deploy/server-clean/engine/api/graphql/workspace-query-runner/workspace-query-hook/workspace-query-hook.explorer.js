"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceQueryHookExplorer", {
    enumerable: true,
    get: function() {
        return WorkspaceQueryHookExplorer;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _injector = require("@nestjs/core/injector/injector");
const _utils = require("twenty-shared/utils");
const _isapikeyauthcontextguard = require("../../../../core-modules/auth/guards/is-api-key-auth-context.guard");
const _isuserauthcontextguard = require("../../../../core-modules/auth/guards/is-user-auth-context.guard");
const _standarderrormessageconstant = require("../../../common/common-query-runners/errors/standard-error-message.constant");
const _graphqlqueryrunnerexception = require("../../graphql-query-runner/errors/graphql-query-runner.exception");
const _isqueryresultfieldvalueaconnectionguard = require("../factories/query-result-getters/guards/is-query-result-field-value-a-connection.guard");
const _isqueryresultfieldvalueanestedrecordarrayguard = require("../factories/query-result-getters/guards/is-query-result-field-value-a-nested-record-array.guard");
const _isqueryresultfieldvaluearecordarrayguard = require("../factories/query-result-getters/guards/is-query-result-field-value-a-record-array.guard");
const _isqueryresultfieldvaluearecordguard = require("../factories/query-result-getters/guards/is-query-result-field-value-a-record.guard");
const _workspacequeryhookstorage = require("./storage/workspace-query-hook.storage");
const _workspacequeryhooktype = require("./types/workspace-query-hook.type");
const _workspacequeryhookmetadataaccessor = require("./workspace-query-hook-metadata.accessor");
const _workspaceexception = require("../../../../core-modules/workspace/workspace.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceQueryHookExplorer = class WorkspaceQueryHookExplorer {
    async onModuleInit() {
        await this.explore();
    }
    async explore() {
        const hooks = this.discoveryService.getProviders().filter((wrapper)=>this.metadataAccessor.isWorkspaceQueryHook(!wrapper.metatype || wrapper.inject ? wrapper.instance?.constructor : wrapper.metatype));
        for (const hook of hooks){
            const { instance, metatype } = hook;
            const { key, type } = this.metadataAccessor.getWorkspaceQueryHookMetadata(instance.constructor || metatype) ?? {};
            if (!key || !type) {
                this.logger.error(`PreHook ${hook.name} is missing key or type metadata`);
                continue;
            }
            if (!hook.host) {
                this.logger.error(`PreHook ${hook.name} is missing host metadata`);
                continue;
            }
            this.registerWorkspaceQueryHook(key, type, instance, hook.host, !hook.isDependencyTreeStatic());
        }
    }
    async handlePreHook(executeParams, instance, host, isRequestScoped) {
        const methodName = 'execute';
        const workspace = executeParams?.[0].workspace;
        (0, _utils.assertIsDefinedOrThrow)(workspace, _workspaceexception.WorkspaceNotFoundDefaultError);
        if (isRequestScoped) {
            const contextId = (0, _core.createContextId)();
            if (this.moduleRef.registerRequestByContextId) {
                this.moduleRef.registerRequestByContextId({
                    req: {
                        workspaceId: workspace.id
                    }
                }, contextId);
            }
            const contextInstance = await this.injector.loadPerContext(instance, host, host.providers, contextId);
            // @ts-expect-error legacy noImplicitAny
            return contextInstance[methodName].call(contextInstance, ...executeParams);
        } else {
            // @ts-expect-error legacy noImplicitAny
            return instance[methodName].call(instance, ...executeParams);
        }
    }
    transformPayload(payload) {
        if ((0, _isqueryresultfieldvalueaconnectionguard.isQueryResultFieldValueAConnection)(payload)) {
            return payload.edges.map((edge)=>edge.node);
        }
        if ((0, _isqueryresultfieldvalueanestedrecordarrayguard.isQueryResultFieldValueANestedRecordArray)(payload)) {
            return payload.records;
        }
        if ((0, _isqueryresultfieldvaluearecordarrayguard.isQueryResultFieldValueARecordArray)(payload)) {
            return payload;
        }
        if ((0, _isqueryresultfieldvaluearecordguard.isQueryResultFieldValueARecord)(payload)) {
            return [
                payload
            ];
        }
        throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Unsupported payload type: ${payload}`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_POST_HOOK_PAYLOAD, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    async handlePostHook(executeParams, instance, host, isRequestScoped) {
        const methodName = 'execute';
        const workspace = executeParams?.[0].workspace;
        (0, _utils.assertIsDefinedOrThrow)(workspace, _workspaceexception.WorkspaceNotFoundDefaultError);
        const transformedPayload = this.transformPayload(executeParams[2]);
        if (isRequestScoped) {
            const contextId = (0, _core.createContextId)();
            if (this.moduleRef.registerRequestByContextId) {
                const authContext = executeParams[0];
                this.moduleRef.registerRequestByContextId({
                    req: {
                        workspaceId: workspace.id,
                        userWorkspaceId: (0, _isuserauthcontextguard.isUserAuthContext)(authContext) ? authContext.userWorkspaceId : undefined,
                        apiKey: (0, _isapikeyauthcontextguard.isApiKeyAuthContext)(authContext) ? authContext.apiKey : undefined,
                        workspaceMemberId: (0, _isuserauthcontextguard.isUserAuthContext)(authContext) ? authContext.workspaceMemberId : undefined,
                        user: (0, _isuserauthcontextguard.isUserAuthContext)(authContext) ? authContext.user : undefined
                    }
                }, contextId);
            }
            const contextInstance = await this.injector.loadPerContext(instance, host, host.providers, contextId);
            // @ts-expect-error legacy noImplicitAny
            return contextInstance[methodName].call(contextInstance, executeParams[0], executeParams[1], transformedPayload);
        } else {
            // @ts-expect-error legacy noImplicitAny
            return instance[methodName].call(instance, executeParams[0], executeParams[1], transformedPayload);
        }
    }
    registerWorkspaceQueryHook(key, type, instance, host, isRequestScoped) {
        switch(type){
            case _workspacequeryhooktype.WorkspaceQueryHookType.PRE_HOOK:
                this.workspaceQueryHookStorage.registerWorkspaceQueryPreHookInstance(key, {
                    instance: instance,
                    host,
                    isRequestScoped
                });
                break;
            case _workspacequeryhooktype.WorkspaceQueryHookType.POST_HOOK:
                this.workspaceQueryHookStorage.registerWorkspacePostQueryHookInstance(key, {
                    instance: instance,
                    host,
                    isRequestScoped
                });
                break;
            default:
                this.logger.error(`Unknown WorkspaceQueryHookType: ${type}`);
                break;
        }
    }
    constructor(moduleRef, discoveryService, metadataAccessor, workspaceQueryHookStorage){
        this.moduleRef = moduleRef;
        this.discoveryService = discoveryService;
        this.metadataAccessor = metadataAccessor;
        this.workspaceQueryHookStorage = workspaceQueryHookStorage;
        this.logger = new _common.Logger('WorkspaceQueryHookModule');
        this.injector = new _injector.Injector();
    }
};
WorkspaceQueryHookExplorer = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _core.ModuleRef === "undefined" ? Object : _core.ModuleRef,
        typeof _core.DiscoveryService === "undefined" ? Object : _core.DiscoveryService,
        typeof _workspacequeryhookmetadataaccessor.WorkspaceQueryHookMetadataAccessor === "undefined" ? Object : _workspacequeryhookmetadataaccessor.WorkspaceQueryHookMetadataAccessor,
        typeof _workspacequeryhookstorage.WorkspaceQueryHookStorage === "undefined" ? Object : _workspacequeryhookstorage.WorkspaceQueryHookStorage
    ])
], WorkspaceQueryHookExplorer);

//# sourceMappingURL=workspace-query-hook.explorer.js.map