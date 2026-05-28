"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildAggregateFieldKey", {
    enumerable: true,
    get: function() {
        return buildAggregateFieldKey;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const buildAggregateFieldKey = ({ aggregateOperation, aggregateFieldMetadata })=>{
    const fieldName = aggregateFieldMetadata.name;
    const fieldType = aggregateFieldMetadata.type;
    switch(aggregateOperation){
        case _types.AggregateOperations.COUNT:
            return 'totalCount';
        case _types.AggregateOperations.COUNT_UNIQUE_VALUES:
            return `countUniqueValues${(0, _utils.capitalize)(fieldName)}`;
        case _types.AggregateOperations.COUNT_EMPTY:
            return `countEmpty${(0, _utils.capitalize)(fieldName)}`;
        case _types.AggregateOperations.COUNT_NOT_EMPTY:
            return `countNotEmpty${(0, _utils.capitalize)(fieldName)}`;
        case _types.AggregateOperations.PERCENTAGE_EMPTY:
            return `percentageEmpty${(0, _utils.capitalize)(fieldName)}`;
        case _types.AggregateOperations.PERCENTAGE_NOT_EMPTY:
            return `percentageNotEmpty${(0, _utils.capitalize)(fieldName)}`;
        case _types.AggregateOperations.COUNT_TRUE:
            return `countTrue${(0, _utils.capitalize)(fieldName)}`;
        case _types.AggregateOperations.COUNT_FALSE:
            return `countFalse${(0, _utils.capitalize)(fieldName)}`;
        case _types.AggregateOperations.MIN:
            if (fieldType === _types.FieldMetadataType.CURRENCY) {
                return `min${(0, _utils.capitalize)(fieldName)}AmountMicros`;
            }
            return `min${(0, _utils.capitalize)(fieldName)}`;
        case _types.AggregateOperations.MAX:
            if (fieldType === _types.FieldMetadataType.CURRENCY) {
                return `max${(0, _utils.capitalize)(fieldName)}AmountMicros`;
            }
            return `max${(0, _utils.capitalize)(fieldName)}`;
        case _types.AggregateOperations.AVG:
            if (fieldType === _types.FieldMetadataType.CURRENCY) {
                return `avg${(0, _utils.capitalize)(fieldName)}AmountMicros`;
            }
            return `avg${(0, _utils.capitalize)(fieldName)}`;
        case _types.AggregateOperations.SUM:
            if (fieldType === _types.FieldMetadataType.CURRENCY) {
                return `sum${(0, _utils.capitalize)(fieldName)}AmountMicros`;
            }
            return `sum${(0, _utils.capitalize)(fieldName)}`;
    }
};

//# sourceMappingURL=build-aggregate-field-key.util.js.map