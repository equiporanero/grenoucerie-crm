"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateRichTextFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateRichTextFieldOrThrow;
    }
});
const _util = require("util");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _validaterawjsonfieldorthrowutil = require("./validate-raw-json-field-or-throw.util");
const _validatetextfieldorthrowutil = require("./validate-text-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const URL_VALUE_PATTERN = /"(?:url|href)"\s*:\s*"([^"]*)"/gi;
const hasDangerousUrl = (json)=>{
    URL_VALUE_PATTERN.lastIndex = 0;
    let match;
    while((match = URL_VALUE_PATTERN.exec(json)) !== null){
        const url = match[1].trim();
        if (url.length > 0 && !(0, _utils.isSafeUrl)(url)) {
            return true;
        }
    }
    return false;
};
const validateBlocknoteFieldOrThrow = (value, fieldName)=>{
    const textValue = (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(value, fieldName);
    if (!(0, _guards.isNonEmptyString)(textValue)) return textValue;
    let parsed;
    try {
        parsed = JSON.parse(textValue);
    } catch  {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid blocknote value for field "${fieldName}" - must contain valid JSON`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
            userFriendlyMessage: /*i18n*/ {
                id: "Sf+6YJ",
                message: "Invalid value for rich text."
            }
        });
    }
    if (!Array.isArray(parsed)) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid blocknote value for field "${fieldName}" - must be a JSON array of blocks`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
            userFriendlyMessage: /*i18n*/ {
                id: "Sf+6YJ",
                message: "Invalid value for rich text."
            }
        });
    }
    if (hasDangerousUrl(textValue)) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Dangerous URL protocol in blocknote content for field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
            userFriendlyMessage: /*i18n*/ {
                id: "869Uds",
                message: "Content contains a URL with a dangerous protocol."
            }
        });
    }
    return textValue;
};
const validateRichTextFieldOrThrow = (value, fieldName)=>{
    const preValidatedValue = (0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(value, fieldName);
    if ((0, _guards.isNull)(preValidatedValue)) return null;
    for (const [subField, subFieldValue] of Object.entries(preValidatedValue)){
        switch(subField){
            case 'blocknote':
                validateBlocknoteFieldOrThrow(subFieldValue, `${fieldName}.${subField}`);
                break;
            case 'markdown':
                (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            default:
                throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid subfield ${(0, _util.inspect)(subField)} for rich text field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "Sf+6YJ",
                        message: "Invalid value for rich text."
                    }
                });
        }
    }
    return value;
};

//# sourceMappingURL=validate-rich-text-field-or-throw.util.js.map