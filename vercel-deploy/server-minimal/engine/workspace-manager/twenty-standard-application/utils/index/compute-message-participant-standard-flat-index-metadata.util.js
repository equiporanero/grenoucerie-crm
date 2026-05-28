"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildMessageParticipantStandardFlatIndexMetadatas", {
    enumerable: true,
    get: function() {
        return buildMessageParticipantStandardFlatIndexMetadatas;
    }
});
const _createstandardindexflatmetadatautil = require("./create-standard-index-flat-metadata.util");
const buildMessageParticipantStandardFlatIndexMetadatas = ({ now, objectName, workspaceId, standardObjectMetadataRelatedEntityIds, dependencyFlatEntityMaps, twentyStandardApplicationId })=>({
        messageIdIndex: (0, _createstandardindexflatmetadatautil.createStandardIndexFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                indexName: 'messageIdIndex',
                relatedFieldNames: [
                    'message'
                ]
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        personIdIndex: (0, _createstandardindexflatmetadatautil.createStandardIndexFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                indexName: 'personIdIndex',
                relatedFieldNames: [
                    'person'
                ]
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
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

//# sourceMappingURL=compute-message-participant-standard-flat-index-metadata.util.js.map