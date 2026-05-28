"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeIsNumericReturningAggregate", {
    enumerable: true,
    get: function() {
        return computeIsNumericReturningAggregate;
    }
});
const _types = require("twenty-shared/types");
const computeIsNumericReturningAggregate = (operation, fromFieldType)=>{
    if (operation === _types.AggregateOperations.COUNT || operation === _types.AggregateOperations.COUNT_UNIQUE_VALUES || operation === _types.AggregateOperations.COUNT_EMPTY || operation === _types.AggregateOperations.COUNT_NOT_EMPTY || operation === _types.AggregateOperations.COUNT_TRUE || operation === _types.AggregateOperations.COUNT_FALSE || operation === _types.AggregateOperations.PERCENTAGE_EMPTY || operation === _types.AggregateOperations.PERCENTAGE_NOT_EMPTY) {
        return true;
    }
    if (operation === _types.AggregateOperations.MIN || operation === _types.AggregateOperations.MAX || operation === _types.AggregateOperations.AVG || operation === _types.AggregateOperations.SUM) {
        return [
            _types.FieldMetadataType.NUMBER,
            _types.FieldMetadataType.NUMERIC,
            _types.FieldMetadataType.CURRENCY
        ].includes(fromFieldType);
    }
    return false;
};

//# sourceMappingURL=compute-is-numeric-returning-aggregate.util.js.map