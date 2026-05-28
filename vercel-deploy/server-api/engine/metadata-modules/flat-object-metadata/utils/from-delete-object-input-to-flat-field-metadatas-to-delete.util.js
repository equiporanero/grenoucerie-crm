"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDeleteObjectInputToFlatFieldMetadatasToDelete", {
    enumerable: true,
    get: function() {
        return fromDeleteObjectInputToFlatFieldMetadatasToDelete;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findrelationflatfieldmetadatastargetflatfieldmetadataorthrowutil = require("../../flat-field-metadata/utils/find-relation-flat-field-metadatas-target-flat-field-metadata-or-throw.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _objectmetadataexception = require("../../object-metadata/object-metadata.exception");
const fromDeleteObjectInputToFlatFieldMetadatasToDelete = ({ deleteObjectInput: rawDeleteObjectInput, flatFieldMetadataMaps, flatObjectMetadataMaps, flatIndexMaps })=>{
    const { id: objectMetadataToDeleteId } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawDeleteObjectInput, [
        'id'
    ]);
    const flatObjectMetadataToDelete = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityMaps: flatObjectMetadataMaps,
        flatEntityId: objectMetadataToDeleteId
    });
    if (!(0, _utils.isDefined)(flatObjectMetadataToDelete)) {
        throw new _objectmetadataexception.ObjectMetadataException('Object to delete not found', _objectmetadataexception.ObjectMetadataExceptionCode.OBJECT_METADATA_NOT_FOUND);
    }
    const objectFlatFieldMetadatas = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityMaps: flatFieldMetadataMaps,
        flatEntityIds: flatObjectMetadataToDelete.fieldIds
    });
    const flatFieldMetadatasToDelete = objectFlatFieldMetadatas.flatMap((flatFieldMetadata)=>{
        if ((0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(flatFieldMetadata) && flatFieldMetadata.relationTargetObjectMetadataId !== objectMetadataToDeleteId) {
            const relationTargetFlatFieldMetadata = (0, _findrelationflatfieldmetadatastargetflatfieldmetadataorthrowutil.findRelationFlatFieldMetadataTargetFlatFieldMetadataOrThrow)({
                flatFieldMetadata,
                flatFieldMetadataMaps
            });
            return [
                flatFieldMetadata,
                relationTargetFlatFieldMetadata
            ];
        }
        return [
            flatFieldMetadata
        ];
    });
    const fieldIdsToDelete = new Set(flatFieldMetadatasToDelete.map((flatField)=>flatField.id));
    // TODO We should maintain a idsByObjectMetadataId in the flatIndexMaps
    const flatIndexMetadataToDelete = Object.values(flatIndexMaps.byUniversalIdentifier).filter((flatIndex)=>(0, _utils.isDefined)(flatIndex) && (flatIndex.objectMetadataId === flatObjectMetadataToDelete.id || flatIndex.flatIndexFieldMetadatas.some((flatIndexField)=>fieldIdsToDelete.has(flatIndexField.fieldMetadataId))));
    return {
        flatFieldMetadatasToDelete,
        flatObjectMetadataToDelete,
        flatIndexToDelete: flatIndexMetadataToDelete
    };
};

//# sourceMappingURL=from-delete-object-input-to-flat-field-metadatas-to-delete.util.js.map