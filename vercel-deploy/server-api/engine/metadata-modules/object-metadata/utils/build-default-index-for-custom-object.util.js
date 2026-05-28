"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildDefaultIndexesForCustomObject", {
    enumerable: true,
    get: function() {
        return buildDefaultIndexesForCustomObject;
    }
});
const _uuid = require("uuid");
const _indexTypetypes = require("../../index-metadata/types/indexType.types");
const _generateflatindexutil = require("../../index-metadata/utils/generate-flat-index.util");
const buildDefaultIndexesForCustomObject = ({ flatObjectMetadata, defaultFlatFieldForCustomObjectMaps, objectFlatFieldMetadatas })=>{
    const tsFlatVectorIndexUniversalIdentifier = (0, _uuid.v4)();
    const createdAt = new Date();
    const tsVectorFlatIndex = (0, _generateflatindexutil.generateFlatIndexMetadataWithNameOrThrow)({
        objectFlatFieldMetadatas,
        flatIndex: {
            createdAt: createdAt.toISOString(),
            universalFlatIndexFieldMetadatas: [
                {
                    createdAt: createdAt.toISOString(),
                    fieldMetadataUniversalIdentifier: defaultFlatFieldForCustomObjectMaps.fields.searchVector.universalIdentifier,
                    indexMetadataUniversalIdentifier: tsFlatVectorIndexUniversalIdentifier,
                    order: 0,
                    subFieldName: null,
                    updatedAt: createdAt.toISOString()
                }
            ],
            indexType: _indexTypetypes.IndexType.GIN,
            indexWhereClause: null,
            isCustom: false,
            isUnique: false,
            objectMetadataUniversalIdentifier: flatObjectMetadata.universalIdentifier,
            universalIdentifier: tsFlatVectorIndexUniversalIdentifier,
            updatedAt: createdAt.toISOString(),
            applicationUniversalIdentifier: flatObjectMetadata.applicationUniversalIdentifier
        },
        flatObjectMetadata
    });
    return {
        indexes: {
            tsVectorFlatIndex
        }
    };
};

//# sourceMappingURL=build-default-index-for-custom-object.util.js.map