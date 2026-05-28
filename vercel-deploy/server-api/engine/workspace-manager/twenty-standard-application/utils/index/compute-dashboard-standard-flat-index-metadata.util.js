"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildDashboardStandardFlatIndexMetadatas", {
    enumerable: true,
    get: function() {
        return buildDashboardStandardFlatIndexMetadatas;
    }
});
const _indexTypetypes = require("../../../../metadata-modules/index-metadata/types/indexType.types");
const _createstandardindexflatmetadatautil = require("./create-standard-index-flat-metadata.util");
const buildDashboardStandardFlatIndexMetadatas = ({ now, objectName, workspaceId, standardObjectMetadataRelatedEntityIds, dependencyFlatEntityMaps, twentyStandardApplicationId })=>({
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

//# sourceMappingURL=compute-dashboard-standard-flat-index-metadata.util.js.map