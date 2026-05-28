"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateBooleanFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateBooleanFieldOrThrow;
    }
});
const _util = require("util");
const _guards = require("@sniptt/guards");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateBooleanFieldOrThrow = (value, fieldName)=>{
    if (!(0, _guards.isBoolean)(value) && !(0, _guards.isNull)(value)) {
        const inspectedValue = (0, _util.inspect)(value);
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid boolean value ${(0, _util.inspect)(value)} for field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
            userFriendlyMessage: /*i18n*/ {
                id: "Og/MZQ",
                message: 'Invalid value: "{inspectedValue}"',
                values: {
                    inspectedValue: inspectedValue
                }
            }
        });
    }
    return value;
};

//# sourceMappingURL=validate-boolean-field-or-throw.util.js.map