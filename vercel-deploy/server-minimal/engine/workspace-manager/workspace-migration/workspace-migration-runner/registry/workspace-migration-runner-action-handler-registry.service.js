"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationRunnerActionHandlerRegistryService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationRunnerActionHandlerRegistryService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _workspacemigrationactioncommon = require("../../workspace-migration-builder/types/workspace-migration-action-common");
const _workspaceschemamigrationrunneractionhandlersmodule = require("../action-handlers/workspace-schema-migration-runner-action-handlers.module");
const _workspacemigrationactionhandlermetadatakeyconstant = require("../constants/workspace-migration-action-handler-metadata-key.constant");
const _workspacemigrationactionexecutionexception = require("../exceptions/workspace-migration-action-execution.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationRunnerActionHandlerRegistryService = class WorkspaceMigrationRunnerActionHandlerRegistryService {
    async onModuleInit() {
        this.discoverAndRegisterActionHandlers();
    }
    discoverAndRegisterActionHandlers() {
        const providers = this.discoveryService.getProviders({
            include: [
                _workspaceschemamigrationrunneractionhandlersmodule.WorkspaceSchemaMigrationRunnerActionHandlersModule
            ]
        });
        providers.forEach((wrapper)=>{
            const { instance, metatype } = wrapper;
            if (!instance || !metatype) return;
            const actionHandlerKey = Reflect.getMetadata(_workspacemigrationactionhandlermetadatakeyconstant.WORKSPACE_MIGRATION_ACTION_HANDLER_METADATA_KEY, metatype);
            if (actionHandlerKey && instance.execute) {
                this.actionHandlers.set(actionHandlerKey, instance);
            }
        });
    }
    getActionHandler(action) {
        const actionHandlerKey = (0, _workspacemigrationactioncommon.buildActionHandlerKey)(action.type, action.metadataName);
        const handler = this.actionHandlers.get(actionHandlerKey);
        if (!handler) {
            throw new _workspacemigrationactionexecutionexception.WorkspaceMigrationActionExecutionException({
                message: `No migration runner action handler found for action: ${actionHandlerKey}`,
                code: _workspacemigrationactionexecutionexception.WorkspaceMigrationActionExecutionExceptionCode.INVALID_ACTION_TYPE
            });
        }
        return handler;
    }
    async executeActionHandler({ action, context }) {
        const handler = this.getActionHandler(action);
        return await handler.execute(context);
    }
    async executeActionRollbackHandler({ action, context }) {
        const handler = this.getActionHandler(action);
        await handler.rollback(context);
    }
    constructor(discoveryService){
        this.discoveryService = discoveryService;
        this.actionHandlers = new Map();
    }
};
WorkspaceMigrationRunnerActionHandlerRegistryService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _core.DiscoveryService === "undefined" ? Object : _core.DiscoveryService
    ])
], WorkspaceMigrationRunnerActionHandlerRegistryService);

//# sourceMappingURL=workspace-migration-runner-action-handler-registry.service.js.map