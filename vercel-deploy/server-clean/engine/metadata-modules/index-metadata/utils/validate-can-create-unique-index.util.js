"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateCanCreateUniqueIndex", {
    enumerable: true,
    get: function() {
        return validateCanCreateUniqueIndex;
    }
});
const _types = require("twenty-shared/types");
const _fieldmetadataexception = require("../../field-metadata/field-metadata.exception");
const _iscompositefieldmetadatatypeutil = require("../../field-metadata/utils/is-composite-field-metadata-type.util");
const validateCanCreateUniqueIndex = (field)=>{
    const isCompositeFieldWithNonIncludedUniqueConstraint = (0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(field.type) && !_types.compositeTypeDefinitions.get(field.type)?.properties.some((property)=>property.isIncludedInUniqueConstraint);
    if ([
        _types.FieldMetadataType.MORPH_RELATION,
        _types.FieldMetadataType.RELATION
    ].includes(field.type) || isCompositeFieldWithNonIncludedUniqueConstraint) {
        const fieldType = field.type;
        throw new _fieldmetadataexception.FieldMetadataException(`Unique index cannot be created for field ${field.name} of type ${fieldType}`, _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT, {
            userFriendlyMessage: /*i18n*/ {
                id: "ZkHTHm",
                message: "{fieldType} fields cannot be unique.",
                values: {
                    fieldType: fieldType
                }
            }
        });
    }
};

//# sourceMappingURL=validate-can-create-unique-index.util.js.map