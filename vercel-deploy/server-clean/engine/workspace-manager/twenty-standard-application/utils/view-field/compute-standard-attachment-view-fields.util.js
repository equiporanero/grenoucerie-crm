"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardAttachmentViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardAttachmentViewFields;
    }
});
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardAttachmentViewFields = (args)=>{
    return {
        allAttachmentsName: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'attachment',
            context: {
                viewName: 'allAttachments',
                viewFieldName: 'name',
                fieldName: 'name',
                position: 0,
                isVisible: true,
                size: 210
            }
        }),
        allAttachmentsFile: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'attachment',
            context: {
                viewName: 'allAttachments',
                viewFieldName: 'file',
                fieldName: 'file',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        // All morph targets are included so the surviving field after dedup always has a viewField
        allAttachmentsTargetPerson: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'attachment',
            context: {
                viewName: 'allAttachments',
                viewFieldName: 'targetPerson',
                fieldName: 'targetPerson',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        allAttachmentsTargetCompany: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'attachment',
            context: {
                viewName: 'allAttachments',
                viewFieldName: 'targetCompany',
                fieldName: 'targetCompany',
                position: 3,
                isVisible: true,
                size: 150
            }
        }),
        allAttachmentsTargetOpportunity: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'attachment',
            context: {
                viewName: 'allAttachments',
                viewFieldName: 'targetOpportunity',
                fieldName: 'targetOpportunity',
                position: 4,
                isVisible: true,
                size: 150
            }
        }),
        allAttachmentsTargetTask: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'attachment',
            context: {
                viewName: 'allAttachments',
                viewFieldName: 'targetTask',
                fieldName: 'targetTask',
                position: 5,
                isVisible: true,
                size: 150
            }
        }),
        allAttachmentsTargetNote: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'attachment',
            context: {
                viewName: 'allAttachments',
                viewFieldName: 'targetNote',
                fieldName: 'targetNote',
                position: 6,
                isVisible: true,
                size: 150
            }
        }),
        allAttachmentsTargetDashboard: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'attachment',
            context: {
                viewName: 'allAttachments',
                viewFieldName: 'targetDashboard',
                fieldName: 'targetDashboard',
                position: 7,
                isVisible: true,
                size: 150
            }
        }),
        allAttachmentsTargetWorkflow: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'attachment',
            context: {
                viewName: 'allAttachments',
                viewFieldName: 'targetWorkflow',
                fieldName: 'targetWorkflow',
                position: 8,
                isVisible: true,
                size: 150
            }
        }),
        allAttachmentsCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'attachment',
            context: {
                viewName: 'allAttachments',
                viewFieldName: 'createdBy',
                fieldName: 'createdBy',
                position: 9,
                isVisible: true,
                size: 150
            }
        }),
        allAttachmentsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'attachment',
            context: {
                viewName: 'allAttachments',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 10,
                isVisible: true,
                size: 150
            }
        })
    };
};

//# sourceMappingURL=compute-standard-attachment-view-fields.util.js.map