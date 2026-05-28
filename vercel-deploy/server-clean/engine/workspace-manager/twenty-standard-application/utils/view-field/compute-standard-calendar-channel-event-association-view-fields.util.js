"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardCalendarChannelEventAssociationViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardCalendarChannelEventAssociationViewFields;
    }
});
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardCalendarChannelEventAssociationViewFields = (args)=>{
    return {
        allCalendarChannelEventAssociationsCalendarChannel: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarChannelEventAssociation',
            context: {
                viewName: 'allCalendarChannelEventAssociations',
                viewFieldName: 'calendarChannelId',
                fieldName: 'calendarChannelId',
                position: 0,
                isVisible: true,
                size: 150
            }
        }),
        allCalendarChannelEventAssociationsCalendarEvent: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarChannelEventAssociation',
            context: {
                viewName: 'allCalendarChannelEventAssociations',
                viewFieldName: 'calendarEvent',
                fieldName: 'calendarEvent',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        allCalendarChannelEventAssociationsEventExternalId: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarChannelEventAssociation',
            context: {
                viewName: 'allCalendarChannelEventAssociations',
                viewFieldName: 'eventExternalId',
                fieldName: 'eventExternalId',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        allCalendarChannelEventAssociationsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarChannelEventAssociation',
            context: {
                viewName: 'allCalendarChannelEventAssociations',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 3,
                isVisible: true,
                size: 150
            }
        }),
        calendarChannelEventAssociationRecordPageFieldsCalendarChannel: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarChannelEventAssociation',
            context: {
                viewName: 'calendarChannelEventAssociationRecordPageFields',
                viewFieldName: 'calendarChannelId',
                fieldName: 'calendarChannelId',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        calendarChannelEventAssociationRecordPageFieldsCalendarEvent: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarChannelEventAssociation',
            context: {
                viewName: 'calendarChannelEventAssociationRecordPageFields',
                viewFieldName: 'calendarEvent',
                fieldName: 'calendarEvent',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        calendarChannelEventAssociationRecordPageFieldsEventExternalId: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarChannelEventAssociation',
            context: {
                viewName: 'calendarChannelEventAssociationRecordPageFields',
                viewFieldName: 'eventExternalId',
                fieldName: 'eventExternalId',
                position: 2,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        calendarChannelEventAssociationRecordPageFieldsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarChannelEventAssociation',
            context: {
                viewName: 'calendarChannelEventAssociationRecordPageFields',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        calendarChannelEventAssociationRecordPageFieldsCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'calendarChannelEventAssociation',
            context: {
                viewName: 'calendarChannelEventAssociationRecordPageFields',
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

//# sourceMappingURL=compute-standard-calendar-channel-event-association-view-fields.util.js.map