"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeCronPatternFromSchedule", {
    enumerable: true,
    get: function() {
        return computeCronPatternFromSchedule;
    }
});
const _cronparser = require("cron-parser");
const _workflowtriggerexception = require("../exceptions/workflow-trigger.exception");
const validatePattern = (pattern)=>{
    try {
        _cronparser.CronExpressionParser.parse(pattern);
    } catch (error) {
        throw new _workflowtriggerexception.WorkflowTriggerException(`Cron pattern '${pattern}' is invalid: ${error.message}`, _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
            userFriendlyMessage: /*i18n*/ {
                id: "umhXiy",
                message: "Cron pattern '{pattern}' is invalid",
                values: {
                    pattern: pattern
                }
            }
        });
    }
};
const computeCronPatternFromSchedule = (trigger)=>{
    switch(trigger.settings.type){
        case 'CUSTOM':
            {
                validatePattern(trigger.settings.pattern);
                return trigger.settings.pattern;
            }
        case 'DAYS':
            {
                const pattern = `${trigger.settings.schedule.minute} ${trigger.settings.schedule.hour} */${trigger.settings.schedule.day} * *`;
                validatePattern(pattern);
                return pattern;
            }
        case 'HOURS':
            {
                const pattern = `${trigger.settings.schedule.minute} */${trigger.settings.schedule.hour} * * *`;
                validatePattern(pattern);
                return pattern;
            }
        case 'MINUTES':
            {
                const pattern = `*/${trigger.settings.schedule.minute} * * * *`;
                validatePattern(pattern);
                return pattern;
            }
        default:
            throw new _workflowtriggerexception.WorkflowTriggerException('Unsupported cron schedule type', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER, {
                userFriendlyMessage: /*i18n*/ {
                    id: "EBZdX5",
                    message: "Unsupported cron schedule type"
                }
            });
    }
};

//# sourceMappingURL=compute-cron-pattern-from-schedule.js.map