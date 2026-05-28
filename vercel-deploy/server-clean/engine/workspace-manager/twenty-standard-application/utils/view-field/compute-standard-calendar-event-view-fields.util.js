"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardCalendarEventViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardCalendarEventViewFields;
    }
});
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardCalendarEventViewFields = (args)=>{
    return {
        allCalendarEventsTitle: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEvent',
            context: {
                viewName: 'allCalendarEvents',
                viewFieldName: 'title',
                fieldName: 'title',
                position: 0,
                isVisible: true,
                size: 180
            }
        }),
        allCalendarEventsStartsAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEvent',
            context: {
                viewName: 'allCalendarEvents',
                viewFieldName: 'startsAt',
                fieldName: 'startsAt',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        allCalendarEventsEndsAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEvent',
            context: {
                viewName: 'allCalendarEvents',
                viewFieldName: 'endsAt',
                fieldName: 'endsAt',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        allCalendarEventsIsFullDay: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEvent',
            context: {
                viewName: 'allCalendarEvents',
                viewFieldName: 'isFullDay',
                fieldName: 'isFullDay',
                position: 3,
                isVisible: true,
                size: 100
            }
        }),
        allCalendarEventsLocation: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEvent',
            context: {
                viewName: 'allCalendarEvents',
                viewFieldName: 'location',
                fieldName: 'location',
                position: 4,
                isVisible: true,
                size: 150
            }
        }),
        allCalendarEventsConferenceLink: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEvent',
            context: {
                viewName: 'allCalendarEvents',
                viewFieldName: 'conferenceLink',
                fieldName: 'conferenceLink',
                position: 5,
                isVisible: true,
                size: 150
            }
        }),
        allCalendarEventsIsCanceled: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEvent',
            context: {
                viewName: 'allCalendarEvents',
                viewFieldName: 'isCanceled',
                fieldName: 'isCanceled',
                position: 6,
                isVisible: true,
                size: 100
            }
        }),
        allCalendarEventsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEvent',
            context: {
                viewName: 'allCalendarEvents',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 7,
                isVisible: true,
                size: 150
            }
        })
    };
};

//# sourceMappingURL=compute-standard-calendar-event-view-fields.util.js.map