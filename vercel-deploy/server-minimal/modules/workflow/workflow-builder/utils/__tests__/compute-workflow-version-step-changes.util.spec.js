"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _computeworkflowversionstepupdatesutil = require("../compute-workflow-version-step-updates.util");
const _workflowactiontype = require("../../../workflow-executor/workflow-actions/types/workflow-action.type");
const _workflowtriggertype = require("../../../workflow-trigger/types/workflow-trigger.type");
describe('computeWorkflowVersionStepChanges', ()=>{
    const mockTrigger = {
        name: 'Test Manual Trigger',
        type: _workflowtriggertype.WorkflowTriggerType.MANUAL,
        settings: {
            outputSchema: {}
        },
        nextStepIds: [
            'step-1'
        ]
    };
    const mockSteps = [
        {
            id: 'step-1',
            name: 'Form Step',
            type: _workflowactiontype.WorkflowActionType.FORM,
            settings: {
                input: [],
                errorHandlingOptions: {
                    continueOnFailure: {
                        value: false
                    },
                    retryOnFailure: {
                        value: false
                    }
                },
                outputSchema: {}
            },
            valid: true,
            nextStepIds: [
                'step-2'
            ]
        },
        {
            id: 'step-2',
            name: 'Email Step',
            type: _workflowactiontype.WorkflowActionType.SEND_EMAIL,
            settings: {
                input: {
                    connectedAccountId: '',
                    recipients: {
                        to: '',
                        cc: '',
                        bcc: ''
                    },
                    subject: '',
                    body: ''
                },
                errorHandlingOptions: {
                    continueOnFailure: {
                        value: false
                    },
                    retryOnFailure: {
                        value: false
                    }
                },
                outputSchema: {}
            },
            valid: true,
            nextStepIds: []
        }
    ];
    it('should compute trigger diff when trigger is updated', ()=>{
        const existingTrigger = mockTrigger;
        const updatedTrigger = {
            ...mockTrigger,
            nextStepIds: [
                'step-1',
                'step-3'
            ]
        };
        const result = (0, _computeworkflowversionstepupdatesutil.computeWorkflowVersionStepChanges)({
            existingTrigger,
            existingSteps: mockSteps,
            updatedTrigger,
            updatedSteps: mockSteps
        });
        expect(result.triggerDiff).toMatchObject([
            {
                path: [
                    'trigger',
                    'nextStepIds',
                    1
                ],
                type: 'CREATE',
                value: 'step-3'
            }
        ]);
        expect(result.stepsDiff).toMatchObject([]);
        expect(result.stepsDiff.length).toBe(0); // No steps changed
        // Verify the trigger diff contains the nextStepIds change
        const nextStepIdsDiff = result.triggerDiff.find((diff)=>diff.path.includes('nextStepIds'));
        expect(nextStepIdsDiff).toMatchObject({
            type: 'CREATE',
            path: [
                'trigger',
                'nextStepIds',
                1
            ],
            value: 'step-3'
        });
    });
    it('should compute steps diff when steps are updated', ()=>{
        const existingSteps = mockSteps;
        const updatedSteps = [
            ...mockSteps,
            {
                id: 'step-3',
                name: 'Code Step',
                type: _workflowactiontype.WorkflowActionType.CODE,
                settings: {
                    input: {
                        logicFunctionId: '',
                        logicFunctionInput: {}
                    },
                    errorHandlingOptions: {
                        continueOnFailure: {
                            value: false
                        },
                        retryOnFailure: {
                            value: false
                        }
                    },
                    outputSchema: {}
                },
                valid: true,
                nextStepIds: []
            }
        ];
        const result = (0, _computeworkflowversionstepupdatesutil.computeWorkflowVersionStepChanges)({
            existingTrigger: mockTrigger,
            existingSteps,
            updatedTrigger: mockTrigger,
            updatedSteps
        });
        expect(result.stepsDiff).toBeDefined();
        expect(result.stepsDiff.length).toBeGreaterThan(0);
        expect(result.triggerDiff).toBeDefined();
        expect(result.triggerDiff.length).toBe(0); // No trigger changed
        // Verify the steps diff contains the new step
        const createDiff = result.stepsDiff.find((diff)=>diff.type === 'CREATE');
        expect(createDiff).toBeDefined();
    });
    it('should return empty diffs when no changes are made', ()=>{
        const result = (0, _computeworkflowversionstepupdatesutil.computeWorkflowVersionStepChanges)({
            existingTrigger: mockTrigger,
            existingSteps: mockSteps,
            updatedTrigger: mockTrigger,
            updatedSteps: mockSteps
        });
        expect(result.triggerDiff).toBeDefined();
        expect(result.triggerDiff.length).toBe(0);
        expect(result.stepsDiff).toBeDefined();
        expect(result.stepsDiff.length).toBe(0);
    });
    it('should handle null existing trigger and steps', ()=>{
        const updatedTrigger = mockTrigger;
        const updatedSteps = mockSteps;
        const result = (0, _computeworkflowversionstepupdatesutil.computeWorkflowVersionStepChanges)({
            existingTrigger: null,
            existingSteps: null,
            updatedTrigger,
            updatedSteps
        });
        expect(result.triggerDiff).toBeDefined();
        expect(result.triggerDiff.length).toBeGreaterThan(0);
        expect(result.stepsDiff).toBeDefined();
        expect(result.stepsDiff.length).toBeGreaterThan(0);
        // Verify change diffs are present
        const triggerChangeDiff = result.triggerDiff.find((diff)=>diff.type === 'CHANGE');
        expect(triggerChangeDiff).toBeDefined();
        const stepsChangeDiff = result.stepsDiff.find((diff)=>diff.type === 'CHANGE');
        expect(stepsChangeDiff).toBeDefined();
    });
    it('should return empty diffs when updated values are undefined', ()=>{
        const result = (0, _computeworkflowversionstepupdatesutil.computeWorkflowVersionStepChanges)({
            existingTrigger: mockTrigger,
            existingSteps: mockSteps
        });
        expect(result.triggerDiff).toBeDefined();
        expect(result.triggerDiff.length).toBe(0);
        expect(result.stepsDiff).toBeDefined();
        expect(result.stepsDiff.length).toBe(0);
    });
});

//# sourceMappingURL=compute-workflow-version-step-changes.util.spec.js.map