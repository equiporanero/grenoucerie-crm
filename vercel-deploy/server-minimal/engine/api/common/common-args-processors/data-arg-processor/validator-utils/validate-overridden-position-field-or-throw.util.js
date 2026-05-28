"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateOverriddenPositionFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateOverriddenPositionFieldOrThrow;
    }
});
const _util = require("util");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateOverriddenPositionFieldOrThrow = (value, fieldName)=>{
    if (typeof value !== 'number' || typeof value === 'number' && (isNaN(value) || value === Infinity || value === -Infinity)) {
        const inspectedValue = (0, _util.inspect)(value);
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid position value ${inspectedValue} for field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
            userFriendlyMessage: /*i18n*/ {
                id: "GLmyCK",
                message: 'Invalid value for position: "{inspectedValue}"',
                values: {
                    inspectedValue: inspectedValue
                }
            }
        });
    }
    return value;
};

//# sourceMappingURL=validate-overridden-position-field-or-throw.util.js.map