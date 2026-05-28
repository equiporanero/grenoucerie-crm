"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateAndTransformOperatorAndValue", {
    enumerable: true,
    get: function() {
        return validateAndTransformOperatorAndValue;
    }
});
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const _validateandtransformvalueorthrowutil = require("./validate-and-transform-value-or-throw.util");
const _validateoperatorforfieldtypeorthrowutil = require("./validate-operator-for-field-type-or-throw.util");
const validateAndTransformOperatorAndValue = (fieldName, filterValue, fieldMetadata)=>{
    if (filterValue === null || typeof filterValue !== 'object') {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Filter value for field "${fieldName}" must be an object`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_FILTER, {
            userFriendlyMessage: /*i18n*/ {
                id: "gdJXPD",
                message: "Invalid filter: filter value must be an object"
            }
        });
    }
    const entries = Object.entries(filterValue);
    if (entries.length !== 1) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Filter for field "${fieldName}" must have exactly one operator`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_FILTER, {
            userFriendlyMessage: /*i18n*/ {
                id: "Np9Fvw",
                message: "Invalid filter: exactly one operator per field is required"
            }
        });
    }
    const [[operator, value]] = entries;
    (0, _validateoperatorforfieldtypeorthrowutil.validateOperatorForFieldTypeOrThrow)(operator, fieldMetadata, fieldName);
    const transformedValue = (0, _validateandtransformvalueorthrowutil.validateAndTransformValueOrThrow)(operator, value, fieldMetadata, fieldName);
    return {
        [operator]: transformedValue
    };
};

//# sourceMappingURL=validate-and-transform-operator-and-value.util.js.map