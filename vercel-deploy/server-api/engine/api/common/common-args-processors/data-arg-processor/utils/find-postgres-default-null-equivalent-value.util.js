"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findPostgresDefaultNullEquivalentValue", {
    enumerable: true,
    get: function() {
        return findPostgresDefaultNullEquivalentValue;
    }
});
const _types = require("twenty-shared/types");
const _nullequivalentvaluesconstant = require("../constants/null-equivalent-values.constant");
const _isnullequivalentarrayfieldvalueutil = require("./is-null-equivalent-array-field-value.util");
const _isnullequivalenttextfieldvalueutil = require("./is-null-equivalent-text-field-value.util");
const findPostgresDefaultNullEquivalentValue = (value, fieldMetadataType, key)=>{
    switch(fieldMetadataType){
        case _types.FieldMetadataType.TEXT:
            return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
        case _types.FieldMetadataType.MULTI_SELECT:
        case _types.FieldMetadataType.ARRAY:
            return (0, _isnullequivalentarrayfieldvalueutil.isNullEquivalentArrayFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE : undefined;
        case _types.FieldMetadataType.ACTOR:
            {
                switch(key){
                    case 'name':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    default:
                        return undefined;
                }
            }
        case _types.FieldMetadataType.ADDRESS:
            {
                switch(key){
                    case 'addressStreet1':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'addressStreet2':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'addressCity':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'addressState':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'addressPostcode':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'addressCountry':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    default:
                        return undefined;
                }
            }
        case _types.FieldMetadataType.EMAILS:
            {
                switch(key){
                    case 'primaryEmail':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'additionalEmails':
                        return (0, _isnullequivalentarrayfieldvalueutil.isNullEquivalentArrayFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    default:
                        return undefined;
                }
            }
        case _types.FieldMetadataType.LINKS:
            {
                switch(key){
                    case 'primaryLinkUrl':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'primaryLinkLabel':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'secondaryLinks':
                        return (0, _isnullequivalentarrayfieldvalueutil.isNullEquivalentArrayFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    default:
                        return undefined;
                }
            }
        case _types.FieldMetadataType.PHONES:
            {
                switch(key){
                    case 'primaryPhoneNumber':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'primaryPhoneCountryCode':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'primaryPhoneCallingCode':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'additionalPhones':
                        return (0, _isnullequivalentarrayfieldvalueutil.isNullEquivalentArrayFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_ARRAY_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    default:
                        return undefined;
                }
            }
        case _types.FieldMetadataType.RICH_TEXT:
            {
                switch(key){
                    case 'markdown':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    default:
                        return undefined;
                }
            }
        case _types.FieldMetadataType.FULL_NAME:
            {
                switch(key){
                    case 'firstName':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    case 'lastName':
                        return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) || value === 'NULL' ? _nullequivalentvaluesconstant.POSTGRES_DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE : undefined;
                    default:
                        return undefined;
                }
            }
    }
    return undefined;
};

//# sourceMappingURL=find-postgres-default-null-equivalent-value.util.js.map