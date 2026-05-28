"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateEmailsFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateEmailsFieldOrThrow;
    }
});
const _guards = require("@sniptt/guards");
const _validateemailsadditionalemailssubfieldorthrowutil = require("./validate-emails-additional-emails-subfield-or-throw.util");
const _validateemailsprimaryemailsubfieldorthrowutil = require("./validate-emails-primary-email-subfield-or-throw.util");
const _validaterawjsonfieldorthrowutil = require("./validate-raw-json-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateEmailsFieldOrThrow = (value, fieldName)=>{
    const preValidatedValue = (0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(value, fieldName);
    if ((0, _guards.isNull)(preValidatedValue)) return null;
    for (const [subField, subFieldValue] of Object.entries(preValidatedValue)){
        switch(subField){
            case 'primaryEmail':
                (0, _validateemailsprimaryemailsubfieldorthrowutil.validateEmailsPrimaryEmailSubfieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            case 'additionalEmails':
                (0, _validateemailsadditionalemailssubfieldorthrowutil.validateEmailsAdditionalEmailsSubfieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            default:
                throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid subfield ${subField} for emails field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "mANTdg",
                        message: "Invalid value for emails."
                    }
                });
        }
    }
    return value;
};

//# sourceMappingURL=validate-emails-field-or-throw.util.js.map