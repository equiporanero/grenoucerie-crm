"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getOperatorsForFieldType", {
    enumerable: true,
    get: function() {
        return getOperatorsForFieldType;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _filteroperatorsconstant = require("../constants/filter-operators.constant");
const getOperatorsForFieldType = (fieldType)=>{
    switch(fieldType){
        case _types.FieldMetadataType.TEXT:
            return _filteroperatorsconstant.STRING_FILTER_OPERATORS;
        case _types.FieldMetadataType.NUMBER:
        case _types.FieldMetadataType.NUMERIC:
        case _types.FieldMetadataType.POSITION:
            return _filteroperatorsconstant.NUMBER_FILTER_OPERATORS;
        case _types.FieldMetadataType.BOOLEAN:
            return _filteroperatorsconstant.BOOLEAN_FILTER_OPERATORS;
        case _types.FieldMetadataType.DATE:
        case _types.FieldMetadataType.DATE_TIME:
            return _filteroperatorsconstant.DATE_FILTER_OPERATORS;
        case _types.FieldMetadataType.UUID:
        case _types.FieldMetadataType.RELATION:
        case _types.FieldMetadataType.MORPH_RELATION:
            return _filteroperatorsconstant.UUID_FILTER_OPERATORS;
        case _types.FieldMetadataType.ARRAY:
            return _filteroperatorsconstant.ARRAY_FILTER_OPERATORS;
        case _types.FieldMetadataType.MULTI_SELECT:
            return _filteroperatorsconstant.MULTI_SELECT_FILTER_OPERATORS;
        case _types.FieldMetadataType.SELECT:
        case _types.FieldMetadataType.RATING:
            return _filteroperatorsconstant.ENUM_FILTER_OPERATORS;
        case _types.FieldMetadataType.RAW_JSON:
        case _types.FieldMetadataType.FILES:
            return _filteroperatorsconstant.RAW_JSON_FILTER_OPERATORS;
        case _types.FieldMetadataType.RICH_TEXT:
            return _filteroperatorsconstant.RICH_TEXT_FILTER_OPERATORS;
        case _types.FieldMetadataType.TS_VECTOR:
        case _types.FieldMetadataType.ACTOR:
        case _types.FieldMetadataType.ADDRESS:
        case _types.FieldMetadataType.CURRENCY:
        case _types.FieldMetadataType.EMAILS:
        case _types.FieldMetadataType.FULL_NAME:
        case _types.FieldMetadataType.LINKS:
        case _types.FieldMetadataType.PHONES:
            return [
                'eq',
                'neq',
                'is'
            ];
        default:
            (0, _utils.assertUnreachable)(fieldType);
    }
};

//# sourceMappingURL=get-operators-for-field-type.util.js.map