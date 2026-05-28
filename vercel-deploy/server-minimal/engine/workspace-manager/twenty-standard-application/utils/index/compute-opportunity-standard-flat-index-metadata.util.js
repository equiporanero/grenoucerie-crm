"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildOpportunityStandardFlatIndexMetadatas", {
    enumerable: true,
    get: function() {
        return buildOpportunityStandardFlatIndexMetadatas;
    }
});
const _indexTypetypes = require("../../../../metadata-modules/index-metadata/types/indexType.types");
const _createstandardindexflatmetadatautil = require("./create-standard-index-flat-metadata.util");
const buildOpportunityStandardFlatIndexMetadatas = ({ now, objectName, workspaceId, standardObjectMetadataRelatedEntityIds, dependencyFlatEntityMaps, twentyStandardApplicationId })=>({
        pointOfContactIdIndex: (0, _createstandardindexflatmetadatautil.createStandardIndexFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                indexName: 'pointOfContactIdIndex',
                relatedFieldNames: [
                    'pointOfContact'
                ]
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
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
        stageIndex: (0, _createstandardindexflatmetadatautil.createStandardIndexFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                indexName: 'stageIndex',
                relatedFieldNames: [
                    'stage'
                ]
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

//# sourceMappingURL=compute-opportunity-standard-flat-index-metadata.util.js.map