"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildWorkspaceMemberStandardFlatIndexMetadatas", {
    enumerable: true,
    get: function() {
        return buildWorkspaceMemberStandardFlatIndexMetadatas;
    }
});
const _indexTypetypes = require("../../../../metadata-modules/index-metadata/types/indexType.types");
const _createstandardindexflatmetadatautil = require("./create-standard-index-flat-metadata.util");
const buildWorkspaceMemberStandardFlatIndexMetadatas = ({ now, objectName, workspaceId, standardObjectMetadataRelatedEntityIds, dependencyFlatEntityMaps, twentyStandardApplicationId })=>({
        userEmailUniqueIndex: (0, _createstandardindexflatmetadatautil.createStandardIndexFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                indexName: 'userEmailUniqueIndex',
                relatedFieldNames: [
                    'userEmail'
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

//# sourceMappingURL=compute-workspace-member-standard-flat-index-metadata.util.js.map