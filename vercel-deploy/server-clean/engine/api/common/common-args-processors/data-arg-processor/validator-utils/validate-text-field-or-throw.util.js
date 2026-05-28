"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateTextFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateTextFieldOrThrow;
    }
});
const _util = require("util");
const _guards = require("@sniptt/guards");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateTextFieldOrThrow = (value, fieldName)=>{
    if (typeof value !== 'string' && !(0, _guards.isNull)(value)) {
        const inspectedValue = (0, _util.inspect)(value);
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid string value ${inspectedValue} for text field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
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

//# sourceMappingURL=validate-text-field-or-throw.util.js.map