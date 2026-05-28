"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "recomputeIndexAfterFlatObjectMetadataSingularNameUpdate", {
    enumerable: true,
    get: function() {
        return recomputeIndexAfterFlatObjectMetadataSingularNameUpdate;
    }
});
const _findmanyflatentitybyuniversalidentifierinuniversalflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-universal-identifier-in-universal-flat-entity-maps-or-throw.util");
const _generateflatindexutil = require("../../index-metadata/utils/generate-flat-index.util");
const recomputeIndexAfterFlatObjectMetadataSingularNameUpdate = ({ existingFlatObjectMetadata, flatIndexMaps, updatedSingularName, flatFieldMetadataMaps })=>{
    const allRelatedFlatIndexMetadata = (0, _findmanyflatentitybyuniversalidentifierinuniversalflatentitymapsorthrowutil.findManyFlatEntityByUniversalIdentifierInUniversalFlatEntityMapsOrThrow)({
        universalIdentifiers: existingFlatObjectMetadata.indexMetadataUniversalIdentifiers,
        flatEntityMaps: flatIndexMaps
    });
    if (allRelatedFlatIndexMetadata.length === 0) {
        return [];
    }
    const optimisticFlatObjectMetadata = {
        ...existingFlatObjectMetadata,
        nameSingular: updatedSingularName
    };
    const objectFlatFieldMetadatas = (0, _findmanyflatentitybyuniversalidentifierinuniversalflatentitymapsorthrowutil.findManyFlatEntityByUniversalIdentifierInUniversalFlatEntityMapsOrThrow)({
        flatEntityMaps: flatFieldMetadataMaps,
        universalIdentifiers: optimisticFlatObjectMetadata.fieldUniversalIdentifiers
    });
    return allRelatedFlatIndexMetadata.map((flatIndex)=>{
        const newIndex = (0, _generateflatindexutil.generateFlatIndexMetadataWithNameOrThrow)({
            flatIndex,
            flatObjectMetadata: optimisticFlatObjectMetadata,
            objectFlatFieldMetadatas
        });
        return newIndex;
    });
};

//# sourceMappingURL=recompute-index-after-flat-object-metadata-singular-name-update.util.js.map