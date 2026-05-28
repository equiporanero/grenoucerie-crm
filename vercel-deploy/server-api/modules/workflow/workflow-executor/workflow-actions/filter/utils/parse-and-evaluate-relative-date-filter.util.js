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
    get evaluateRelativeDateFilter () {
        return evaluateRelativeDateFilter;
    },
    get parseAndEvaluateRelativeDateFilter () {
        return parseAndEvaluateRelativeDateFilter;
    }
});
const _guards = require("@sniptt/guards");
const _datefns = require("date-fns");
const _utils = require("twenty-shared/utils");
const parseAndEvaluateRelativeDateFilter = ({ dateToCheck, relativeDateString })=>{
    const relativeDateFilterValue = (0, _utils.safeParseRelativeDateFilterJsonStringified)(relativeDateString);
    if (!relativeDateFilterValue) {
        return false;
    }
    return evaluateRelativeDateFilter({
        dateToCheck,
        relativeDateFilterValue
    });
};
const evaluateRelativeDateFilter = ({ dateToCheck, relativeDateFilterValue })=>{
    const now = new Date();
    switch(relativeDateFilterValue.direction){
        case 'NEXT':
            return evaluateNextDirection(dateToCheck, relativeDateFilterValue, now);
        case 'THIS':
            return evaluateThisDirection(dateToCheck, relativeDateFilterValue, now);
        case 'PAST':
            return evaluatePastDirection(dateToCheck, relativeDateFilterValue, now);
        default:
            return false;
    }
};
const evaluateNextDirection = (dateToCheck, relativeDateFilterValue, now)=>{
    if (!(0, _utils.isDefined)(relativeDateFilterValue.amount)) {
        return false;
    }
    const { amount, unit } = relativeDateFilterValue;
    const endOfPeriod = (0, _utils.addUnitToDateTime)(now, amount, unit);
    if (!endOfPeriod) {
        return false;
    }
    return (0, _datefns.isWithinInterval)(dateToCheck, {
        start: now,
        end: endOfPeriod
    });
};
function evaluatePastDirection(dateToCheck, relativeDateFilterValue, now) {
    if (!(0, _utils.isDefined)(relativeDateFilterValue.amount)) {
        return false;
    }
    const { amount, unit } = relativeDateFilterValue;
    const startOfPeriod = (0, _utils.subUnitFromDateTime)(now, amount, unit);
    if (!startOfPeriod) {
        return false;
    }
    return (0, _datefns.isWithinInterval)(dateToCheck, {
        start: startOfPeriod,
        end: now
    });
}
function evaluateThisDirection(dateToCheck, relativeDateValue, now) {
    const { unit } = relativeDateValue;
    const firstDayOfTheWeekAsANumberForDateFNS = (0, _guards.isNonEmptyString)(relativeDateValue.firstDayOfTheWeek) ? (0, _utils.getFirstDayOfTheWeekAsANumberForDateFNS)(relativeDateValue.firstDayOfTheWeek) : 1;
    switch(unit){
        case 'SECOND':
            return (0, _datefns.isWithinInterval)(dateToCheck, {
                start: (0, _datefns.startOfSecond)(now),
                end: (0, _datefns.endOfSecond)(now)
            });
        case 'MINUTE':
            return (0, _datefns.isWithinInterval)(dateToCheck, {
                start: (0, _datefns.startOfMinute)(now),
                end: (0, _datefns.endOfMinute)(now)
            });
        case 'HOUR':
            return (0, _datefns.isWithinInterval)(dateToCheck, {
                start: (0, _datefns.startOfHour)(now),
                end: (0, _datefns.endOfHour)(now)
            });
        case 'DAY':
            return (0, _datefns.isWithinInterval)(dateToCheck, {
                start: (0, _datefns.startOfDay)(now),
                end: (0, _datefns.endOfDay)(now)
            });
        case 'WEEK':
            return (0, _datefns.isWithinInterval)(dateToCheck, {
                start: (0, _datefns.startOfWeek)(now, {
                    weekStartsOn: firstDayOfTheWeekAsANumberForDateFNS
                }),
                end: (0, _datefns.endOfWeek)(now, {
                    weekStartsOn: firstDayOfTheWeekAsANumberForDateFNS
                })
            });
        case 'MONTH':
            return (0, _datefns.isWithinInterval)(dateToCheck, {
                start: (0, _datefns.startOfMonth)(now),
                end: (0, _datefns.endOfMonth)(now)
            });
        case 'YEAR':
            return (0, _datefns.isWithinInterval)(dateToCheck, {
                start: (0, _datefns.startOfYear)(now),
                end: (0, _datefns.endOfYear)(now)
            });
        case 'QUARTER':
            return (0, _datefns.isWithinInterval)(dateToCheck, {
                start: (0, _datefns.startOfQuarter)(now),
                end: (0, _datefns.endOfQuarter)(now)
            });
        default:
            return (0, _utils.assertUnreachable)(unit);
    }
}

//# sourceMappingURL=parse-and-evaluate-relative-date-filter.util.js.map