"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateAddressFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateAddressFieldOrThrow;
    }
});
const _guards = require("@sniptt/guards");
const _validatenumericfieldorthrowutil = require("./validate-numeric-field-or-throw.util");
const _validaterawjsonfieldorthrowutil = require("./validate-raw-json-field-or-throw.util");
const _validatetextfieldorthrowutil = require("./validate-text-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateAddressFieldOrThrow = (value, fieldName)=>{
    const preValidatedValue = (0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(value, fieldName);
    if ((0, _guards.isNull)(preValidatedValue)) return null;
    for (const [subField, subFieldValue] of Object.entries(preValidatedValue)){
        switch(subField){
            case 'addressStreet1':
                (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            case 'addressStreet2':
                (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            case 'addressCity':
                (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            case 'addressState':
                (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            case 'addressPostcode':
                (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            case 'addressCountry':
                (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            case 'addressLat':
                (0, _validatenumericfieldorthrowutil.validateNumericFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            case 'addressLng':
                (0, _validatenumericfieldorthrowutil.validateNumericFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            default:
                throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid subfield ${subField} for address field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "Y2KtrW",
                        message: "Invalid value for address."
                    }
                });
        }
    }
    return value;
};

//# sourceMappingURL=validate-address-field-or-throw.util.js.map