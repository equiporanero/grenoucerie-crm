"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardWorkflowVersionViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardWorkflowVersionViewFields;
    }
});
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardWorkflowVersionViewFields = (args)=>{
    return {
        allWorkflowVersionsName: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowVersion',
            context: {
                viewName: 'allWorkflowVersions',
                viewFieldName: 'name',
                fieldName: 'name',
                position: 0,
                isVisible: true,
                size: 150
            }
        }),
        allWorkflowVersionsWorkflow: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowVersion',
            context: {
                viewName: 'allWorkflowVersions',
                viewFieldName: 'workflow',
                fieldName: 'workflow',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        allWorkflowVersionsStatus: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowVersion',
            context: {
                viewName: 'allWorkflowVersions',
                viewFieldName: 'status',
                fieldName: 'status',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        allWorkflowVersionsUpdatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowVersion',
            context: {
                viewName: 'allWorkflowVersions',
                viewFieldName: 'updatedAt',
                fieldName: 'updatedAt',
                position: 3,
                isVisible: true,
                size: 150
            }
        }),
        allWorkflowVersionsRuns: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowVersion',
            context: {
                viewName: 'allWorkflowVersions',
                viewFieldName: 'runs',
                fieldName: 'runs',
                position: 4,
                isVisible: true,
                size: 150
            }
        }),
        // workflowVersionRecordPageFields view fields
        workflowVersionRecordPageFieldsStatus: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowVersion',
            context: {
                viewName: 'workflowVersionRecordPageFields',
                viewFieldName: 'status',
                fieldName: 'status',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        workflowVersionRecordPageFieldsWorkflow: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowVersion',
            context: {
                viewName: 'workflowVersionRecordPageFields',
                viewFieldName: 'workflow',
                fieldName: 'workflow',
                position: 2,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        workflowVersionRecordPageFieldsTrigger: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowVersion',
            context: {
                viewName: 'workflowVersionRecordPageFields',
                viewFieldName: 'trigger',
                fieldName: 'trigger',
                position: 3,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        workflowVersionRecordPageFieldsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowVersion',
            context: {
                viewName: 'workflowVersionRecordPageFields',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        workflowVersionRecordPageFieldsSteps: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowVersion',
            context: {
                viewName: 'workflowVersionRecordPageFields',
                viewFieldName: 'steps',
                fieldName: 'steps',
                position: 7,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        workflowVersionRecordPageFieldsCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowVersion',
            context: {
                viewName: 'workflowVersionRecordPageFields',
                viewFieldName: 'createdBy',
                fieldName: 'createdBy',
                position: 1,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        workflowVersionRecordPageFieldsUpdatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowVersion',
            context: {
                viewName: 'workflowVersionRecordPageFields',
                viewFieldName: 'updatedAt',
                fieldName: 'updatedAt',
                position: 2,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        workflowVersionRecordPageFieldsUpdatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowVersion',
            context: {
                viewName: 'workflowVersionRecordPageFields',
                viewFieldName: 'updatedBy',
                fieldName: 'updatedBy',
                position: 3,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        workflowVersionRecordPageFieldsRuns: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowVersion',
            context: {
                viewName: 'workflowVersionRecordPageFields',
                viewFieldName: 'runs',
                fieldName: 'runs',
                position: 4,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        workflowVersionRecordPageFieldsTimelineActivities: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowVersion',
            context: {
                viewName: 'workflowVersionRecordPageFields',
                viewFieldName: 'timelineActivities',
                fieldName: 'timelineActivities',
                position: 6,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-workflow-version-view-fields.util.js.map