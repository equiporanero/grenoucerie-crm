"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowDestroyOnePreQueryHook", {
    enumerable: true,
    get: function() {
        return WorkflowDestroyOnePreQueryHook;
    }
});
const _utils = require("twenty-shared/utils");
const _workspacequeryhookdecorator = require("../../../../engine/api/graphql/workspace-query-runner/workspace-query-hook/decorators/workspace-query-hook.decorator");
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
let WorkflowDestroyOnePreQueryHook = class WorkflowDestroyOnePreQueryHook {
    async execute(authContext, _objectName, payload) {
        const workspace = authContext.workspace;
        (0, _utils.assertIsDefinedOrThrow)(workspace, _workspaceexception.WorkspaceNotFoundDefaultError);
        await this.workflowCommonWorkspaceService.handleWorkflowSubEntities({
            workflowIds: [
                payload.id
            ],
            workspaceId: workspace.id,
            operation: 'destroy'
        });
        return payload;
    }
    constructor(workflowCommonWorkspaceService){
        this.workflowCommonWorkspaceService = workflowCommonWorkspaceService;
    }
};
WorkflowDestroyOnePreQueryHook = _ts_decorate([
    (0, _workspacequeryhookdecorator.WorkspaceQueryHook)('workflow.destroyOne'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService === "undefined" ? Object : _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService
    ])
], WorkflowDestroyOnePreQueryHook);

//# sourceMappingURL=workflow-destroy-one.pre-query.hook.js.map