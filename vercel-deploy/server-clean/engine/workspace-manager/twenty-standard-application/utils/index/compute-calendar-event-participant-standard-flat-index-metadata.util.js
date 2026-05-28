"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildCalendarEventParticipantStandardFlatIndexMetadatas", {
    enumerable: true,
    get: function() {
        return buildCalendarEventParticipantStandardFlatIndexMetadatas;
    }
});
const _createstandardindexflatmetadatautil = require("./create-standard-index-flat-metadata.util");
const buildCalendarEventParticipantStandardFlatIndexMetadatas = ({ now, objectName, workspaceId, standardObjectMetadataRelatedEntityIds, dependencyFlatEntityMaps, twentyStandardApplicationId })=>({
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

//# sourceMappingURL=compute-calendar-event-participant-standard-flat-index-metadata.util.js.map