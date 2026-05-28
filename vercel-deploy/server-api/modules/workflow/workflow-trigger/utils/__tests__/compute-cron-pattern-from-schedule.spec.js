"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _workflowtriggerexception = require("../../exceptions/workflow-trigger.exception");
const _workflowtriggertype = require("../../types/workflow-trigger.type");
const _computecronpatternfromschedule = require("../compute-cron-pattern-from-schedule");
describe('computeCronPatternFromSchedule', ()=>{
    it('should return the pattern for CUSTOM type', ()=>{
        const trigger = {
            name: '',
            type: _workflowtriggertype.WorkflowTriggerType.CRON,
            settings: {
                type: 'CUSTOM',
                pattern: '12 * * * *',
                outputSchema: {}
            }
        };
        expect((0, _computecronpatternfromschedule.computeCronPatternFromSchedule)(trigger)).toBe('12 * * * *');
    });
    it('should support 6-field cron patterns with seconds for CUSTOM type', ()=>{
        const trigger = {
            name: '',
            type: _workflowtriggertype.WorkflowTriggerType.CRON,
            settings: {
                type: 'CUSTOM',
                pattern: '0 12 * * * *',
                outputSchema: {}
            }
        };
        expect((0, _computecronpatternfromschedule.computeCronPatternFromSchedule)(trigger)).toBe('0 12 * * * *');
    });
    it('should throw an exception for invalid pattern for CUSTOM type', ()=>{
        const trigger = {
            name: '',
            type: _workflowtriggertype.WorkflowTriggerType.CRON,
            settings: {
                type: 'CUSTOM',
                pattern: '60 25 32 13 8',
                outputSchema: {}
            }
        };
        expect(()=>(0, _computecronpatternfromschedule.computeCronPatternFromSchedule)(trigger)).toThrow(_workflowtriggerexception.WorkflowTriggerException);
        expect(()=>(0, _computecronpatternfromschedule.computeCronPatternFromSchedule)(trigger)).toThrow("Cron pattern '60 25 32 13 8' is invalid");
    });
    it('should return the correct cron pattern for DAYS type', ()=>{
        const trigger = {
            name: '',
            type: _workflowtriggertype.WorkflowTriggerType.CRON,
            settings: {
                type: 'DAYS',
                schedule: {
                    day: 31,
                    hour: 10,
                    minute: 30
                },
                outputSchema: {}
            }
        };
        expect((0, _computecronpatternfromschedule.computeCronPatternFromSchedule)(trigger)).toBe('30 10 */31 * *');
    });
    it('should return the correct cron pattern for HOURS type', ()=>{
        const trigger = {
            name: '',
            type: _workflowtriggertype.WorkflowTriggerType.CRON,
            settings: {
                type: 'HOURS',
                schedule: {
                    hour: 10,
                    minute: 30
                },
                outputSchema: {}
            }
        };
        expect((0, _computecronpatternfromschedule.computeCronPatternFromSchedule)(trigger)).toBe('30 */10 * * *');
    });
    it('should return the correct cron pattern for MINUTES type', ()=>{
        const trigger = {
            name: '',
            type: _workflowtriggertype.WorkflowTriggerType.CRON,
            settings: {
                type: 'MINUTES',
                schedule: {
                    minute: 15
                },
                outputSchema: {}
            }
        };
        expect((0, _computecronpatternfromschedule.computeCronPatternFromSchedule)(trigger)).toBe('*/15 * * * *');
    });
    it('should throw an exception for unsupported schedule type', ()=>{
        const trigger = {
            name: '',
            type: _workflowtriggertype.WorkflowTriggerType.CRON,
            settings: {
                type: 'INVALID_TYPE',
                pattern: '',
                outputSchema: {}
            }
        };
        expect(()=>(0, _computecronpatternfromschedule.computeCronPatternFromSchedule)(trigger)).toThrow(_workflowtriggerexception.WorkflowTriggerException);
        expect(()=>(0, _computecronpatternfromschedule.computeCronPatternFromSchedule)(trigger)).toThrow('Unsupported cron schedule type');
    });
});

//# sourceMappingURL=compute-cron-pattern-from-schedule.spec.js.map