"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findFieldRelatedIndexes", {
    enumerable: true,
    get: function() {
        return findFieldRelatedIndexes;
    }
});
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const findFieldRelatedIndexes = ({ flatFieldMetadata, flatObjectMetadata, flatIndexMaps })=>{
    const objectIndexes = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityMaps: flatIndexMaps,
        flatEntityIds: flatObjectMetadata.indexMetadataIds
    });
    return objectIndexes.filter((index)=>index.flatIndexFieldMetadatas.some((indexField)=>indexField.fieldMetadataId === flatFieldMetadata.id));
};

//# sourceMappingURL=find-field-related-index.util.js.map