"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findDefaultNullEquivalentValue", {
    enumerable: true,
    get: function() {
        return findDefaultNullEquivalentValue;
    }
});
const _types = require("twenty-shared/types");
const _nullequivalentvaluesconstant = require("../../../../../../engine/api/common/common-args-processors/data-arg-processor/constants/null-equivalent-values.constant");
const _isnullequivalentarrayfieldvalueutil = require("../../../../../../engine/api/common/common-args-processors/data-arg-processor/utils/is-null-equivalent-array-field-value.util");
const _isnullequivalenttextfieldvalueutil = require("../../../../../../engine/api/common/common-args-processors/data-arg-processor/utils/is-null-equivalent-text-field-value.util");
const findDefaultNullEquivalentValue = ({ value, fieldMetadataType, key })=>{
    switch(fieldMetadataType){
        case _types.FieldMetadataType.TEXT:
            return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
        case _types.FieldMetadataType.MULTI_SELECT:
        case _types.FieldMetadataType.ARRAY:
            return (0, _isnullequivalentarrayfieldvalueutil.isNullEquivalentArrayFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE : undefined;
        case _types.FieldMetadataType.ACTOR:
            {
                switch(key){
                    case 'name':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    default:
                        return undefined;
                }
            }
        case _types.FieldMetadataType.ADDRESS:
            {
                switch(key){
                    case 'addressStreet1':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'addressStreet2':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'addressCity':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'addressState':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'addressPostcode':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'addressCountry':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    default:
                        return undefined;
                }
            }
        case _types.FieldMetadataType.EMAILS:
            {
                switch(key){
                    case 'primaryEmail':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'additionalEmails':
                        return (0, _isnullequivalentarrayfieldvalueutil.isNullEquivalentArrayFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    default:
                        return undefined;
                }
            }
        case _types.FieldMetadataType.LINKS:
            {
                switch(key){
                    case 'primaryLinkUrl':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'primaryLinkLabel':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'secondaryLinks':
                        return (0, _isnullequivalentarrayfieldvalueutil.isNullEquivalentArrayFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    default:
                        return undefined;
                }
            }
        case _types.FieldMetadataType.PHONES:
            {
                switch(key){
                    case 'primaryPhoneNumber':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'primaryPhoneCountryCode':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'primaryPhoneCallingCode':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'additionalPhones':
                        return (0, _isnullequivalentarrayfieldvalueutil.isNullEquivalentArrayFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    default:
                        return undefined;
                }
            }
        case _types.FieldMetadataType.RICH_TEXT:
            {
                switch(key){
                    case 'markdown':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    default:
                        return undefined;
                }
            }
        case _types.FieldMetadataType.FULL_NAME:
            {
                switch(key){
                    case 'firstName':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'lastName':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) ? _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    default:
                        return undefined;
                }
            }
    }
    return undefined;
};

//# sourceMappingURL=find-default-null-equivalent-value.util.js.map