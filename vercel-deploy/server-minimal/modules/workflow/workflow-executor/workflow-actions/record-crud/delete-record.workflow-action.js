"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeleteRecordWorkflowAction", {
    enumerable: true,
    get: function() {
        return DeleteRecordWorkflowAction;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _deleterecordservice = require("../../../../../engine/core-modules/record-crud/services/delete-record.service");
const _workflowstepexecutorexception = require("../../exceptions/workflow-step-executor.exception");
const _workflowexecutioncontextservice = require("../../services/workflow-execution-context.service");
const _findsteporthrowutil = require("../../utils/find-step-or-throw.util");
const _isworkflowdeleterecordactionguard = require("./guards/is-workflow-delete-record-action.guard");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DeleteRecordWorkflowAction = class DeleteRecordWorkflowAction {
    async execute({ currentStepId, steps, context, runInfo }) {
        const step = (0, _findsteporthrowutil.findStepOrThrow)({
            steps,
            stepId: currentStepId
        });
        if (!(0, _isworkflowdeleterecordactionguard.isWorkflowDeleteRecordAction)(step)) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Step is not a delete record action', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_TYPE);
        }
        const workflowActionInput = (0, _utils.resolveInput)(step.settings.input, context);
        if (!(0, _utils.isDefined)(workflowActionInput.objectRecordId) || !(0, _utils.isValidUuid)(workflowActionInput.objectRecordId) || !(0, _utils.isDefined)(workflowActionInput.objectName)) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Failed to delete: Object record ID and name are required', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_INPUT);
        }
        const executionContext = await this.workflowExecutionContextService.getExecutionContext(runInfo);
        const toolOutput = await this.deleteRecordService.execute({
            objectName: workflowActionInput.objectName,
            objectRecordId: workflowActionInput.objectRecordId,
            authContext: executionContext.authContext,
            rolePermissionConfig: executionContext.rolePermissionConfig,
            soft: true
        });
        if (!toolOutput.success) {
            return {
                error: toolOutput.error || toolOutput.message
            };
        }
        return {
            result: toolOutput.result
        };
    }
    constructor(deleteRecordService, workflowExecutionContextService){
        this.deleteRecordService = deleteRecordService;
        this.workflowExecutionContextService = workflowExecutionContextService;
    }
};
DeleteRecordWorkflowAction = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _deleterecordservice.DeleteRecordService === "undefined" ? Object : _deleterecordservice.DeleteRecordService,
        typeof _workflowexecutioncontextservice.WorkflowExecutionContextService === "undefined" ? Object : _workflowexecutioncontextservice.WorkflowExecutionContextService
    ])
], DeleteRecordWorkflowAction);

//# sourceMappingURL=delete-record.workflow-action.js.map