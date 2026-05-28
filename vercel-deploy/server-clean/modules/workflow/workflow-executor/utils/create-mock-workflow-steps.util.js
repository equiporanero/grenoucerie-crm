"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get createMockCodeStep () {
        return createMockCodeStep;
    },
    get createMockIfElseStep () {
        return createMockIfElseStep;
    },
    get createMockIteratorStep () {
        return createMockIteratorStep;
    }
});
const _workflowactiontype = require("../workflow-actions/types/workflow-action.type");
const createMockCodeStep = (id, nextStepIds = [])=>({
        id,
        name: `Step ${id}`,
        type: _workflowactiontype.WorkflowActionType.CODE,
        valid: true,
        nextStepIds,
        settings: {
            input: {},
            outputSchema: {},
            errorHandlingOptions: {
                continueOnFailure: {
                    value: false
                },
                retryOnFailure: {
                    value: false
                }
            }
        }
    });
const createMockIteratorStep = (id, nextStepIds = [], initialLoopStepIds = [], shouldContinueOnIterationFailure = false)=>({
        id,
        name: `Iterator ${id}`,
        type: _workflowactiontype.WorkflowActionType.ITERATOR,
        valid: true,
        nextStepIds,
        settings: {
            input: {
                initialLoopStepIds,
                shouldContinueOnIterationFailure
            },
            outputSchema: {},
            errorHandlingOptions: {
                continueOnFailure: {
                    value: false
                },
                retryOnFailure: {
                    value: false
                }
            }
        }
    });
const createMockIfElseStep = (id, branches, nextStepIds = [])=>({
        id,
        name: `Step ${id}`,
        type: _workflowactiontype.WorkflowActionType.IF_ELSE,
        valid: true,
        nextStepIds,
        settings: {
            input: {
                stepFilterGroups: [],
                stepFilters: [],
                branches
            },
            outputSchema: {},
            errorHandlingOptions: {
                continueOnFailure: {
                    value: false
                },
                retryOnFailure: {
                    value: false
                }
            }
        }
    });

//# sourceMappingURL=create-mock-workflow-steps.util.js.map