"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowTriggerController", {
    enumerable: true,
    get: function() {
        return WorkflowTriggerController;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _express = require("express");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _workflowtriggerrestapiexceptionfilter = require("../filters/workflow-trigger-rest-api-exception.filter");
const _workspaceentity = require("../../workspace/workspace.entity");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _publicendpointguard = require("../../../guards/public-endpoint.guard");
const _permissionsgraphqlapiexceptionfilter = require("../../../metadata-modules/permissions/utils/permissions-graphql-api-exception.filter");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _twentyormexception = require("../../../twenty-orm/exceptions/twenty-orm.exception");
const _buildsystemauthcontextutil = require("../../../twenty-orm/utils/build-system-auth-context.util");
const _workflowversionworkspaceentity = require("../../../../modules/workflow/common/standard-objects/workflow-version.workspace-entity");
const _workflowtriggerexception = require("../../../../modules/workflow/workflow-trigger/exceptions/workflow-trigger.exception");
const _workflowtriggertype = require("../../../../modules/workflow/workflow-trigger/types/workflow-trigger.type");
const _workflowtriggerworkspaceservice = require("../../../../modules/workflow/workflow-trigger/workspace-services/workflow-trigger.workspace-service");
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
let WorkflowTriggerController = class WorkflowTriggerController {
    async runWorkflowByPostRequest(workspaceId, workflowId, request) {
        return await this.runWorkflow({
            workflowId,
            payload: request.body || {},
            workspaceId
        });
    }
    async runWorkflowByGetRequest(workspaceId, workflowId) {
        return await this.runWorkflow({
            workflowId,
            workspaceId
        });
    }
    async runWorkflow({ workflowId, payload, workspaceId }) {
        const workspaceExists = await this.workspaceRepository.existsBy({
            id: workspaceId
        });
        if (!workspaceExists) {
            throw new _workflowtriggerexception.WorkflowTriggerException(`[Webhook trigger] Workspace ${workspaceId} not found`, _workflowtriggerexception.WorkflowTriggerExceptionCode.NOT_FOUND);
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        try {
            const { workflow } = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
                const workflowRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflow', {
                    shouldBypassPermissionChecks: true
                });
                const workflow = await workflowRepository.findOne({
                    where: {
                        id: workflowId
                    }
                });
                if (!(0, _utils.isDefined)(workflow)) {
                    throw new _workflowtriggerexception.WorkflowTriggerException(`[Webhook trigger] Workflow ${workflowId} not found in workspace ${workspaceId}`, _workflowtriggerexception.WorkflowTriggerExceptionCode.NOT_FOUND);
                }
                if (!(0, _utils.isDefined)(workflow.lastPublishedVersionId) || workflow.lastPublishedVersionId === '') {
                    throw new _workflowtriggerexception.WorkflowTriggerException(`[Webhook trigger] Workflow ${workflowId} has not been activated in workspace ${workspaceId}`, _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_STATUS);
                }
                const workflowVersionRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowVersion', {
                    shouldBypassPermissionChecks: true
                });
                const workflowVersion = await workflowVersionRepository.findOne({
                    where: {
                        id: workflow.lastPublishedVersionId
                    }
                });
                if (!(0, _utils.isDefined)(workflowVersion)) {
                    throw new _workflowtriggerexception.WorkflowTriggerException(`[Webhook trigger] No workflow version activated for workflow ${workflowId} in workspace ${workspaceId}`, _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_VERSION);
                }
                if (workflowVersion.trigger?.type !== _workflowtriggertype.WorkflowTriggerType.WEBHOOK) {
                    throw new _workflowtriggerexception.WorkflowTriggerException(`[Webhook trigger] Workflow ${workflowId} does not have a Webhook trigger in workspace ${workspaceId}`, _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER);
                }
                if (workflowVersion.status !== _workflowversionworkspaceentity.WorkflowVersionStatus.ACTIVE) {
                    throw new _workflowtriggerexception.WorkflowTriggerException(`[Webhook trigger] Workflow version ${workflowVersion.id} is not active in workspace ${workspaceId}`, _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_STATUS);
                }
                return {
                    workflow,
                    workflowVersion
                };
            }, authContext);
            const { workflowRunId } = await this.workflowTriggerWorkspaceService.runWorkflowVersion({
                workflowVersionId: workflow.lastPublishedVersionId,
                payload: payload || {},
                createdBy: {
                    source: _types.FieldActorSource.WEBHOOK,
                    workspaceMemberId: null,
                    name: 'Webhook',
                    context: {}
                },
                workspaceId
            });
            return {
                workflowName: workflow.name,
                success: true,
                workflowRunId
            };
        } catch (error) {
            this.rethrowWorkspaceNotFoundAsTriggerException(error, workspaceId);
        }
    }
    rethrowWorkspaceNotFoundAsTriggerException(error, workspaceId) {
        if (error instanceof _twentyormexception.TwentyORMException && [
            _twentyormexception.TwentyORMExceptionCode.WORKSPACE_NOT_FOUND,
            _twentyormexception.TwentyORMExceptionCode.WORKSPACE_SCHEMA_NOT_FOUND
        ].includes(error.code)) {
            throw new _workflowtriggerexception.WorkflowTriggerException(`[Webhook trigger] Workspace ${workspaceId} not found`, _workflowtriggerexception.WorkflowTriggerExceptionCode.NOT_FOUND);
        }
        throw error;
    }
    constructor(globalWorkspaceOrmManager, workflowTriggerWorkspaceService, workspaceRepository){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.workflowTriggerWorkspaceService = workflowTriggerWorkspaceService;
        this.workspaceRepository = workspaceRepository;
    }
};
_ts_decorate([
    (0, _common.Post)('workflows/:workspaceId/:workflowId'),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Param)('workspaceId')),
    _ts_param(1, (0, _common.Param)('workflowId')),
    _ts_param(2, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        typeof _express.Request === "undefined" ? Object : _express.Request
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowTriggerController.prototype, "runWorkflowByPostRequest", null);
_ts_decorate([
    (0, _common.Get)('workflows/:workspaceId/:workflowId'),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Param)('workspaceId')),
    _ts_param(1, (0, _common.Param)('workflowId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowTriggerController.prototype, "runWorkflowByGetRequest", null);
WorkflowTriggerController = _ts_decorate([
    (0, _common.Controller)('webhooks'),
    (0, _common.UseFilters)(_workflowtriggerrestapiexceptionfilter.WorkflowTriggerRestApiExceptionFilter, _permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter),
    _ts_param(2, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _workflowtriggerworkspaceservice.WorkflowTriggerWorkspaceService === "undefined" ? Object : _workflowtriggerworkspaceservice.WorkflowTriggerWorkspaceService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkflowTriggerController);

//# sourceMappingURL=workflow-trigger.controller.js.map