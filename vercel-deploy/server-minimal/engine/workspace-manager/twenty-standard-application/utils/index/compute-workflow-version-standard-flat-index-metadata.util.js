"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildWorkflowVersionStandardFlatIndexMetadatas", {
    enumerable: true,
    get: function() {
        return buildWorkflowVersionStandardFlatIndexMetadatas;
    }
});
const _indexTypetypes = require("../../../../metadata-modules/index-metadata/types/indexType.types");
const _createstandardindexflatmetadatautil = require("./create-standard-index-flat-metadata.util");
const buildWorkflowVersionStandardFlatIndexMetadatas = ({ now, objectName, workspaceId, standardObjectMetadataRelatedEntityIds, dependencyFlatEntityMaps, twentyStandardApplicationId })=>({
        workflowIdIndex: (0, _createstandardindexflatmetadatautil.createStandardIndexFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                indexName: 'workflowIdIndex',
                relatedFieldNames: [
                    'workflow'
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

//# sourceMappingURL=compute-workflow-version-standard-flat-index-metadata.util.js.map