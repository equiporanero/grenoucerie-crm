"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowDeleteOnePostQueryHook", {
    enumerable: true,
    get: function() {
        return WorkflowDeleteOnePostQueryHook;
    }
});
const _utils = require("twenty-shared/utils");
const _workspacequeryhookdecorator = require("../../../../engine/api/graphql/workspace-query-runner/workspace-query-hook/decorators/workspace-query-hook.decorator");
const _workspacequeryhooktype = require("../../../../engine/api/graphql/workspace-query-runner/workspace-query-hook/types/workspace-query-hook.type");
const _workflowcommonworkspaceservice = require("../workspace-services/workflow-common.workspace-service");
const _workspaceexception = require("../../../../engine/core-modules/workspace/workspace.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowDeleteOnePostQueryHook = class WorkflowDeleteOnePostQueryHook {
    async execute(authContext, _objectName, payload) {
        const workspace = authContext.workspace;
        (0, _utils.assertIsDefinedOrThrow)(workspace, _workspaceexception.WorkspaceNotFoundDefaultError);
        await this.workflowCommonWorkspaceService.handleWorkflowSubEntities({
            workflowIds: payload.map((workflow)=>workflow.id),
            workspaceId: workspace.id,
            operation: 'delete'
        });
    }
    constructor(workflowCommonWorkspaceService){
        this.workflowCommonWorkspaceService = workflowCommonWorkspaceService;
    }
};
WorkflowDeleteOnePostQueryHook = _ts_decorate([
    (0, _workspacequeryhookdecorator.WorkspaceQueryHook)({
        key: `workflow.deleteOne`,
        type: _workspacequeryhooktype.WorkspaceQueryHookType.POST_HOOK
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService === "undefined" ? Object : _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService
    ])
], WorkflowDeleteOnePostQueryHook);

//# sourceMappingURL=workflow-delete-one.post-query.hook.js.map