"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _workflow = require("twenty-shared/workflow");
const _workflowshouldfailutil = require("../workflow-should-fail.util");
describe('workflowShouldFail', ()=>{
    it('should return true if a failed step exists', ()=>{
        const steps = [
            {
                id: 'step-1'
            }
        ];
        const stepInfos = {
            'step-1': {
                status: _workflow.StepStatus.FAILED
            }
        };
        expect((0, _workflowshouldfailutil.workflowShouldFail)({
            steps,
            stepInfos
        })).toBeTruthy();
    });
    it('should return false if no failed step exists', ()=>{
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
        expect((0, _workflowshouldfailutil.workflowShouldFail)({
            steps,
            stepInfos
        })).toBeFalsy();
    });
});

//# sourceMappingURL=workflow-should-fail.util.spec.js.map