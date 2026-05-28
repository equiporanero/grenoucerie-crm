"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformAggregateValue", {
    enumerable: true,
    get: function() {
        return transformAggregateValue;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const PERCENT_AGGREGATE_OPERATIONS = new Set([
    _types.AggregateOperations.PERCENTAGE_EMPTY,
    _types.AggregateOperations.PERCENTAGE_NOT_EMPTY
]);
const COUNT_AGGREGATE_OPERATIONS = new Set([
    _types.AggregateOperations.COUNT,
    _types.AggregateOperations.COUNT_UNIQUE_VALUES,
    _types.AggregateOperations.COUNT_EMPTY,
    _types.AggregateOperations.COUNT_NOT_EMPTY,
    _types.AggregateOperations.COUNT_TRUE,
    _types.AggregateOperations.COUNT_FALSE
]);
const transformAggregateValue = ({ rawValue, aggregateFieldType, aggregateOperation })=>{
    if (!(0, _utils.isDefined)(rawValue)) {
        return 0;
    }
    const numericValue = Number(rawValue);
    if (isNaN(numericValue)) {
        return 0;
    }
    if (COUNT_AGGREGATE_OPERATIONS.has(aggregateOperation)) {
        return numericValue;
    }
    if (PERCENT_AGGREGATE_OPERATIONS.has(aggregateOperation)) {
        return numericValue * 100;
    }
    if (aggregateFieldType === _types.FieldMetadataType.CURRENCY) {
        return numericValue / 1_000_000;
    }
    return numericValue;
};

//# sourceMappingURL=transform-aggregate-value.util.js.map