"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fillUsageTimeSeriesGaps", {
    enumerable: true,
    get: function() {
        return fillUsageTimeSeriesGaps;
    }
});
const _utils = require("twenty-shared/utils");
const fillUsageTimeSeriesGaps = ({ rows, periodStart, periodEnd })=>{
    const startDate = (0, _utils.parseToPlainDateOrThrow)(periodStart.toISOString());
    const lastIncludedInstant = new Date(periodEnd.getTime() - 1);
    const endDate = (0, _utils.parseToPlainDateOrThrow)(lastIncludedInstant.toISOString());
    if ((0, _utils.isPlainDateAfter)(startDate, endDate)) {
        return [];
    }
    const rowsByDate = new Map();
    for (const row of rows){
        rowsByDate.set(row.date, row);
    }
    const filled = [];
    let currentDateCursor = startDate;
    while((0, _utils.isPlainDateBeforeOrEqual)(currentDateCursor, endDate)){
        const key = currentDateCursor.toString();
        const existing = rowsByDate.get(key);
        filled.push(existing ?? {
            date: key,
            creditsUsed: 0
        });
        currentDateCursor = currentDateCursor.add({
            days: 1
        });
    }
    return filled;
};

//# sourceMappingURL=fill-usage-time-series-gaps.util.js.map