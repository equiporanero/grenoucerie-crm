"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardWorkflowRunViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardWorkflowRunViewFields;
    }
});
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardWorkflowRunViewFields = (args)=>{
    return {
        allWorkflowRunsName: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowRun',
            context: {
                viewName: 'allWorkflowRuns',
                viewFieldName: 'name',
                fieldName: 'name',
                position: 0,
                isVisible: true,
                size: 150
            }
        }),
        allWorkflowRunsWorkflow: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowRun',
            context: {
                viewName: 'allWorkflowRuns',
                viewFieldName: 'workflow',
                fieldName: 'workflow',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        allWorkflowRunsStatus: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowRun',
            context: {
                viewName: 'allWorkflowRuns',
                viewFieldName: 'status',
                fieldName: 'status',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        // workflowRunRecordPageFields view fields
        workflowRunRecordPageFieldsStatus: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowRun',
            context: {
                viewName: 'workflowRunRecordPageFields',
                viewFieldName: 'status',
                fieldName: 'status',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        workflowRunRecordPageFieldsWorkflow: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowRun',
            context: {
                viewName: 'workflowRunRecordPageFields',
                viewFieldName: 'workflow',
                fieldName: 'workflow',
                position: 2,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        workflowRunRecordPageFieldsWorkflowVersion: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowRun',
            context: {
                viewName: 'workflowRunRecordPageFields',
                viewFieldName: 'workflowVersion',
                fieldName: 'workflowVersion',
                position: 3,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        workflowRunRecordPageFieldsStartedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowRun',
            context: {
                viewName: 'workflowRunRecordPageFields',
                viewFieldName: 'startedAt',
                fieldName: 'startedAt',
                position: 4,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        workflowRunRecordPageFieldsEndedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowRun',
            context: {
                viewName: 'workflowRunRecordPageFields',
                viewFieldName: 'endedAt',
                fieldName: 'endedAt',
                position: 5,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        workflowRunRecordPageFieldsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowRun',
            context: {
                viewName: 'workflowRunRecordPageFields',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        workflowRunRecordPageFieldsCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowRun',
            context: {
                viewName: 'workflowRunRecordPageFields',
                viewFieldName: 'createdBy',
                fieldName: 'createdBy',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        workflowRunRecordPageFieldsEnqueuedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowRun',
            context: {
                viewName: 'workflowRunRecordPageFields',
                viewFieldName: 'enqueuedAt',
                fieldName: 'enqueuedAt',
                position: 9,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        workflowRunRecordPageFieldsState: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowRun',
            context: {
                viewName: 'workflowRunRecordPageFields',
                viewFieldName: 'state',
                fieldName: 'state',
                position: 6,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'general'
            }
        }),
        workflowRunRecordPageFieldsUpdatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowRun',
            context: {
                viewName: 'workflowRunRecordPageFields',
                viewFieldName: 'updatedAt',
                fieldName: 'updatedAt',
                position: 2,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        workflowRunRecordPageFieldsUpdatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowRun',
            context: {
                viewName: 'workflowRunRecordPageFields',
                viewFieldName: 'updatedBy',
                fieldName: 'updatedBy',
                position: 3,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        workflowRunRecordPageFieldsTimelineActivities: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workflowRun',
            context: {
                viewName: 'workflowRunRecordPageFields',
                viewFieldName: 'timelineActivities',
                fieldName: 'timelineActivities',
                position: 8,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'general'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-workflow-run-view-fields.util.js.map