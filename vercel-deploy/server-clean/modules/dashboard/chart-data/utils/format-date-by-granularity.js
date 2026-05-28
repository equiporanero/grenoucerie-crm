"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatDateByGranularity", {
    enumerable: true,
    get: function() {
        return formatDateByGranularity;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const formatDateByGranularity = (plainDate, granularity, userTimezone, firstDayOfTheWeek)=>{
    switch(granularity){
        case _types.ObjectRecordGroupByDateGranularity.DAY:
            return plainDate.toLocaleString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        case _types.ObjectRecordGroupByDateGranularity.WEEK:
            {
                const startOfWeek = (0, _utils.getPeriodStart)(plainDate.toZonedDateTime(userTimezone), 'WEEK', firstDayOfTheWeek);
                const endOfWeek = (0, _utils.getNextPeriodStart)(plainDate.toZonedDateTime(userTimezone), 'WEEK', firstDayOfTheWeek).subtract({
                    days: 1
                });
                const startMonth = startOfWeek.toLocaleString(undefined, {
                    month: 'short'
                });
                const endMonth = endOfWeek.toLocaleString(undefined, {
                    month: 'short'
                });
                const startDay = startOfWeek.day;
                const endDay = endOfWeek.day;
                const startYear = startOfWeek.year;
                const endYear = endOfWeek.year;
                if (startYear !== endYear) {
                    return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
                }
                if (startMonth !== endMonth) {
                    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${endYear}`;
                }
                return `${startMonth} ${startDay} - ${endDay}, ${endYear}`;
            }
        case _types.ObjectRecordGroupByDateGranularity.MONTH:
            return plainDate.toLocaleString(undefined, {
                year: 'numeric',
                month: 'long'
            });
        case _types.ObjectRecordGroupByDateGranularity.QUARTER:
            {
                return `Q${Math.ceil(plainDate.month / 3)} ${plainDate.year}`;
            }
        case _types.ObjectRecordGroupByDateGranularity.YEAR:
            return plainDate.year.toString();
        case _types.ObjectRecordGroupByDateGranularity.NONE:
        default:
            return plainDate.toLocaleString();
    }
};

//# sourceMappingURL=format-date-by-granularity.js.map