"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildBlocklistStandardFlatIndexMetadatas", {
    enumerable: true,
    get: function() {
        return buildBlocklistStandardFlatIndexMetadatas;
    }
});
const _createstandardindexflatmetadatautil = require("./create-standard-index-flat-metadata.util");
const buildBlocklistStandardFlatIndexMetadatas = ({ now, objectName, workspaceId, standardObjectMetadataRelatedEntityIds, dependencyFlatEntityMaps, twentyStandardApplicationId })=>({
        workspaceMemberIdIndex: (0, _createstandardindexflatmetadatautil.createStandardIndexFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                indexName: 'workspaceMemberIdIndex',
                relatedFieldNames: [
                    'workspaceMember'
                ]
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        })
    });

//# sourceMappingURL=compute-blocklist-standard-flat-index-metadata.util.js.map