"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateAndTransformValueOrThrow", {
    enumerable: true,
    get: function() {
        return validateAndTransformValueOrThrow;
    }
});
const _validateandtransformarrayitemsutil = require("./validate-and-transform-array-items.util");
const _validateandtransformvaluebyfieldtypeutil = require("./validate-and-transform-value-by-field-type.util");
const _validatearrayoperatorvalueorthrowutil = require("./validate-array-operator-value-or-throw.util");
const _validateisemptyarrayoperatorvalueorthrowutil = require("./validate-is-empty-array-operator-value-or-throw.util");
const _validateisoperatorfiltervalueorthrowutil = require("./validate-is-operator-filter-value-or-throw.util");
const _validatestringoperatorvalueorthrowutil = require("./validate-string-operator-value-or-throw.util");
const validateAndTransformValueOrThrow = (operator, value, fieldMetadata, fieldName)=>{
    switch(operator){
        case 'is':
            (0, _validateisoperatorfiltervalueorthrowutil.validateIsOperatorFilterValueOrThrow)(value);
            return value;
        case 'isEmptyArray':
            (0, _validateisemptyarrayoperatorvalueorthrowutil.validateIsEmptyArrayOperatorValueOrThrow)(value, fieldName);
            return value;
        case 'in':
            (0, _validatearrayoperatorvalueorthrowutil.validateArrayOperatorValueOrThrow)(value, operator, fieldName);
            return (0, _validateandtransformarrayitemsutil.validateAndTransformArrayItems)(value, fieldMetadata, fieldName);
        case 'containsAny':
            (0, _validatearrayoperatorvalueorthrowutil.validateArrayOperatorValueOrThrow)(value, operator, fieldName);
            return value;
        case 'eq':
        case 'neq':
        case 'gt':
        case 'gte':
        case 'lt':
        case 'lte':
            return (0, _validateandtransformvaluebyfieldtypeutil.validateAndTransformValueByFieldType)(value, fieldMetadata, fieldName);
        case 'like':
        case 'ilike':
        case 'startsWith':
        case 'endsWith':
        case 'containsIlike':
            (0, _validatestringoperatorvalueorthrowutil.validateStringOperatorValueOrThrow)(value, operator, fieldName);
            return value;
        default:
            return value;
    }
};

//# sourceMappingURL=validate-and-transform-value-or-throw.util.js.map