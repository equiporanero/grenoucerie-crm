"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createGetWorkflowCurrentVersionTool", {
    enumerable: true,
    get: function() {
        return createGetWorkflowCurrentVersionTool;
    }
});
const _utils = require("twenty-shared/utils");
const _zod = require("zod");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workflowversionworkspaceentity = require("../../common/standard-objects/workflow-version.workspace-entity");
const getWorkflowCurrentVersionSchema = _zod.z.object({
    workflowId: _zod.z.string().uuid().describe('The UUID of the workflow to get the current version for')
});
const createGetWorkflowCurrentVersionTool = (deps, context)=>({
        name: 'get_workflow_current_version',
        description: 'Get the current version of a workflow. Returns the draft version if one exists, otherwise the last published version.',
        inputSchema: getWorkflowCurrentVersionSchema,
        execute: async (parameters)=>{
            try {
                const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(context.workspaceId);
                return await deps.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
                    const workflowRepository = await deps.globalWorkspaceOrmManager.getRepository(context.workspaceId, 'workflow', {
                        shouldBypassPermissionChecks: true
                    });
                    const workflow = await workflowRepository.findOne({
                        where: {
                            id: parameters.workflowId
                        }
                    });
                    if (!(0, _utils.isDefined)(workflow)) {
                        return {
                            success: false,
                            error: `Workflow ${parameters.workflowId} not found`
                        };
                    }
                    const workflowVersionRepository = await deps.globalWorkspaceOrmManager.getRepository(context.workspaceId, 'workflowVersion', {
                        shouldBypassPermissionChecks: true
                    });
                    const versions = await workflowVersionRepository.find({
                        where: [
                            {
                                workflowId: parameters.workflowId,
                                status: _workflowversionworkspaceentity.WorkflowVersionStatus.DRAFT
                            },
                            {
                                workflowId: parameters.workflowId,
                                status: _workflowversionworkspaceentity.WorkflowVersionStatus.ACTIVE
                            }
                        ]
                    });
                    const draftVersion = versions.find((version)=>version.status === _workflowversionworkspaceentity.WorkflowVersionStatus.DRAFT);
                    const activeVersion = versions.find((version)=>version.status === _workflowversionworkspaceentity.WorkflowVersionStatus.ACTIVE);
                    const currentVersion = draftVersion ?? activeVersion;
                    if (!(0, _utils.isDefined)(currentVersion)) {
                        return {
                            success: false,
                            error: `Workflow ${parameters.workflowId} has no draft or active version`
                        };
                    }
                    return {
                        success: true,
                        workflowVersion: {
                            id: currentVersion.id,
                            name: currentVersion.name,
                            status: currentVersion.status,
                            trigger: currentVersion.trigger,
                            steps: currentVersion.steps,
                            workflowId: currentVersion.workflowId
                        }
                    };
                }, authContext);
            } catch (error) {
                return {
                    success: false,
                    error: error.message,
                    message: `Failed to get workflow current version: ${error.message}`
                };
            }
        }
    });

//# sourceMappingURL=get-workflow-current-version.tool.js.map