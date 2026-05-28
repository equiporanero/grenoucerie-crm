"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getAllSelectableFields", {
    enumerable: true,
    get: function() {
        return getAllSelectableFields;
    }
});
const _metadata = require("twenty-shared/metadata");
const _types = require("twenty-shared/types");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../../../metadata-modules/field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _iscompositefieldmetadatatypeutil = require("../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _isflatfieldmetadataoftypeutil = require("../../../../metadata-modules/flat-field-metadata/utils/is-flat-field-metadata-of-type.util");
const getAllSelectableFields = ({ restrictedFields, flatObjectMetadata, flatFieldMetadataMaps, onlyUseLabelIdentifierFieldsInRelations = false })=>{
    const result = {};
    for (const fieldId of flatObjectMetadata.fieldIds){
        const flatField = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityMaps: flatFieldMetadataMaps,
            flatEntityId: fieldId
        });
        if (restrictedFields[flatField.id]?.canRead === false) continue;
        if (onlyUseLabelIdentifierFieldsInRelations) {
            const fieldIsLabelIdentifier = (0, _metadata.checkIfFieldIsLabelIdentifier)(flatField, flatObjectMetadata);
            const fieldIsImageIdentifier = (0, _metadata.checkIfFieldIsImageIdentifier)(flatField, flatObjectMetadata);
            const fieldIsIdField = flatField.name === 'id';
            if (!fieldIsLabelIdentifier && !fieldIsImageIdentifier && !fieldIsIdField) {
                continue;
            }
        }
        if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(flatField.type)) {
            const compositeType = _types.compositeTypeDefinitions.get(flatField.type);
            if (!compositeType) {
                throw new Error(`Composite type definition not found for type: ${flatField.type}`);
            }
            const compositeFields = {};
            for (const property of compositeType.properties){
                compositeFields[property.name] = true;
            }
            result[flatField.name] = compositeFields;
        } else if (((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(flatField, _types.FieldMetadataType.RELATION) || (0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(flatField, _types.FieldMetadataType.MORPH_RELATION)) && flatField.settings.relationType === _types.RelationType.MANY_TO_ONE) {
            const joinColumnName = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                name: flatField.name
            });
            result[joinColumnName] = true;
        } else {
            result[flatField.name] = true;
        }
    }
    return result;
};

//# sourceMappingURL=get-all-selectable-fields.util.js.map