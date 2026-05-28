"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardWorkflowViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardWorkflowViewFields;
    }
});
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardWorkflowViewFields = (args)=>{
    return {
        allWorkflowsName: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflow',
            context: {
                viewName: 'allWorkflows',
                viewFieldName: 'name',
                fieldName: 'name',
                position: 0,
                isVisible: true,
                size: 150
            }
        }),
        allWorkflowsStatuses: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflow',
            context: {
                viewName: 'allWorkflows',
                viewFieldName: 'statuses',
                fieldName: 'statuses',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        allWorkflowsUpdatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflow',
            context: {
                viewName: 'allWorkflows',
                viewFieldName: 'updatedAt',
                fieldName: 'updatedAt',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        allWorkflowsCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflow',
            context: {
                viewName: 'allWorkflows',
                viewFieldName: 'createdBy',
                fieldName: 'createdBy',
                position: 3,
                isVisible: true,
                size: 150
            }
        }),
        allWorkflowsVersions: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflow',
            context: {
                viewName: 'allWorkflows',
                viewFieldName: 'versions',
                fieldName: 'versions',
                position: 4,
                isVisible: true,
                size: 150
            }
        }),
        allWorkflowsRuns: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflow',
            context: {
                viewName: 'allWorkflows',
                viewFieldName: 'runs',
                fieldName: 'runs',
                position: 5,
                isVisible: true,
                size: 150
            }
        })
    };
};

//# sourceMappingURL=compute-standard-workflow-view-fields.util.js.map