"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildMessageChannelMessageAssociationStandardFlatIndexMetadatas", {
    enumerable: true,
    get: function() {
        return buildMessageChannelMessageAssociationStandardFlatIndexMetadatas;
    }
});
const _createstandardindexflatmetadatautil = require("./create-standard-index-flat-metadata.util");
const buildMessageChannelMessageAssociationStandardFlatIndexMetadatas = ({ now, objectName, workspaceId, standardObjectMetadataRelatedEntityIds, dependencyFlatEntityMaps, twentyStandardApplicationId })=>({
        messageChannelIdIndex: (0, _createstandardindexflatmetadatautil.createStandardIndexFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                indexName: 'messageChannelIdIndex',
                relatedFieldNames: [
                    'messageChannelId'
                ]
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
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
        messageChannelIdMessageIdUniqueIndex: (0, _createstandardindexflatmetadatautil.createStandardIndexFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                indexName: 'messageChannelIdMessageIdUniqueIndex',
                relatedFieldNames: [
                    'messageChannelId',
                    'message'
                ],
                isUnique: true,
                indexWhereClause: '"deletedAt" IS NULL'
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        })
    });

//# sourceMappingURL=compute-message-channel-message-association-standard-flat-index-metadata.util.js.map