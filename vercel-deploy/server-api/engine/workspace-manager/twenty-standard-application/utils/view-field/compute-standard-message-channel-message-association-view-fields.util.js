"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardMessageChannelMessageAssociationViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardMessageChannelMessageAssociationViewFields;
    }
});
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardMessageChannelMessageAssociationViewFields = (args)=>{
    return {
        allMessageChannelMessageAssociationsMessageChannel: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageChannelMessageAssociation',
            context: {
                viewName: 'allMessageChannelMessageAssociations',
                viewFieldName: 'messageChannelId',
                fieldName: 'messageChannelId',
                position: 0,
                isVisible: true,
                size: 150
            }
        }),
        allMessageChannelMessageAssociationsMessage: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageChannelMessageAssociation',
            context: {
                viewName: 'allMessageChannelMessageAssociations',
                viewFieldName: 'message',
                fieldName: 'message',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        allMessageChannelMessageAssociationsMessageExternalId: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageChannelMessageAssociation',
            context: {
                viewName: 'allMessageChannelMessageAssociations',
                viewFieldName: 'messageExternalId',
                fieldName: 'messageExternalId',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        allMessageChannelMessageAssociationsDirection: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageChannelMessageAssociation',
            context: {
                viewName: 'allMessageChannelMessageAssociations',
                viewFieldName: 'direction',
                fieldName: 'direction',
                position: 3,
                isVisible: true,
                size: 150
            }
        }),
        allMessageChannelMessageAssociationsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageChannelMessageAssociation',
            context: {
                viewName: 'allMessageChannelMessageAssociations',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 4,
                isVisible: true,
                size: 150
            }
        }),
        messageChannelMessageAssociationRecordPageFieldsMessageChannel: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageChannelMessageAssociation',
            context: {
                viewName: 'messageChannelMessageAssociationRecordPageFields',
                viewFieldName: 'messageChannelId',
                fieldName: 'messageChannelId',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        messageChannelMessageAssociationRecordPageFieldsMessage: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageChannelMessageAssociation',
            context: {
                viewName: 'messageChannelMessageAssociationRecordPageFields',
                viewFieldName: 'message',
                fieldName: 'message',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        messageChannelMessageAssociationRecordPageFieldsMessageExternalId: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageChannelMessageAssociation',
            context: {
                viewName: 'messageChannelMessageAssociationRecordPageFields',
                viewFieldName: 'messageExternalId',
                fieldName: 'messageExternalId',
                position: 2,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        messageChannelMessageAssociationRecordPageFieldsDirection: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageChannelMessageAssociation',
            context: {
                viewName: 'messageChannelMessageAssociationRecordPageFields',
                viewFieldName: 'direction',
                fieldName: 'direction',
                position: 3,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        messageChannelMessageAssociationRecordPageFieldsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageChannelMessageAssociation',
            context: {
                viewName: 'messageChannelMessageAssociationRecordPageFields',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        messageChannelMessageAssociationRecordPageFieldsCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'messageChannelMessageAssociation',
            context: {
                viewName: 'messageChannelMessageAssociationRecordPageFields',
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

//# sourceMappingURL=compute-standard-message-channel-message-association-view-fields.util.js.map