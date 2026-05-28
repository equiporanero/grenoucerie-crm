"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TaskPostQueryHookService", {
    enumerable: true,
    get: function() {
        return TaskPostQueryHookService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _workspaceexception = require("../../../engine/core-modules/workspace/workspace.exception");
const _globalworkspaceormmanager = require("../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TaskPostQueryHookService = class TaskPostQueryHookService {
    async handleTaskTargetsDelete(authContext, payload) {
        if (!payload || payload?.length === 0) {
            return;
        }
        const workspace = authContext.workspace;
        (0, _utils.assertIsDefinedOrThrow)(workspace, _workspaceexception.WorkspaceNotFoundDefaultError);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const taskTargetRepository = await this.globalWorkspaceOrmManager.getRepository(workspace.id, 'taskTarget');
            await taskTargetRepository.softDelete({
                taskId: (0, _typeorm.In)(payload.map((task)=>task.id))
            });
        }, authContext);
    }
    async handleTaskTargetsRestore(authContext, payload) {
        if (!payload || payload?.length === 0) {
            return;
        }
        const workspace = authContext.workspace;
        (0, _utils.assertIsDefinedOrThrow)(workspace, _workspaceexception.WorkspaceNotFoundDefaultError);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const taskTargetRepository = await this.globalWorkspaceOrmManager.getRepository(workspace.id, 'taskTarget');
            await taskTargetRepository.restore({
                taskId: (0, _typeorm.In)(payload.map((task)=>task.id))
            });
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
    }
};
TaskPostQueryHookService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], TaskPostQueryHookService);

//# sourceMappingURL=task-post-query-hook.service.js.map