"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateIndexForFlatFieldMetadata", {
    enumerable: true,
    get: function() {
        return generateIndexForFlatFieldMetadata;
    }
});
const _uuid = require("uuid");
const _indexTypetypes = require("../../index-metadata/types/indexType.types");
const _generateflatindexutil = require("../../index-metadata/utils/generate-flat-index.util");
const generateIndexForFlatFieldMetadata = ({ flatFieldMetadata, flatObjectMetadata })=>{
    const indexMetadataUniversalIdentifier = (0, _uuid.v4)();
    const createdAt = new Date().toISOString();
    const flatIndex = (0, _generateflatindexutil.generateFlatIndexMetadataWithNameOrThrow)({
        objectFlatFieldMetadatas: [
            flatFieldMetadata
        ],
        flatIndex: {
            createdAt,
            universalFlatIndexFieldMetadatas: [
                {
                    createdAt,
                    fieldMetadataUniversalIdentifier: flatFieldMetadata.universalIdentifier,
                    indexMetadataUniversalIdentifier,
                    order: 0,
                    subFieldName: null,
                    updatedAt: createdAt
                }
            ],
            indexType: _indexTypetypes.IndexType.BTREE,
            indexWhereClause: null,
            isCustom: true,
            isUnique: flatFieldMetadata.isUnique ?? false,
            objectMetadataUniversalIdentifier: flatObjectMetadata.universalIdentifier,
            universalIdentifier: indexMetadataUniversalIdentifier,
            updatedAt: createdAt,
            applicationUniversalIdentifier: flatFieldMetadata.applicationUniversalIdentifier
        },
        flatObjectMetadata
    });
    return flatIndex;
};

//# sourceMappingURL=generate-index-for-flat-field-metadata.util.js.map