"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardTaskTargetViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardTaskTargetViewFields;
    }
});
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardTaskTargetViewFields = (args)=>{
    return {
        // Label identifier for junction tables
        allTaskTargetsId: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'taskTarget',
            context: {
                viewName: 'allTaskTargets',
                viewFieldName: 'id',
                fieldName: 'id',
                position: 0,
                isVisible: true,
                size: 210
            }
        }),
        allTaskTargetsTask: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'taskTarget',
            context: {
                viewName: 'allTaskTargets',
                viewFieldName: 'task',
                fieldName: 'task',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        // All morph targets are included so the surviving field after dedup always has a viewField
        allTaskTargetsTargetPerson: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'taskTarget',
            context: {
                viewName: 'allTaskTargets',
                viewFieldName: 'targetPerson',
                fieldName: 'targetPerson',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        allTaskTargetsTargetCompany: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'taskTarget',
            context: {
                viewName: 'allTaskTargets',
                viewFieldName: 'targetCompany',
                fieldName: 'targetCompany',
                position: 3,
                isVisible: true,
                size: 150
            }
        }),
        allTaskTargetsTargetOpportunity: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'taskTarget',
            context: {
                viewName: 'allTaskTargets',
                viewFieldName: 'targetOpportunity',
                fieldName: 'targetOpportunity',
                position: 4,
                isVisible: true,
                size: 150
            }
        })
    };
};

//# sourceMappingURL=compute-standard-task-target-view-fields.util.js.map