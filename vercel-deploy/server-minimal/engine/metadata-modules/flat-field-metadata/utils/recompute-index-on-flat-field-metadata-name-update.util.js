"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "recomputeIndexOnFlatFieldMetadataNameUpdate", {
    enumerable: true,
    get: function() {
        return recomputeIndexOnFlatFieldMetadataNameUpdate;
    }
});
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _generateflatindexutil = require("../../index-metadata/utils/generate-flat-index.util");
const recomputeIndexOnFlatFieldMetadataNameUpdate = ({ fromFlatFieldMetadata, toFlatFieldMetadata, flatObjectMetadata, flatFieldMetadataMaps, relatedFlatIndexMetadata })=>{
    if (relatedFlatIndexMetadata.length === 0) {
        return [];
    }
    const objectFlatFieldMetadatas = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityMaps: flatFieldMetadataMaps,
        flatEntityIds: flatObjectMetadata.fieldIds
    });
    const optimisticObjectFlatFieldMetadatas = objectFlatFieldMetadatas.map((flatFieldMetadata)=>{
        if (flatFieldMetadata.id === fromFlatFieldMetadata.id) {
            return {
                ...flatFieldMetadata,
                name: toFlatFieldMetadata.name,
                isUnique: toFlatFieldMetadata.isUnique
            };
        }
        return flatFieldMetadata;
    });
    return relatedFlatIndexMetadata.map((flatIndex)=>(0, _generateflatindexutil.generateFlatIndexMetadataWithNameOrThrow)({
            flatIndex,
            flatObjectMetadata,
            objectFlatFieldMetadatas: optimisticObjectFlatFieldMetadatas
        }));
};

//# sourceMappingURL=recompute-index-on-flat-field-metadata-name-update.util.js.map