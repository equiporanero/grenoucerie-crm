"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ResumeDelayedWorkflowJob", {
    enumerable: true,
    get: function() {
        return ResumeDelayedWorkflowJob;
    }
});
const _common = require("@nestjs/common");
const _workflow = require("twenty-shared/workflow");
const _messagequeuedecorator = require("../../../../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _processdecorator = require("../../../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../../../engine/core-modules/message-queue/services/message-queue.service");
const _globalworkspaceormmanager = require("../../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workflowrunworkspaceentity = require("../../../../common/standard-objects/workflow-run.workspace-entity");
const _resumedelayedworkflowjobname = require("../contants/resume-delayed-workflow-job-name");
const _isworkflowdelayactionguard = require("../guards/is-workflow-delay-action.guard");
const _resumedelayedworkflowjobdatatype = require("../types/resume-delayed-workflow-job-data.type");
const _workflowrunexception = require("../../../../workflow-runner/exceptions/workflow-run.exception");
const _runworkflowjob = require("../../../../workflow-runner/jobs/run-workflow.job");
const _workflowrunworkspaceservice = require("../../../../workflow-runner/workflow-run/workflow-run.workspace-service");
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
let ResumeDelayedWorkflowJob = class ResumeDelayedWorkflowJob {
    async handle({ workspaceId, workflowRunId, stepId }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            try {
                const workflowRun = await this.workflowRunWorkspaceService.getWorkflowRunOrFail({
                    workflowRunId,
                    workspaceId
                });
                if (workflowRun.status !== _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING) {
                    return;
                }
                const step = workflowRun.state?.flow?.steps?.find((step)=>step.id === stepId);
                const stepInfo = workflowRun.state?.stepInfos[stepId];
                if (!step || !(0, _isworkflowdelayactionguard.isWorkflowDelayAction)(step)) {
                    throw new _workflowrunexception.WorkflowRunException('Step not found or is not a delay action', _workflowrunexception.WorkflowRunExceptionCode.INVALID_OPERATION);
                }
                if (stepInfo?.status !== _workflow.StepStatus.PENDING) {
                    throw new _workflowrunexception.WorkflowRunException('Step is not pending', _workflowrunexception.WorkflowRunExceptionCode.INVALID_OPERATION);
                }
                await this.workflowRunWorkspaceService.updateWorkflowRunStepInfo({
                    stepId,
                    stepInfo: {
                        status: _workflow.StepStatus.SUCCESS,
                        result: {
                            success: true
                        }
                    },
                    workspaceId,
                    workflowRunId
                });
                await this.messageQueueService.add(_runworkflowjob.RunWorkflowJob.name, {
                    workspaceId,
                    workflowRunId,
                    lastExecutedStepId: stepId
                });
            } catch (error) {
                await this.workflowRunWorkspaceService.endWorkflowRun({
                    workflowRunId,
                    workspaceId,
                    status: _workflowrunworkspaceentity.WorkflowRunStatus.FAILED,
                    error: error instanceof Error ? error.message : `Error during delay resume: ${String(error)}`,
                    isSystemError: true
                });
                throw error;
            }
        }, authContext);
    }
    constructor(messageQueueService, workflowRunWorkspaceService, globalWorkspaceOrmManager){
        this.messageQueueService = messageQueueService;
        this.workflowRunWorkspaceService = workflowRunWorkspaceService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(_resumedelayedworkflowjobname.RESUME_DELAYED_WORKFLOW_JOB_NAME),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _resumedelayedworkflowjobdatatype.ResumeDelayedWorkflowJobData === "undefined" ? Object : _resumedelayedworkflowjobdatatype.ResumeDelayedWorkflowJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], ResumeDelayedWorkflowJob.prototype, "handle", null);
ResumeDelayedWorkflowJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.delayedJobsQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.workflowQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _workflowrunworkspaceservice.WorkflowRunWorkspaceService === "undefined" ? Object : _workflowrunworkspaceservice.WorkflowRunWorkspaceService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], ResumeDelayedWorkflowJob);

//# sourceMappingURL=resume-delayed-workflow.job.js.map