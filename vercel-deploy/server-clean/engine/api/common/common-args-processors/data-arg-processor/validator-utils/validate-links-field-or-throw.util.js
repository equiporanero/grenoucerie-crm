"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateLinksFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateLinksFieldOrThrow;
    }
});
const _guards = require("@sniptt/guards");
const _validaterawjsonfieldorthrowutil = require("./validate-raw-json-field-or-throw.util");
const _validatetextfieldorthrowutil = require("./validate-text-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateLinksFieldOrThrow = (value, fieldName)=>{
    const preValidatedValue = (0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(value, fieldName);
    if ((0, _guards.isNull)(preValidatedValue)) return null;
    for (const [subField, subFieldValue] of Object.entries(preValidatedValue)){
        switch(subField){
            case 'primaryLinkUrl':
                (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            case 'primaryLinkLabel':
                (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            case 'secondaryLinks':
                (0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            default:
                throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid subfield ${subField} for links field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "GFYy9y",
                        message: "Invalid value for links."
                    }
                });
        }
    }
    return value;
};

//# sourceMappingURL=validate-links-field-or-throw.util.js.map