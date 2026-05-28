"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "processTwoDimensionalResults", {
    enumerable: true,
    get: function() {
        return processTwoDimensionalResults;
    }
});
const _utils = require("twenty-shared/utils");
const _formatdimensionvalueutil = require("./format-dimension-value.util");
const processTwoDimensionalResults = ({ rawResults, primaryAxisGroupByField, secondaryAxisGroupByField, primaryDateGranularity, primarySubFieldName, secondaryDateGranularity, secondarySubFieldName, userTimezone, firstDayOfTheWeek })=>{
    const formattedToRawLookup = new Map();
    const secondaryFormattedToRawLookup = new Map();
    const processedDataPoints = [];
    for (const result of rawResults){
        const dimensionValues = result.groupByDimensionValues;
        if (!(0, _utils.isDefined)(dimensionValues) || dimensionValues.length < 2) {
            continue;
        }
        const rawXValue = dimensionValues[0];
        const rawYValue = dimensionValues[1];
        const xFormatted = (0, _formatdimensionvalueutil.formatDimensionValue)({
            value: rawXValue,
            fieldMetadata: primaryAxisGroupByField,
            dateGranularity: primaryDateGranularity ?? undefined,
            subFieldName: primarySubFieldName ?? undefined,
            userTimezone,
            firstDayOfTheWeek
        });
        const yFormatted = (0, _formatdimensionvalueutil.formatDimensionValue)({
            value: rawYValue,
            fieldMetadata: secondaryAxisGroupByField,
            dateGranularity: secondaryDateGranularity ?? undefined,
            subFieldName: secondarySubFieldName ?? undefined,
            userTimezone,
            firstDayOfTheWeek
        });
        if ((0, _utils.isDefined)(rawXValue)) {
            formattedToRawLookup.set(xFormatted, rawXValue);
        }
        if ((0, _utils.isDefined)(rawYValue)) {
            secondaryFormattedToRawLookup.set(yFormatted, rawYValue);
        }
        processedDataPoints.push({
            xFormatted,
            yFormatted,
            rawXValue,
            rawYValue,
            aggregateValue: result.aggregateValue
        });
    }
    return {
        processedDataPoints,
        formattedToRawLookup,
        secondaryFormattedToRawLookup
    };
};

//# sourceMappingURL=process-two-dimensional-results.util.js.map