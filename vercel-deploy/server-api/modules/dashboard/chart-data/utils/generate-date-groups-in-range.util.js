"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateDateGroupsInRange", {
    enumerable: true,
    get: function() {
        return generateDateGroupsInRange;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _barchartmaximumnumberofbarsconstant = require("../constants/bar-chart-maximum-number-of-bars.constant");
const generateDateGroupsInRange = ({ startDate, endDate, granularity })=>{
    const dates = [];
    let iterations = 0;
    let wasTruncated = false;
    let currentDateCursor = startDate;
    while((0, _utils.isPlainDateBeforeOrEqual)(currentDateCursor, endDate)){
        if (iterations >= _barchartmaximumnumberofbarsconstant.BAR_CHART_MAXIMUM_NUMBER_OF_BARS) {
            wasTruncated = true;
            break;
        }
        dates.push(currentDateCursor);
        iterations++;
        switch(granularity){
            case _types.ObjectRecordGroupByDateGranularity.DAY:
                currentDateCursor = currentDateCursor.add({
                    days: 1
                });
                break;
            case _types.ObjectRecordGroupByDateGranularity.WEEK:
                currentDateCursor = currentDateCursor.add({
                    weeks: 1
                });
                break;
            case _types.ObjectRecordGroupByDateGranularity.MONTH:
                currentDateCursor = currentDateCursor.add({
                    months: 1
                });
                break;
            case _types.ObjectRecordGroupByDateGranularity.QUARTER:
                currentDateCursor = currentDateCursor.add({
                    months: 3
                });
                break;
            case _types.ObjectRecordGroupByDateGranularity.YEAR:
                currentDateCursor = currentDateCursor.add({
                    years: 1
                });
                break;
            default:
                (0, _utils.assertUnreachable)(granularity);
        }
    }
    return {
        dates,
        wasTruncated
    };
};

//# sourceMappingURL=generate-date-groups-in-range.util.js.map