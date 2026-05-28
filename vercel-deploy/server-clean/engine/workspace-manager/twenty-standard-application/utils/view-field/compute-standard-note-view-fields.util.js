"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardNoteViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardNoteViewFields;
    }
});
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardNoteViewFields = (args)=>{
    return {
        allNotesTitle: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'note',
            context: {
                viewName: 'allNotes',
                viewFieldName: 'title',
                fieldName: 'title',
                position: 0,
                isVisible: true,
                size: 210
            }
        }),
        allNotesNoteTargets: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'note',
            context: {
                viewName: 'allNotes',
                viewFieldName: 'noteTargets',
                fieldName: 'noteTargets',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        allNotesBodyV2: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'note',
            context: {
                viewName: 'allNotes',
                viewFieldName: 'bodyV2',
                fieldName: 'bodyV2',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        allNotesCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'note',
            context: {
                viewName: 'allNotes',
                viewFieldName: 'createdBy',
                fieldName: 'createdBy',
                position: 3,
                isVisible: true,
                size: 150
            }
        }),
        allNotesCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'note',
            context: {
                viewName: 'allNotes',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 4,
                isVisible: true,
                size: 150
            }
        }),
        // noteRecordPageFields view fields
        // General group
        noteRecordPageFieldsBodyV2: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'note',
            context: {
                viewName: 'noteRecordPageFields',
                viewFieldName: 'bodyV2',
                fieldName: 'bodyV2',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        noteRecordPageFieldsNoteTargets: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'note',
            context: {
                viewName: 'noteRecordPageFields',
                viewFieldName: 'noteTargets',
                fieldName: 'noteTargets',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        noteRecordPageFieldsAttachments: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'note',
            context: {
                viewName: 'noteRecordPageFields',
                viewFieldName: 'attachments',
                fieldName: 'attachments',
                position: 2,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        noteRecordPageFieldsTimelineActivities: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'note',
            context: {
                viewName: 'noteRecordPageFields',
                viewFieldName: 'timelineActivities',
                fieldName: 'timelineActivities',
                position: 3,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        // System group
        noteRecordPageFieldsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'note',
            context: {
                viewName: 'noteRecordPageFields',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        noteRecordPageFieldsCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'note',
            context: {
                viewName: 'noteRecordPageFields',
                viewFieldName: 'createdBy',
                fieldName: 'createdBy',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        noteRecordPageFieldsUpdatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'note',
            context: {
                viewName: 'noteRecordPageFields',
                viewFieldName: 'updatedAt',
                fieldName: 'updatedAt',
                position: 2,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        noteRecordPageFieldsUpdatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'note',
            context: {
                viewName: 'noteRecordPageFields',
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

//# sourceMappingURL=compute-standard-note-view-fields.util.js.map