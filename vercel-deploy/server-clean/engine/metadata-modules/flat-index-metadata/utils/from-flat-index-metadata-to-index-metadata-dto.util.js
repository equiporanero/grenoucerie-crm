"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatIndexMetadataToIndexMetadataDto", {
    enumerable: true,
    get: function() {
        return fromFlatIndexMetadataToIndexMetadataDto;
    }
});
const fromFlatIndexMetadataToIndexMetadataDto = (flatIndexMetadata)=>{
    return {
        id: flatIndexMetadata.id,
        name: flatIndexMetadata.name,
        isCustom: flatIndexMetadata.isCustom,
        isUnique: flatIndexMetadata.isUnique,
        indexWhereClause: flatIndexMetadata.indexWhereClause ?? undefined,
        indexType: flatIndexMetadata.indexType,
        objectMetadataId: flatIndexMetadata.objectMetadataId,
        workspaceId: flatIndexMetadata.workspaceId,
        createdAt: new Date(flatIndexMetadata.createdAt),
        updatedAt: new Date(flatIndexMetadata.updatedAt)
    };
};

//# sourceMappingURL=from-flat-index-metadata-to-index-metadata-dto.util.js.map