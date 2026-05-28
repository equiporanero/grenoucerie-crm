"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateRawJsonFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateRawJsonFieldOrThrow;
    }
});
const _util = require("util");
const _guards = require("@sniptt/guards");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateRawJsonFieldOrThrow = (value, fieldName)=>{
    if ((0, _guards.isNull)(value)) return null;
    if (typeof value === 'string') {
        try {
            JSON.parse(value);
        } catch  {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid object value ${(0, _util.inspect)(value)} for field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
                userFriendlyMessage: /*i18n*/ {
                    id: "BgSFod",
                    message: "Invalid value for JSON."
                }
            });
        }
        return value;
    }
    if (!(0, _guards.isObject)(value)) {
        const inspectedValue = (0, _util.inspect)(value);
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid object value ${inspectedValue} for field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
            userFriendlyMessage: /*i18n*/ {
                id: "UiMJoF",
                message: 'Invalid value for JSON: "{inspectedValue}"',
                values: {
                    inspectedValue: inspectedValue
                }
            }
        });
    }
    return value;
};

//# sourceMappingURL=validate-raw-json-field-or-throw.util.js.map