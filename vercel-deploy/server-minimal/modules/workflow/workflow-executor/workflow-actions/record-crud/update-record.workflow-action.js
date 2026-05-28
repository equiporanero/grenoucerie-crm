"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateRecordWorkflowAction", {
    enumerable: true,
    get: function() {
        return UpdateRecordWorkflowAction;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _updaterecordservice = require("../../../../../engine/core-modules/record-crud/services/update-record.service");
const _workflowcommonworkspaceservice = require("../../../common/workspace-services/workflow-common.workspace-service");
const _workflowstepexecutorexception = require("../../exceptions/workflow-step-executor.exception");
const _workflowexecutioncontextservice = require("../../services/workflow-execution-context.service");
const _buildworkflowactormetadatautil = require("../../utils/build-workflow-actor-metadata.util");
const _filtervalidfieldsinrecordutil = require("../../utils/filter-valid-fields-in-record.util");
const _formatworkflowrecordrelationfieldsutil = require("../../utils/format-workflow-record-relation-fields.util");
const _findsteporthrowutil = require("../../utils/find-step-or-throw.util");
const _resolverichtextfieldsinrecordutil = require("../../utils/resolve-rich-text-fields-in-record.util");
const _isworkflowupdaterecordactionguard = require("./guards/is-workflow-update-record-action.guard");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateRecordWorkflowAction = class UpdateRecordWorkflowAction {
    async execute({ currentStepId, steps, context, runInfo }) {
        const step = (0, _findsteporthrowutil.findStepOrThrow)({
            steps,
            stepId: currentStepId
        });
        if (!(0, _isworkflowupdaterecordactionguard.isWorkflowUpdateRecordAction)(step)) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Step is not an update record action', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_TYPE);
        }
        const { workspaceId } = runInfo;
        const rawInput = step.settings.input;
        const objectMetadataInfo = await this.workflowCommonWorkspaceService.getObjectMetadataInfo(rawInput.objectName, workspaceId);
        const inputWithResolvedRichText = {
            ...rawInput,
            objectRecord: (0, _resolverichtextfieldsinrecordutil.resolveRichTextFieldsInRecord)(rawInput.objectRecord, objectMetadataInfo, context)
        };
        const workflowActionInput = (0, _utils.resolveInput)(inputWithResolvedRichText, context);
        if (!(0, _utils.isDefined)(workflowActionInput.objectRecordId) || !(0, _utils.isValidUuid)(workflowActionInput.objectRecordId) || !(0, _utils.isDefined)(workflowActionInput.objectName)) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Failed to update: Object record ID and name are required', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_INPUT);
        }
        const formattedObjectRecord = (0, _formatworkflowrecordrelationfieldsutil.formatWorkflowRecordRelationFields)(workflowActionInput.objectRecord, objectMetadataInfo);
        const filteredObjectRecord = (0, _filtervalidfieldsinrecordutil.filterValidFieldsInRecord)(formattedObjectRecord, objectMetadataInfo.flatObjectMetadata, objectMetadataInfo.flatFieldMetadataMaps);
        const filteredFieldsToUpdate = workflowActionInput.fieldsToUpdate?.filter((fieldName)=>fieldName in filteredObjectRecord);
        if (filteredFieldsToUpdate?.length === 0) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Failed to update: No fields to update', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_INPUT);
        }
        const executionContext = await this.workflowExecutionContextService.getExecutionContext(runInfo);
        const updatedBy = (0, _buildworkflowactormetadatautil.buildWorkflowActorMetadata)(executionContext);
        const toolOutput = await this.updateRecordService.execute({
            objectName: workflowActionInput.objectName,
            objectRecordId: workflowActionInput.objectRecordId,
            objectRecord: filteredObjectRecord,
            fieldsToUpdate: filteredFieldsToUpdate,
            authContext: executionContext.authContext,
            updatedBy,
            rolePermissionConfig: executionContext.rolePermissionConfig
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
    constructor(updateRecordService, workflowExecutionContextService, workflowCommonWorkspaceService){
        this.updateRecordService = updateRecordService;
        this.workflowExecutionContextService = workflowExecutionContextService;
        this.workflowCommonWorkspaceService = workflowCommonWorkspaceService;
    }
};
UpdateRecordWorkflowAction = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updaterecordservice.UpdateRecordService === "undefined" ? Object : _updaterecordservice.UpdateRecordService,
        typeof _workflowexecutioncontextservice.WorkflowExecutionContextService === "undefined" ? Object : _workflowexecutioncontextservice.WorkflowExecutionContextService,
        typeof _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService === "undefined" ? Object : _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService
    ])
], UpdateRecordWorkflowAction);

//# sourceMappingURL=update-record.workflow-action.js.map