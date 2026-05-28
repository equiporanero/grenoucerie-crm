"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeFlatViewFieldsToCreate", {
    enumerable: true,
    get: function() {
        return computeFlatViewFieldsToCreate;
    }
});
const _uuid = require("uuid");
const _defaultviewfieldsizeconstant = require("../../flat-view-field/constants/default-view-field-size.constant");
const _types = require("twenty-shared/types");
const computeFlatViewFieldsToCreate = ({ objectFlatFieldMetadatas, viewUniversalIdentifier, flatApplication, labelIdentifierFieldMetadataUniversalIdentifier, excludeLabelIdentifier = false })=>{
    const createdAt = new Date().toISOString();
    const defaultViewFields = objectFlatFieldMetadatas.filter((field)=>field.name !== 'deletedAt' && field.type !== _types.FieldMetadataType.TS_VECTOR && field.type !== _types.FieldMetadataType.POSITION && field.type !== _types.FieldMetadataType.MORPH_RELATION && field.type !== _types.FieldMetadataType.RELATION && // Include 'id' only if it's the label identifier (e.g., for junction tables)
        (field.name !== 'id' || field.universalIdentifier === labelIdentifierFieldMetadataUniversalIdentifier) && // Exclude label identifier field when requested (e.g., for FIELDS_WIDGET views)
        (!excludeLabelIdentifier || field.universalIdentifier !== labelIdentifierFieldMetadataUniversalIdentifier)).sort((a, b)=>{
        const aIsLabelIdentifierFieldMetadata = a.universalIdentifier === labelIdentifierFieldMetadataUniversalIdentifier;
        const bIsLabelIdentifierFieldMetadata = b.universalIdentifier === labelIdentifierFieldMetadataUniversalIdentifier;
        if (aIsLabelIdentifierFieldMetadata && !bIsLabelIdentifierFieldMetadata) return -1;
        if (!aIsLabelIdentifierFieldMetadata && bIsLabelIdentifierFieldMetadata) return 1;
        return 0;
    }).map((field, index)=>({
            fieldMetadataUniversalIdentifier: field.universalIdentifier,
            viewUniversalIdentifier,
            viewFieldGroupUniversalIdentifier: null,
            createdAt,
            updatedAt: createdAt,
            deletedAt: null,
            universalIdentifier: (0, _uuid.v4)(),
            isVisible: true,
            size: _defaultviewfieldsizeconstant.DEFAULT_VIEW_FIELD_SIZE,
            position: index,
            aggregateOperation: null,
            isActive: true,
            universalOverrides: null,
            applicationUniversalIdentifier: flatApplication.universalIdentifier
        }));
    return defaultViewFields;
};

//# sourceMappingURL=compute-flat-view-fields-to-create.util.js.map