"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IteratorWorkflowAction", {
    enumerable: true,
    get: function() {
        return IteratorWorkflowAction;
    }
});
const _common = require("@nestjs/common");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _workflowstepexecutorexception = require("../../exceptions/workflow-step-executor.exception");
const _findsteporthrowutil = require("../../utils/find-step-or-throw.util");
const _isworkflowiteratoractionguard = require("./guards/is-workflow-iterator-action.guard");
const _getallstepidsinlooputil = require("./utils/get-all-step-ids-in-loop.util");
const _workflowrunworkspaceservice = require("../../../workflow-runner/workflow-run/workflow-run.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const MAX_ITERATIONS = 10000;
let IteratorWorkflowAction = class IteratorWorkflowAction {
    async execute(input) {
        const { currentStepId: iteratorStepId, steps, context, runInfo } = input;
        const step = (0, _findsteporthrowutil.findStepOrThrow)({
            stepId: iteratorStepId,
            steps
        });
        if (!(0, _isworkflowiteratoractionguard.isWorkflowIteratorAction)(step)) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Step is not an iterator action', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_TYPE);
        }
        const iteratorInput = (0, _utils.resolveInput)(step.settings.input, context);
        const { items, initialLoopStepIds } = iteratorInput;
        const parsedItems = (0, _guards.isString)(items) ? JSON.parse(items) : items;
        if (!Array.isArray(parsedItems)) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Iterator input items must be an array', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_INPUT);
        }
        if (!(0, _utils.isDefined)(initialLoopStepIds) || initialLoopStepIds.length === 0 || parsedItems.length === 0) {
            return {
                result: {
                    currentItemIndex: 0,
                    currentItem: undefined,
                    hasProcessedAllItems: true
                }
            };
        }
        const workflowRun = await this.workflowRunWorkspaceService.getWorkflowRunOrFail({
            workflowRunId: runInfo.workflowRunId,
            workspaceId: runInfo.workspaceId
        });
        const stepInfos = workflowRun.state.stepInfos;
        const existingIteratorStepResult = stepInfos[iteratorStepId]?.result;
        const currentItemIndex = (0, _utils.isDefined)(existingIteratorStepResult) ? existingIteratorStepResult.currentItemIndex + 1 : 0;
        if (currentItemIndex >= MAX_ITERATIONS) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Iterator has reached the maximum number of iterations', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INTERNAL_ERROR);
        }
        const hasProcessedAllItems = currentItemIndex >= parsedItems.length;
        const nextIteratorStepInfoResult = {
            currentItemIndex,
            currentItem: currentItemIndex < parsedItems.length ? parsedItems[currentItemIndex] : undefined,
            hasProcessedAllItems
        };
        if (currentItemIndex > 0) {
            await this.resetStepsInLoop({
                iteratorStepId,
                initialLoopStepIds,
                hasProcessedAllItems,
                workflowRunId: runInfo.workflowRunId,
                workspaceId: runInfo.workspaceId,
                steps,
                stepInfos
            });
        }
        return {
            result: nextIteratorStepInfoResult,
            shouldRemainRunning: !hasProcessedAllItems
        };
    }
    async resetStepsInLoop({ iteratorStepId, initialLoopStepIds, hasProcessedAllItems, workflowRunId, workspaceId, steps, stepInfos }) {
        let stepInfosToUpdate = {};
        if (!hasProcessedAllItems) {
            const subStepsInfos = await this.buildSubStepInfosReset({
                iteratorStepId,
                initialLoopStepIds,
                stepInfos,
                steps
            });
            stepInfosToUpdate = {
                ...stepInfosToUpdate,
                ...subStepsInfos
            };
        }
        const iteratorStepInfo = await this.buildIteratorStepInfoReset({
            iteratorStepId,
            iteratorStepInfo: stepInfos[iteratorStepId]
        });
        stepInfosToUpdate = {
            ...stepInfosToUpdate,
            ...iteratorStepInfo
        };
        await this.workflowRunWorkspaceService.updateWorkflowRunStepInfos({
            stepInfos: stepInfosToUpdate,
            workflowRunId,
            workspaceId
        });
    }
    async buildSubStepInfosReset({ iteratorStepId, initialLoopStepIds, stepInfos, steps }) {
        const stepIdsToReset = (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
            iteratorStepId,
            initialLoopStepIds,
            steps
        });
        return stepIdsToReset.reduce((acc, stepId)=>{
            acc[stepId] = {
                status: _workflow.StepStatus.NOT_STARTED,
                result: undefined,
                error: undefined,
                history: [
                    ...stepInfos[stepId]?.history ?? [],
                    {
                        result: stepInfos[stepId]?.result,
                        error: stepInfos[stepId]?.error,
                        status: stepInfos[stepId]?.status
                    }
                ]
            };
            return acc;
        }, {});
    }
    async buildIteratorStepInfoReset({ iteratorStepId, iteratorStepInfo }) {
        return {
            [iteratorStepId]: {
                ...iteratorStepInfo,
                result: undefined,
                error: undefined,
                history: [
                    ...iteratorStepInfo?.history ?? [],
                    {
                        result: iteratorStepInfo?.result,
                        error: iteratorStepInfo?.error,
                        status: iteratorStepInfo?.status
                    }
                ]
            }
        };
    }
    constructor(workflowRunWorkspaceService){
        this.workflowRunWorkspaceService = workflowRunWorkspaceService;
    }
};
IteratorWorkflowAction = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowrunworkspaceservice.WorkflowRunWorkspaceService === "undefined" ? Object : _workflowrunworkspaceservice.WorkflowRunWorkspaceService
    ])
], IteratorWorkflowAction);

//# sourceMappingURL=iterator.workflow-action.js.map