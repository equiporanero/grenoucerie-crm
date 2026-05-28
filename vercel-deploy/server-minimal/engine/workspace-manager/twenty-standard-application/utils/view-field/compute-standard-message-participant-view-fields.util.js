"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardMessageParticipantViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardMessageParticipantViewFields;
    }
});
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardMessageParticipantViewFields = (args)=>{
    return {
        allMessageParticipantsHandle: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageParticipant',
            context: {
                viewName: 'allMessageParticipants',
                viewFieldName: 'handle',
                fieldName: 'handle',
                position: 0,
                isVisible: true,
                size: 150
            }
        }),
        allMessageParticipantsMessage: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageParticipant',
            context: {
                viewName: 'allMessageParticipants',
                viewFieldName: 'message',
                fieldName: 'message',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        allMessageParticipantsRole: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageParticipant',
            context: {
                viewName: 'allMessageParticipants',
                viewFieldName: 'role',
                fieldName: 'role',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        allMessageParticipantsDisplayName: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageParticipant',
            context: {
                viewName: 'allMessageParticipants',
                viewFieldName: 'displayName',
                fieldName: 'displayName',
                position: 3,
                isVisible: true,
                size: 150
            }
        }),
        allMessageParticipantsPerson: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageParticipant',
            context: {
                viewName: 'allMessageParticipants',
                viewFieldName: 'person',
                fieldName: 'person',
                position: 4,
                isVisible: true,
                size: 150
            }
        }),
        allMessageParticipantsWorkspaceMember: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageParticipant',
            context: {
                viewName: 'allMessageParticipants',
                viewFieldName: 'workspaceMember',
                fieldName: 'workspaceMember',
                position: 5,
                isVisible: true,
                size: 150
            }
        }),
        allMessageParticipantsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageParticipant',
            context: {
                viewName: 'allMessageParticipants',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 6,
                isVisible: true,
                size: 150
            }
        }),
        messageParticipantRecordPageFieldsMessage: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageParticipant',
            context: {
                viewName: 'messageParticipantRecordPageFields',
                viewFieldName: 'message',
                fieldName: 'message',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        messageParticipantRecordPageFieldsRole: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageParticipant',
            context: {
                viewName: 'messageParticipantRecordPageFields',
                viewFieldName: 'role',
                fieldName: 'role',
                position: 2,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        messageParticipantRecordPageFieldsDisplayName: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageParticipant',
            context: {
                viewName: 'messageParticipantRecordPageFields',
                viewFieldName: 'displayName',
                fieldName: 'displayName',
                position: 3,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        messageParticipantRecordPageFieldsPerson: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageParticipant',
            context: {
                viewName: 'messageParticipantRecordPageFields',
                viewFieldName: 'person',
                fieldName: 'person',
                position: 4,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        messageParticipantRecordPageFieldsWorkspaceMember: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageParticipant',
            context: {
                viewName: 'messageParticipantRecordPageFields',
                viewFieldName: 'workspaceMember',
                fieldName: 'workspaceMember',
                position: 5,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        messageParticipantRecordPageFieldsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageParticipant',
            context: {
                viewName: 'messageParticipantRecordPageFields',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        messageParticipantRecordPageFieldsCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageParticipant',
            context: {
                viewName: 'messageParticipantRecordPageFields',
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

//# sourceMappingURL=compute-standard-message-participant-view-fields.util.js.map