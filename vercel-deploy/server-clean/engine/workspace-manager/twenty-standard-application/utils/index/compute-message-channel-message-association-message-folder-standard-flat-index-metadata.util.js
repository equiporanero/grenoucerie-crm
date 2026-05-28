"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildMessageChannelMessageAssociationMessageFolderStandardFlatIndexMetadatas", {
    enumerable: true,
    get: function() {
        return buildMessageChannelMessageAssociationMessageFolderStandardFlatIndexMetadatas;
    }
});
const _createstandardindexflatmetadatautil = require("./create-standard-index-flat-metadata.util");
const buildMessageChannelMessageAssociationMessageFolderStandardFlatIndexMetadatas = ({ now, objectName, workspaceId, standardObjectMetadataRelatedEntityIds, dependencyFlatEntityMaps, twentyStandardApplicationId })=>({
        messageChannelMessageAssociationIdIndex: (0, _createstandardindexflatmetadatautil.createStandardIndexFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                indexName: 'messageChannelMessageAssociationIdIndex',
                relatedFieldNames: [
                    'messageChannelMessageAssociation'
                ]
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        messageFolderIdIndex: (0, _createstandardindexflatmetadatautil.createStandardIndexFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                indexName: 'messageFolderIdIndex',
                relatedFieldNames: [
                    'messageFolderId'
                ]
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        messageChannelMessageAssociationIdMessageFolderIdUniqueIndex: (0, _createstandardindexflatmetadatautil.createStandardIndexFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                indexName: 'messageChannelMessageAssociationIdMessageFolderIdUniqueIndex',
                relatedFieldNames: [
                    'messageChannelMessageAssociation',
                    'messageFolderId'
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

//# sourceMappingURL=compute-message-channel-message-association-message-folder-standard-flat-index-metadata.util.js.map