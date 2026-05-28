"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateIsEmptyArrayOperatorValueOrThrow", {
    enumerable: true,
    get: function() {
        return validateIsEmptyArrayOperatorValueOrThrow;
    }
});
const _classvalidator = require("class-validator");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateIsEmptyArrayOperatorValueOrThrow = (value, fieldName)=>{
    if (!(0, _classvalidator.isBoolean)(value)) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Filter operator "isEmptyArray" requires a boolean value for field ${fieldName}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_FILTER, {
            userFriendlyMessage: /*i18n*/ {
                id: "4eM03h",
                message: 'Invalid filter: "isEmptyArray" operator requires a boolean'
            }
        });
    }
};

//# sourceMappingURL=validate-is-empty-array-operator-value-or-throw.util.js.map