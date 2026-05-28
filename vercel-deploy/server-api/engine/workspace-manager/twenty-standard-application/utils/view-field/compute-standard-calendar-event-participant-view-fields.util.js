"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardCalendarEventParticipantViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardCalendarEventParticipantViewFields;
    }
});
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardCalendarEventParticipantViewFields = (args)=>{
    return {
        allCalendarEventParticipantsHandle: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'allCalendarEventParticipants',
                viewFieldName: 'handle',
                fieldName: 'handle',
                position: 0,
                isVisible: true,
                size: 150
            }
        }),
        allCalendarEventParticipantsCalendarEvent: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'allCalendarEventParticipants',
                viewFieldName: 'calendarEvent',
                fieldName: 'calendarEvent',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        allCalendarEventParticipantsDisplayName: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'allCalendarEventParticipants',
                viewFieldName: 'displayName',
                fieldName: 'displayName',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        allCalendarEventParticipantsIsOrganizer: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'allCalendarEventParticipants',
                viewFieldName: 'isOrganizer',
                fieldName: 'isOrganizer',
                position: 3,
                isVisible: true,
                size: 150
            }
        }),
        allCalendarEventParticipantsResponseStatus: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'allCalendarEventParticipants',
                viewFieldName: 'responseStatus',
                fieldName: 'responseStatus',
                position: 4,
                isVisible: true,
                size: 150
            }
        }),
        allCalendarEventParticipantsPerson: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'allCalendarEventParticipants',
                viewFieldName: 'person',
                fieldName: 'person',
                position: 5,
                isVisible: true,
                size: 150
            }
        }),
        allCalendarEventParticipantsWorkspaceMember: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'allCalendarEventParticipants',
                viewFieldName: 'workspaceMember',
                fieldName: 'workspaceMember',
                position: 6,
                isVisible: true,
                size: 150
            }
        }),
        allCalendarEventParticipantsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'allCalendarEventParticipants',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 7,
                isVisible: true,
                size: 150
            }
        }),
        calendarEventParticipantRecordPageFieldsHandle: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'calendarEventParticipantRecordPageFields',
                viewFieldName: 'handle',
                fieldName: 'handle',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        calendarEventParticipantRecordPageFieldsCalendarEvent: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'calendarEventParticipantRecordPageFields',
                viewFieldName: 'calendarEvent',
                fieldName: 'calendarEvent',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        calendarEventParticipantRecordPageFieldsDisplayName: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'calendarEventParticipantRecordPageFields',
                viewFieldName: 'displayName',
                fieldName: 'displayName',
                position: 2,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        calendarEventParticipantRecordPageFieldsIsOrganizer: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'calendarEventParticipantRecordPageFields',
                viewFieldName: 'isOrganizer',
                fieldName: 'isOrganizer',
                position: 3,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        calendarEventParticipantRecordPageFieldsResponseStatus: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'calendarEventParticipantRecordPageFields',
                viewFieldName: 'responseStatus',
                fieldName: 'responseStatus',
                position: 4,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        calendarEventParticipantRecordPageFieldsPerson: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'calendarEventParticipantRecordPageFields',
                viewFieldName: 'person',
                fieldName: 'person',
                position: 5,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        calendarEventParticipantRecordPageFieldsWorkspaceMember: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'calendarEventParticipantRecordPageFields',
                viewFieldName: 'workspaceMember',
                fieldName: 'workspaceMember',
                position: 6,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        calendarEventParticipantRecordPageFieldsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'calendarEventParticipantRecordPageFields',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        calendarEventParticipantRecordPageFieldsCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'calendarEventParticipantRecordPageFields',
                viewFieldName: 'createdBy',
                fieldName: 'createdBy',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-calendar-event-participant-view-fields.util.js.map