"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildCalendarChannelEventAssociationStandardFlatIndexMetadatas", {
    enumerable: true,
    get: function() {
        return buildCalendarChannelEventAssociationStandardFlatIndexMetadatas;
    }
});
const _createstandardindexflatmetadatautil = require("./create-standard-index-flat-metadata.util");
const buildCalendarChannelEventAssociationStandardFlatIndexMetadatas = ({ now, objectName, workspaceId, standardObjectMetadataRelatedEntityIds, dependencyFlatEntityMaps, twentyStandardApplicationId })=>({
        calendarChannelIdIndex: (0, _createstandardindexflatmetadatautil.createStandardIndexFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                indexName: 'calendarChannelIdIndex',
                relatedFieldNames: [
                    'calendarChannelId'
                ]
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        calendarEventIdIndex: (0, _createstandardindexflatmetadatautil.createStandardIndexFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                indexName: 'calendarEventIdIndex',
                relatedFieldNames: [
                    'calendarEvent'
                ]
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        })
    });

//# sourceMappingURL=compute-calendar-channel-event-association-standard-flat-index-metadata.util.js.map