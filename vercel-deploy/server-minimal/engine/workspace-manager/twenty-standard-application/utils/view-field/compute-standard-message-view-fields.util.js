"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardMessageViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardMessageViewFields;
    }
});
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardMessageViewFields = (args)=>{
    return {
        allMessagesSubject: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'message',
            context: {
                viewName: 'allMessages',
                viewFieldName: 'subject',
                fieldName: 'subject',
                position: 0,
                isVisible: true,
                size: 180
            }
        }),
        allMessagesMessageThread: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'message',
            context: {
                viewName: 'allMessages',
                viewFieldName: 'messageThread',
                fieldName: 'messageThread',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        allMessagesMessageParticipants: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'message',
            context: {
                viewName: 'allMessages',
                viewFieldName: 'messageParticipants',
                fieldName: 'messageParticipants',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        allMessagesReceivedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'message',
            context: {
                viewName: 'allMessages',
                viewFieldName: 'receivedAt',
                fieldName: 'receivedAt',
                position: 3,
                isVisible: true,
                size: 150
            }
        }),
        allMessagesHeaderMessageId: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'message',
            context: {
                viewName: 'allMessages',
                viewFieldName: 'headerMessageId',
                fieldName: 'headerMessageId',
                position: 4,
                isVisible: true,
                size: 180
            }
        }),
        allMessagesText: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'message',
            context: {
                viewName: 'allMessages',
                viewFieldName: 'text',
                fieldName: 'text',
                position: 5,
                isVisible: true,
                size: 200
            }
        }),
        allMessagesCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'message',
            context: {
                viewName: 'allMessages',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 6,
                isVisible: true,
                size: 150
            }
        })
    };
};

//# sourceMappingURL=compute-standard-message-view-fields.util.js.map