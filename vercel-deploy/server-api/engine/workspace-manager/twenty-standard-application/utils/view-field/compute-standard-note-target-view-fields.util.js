"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardNoteTargetViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardNoteTargetViewFields;
    }
});
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardNoteTargetViewFields = (args)=>{
    return {
        // Label identifier for junction tables
        allNoteTargetsId: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'noteTarget',
            context: {
                viewName: 'allNoteTargets',
                viewFieldName: 'id',
                fieldName: 'id',
                position: 0,
                isVisible: true,
                size: 210
            }
        }),
        allNoteTargetsNote: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'noteTarget',
            context: {
                viewName: 'allNoteTargets',
                viewFieldName: 'note',
                fieldName: 'note',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        // All morph targets are included so the surviving field after dedup always has a viewField
        allNoteTargetsTargetPerson: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'noteTarget',
            context: {
                viewName: 'allNoteTargets',
                viewFieldName: 'targetPerson',
                fieldName: 'targetPerson',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        allNoteTargetsTargetCompany: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'noteTarget',
            context: {
                viewName: 'allNoteTargets',
                viewFieldName: 'targetCompany',
                fieldName: 'targetCompany',
                position: 3,
                isVisible: true,
                size: 150
            }
        }),
        allNoteTargetsTargetOpportunity: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'noteTarget',
            context: {
                viewName: 'allNoteTargets',
                viewFieldName: 'targetOpportunity',
                fieldName: 'targetOpportunity',
                position: 4,
                isVisible: true,
                size: 150
            }
        })
    };
};

//# sourceMappingURL=compute-standard-note-target-view-fields.util.js.map