"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveAggregateFieldKey", {
    enumerable: true,
    get: function() {
        return resolveAggregateFieldKey;
    }
});
const _types = require("twenty-shared/types");
const resolveAggregateFieldKey = (aggregateOperation, aggregateFieldName, availableAggregations)=>{
    // Tool inputs use (aggregateOperation, aggregateFieldName), while GraphQL/REST
    // already pass concrete aggregate keys (e.g. "sumEmployees"), so this helper
    // intentionally adapts only the tool-surface contract.
    const fieldPathParts = aggregateFieldName.split('.');
    if (fieldPathParts.length > 2 || fieldPathParts.some((fieldPathPart)=>fieldPathPart.length === 0)) {
        return null;
    }
    const [parentField, subField] = fieldPathParts;
    const targetOperation = _types.AggregateOperations[aggregateOperation];
    const matchingEntry = Object.entries(availableAggregations).find(([, aggregation])=>{
        if (aggregation.aggregateOperation !== targetOperation) {
            return false;
        }
        if (aggregation.fromField !== parentField) {
            return false;
        }
        if (subField) {
            return aggregation.subFieldForNumericOperation === subField;
        }
        return true;
    });
    return matchingEntry?.[0] ?? null;
};

//# sourceMappingURL=resolve-aggregate-field-key.util.js.map