"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowTriggerJob", {
    enumerable: true,
    get: function() {
        return WorkflowTriggerJob;
    }
});
const _common = require("@nestjs/common");
const _lodashisempty = /*#__PURE__*/ _interop_require_default(require("lodash.isempty"));
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _processdecorator = require("../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workflowversionworkspaceentity = require("../../common/standard-objects/workflow-version.workspace-entity");
const _workflowcommonworkspaceservice = require("../../common/workspace-services/workflow-common.workspace-service");
const _workflowrunnerworkspaceservice = require("../../workflow-runner/workspace-services/workflow-runner.workspace-service");
const _workflowtriggerexception = require("../exceptions/workflow-trigger.exception");
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
const DEFAULT_WORKFLOW_NAME = 'Workflow';
let WorkflowTriggerJob = class WorkflowTriggerJob {
    async handle(data) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(data.workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowRepository = await this.globalWorkspaceOrmManager.getRepository(data.workspaceId, 'workflow', {
                shouldBypassPermissionChecks: true
            });
            const workflow = await workflowRepository.findOneBy({
                id: data.workflowId
            });
            if (!workflow) {
                this.logger.error(`Workflow ${data.workflowId} not found in workspace ${data.workspaceId}`, _workflowtriggerexception.WorkflowTriggerExceptionCode.NOT_FOUND);
                return;
            }
            if (!workflow.lastPublishedVersionId) {
                this.logger.error(`Workflow ${data.workflowId} has no published version in workspace ${data.workspaceId}`, _workflowtriggerexception.WorkflowTriggerExceptionCode.INTERNAL_ERROR);
                return;
            }
            const workflowVersion = await this.workflowCommonWorkspaceService.getWorkflowVersionOrFail({
                workspaceId: data.workspaceId,
                workflowVersionId: workflow.lastPublishedVersionId
            });
            if (workflowVersion.status !== _workflowversionworkspaceentity.WorkflowVersionStatus.ACTIVE) {
                this.logger.error(`Workflow version ${workflowVersion?.id} is not active in workspace ${data.workspaceId}`, _workflowtriggerexception.WorkflowTriggerExceptionCode.INTERNAL_ERROR);
                return;
            }
            await this.workflowRunnerWorkspaceService.run({
                workspaceId: data.workspaceId,
                workflowVersionId: workflow.lastPublishedVersionId,
                payload: data.payload,
                source: {
                    source: _types.FieldActorSource.WORKFLOW,
                    name: (0, _utils.isDefined)(workflow.name) && !(0, _lodashisempty.default)(workflow.name) ? workflow.name : DEFAULT_WORKFLOW_NAME,
                    context: {},
                    workspaceMemberId: null
                }
            });
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager, workflowCommonWorkspaceService, workflowRunnerWorkspaceService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.workflowCommonWorkspaceService = workflowCommonWorkspaceService;
        this.workflowRunnerWorkspaceService = workflowRunnerWorkspaceService;
        this.logger = new _common.Logger(WorkflowTriggerJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(WorkflowTriggerJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkflowTriggerJobData === "undefined" ? Object : WorkflowTriggerJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowTriggerJob.prototype, "handle", null);
WorkflowTriggerJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.workflowQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService === "undefined" ? Object : _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService,
        typeof _workflowrunnerworkspaceservice.WorkflowRunnerWorkspaceService === "undefined" ? Object : _workflowrunnerworkspaceservice.WorkflowRunnerWorkspaceService
    ])
], WorkflowTriggerJob);

//# sourceMappingURL=workflow-trigger.job.js.map