"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateActorFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateActorFieldOrThrow;
    }
});
const _guards = require("@sniptt/guards");
const _types = require("twenty-shared/types");
const _validateratingandselectfieldorthrowutil = require("./validate-rating-and-select-field-or-throw.util");
const _validaterawjsonfieldorthrowutil = require("./validate-raw-json-field-or-throw.util");
const _validatetextfieldorthrowutil = require("./validate-text-field-or-throw.util");
const _validateuuidfieldorthrowutil = require("./validate-uuid-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateActorFieldOrThrow = (value, fieldName)=>{
    const preValidatedValue = (0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(value, fieldName);
    if ((0, _guards.isNull)(preValidatedValue)) return null;
    for (const [subField, subFieldValue] of Object.entries(preValidatedValue)){
        switch(subField){
            case 'source':
                (0, _validateratingandselectfieldorthrowutil.validateRatingAndSelectFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`, Object.keys(_types.FieldActorSource));
                break;
            case 'context':
                (0, _validaterawjsonfieldorthrowutil.validateRawJsonFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            case 'name':
                (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            case 'workspaceMemberId':
                (0, _validateuuidfieldorthrowutil.validateUUIDFieldOrThrow)(subFieldValue, `${fieldName}.${subField}`);
                break;
            default:
                throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid subfield ${subField} for actor field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "56bPee",
                        message: "Invalid value for actor."
                    }
                });
        }
    }
    return value;
};

//# sourceMappingURL=validate-actor-field-or-throw.util.js.map