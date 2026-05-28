"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateArrayOperatorValueOrThrow", {
    enumerable: true,
    get: function() {
        return validateArrayOperatorValueOrThrow;
    }
});
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateArrayOperatorValueOrThrow = (value, operator, fieldName)=>{
    if (!Array.isArray(value)) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Filter operator "${operator}" requires an array value for field ${fieldName}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_FILTER, {
            userFriendlyMessage: /*i18n*/ {
                id: "+GVjEm",
                message: 'Invalid filter: "{operator}" operator requires an array',
                values: {
                    operator: operator
                }
            }
        });
    }
};

//# sourceMappingURL=validate-array-operator-value-or-throw.util.js.map