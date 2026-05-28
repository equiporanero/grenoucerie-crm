"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "processOneDimensionalResults", {
    enumerable: true,
    get: function() {
        return processOneDimensionalResults;
    }
});
const _utils = require("twenty-shared/utils");
const _formatdimensionvalueutil = require("./format-dimension-value.util");
const processOneDimensionalResults = ({ rawResults, primaryAxisGroupByField, dateGranularity, subFieldName, userTimezone, firstDayOfTheWeek })=>{
    const formattedToRawLookup = new Map();
    const processedDataPoints = [];
    for (const result of rawResults){
        const dimensionValues = result.groupByDimensionValues;
        if (!(0, _utils.isDefined)(dimensionValues) || dimensionValues.length < 1) {
            continue;
        }
        const rawValue = dimensionValues[0];
        const formattedValue = (0, _formatdimensionvalueutil.formatDimensionValue)({
            value: rawValue,
            fieldMetadata: primaryAxisGroupByField,
            dateGranularity: dateGranularity ?? undefined,
            subFieldName: subFieldName ?? undefined,
            userTimezone,
            firstDayOfTheWeek
        });
        if ((0, _utils.isDefined)(rawValue)) {
            formattedToRawLookup.set(formattedValue, rawValue);
        }
        processedDataPoints.push({
            formattedValue,
            rawValue,
            aggregateValue: result.aggregateValue
        });
    }
    return {
        processedDataPoints,
        formattedToRawLookup
    };
};

//# sourceMappingURL=process-one-dimensional-results.util.js.map