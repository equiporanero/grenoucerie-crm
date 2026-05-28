"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardWorkflowAutomatedTriggerViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardWorkflowAutomatedTriggerViewFields;
    }
});
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardWorkflowAutomatedTriggerViewFields = (args)=>{
    return {
        allWorkflowAutomatedTriggersType: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowAutomatedTrigger',
            context: {
                viewName: 'allWorkflowAutomatedTriggers',
                viewFieldName: 'type',
                fieldName: 'type',
                position: 0,
                isVisible: true,
                size: 150
            }
        }),
        allWorkflowAutomatedTriggersWorkflow: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowAutomatedTrigger',
            context: {
                viewName: 'allWorkflowAutomatedTriggers',
                viewFieldName: 'workflow',
                fieldName: 'workflow',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        allWorkflowAutomatedTriggersCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowAutomatedTrigger',
            context: {
                viewName: 'allWorkflowAutomatedTriggers',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        workflowAutomatedTriggerRecordPageFieldsType: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowAutomatedTrigger',
            context: {
                viewName: 'workflowAutomatedTriggerRecordPageFields',
                viewFieldName: 'type',
                fieldName: 'type',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        workflowAutomatedTriggerRecordPageFieldsWorkflow: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowAutomatedTrigger',
            context: {
                viewName: 'workflowAutomatedTriggerRecordPageFields',
                viewFieldName: 'workflow',
                fieldName: 'workflow',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        workflowAutomatedTriggerRecordPageFieldsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowAutomatedTrigger',
            context: {
                viewName: 'workflowAutomatedTriggerRecordPageFields',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        workflowAutomatedTriggerRecordPageFieldsCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowAutomatedTrigger',
            context: {
                viewName: 'workflowAutomatedTriggerRecordPageFields',
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

//# sourceMappingURL=compute-standard-workflow-automated-trigger-view-fields.util.js.map