"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateAndTransformValueByFieldType", {
    enumerable: true,
    get: function() {
        return validateAndTransformValueByFieldType;
    }
});
const _types = require("twenty-shared/types");
const _workflow = require("twenty-shared/workflow");
const _validatebooleanfieldorthrowutil = require("../validator-utils/validate-boolean-field-or-throw.util");
const _validatedatefieldorthrowutil = require("../validator-utils/validate-date-field-or-throw.util");
const _validatedatetimefieldorthrowutil = require("../validator-utils/validate-date-time-field-or-throw.util");
const _validatenumberfieldorthrowutil = require("../validator-utils/validate-number-field-or-throw.util");
const _validateuuidfieldorthrowutil = require("../validator-utils/validate-uuid-field-or-throw.util");
const _parsenumbervalueutil = require("./parse-number-value.util");
const validateAndTransformValueByFieldType = (value, fieldMetadata, fieldName)=>{
    const fieldType = fieldMetadata.type;
    switch(fieldType){
        case _types.FieldMetadataType.NUMBER:
        case _types.FieldMetadataType.NUMERIC:
        case _types.FieldMetadataType.POSITION:
            {
                const coercedNumber = (0, _parsenumbervalueutil.parseNumberValue)(value, fieldType);
                (0, _validatenumberfieldorthrowutil.validateNumberFieldOrThrow)(coercedNumber, fieldName);
                return coercedNumber;
            }
        case _types.FieldMetadataType.BOOLEAN:
            {
                const coercedBoolean = typeof value === 'string' ? (0, _workflow.parseBooleanFromStringValue)(value.toString()) : value;
                (0, _validatebooleanfieldorthrowutil.validateBooleanFieldOrThrow)(coercedBoolean, fieldName);
                return coercedBoolean;
            }
        case _types.FieldMetadataType.UUID:
        case _types.FieldMetadataType.RELATION:
        case _types.FieldMetadataType.MORPH_RELATION:
            (0, _validateuuidfieldorthrowutil.validateUUIDFieldOrThrow)(value, fieldName);
            return value;
        case _types.FieldMetadataType.DATE:
            (0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(value, fieldName);
            return value;
        case _types.FieldMetadataType.DATE_TIME:
            (0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(value, fieldName);
            return value;
        default:
            return value;
    }
};

//# sourceMappingURL=validate-and-transform-value-by-field-type.util.js.map