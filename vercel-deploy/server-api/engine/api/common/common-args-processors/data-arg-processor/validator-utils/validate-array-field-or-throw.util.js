"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateArrayFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateArrayFieldOrThrow;
    }
});
const _util = require("util");
const _guards = require("@sniptt/guards");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateArrayFieldOrThrow = (value, fieldName)=>{
    if ((0, _guards.isNull)(value)) return null;
    if (typeof value === 'string') return value;
    if (!Array.isArray(value) || value.some((item)=>typeof item !== 'string')) {
        const inspectedValue = (0, _util.inspect)(value);
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid value ${inspectedValue} for field "${fieldName} - Array values need to be string"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
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

//# sourceMappingURL=validate-array-field-or-throw.util.js.map