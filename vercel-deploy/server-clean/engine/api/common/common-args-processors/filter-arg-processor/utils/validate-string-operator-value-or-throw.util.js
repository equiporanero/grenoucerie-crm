"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateStringOperatorValueOrThrow", {
    enumerable: true,
    get: function() {
        return validateStringOperatorValueOrThrow;
    }
});
const _guards = require("@sniptt/guards");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateStringOperatorValueOrThrow = (value, operator, fieldName)=>{
    if (!(0, _guards.isString)(value)) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Filter operator "${operator}" requires a string value for field "${fieldName}", got ${typeof value}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_FILTER, {
            userFriendlyMessage: /*i18n*/ {
                id: "NOU3zh",
                message: 'Invalid filter: "{operator}" operator requires a String',
                values: {
                    operator: operator
                }
            }
        });
    }
};

//# sourceMappingURL=validate-string-operator-value-or-throw.util.js.map