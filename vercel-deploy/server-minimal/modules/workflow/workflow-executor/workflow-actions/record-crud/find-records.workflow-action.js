"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FindRecordsWorkflowAction", {
    enumerable: true,
    get: function() {
        return FindRecordsWorkflowAction;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _findrecordsservice = require("../../../../../engine/core-modules/record-crud/services/find-records.service");
const _workflowcommonworkspaceservice = require("../../../common/workspace-services/workflow-common.workspace-service");
const _workflowstepexecutorexception = require("../../exceptions/workflow-step-executor.exception");
const _workflowexecutioncontextservice = require("../../services/workflow-execution-context.service");
const _findsteporthrowutil = require("../../utils/find-step-or-throw.util");
const _isworkflowfindrecordsactionguard = require("./guards/is-workflow-find-records-action.guard");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FindRecordsWorkflowAction = class FindRecordsWorkflowAction {
    async execute({ currentStepId, steps, context, runInfo }) {
        const step = (0, _findsteporthrowutil.findStepOrThrow)({
            steps,
            stepId: currentStepId
        });
        if (!(0, _isworkflowfindrecordsactionguard.isWorkflowFindRecordsAction)(step)) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Step is not a find records action', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_TYPE);
        }
        const workflowActionInput = (0, _utils.resolveInput)(step.settings.input, context);
        const { workspaceId } = runInfo;
        const executionContext = await this.workflowExecutionContextService.getExecutionContext(runInfo);
        const { flatFieldMetadataMaps } = await this.workflowCommonWorkspaceService.getObjectMetadataInfo(workflowActionInput.objectName, workspaceId);
        if (workflowActionInput.filter?.recordFilters) {
            for (const filter of workflowActionInput.filter.recordFilters){
                if (!(0, _utils.isRecordFilterValueValid)(filter)) {
                    throw new _workflowstepexecutorexception.WorkflowStepExecutorException(`Filter condition has an empty value after variable resolution. This likely means a workflow variable could not be resolved. Filter field: ${filter.fieldMetadataId}, operand: ${filter.operand}`, _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_INPUT);
                }
            }
        }
        const gqlOperationFilter = workflowActionInput.filter?.recordFilters && workflowActionInput.filter?.recordFilterGroups ? (0, _utils.computeRecordGqlOperationFilter)({
            fieldMetadataItems: Object.values(flatFieldMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined),
            recordFilters: workflowActionInput.filter.recordFilters,
            recordFilterGroups: workflowActionInput.filter.recordFilterGroups,
            filterValueDependencies: {
                timeZone: 'UTC'
            }
        }) : {};
        const toolOutput = await this.findRecordsService.execute({
            objectName: workflowActionInput.objectName,
            filter: gqlOperationFilter,
            orderBy: workflowActionInput.orderBy?.gqlOperationOrderBy,
            limit: workflowActionInput.limit,
            authContext: executionContext.authContext,
            rolePermissionConfig: executionContext.rolePermissionConfig
        });
        if (!toolOutput.success) {
            return {
                error: toolOutput.error || toolOutput.message
            };
        }
        const records = toolOutput.result?.records ?? [];
        const totalCount = toolOutput.result?.count ?? 0;
        return {
            result: {
                first: records[0],
                all: records,
                totalCount
            }
        };
    }
    constructor(findRecordsService, workflowExecutionContextService, workflowCommonWorkspaceService){
        this.findRecordsService = findRecordsService;
        this.workflowExecutionContextService = workflowExecutionContextService;
        this.workflowCommonWorkspaceService = workflowCommonWorkspaceService;
    }
};
FindRecordsWorkflowAction = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _findrecordsservice.FindRecordsService === "undefined" ? Object : _findrecordsservice.FindRecordsService,
        typeof _workflowexecutioncontextservice.WorkflowExecutionContextService === "undefined" ? Object : _workflowexecutioncontextservice.WorkflowExecutionContextService,
        typeof _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService === "undefined" ? Object : _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService
    ])
], FindRecordsWorkflowAction);

//# sourceMappingURL=find-records.workflow-action.js.map