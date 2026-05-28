"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateNoDuplicateUniqueIndexOrThrow", {
    enumerable: true,
    get: function() {
        return validateNoDuplicateUniqueIndexOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _indexfieldmetadataexception = require("../index-field-metadata.exception");
const validateNoDuplicateUniqueIndexOrThrow = ({ proposed, existingFlatIndexMaps, objectMetadataId, ignoreIndexId })=>{
    if (!proposed.isUnique || proposed.fields.length !== 1) {
        return;
    }
    const [proposedField] = proposed.fields;
    const duplicate = Object.values(existingFlatIndexMaps.byUniversalIdentifier).find((flatIndex)=>{
        if (!(0, _utils.isDefined)(flatIndex)) return false;
        if (flatIndex.id === ignoreIndexId) return false;
        if (!flatIndex.isUnique) return false;
        if (flatIndex.objectMetadataId !== objectMetadataId) return false;
        if (flatIndex.flatIndexFieldMetadatas.length !== 1) return false;
        const existingField = flatIndex.flatIndexFieldMetadatas[0];
        return existingField.fieldMetadataId === proposedField.fieldMetadataId && (existingField.subFieldName ?? null) === (proposedField.subFieldName ?? null);
    });
    if ((0, _utils.isDefined)(duplicate)) {
        throw new _indexfieldmetadataexception.IndexMetadataException(`A UNIQUE index already covers this column (${duplicate.name})`, _indexfieldmetadataexception.IndexMetadataExceptionCode.DUPLICATE_UNIQUE_INDEX, {
            userFriendlyMessage: /*i18n*/ {
                id: "99gsJ/",
                message: 'This column is already marked as unique. Toggle the field\'s "Unique" off first if you want to manage the constraint here.'
            }
        });
    }
};

//# sourceMappingURL=validate-no-duplicate-unique-index.util.js.map