"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DelayWorkflowAction", {
    enumerable: true,
    get: function() {
        return DelayWorkflowAction;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _messagequeuedecorator = require("../../../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../../engine/core-modules/message-queue/services/message-queue.service");
const _workflowstepexecutorexception = require("../../exceptions/workflow-step-executor.exception");
const _findsteporthrowutil = require("../../utils/find-step-or-throw.util");
const _resumedelayedworkflowjobname = require("./contants/resume-delayed-workflow-job-name");
const _isworkflowdelayactionguard = require("./guards/is-workflow-delay-action.guard");
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
let DelayWorkflowAction = class DelayWorkflowAction {
    async execute({ currentStepId, steps, runInfo, context }) {
        const step = (0, _findsteporthrowutil.findStepOrThrow)({
            stepId: currentStepId,
            steps
        });
        if (!(0, _isworkflowdelayactionguard.isWorkflowDelayAction)(step)) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Step is not a delay action', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_TYPE);
        }
        const workflowActionInput = (0, _utils.resolveInput)(step.settings.input, context);
        let delayInMs;
        if (workflowActionInput.delayType === 'SCHEDULED_DATE') {
            if (!workflowActionInput.scheduledDateTime) {
                throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Scheduled date time is required for scheduled date delay', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_INPUT);
            }
            const scheduledDate = new Date(workflowActionInput.scheduledDateTime);
            const now = new Date();
            delayInMs = scheduledDate.getTime() - now.getTime();
            if (delayInMs < 0) {
                throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Scheduled date cannot be in the past', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_INPUT);
            }
        } else if (workflowActionInput.delayType === 'DURATION') {
            if (!workflowActionInput.duration) {
                throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Duration is required for duration delay', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_INPUT);
            }
            const { days = 0, hours = 0, minutes = 0, seconds = 0 } = workflowActionInput.duration;
            delayInMs = days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
        } else {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Invalid delay type', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_INPUT);
        }
        await this.messageQueueService.add(_resumedelayedworkflowjobname.RESUME_DELAYED_WORKFLOW_JOB_NAME, {
            workspaceId: runInfo.workspaceId,
            workflowRunId: runInfo.workflowRunId,
            stepId: currentStepId
        }, {
            delay: delayInMs
        });
        return {
            pendingEvent: true
        };
    }
    constructor(messageQueueService){
        this.messageQueueService = messageQueueService;
    }
};
DelayWorkflowAction = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.delayedJobsQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], DelayWorkflowAction);

//# sourceMappingURL=delay.workflow-action.js.map