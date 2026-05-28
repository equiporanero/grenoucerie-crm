"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validatePhonesFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validatePhonesFieldOrThrow;
    }
});
const _guards = require("@sniptt/guards");
const _validaterawjsonfieldorthrowutil = require("./validate-raw-json-field-or-throw.util");
const _validatetextfieldorthrowutil = require("./validate-text-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validatePhonesFieldOrThrow = (value, fieldName)=>{
    const preValidatedValue = (0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(value, fieldName);
    if ((0, _guards.isNull)(preValidatedValue)) return null;
    for (const [subField, subFieldValue] of Object.entries(preValidatedValue)){
        switch(subField){
            case 'primaryPhoneNumber':
                (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            case 'primaryPhoneCountryCode':
                (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            case 'primaryPhoneCallingCode':
                (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            case 'additionalPhones':
                (0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            default:
                throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid subfield ${subField} for phones field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "oLqCzh",
                        message: "Invalid value for phones."
                    }
                });
        }
    }
    return value;
};

//# sourceMappingURL=validate-phones-field-or-throw.util.js.map