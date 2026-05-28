"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateNumberFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateNumberFieldOrThrow;
    }
});
const _util = require("util");
const _guards = require("@sniptt/guards");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateNumberFieldOrThrow = (value, fieldName)=>{
    if (!(0, _guards.isNumber)(value) && !(0, _guards.isNull)(value) || (0, _guards.isNumber)(value) && (isNaN(value) || value === Infinity || value === -Infinity)) {
        const inspectedValue = (0, _util.inspect)(value);
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid number value ${inspectedValue} for field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
            userFriendlyMessage: /*i18n*/ {
                id: "WHM6K7",
                message: 'Invalid value for number: "{inspectedValue}"',
                values: {
                    inspectedValue: inspectedValue
                }
            }
        });
    }
    return value;
};

//# sourceMappingURL=validate-number-field-or-throw.util.js.map