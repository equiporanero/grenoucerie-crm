"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceQueryHookService", {
    enumerable: true,
    get: function() {
        return WorkspaceQueryHookService;
    }
});
const _common = require("@nestjs/common");
const _lodashmerge = /*#__PURE__*/ _interop_require_default(require("lodash.merge"));
const _workspacequeryhookstorage = require("./storage/workspace-query-hook.storage");
const _workspacequeryhookexplorer = require("./workspace-query-hook.explorer");
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
let WorkspaceQueryHookService = class WorkspaceQueryHookService {
    //TODO : Refacto-common - Should be Common
    async executePreQueryHooks(authContext, // TODO: We should allow wildcard for object name
    objectName, methodName, payload) {
        const key = `${objectName}.${methodName}`;
        const preHookInstances = this.workspaceQueryHookStorage.getWorkspaceQueryPreHookInstances(key);
        if (!preHookInstances) {
            return payload;
        }
        for (const preHookInstance of preHookInstances){
            // Deep merge all return of handleHook into payload before returning it
            const hookPayload = await this.workspaceQueryHookExplorer.handlePreHook([
                authContext,
                objectName,
                payload
            ], preHookInstance.instance, preHookInstance.host, preHookInstance.isRequestScoped);
            // TODO: Is it really a good idea ?
            payload = (0, _lodashmerge.default)(payload, hookPayload);
        }
        return payload;
    }
    async executePostQueryHooks(authContext, // TODO: We should allow wildcard for object name
    objectName, methodName, payload) {
        const key = `${objectName}.${methodName}`;
        const postHookInstances = this.workspaceQueryHookStorage.getWorkspacePostQueryHookInstances(key);
        if (!postHookInstances) {
            return;
        }
        for (const postHookInstance of postHookInstances){
            await this.workspaceQueryHookExplorer.handlePostHook([
                authContext,
                objectName,
                payload
            ], postHookInstance.instance, postHookInstance.host, postHookInstance.isRequestScoped);
        }
    }
    constructor(workspaceQueryHookStorage, workspaceQueryHookExplorer){
        this.workspaceQueryHookStorage = workspaceQueryHookStorage;
        this.workspaceQueryHookExplorer = workspaceQueryHookExplorer;
    }
};
WorkspaceQueryHookService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacequeryhookstorage.WorkspaceQueryHookStorage === "undefined" ? Object : _workspacequeryhookstorage.WorkspaceQueryHookStorage,
        typeof _workspacequeryhookexplorer.WorkspaceQueryHookExplorer === "undefined" ? Object : _workspacequeryhookexplorer.WorkspaceQueryHookExplorer
    ])
], WorkspaceQueryHookService);

//# sourceMappingURL=workspace-query-hook.service.js.map