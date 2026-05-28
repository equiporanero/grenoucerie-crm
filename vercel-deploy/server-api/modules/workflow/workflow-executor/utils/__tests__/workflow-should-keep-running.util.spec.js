"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _workflow = require("twenty-shared/workflow");
const _workflowshouldkeeprunningutil = require("../workflow-should-keep-running.util");
describe('workflowShouldKeepRunning', ()=>{
    describe('should return true if', ()=>{
        it('running or pending step exists', ()=>{
            for (const testStatus of [
                _workflow.StepStatus.PENDING,
                _workflow.StepStatus.RUNNING
            ]){
                const steps = [
                    {
                        id: 'step-1'
                    }
                ];
                const stepInfos = {
                    'step-1': {
                        status: testStatus
                    }
                };
                expect((0, _workflowshouldkeeprunningutil.workflowShouldKeepRunning)({
                    steps,
                    stepInfos
                })).toBeTruthy();
            }
        });
        it('success step with not started executable children exists', ()=>{
            const steps = [
                {
                    id: 'step-1',
                    nextStepIds: [
                        'step-2'
                    ]
                },
                {
                    id: 'step-2'
                }
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.NOT_STARTED
                }
            };
            expect((0, _workflowshouldkeeprunningutil.workflowShouldKeepRunning)({
                steps,
                stepInfos
            })).toBeTruthy();
        });
    });
    describe('should return false', ()=>{
        it('workflow run only have success steps', ()=>{
            const steps = [
                {
                    id: 'step-1'
                }
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                }
            };
            expect((0, _workflowshouldkeeprunningutil.workflowShouldKeepRunning)({
                steps,
                stepInfos
            })).toBeFalsy();
        });
        it('success step with not executable not started children exists', ()=>{
            const steps = [
                {
                    id: 'step-1',
                    nextStepIds: [
                        'step-3'
                    ]
                },
                {
                    id: 'step-2',
                    nextStepIds: [
                        'step-3'
                    ]
                },
                {
                    id: 'step-3'
                }
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.FAILED
                },
                'step-3': {
                    status: _workflow.StepStatus.NOT_STARTED
                }
            };
            expect((0, _workflowshouldkeeprunningutil.workflowShouldKeepRunning)({
                steps,
                stepInfos
            })).toBeFalsy();
        });
    });
});

//# sourceMappingURL=workflow-should-keep-running.util.spec.js.map