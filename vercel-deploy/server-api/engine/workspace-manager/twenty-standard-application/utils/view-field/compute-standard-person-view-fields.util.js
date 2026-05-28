"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardPersonViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardPersonViewFields;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardPersonViewFields = (args)=>{
    return {
        // allPeople view fields
        allPeopleName: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'allPeople',
                viewFieldName: 'name',
                fieldName: 'name',
                position: 0,
                isVisible: true,
                size: 210
            }
        }),
        allPeopleEmails: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'allPeople',
                viewFieldName: 'emails',
                fieldName: 'emails',
                position: 1,
                isVisible: true,
                size: 150,
                aggregateOperation: _types.AggregateOperations.COUNT_UNIQUE_VALUES
            }
        }),
        allPeopleCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'allPeople',
                viewFieldName: 'createdBy',
                fieldName: 'createdBy',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        allPeopleCompany: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'allPeople',
                viewFieldName: 'company',
                fieldName: 'company',
                position: 3,
                isVisible: true,
                size: 150
            }
        }),
        allPeoplePhones: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'allPeople',
                viewFieldName: 'phones',
                fieldName: 'phones',
                position: 4,
                isVisible: true,
                size: 150,
                aggregateOperation: _types.AggregateOperations.PERCENTAGE_EMPTY
            }
        }),
        allPeopleCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'allPeople',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 5,
                isVisible: true,
                size: 150,
                aggregateOperation: _types.AggregateOperations.MIN
            }
        }),
        allPeopleCity: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'allPeople',
                viewFieldName: 'city',
                fieldName: 'city',
                position: 6,
                isVisible: true,
                size: 150
            }
        }),
        allPeopleJobTitle: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'allPeople',
                viewFieldName: 'jobTitle',
                fieldName: 'jobTitle',
                position: 7,
                isVisible: true,
                size: 150
            }
        }),
        allPeopleLinkedinLink: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'allPeople',
                viewFieldName: 'linkedinLink',
                fieldName: 'linkedinLink',
                position: 8,
                isVisible: true,
                size: 150
            }
        }),
        allPeopleXLink: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'allPeople',
                viewFieldName: 'xLink',
                fieldName: 'xLink',
                position: 9,
                isVisible: true,
                size: 150
            }
        }),
        // personRecordPageFields view fields
        // General group
        personRecordPageFieldsEmails: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'emails',
                fieldName: 'emails',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        personRecordPageFieldsPhones: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'phones',
                fieldName: 'phones',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        personRecordPageFieldsCity: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'city',
                fieldName: 'city',
                position: 2,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        personRecordPageFieldsPointOfContactForOpportunities: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'pointOfContactForOpportunities',
                fieldName: 'pointOfContactForOpportunities',
                position: 3,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        personRecordPageFieldsTaskTargets: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'taskTargets',
                fieldName: 'taskTargets',
                position: 4,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        personRecordPageFieldsNoteTargets: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'noteTargets',
                fieldName: 'noteTargets',
                position: 5,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        personRecordPageFieldsAttachments: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'attachments',
                fieldName: 'attachments',
                position: 7,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        personRecordPageFieldsMessageParticipants: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'messageParticipants',
                fieldName: 'messageParticipants',
                position: 8,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        personRecordPageFieldsCalendarEventParticipants: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'calendarEventParticipants',
                fieldName: 'calendarEventParticipants',
                position: 9,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        personRecordPageFieldsTimelineActivities: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'timelineActivities',
                fieldName: 'timelineActivities',
                position: 10,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        personRecordPageFieldsAvatarFile: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'avatarFile',
                fieldName: 'avatarFile',
                position: 11,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        personRecordPageFieldsAvatarUrl: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'avatarUrl',
                fieldName: 'avatarUrl',
                position: 12,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        // Work group
        personRecordPageFieldsCompany: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'company',
                fieldName: 'company',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'work'
            }
        }),
        personRecordPageFieldsJobTitle: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'jobTitle',
                fieldName: 'jobTitle',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'work'
            }
        }),
        // Social group
        personRecordPageFieldsLinkedinLink: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'linkedinLink',
                fieldName: 'linkedinLink',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'social'
            }
        }),
        personRecordPageFieldsXLink: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'xLink',
                fieldName: 'xLink',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'social'
            }
        }),
        // System group
        personRecordPageFieldsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        personRecordPageFieldsCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'createdBy',
                fieldName: 'createdBy',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        personRecordPageFieldsUpdatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'updatedAt',
                fieldName: 'updatedAt',
                position: 2,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        personRecordPageFieldsUpdatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldName: 'updatedBy',
                fieldName: 'updatedBy',
                position: 3,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'system'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-person-view-fields.util.js.map