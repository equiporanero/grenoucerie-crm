"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TaskRestoreManyPostQueryHook", {
    enumerable: true,
    get: function() {
        return TaskRestoreManyPostQueryHook;
    }
});
const _common = require("@nestjs/common");
const _workspacequeryhookdecorator = require("../../../engine/api/graphql/workspace-query-runner/workspace-query-hook/decorators/workspace-query-hook.decorator");
const _workspacequeryhooktype = require("../../../engine/api/graphql/workspace-query-runner/workspace-query-hook/types/workspace-query-hook.type");
const _taskpostqueryhookservice = require("./task-post-query-hook.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TaskRestoreManyPostQueryHook = class TaskRestoreManyPostQueryHook {
    async execute(authContext, _objectName, payload) {
        await this.taskPostQueryHookService.handleTaskTargetsRestore(authContext, payload);
    }
    constructor(taskPostQueryHookService){
        this.taskPostQueryHookService = taskPostQueryHookService;
    }
};
TaskRestoreManyPostQueryHook = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacequeryhookdecorator.WorkspaceQueryHook)({
        key: `task.restoreMany`,
        type: _workspacequeryhooktype.WorkspaceQueryHookType.POST_HOOK
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _taskpostqueryhookservice.TaskPostQueryHookService === "undefined" ? Object : _taskpostqueryhookservice.TaskPostQueryHookService
    ])
], TaskRestoreManyPostQueryHook);

//# sourceMappingURL=task-restore-many.post-query.hook.js.map