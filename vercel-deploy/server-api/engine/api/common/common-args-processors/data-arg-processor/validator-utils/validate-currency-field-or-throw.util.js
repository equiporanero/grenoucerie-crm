"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateCurrencyFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateCurrencyFieldOrThrow;
    }
});
const _guards = require("@sniptt/guards");
const _validatenumericfieldorthrowutil = require("./validate-numeric-field-or-throw.util");
const _validaterawjsonfieldorthrowutil = require("./validate-raw-json-field-or-throw.util");
const _validatetextfieldorthrowutil = require("./validate-text-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateCurrencyFieldOrThrow = (value, fieldName)=>{
    const preValidatedValue = (0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(value, fieldName);
    if ((0, _guards.isNull)(preValidatedValue)) return null;
    for (const [subField, subFieldValue] of Object.entries(preValidatedValue)){
        switch(subField){
            case 'amountMicros':
                (0, _validatenumericfieldorthrowutil.validateNumericFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            case 'currencyCode':
                (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            default:
                throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid subfield ${subField} for currency field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "D9hzmE",
                        message: "Invalid value for currency."
                    }
                });
        }
    }
    return value;
};

//# sourceMappingURL=validate-currency-field-or-throw.util.js.map