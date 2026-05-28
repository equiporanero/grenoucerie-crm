"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getFlatObjectMetadataTargetMorphRelationFlatFieldMetadatasOrThrow", {
    enumerable: true,
    get: function() {
        return getFlatObjectMetadataTargetMorphRelationFlatFieldMetadatasOrThrow;
    }
});
const _types = require("twenty-shared/types");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _isflatfieldmetadataoftypeutil = require("../../flat-field-metadata/utils/is-flat-field-metadata-of-type.util");
const getFlatObjectMetadataTargetMorphRelationFlatFieldMetadatasOrThrow = ({ objectFlatFieldMetadatas, flatFieldMetadataMaps })=>{
    return objectFlatFieldMetadatas.flatMap((flatFieldMetadata)=>{
        if (!(0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(flatFieldMetadata, _types.FieldMetadataType.RELATION)) {
            return [];
        }
        const targetFlatFieldMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: flatFieldMetadata.relationTargetFieldMetadataId,
            flatEntityMaps: flatFieldMetadataMaps
        });
        return (0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(targetFlatFieldMetadata, _types.FieldMetadataType.MORPH_RELATION) ? [
            targetFlatFieldMetadata
        ] : [];
    });
};

//# sourceMappingURL=get-flat-object-metadata-many-to-one-target-morph-relation-flat-field-metadatas-or-throw.util.js.map