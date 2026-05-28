"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateOperatorForFieldTypeOrThrow", {
    enumerable: true,
    get: function() {
        return validateOperatorForFieldTypeOrThrow;
    }
});
const _getoperatorsforfieldtypeutil = require("./get-operators-for-field-type.util");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateOperatorForFieldTypeOrThrow = (operator, fieldMetadata, fieldName)=>{
    const allowedOperators = (0, _getoperatorsforfieldtypeutil.getOperatorsForFieldType)(fieldMetadata.type);
    if (!allowedOperators.includes(operator)) {
        const fieldType = fieldMetadata.type;
        const allowedOperatorsString = allowedOperators.join(', ');
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Operator "${operator}" is not valid for field "${fieldName}" of type ${fieldType} - Allowed operators: ${allowedOperatorsString}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_FILTER, {
            userFriendlyMessage: /*i18n*/ {
                id: "kFbvma",
                message: 'Invalid filter : Operator "{operator}" is not valid for this "{fieldName}" {fieldType} field',
                values: {
                    operator: operator,
                    fieldName: fieldName,
                    fieldType: fieldType
                }
            }
        });
    }
};

//# sourceMappingURL=validate-operator-for-field-type-or-throw.util.js.map