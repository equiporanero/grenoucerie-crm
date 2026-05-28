"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AutomatedTriggerWorkspaceService", {
    enumerable: true,
    get: function() {
        return AutomatedTriggerWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AutomatedTriggerWorkspaceService = class AutomatedTriggerWorkspaceService {
    async addAutomatedTrigger({ workflowId, type, settings, workspaceId, entityManager }) {
        const workflowAutomatedTriggerRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowAutomatedTrigger');
        if ((0, _utils.isDefined)(entityManager)) {
            await workflowAutomatedTriggerRepository.insert({
                type,
                settings,
                workflowId
            }, entityManager);
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await workflowAutomatedTriggerRepository.insert({
                type,
                settings,
                workflowId
            });
        }, authContext);
    }
    async deleteAutomatedTrigger({ workflowId, workspaceId, entityManager }) {
        const workflowAutomatedTriggerRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowAutomatedTrigger');
        if ((0, _utils.isDefined)(entityManager)) {
            await workflowAutomatedTriggerRepository.delete({
                workflowId
            }, entityManager);
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await workflowAutomatedTriggerRepository.delete({
                workflowId
            });
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
    }
};
AutomatedTriggerWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], AutomatedTriggerWorkspaceService);

//# sourceMappingURL=automated-trigger.workspace-service.js.map