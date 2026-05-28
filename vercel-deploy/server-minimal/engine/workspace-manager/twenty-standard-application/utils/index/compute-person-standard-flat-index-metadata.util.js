"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildPersonStandardFlatIndexMetadatas", {
    enumerable: true,
    get: function() {
        return buildPersonStandardFlatIndexMetadatas;
    }
});
const _indexTypetypes = require("../../../../metadata-modules/index-metadata/types/indexType.types");
const _createstandardindexflatmetadatautil = require("./create-standard-index-flat-metadata.util");
const buildPersonStandardFlatIndexMetadatas = ({ now, objectName, workspaceId, standardObjectMetadataRelatedEntityIds, dependencyFlatEntityMaps, twentyStandardApplicationId })=>({
        companyIdIndex: (0, _createstandardindexflatmetadatautil.createStandardIndexFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                indexName: 'companyIdIndex',
                relatedFieldNames: [
                    'company'
                ]
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        emailsUniqueIndex: (0, _createstandardindexflatmetadatautil.createStandardIndexFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                indexName: 'emailsUniqueIndex',
                relatedFieldNames: [
                    'emails'
                ],
                isUnique: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        searchVectorGinIndex: (0, _createstandardindexflatmetadatautil.createStandardIndexFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                indexName: 'searchVectorGinIndex',
                relatedFieldNames: [
                    'searchVector'
                ],
                indexType: _indexTypetypes.IndexType.GIN
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        })
    });

//# sourceMappingURL=compute-person-standard-flat-index-metadata.util.js.map