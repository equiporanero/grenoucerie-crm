"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateEmailsAdditionalEmailsSubfieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateEmailsAdditionalEmailsSubfieldOrThrow;
    }
});
const _util = require("util");
const _guards = require("@sniptt/guards");
const _validateemailsprimaryemailsubfieldorthrowutil = require("./validate-emails-primary-email-subfield-or-throw.util");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateEmailsAdditionalEmailsSubfieldOrThrow = (value, fieldName)=>{
    if ((0, _guards.isNull)(value)) return null;
    if (typeof value === 'string') {
        return (0, _validateemailsprimaryemailsubfieldorthrowutil.validateEmailsPrimaryEmailSubfieldOrThrow)(value, fieldName);
    }
    if (!Array.isArray(value) || value.some((item)=>(0, _guards.isNull)((0, _validateemailsprimaryemailsubfieldorthrowutil.validateEmailsPrimaryEmailSubfieldOrThrow)(item, fieldName)))) {
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

//# sourceMappingURL=validate-emails-additional-emails-subfield-or-throw.util.js.map