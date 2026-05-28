"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateEmailsPrimaryEmailSubfieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateEmailsPrimaryEmailSubfieldOrThrow;
    }
});
const _util = require("util");
const _guards = require("@sniptt/guards");
const _zod = require("zod");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateEmailsPrimaryEmailSubfieldOrThrow = (value, fieldName)=>{
    if ((0, _guards.isNull)(value)) return null;
    if (typeof value !== 'string') {
        const inspectedValue = (0, _util.inspect)(value);
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid string value ${inspectedValue} for email field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
            userFriendlyMessage: /*i18n*/ {
                id: "Og/MZQ",
                message: 'Invalid value: "{inspectedValue}"',
                values: {
                    inspectedValue: inspectedValue
                }
            }
        });
    }
    if (!_zod.z.email({
        pattern: _zod.z.regexes.unicodeEmail
    }).safeParse(value).success && (0, _guards.isNonEmptyString)(value)) {
        const inspectedValue = (0, _util.inspect)(value);
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid string value ${inspectedValue} for email field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
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

//# sourceMappingURL=validate-emails-primary-email-subfield-or-throw.util.js.map