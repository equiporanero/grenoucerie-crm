"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardTimelineActivityViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardTimelineActivityViewFields;
    }
});
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardTimelineActivityViewFields = (args)=>{
    return {
        allTimelineActivitiesName: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'timelineActivity',
            context: {
                viewName: 'allTimelineActivities',
                viewFieldName: 'name',
                fieldName: 'name',
                position: 0,
                isVisible: true,
                size: 210
            }
        }),
        allTimelineActivitiesHappensAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'timelineActivity',
            context: {
                viewName: 'allTimelineActivities',
                viewFieldName: 'happensAt',
                fieldName: 'happensAt',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        // All morph targets are included so the surviving field after dedup always has a viewField
        allTimelineActivitiesTargetPerson: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'timelineActivity',
            context: {
                viewName: 'allTimelineActivities',
                viewFieldName: 'targetPerson',
                fieldName: 'targetPerson',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        allTimelineActivitiesTargetCompany: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'timelineActivity',
            context: {
                viewName: 'allTimelineActivities',
                viewFieldName: 'targetCompany',
                fieldName: 'targetCompany',
                position: 3,
                isVisible: true,
                size: 150
            }
        }),
        allTimelineActivitiesTargetOpportunity: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'timelineActivity',
            context: {
                viewName: 'allTimelineActivities',
                viewFieldName: 'targetOpportunity',
                fieldName: 'targetOpportunity',
                position: 4,
                isVisible: true,
                size: 150
            }
        }),
        allTimelineActivitiesTargetTask: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'timelineActivity',
            context: {
                viewName: 'allTimelineActivities',
                viewFieldName: 'targetTask',
                fieldName: 'targetTask',
                position: 5,
                isVisible: true,
                size: 150
            }
        }),
        allTimelineActivitiesTargetNote: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'timelineActivity',
            context: {
                viewName: 'allTimelineActivities',
                viewFieldName: 'targetNote',
                fieldName: 'targetNote',
                position: 6,
                isVisible: true,
                size: 150
            }
        }),
        allTimelineActivitiesTargetWorkflow: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'timelineActivity',
            context: {
                viewName: 'allTimelineActivities',
                viewFieldName: 'targetWorkflow',
                fieldName: 'targetWorkflow',
                position: 7,
                isVisible: true,
                size: 150
            }
        }),
        allTimelineActivitiesTargetWorkflowVersion: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'timelineActivity',
            context: {
                viewName: 'allTimelineActivities',
                viewFieldName: 'targetWorkflowVersion',
                fieldName: 'targetWorkflowVersion',
                position: 8,
                isVisible: true,
                size: 150
            }
        }),
        allTimelineActivitiesTargetWorkflowRun: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'timelineActivity',
            context: {
                viewName: 'allTimelineActivities',
                viewFieldName: 'targetWorkflowRun',
                fieldName: 'targetWorkflowRun',
                position: 9,
                isVisible: true,
                size: 150
            }
        }),
        allTimelineActivitiesTargetDashboard: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'timelineActivity',
            context: {
                viewName: 'allTimelineActivities',
                viewFieldName: 'targetDashboard',
                fieldName: 'targetDashboard',
                position: 10,
                isVisible: true,
                size: 150
            }
        }),
        allTimelineActivitiesWorkspaceMember: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'timelineActivity',
            context: {
                viewName: 'allTimelineActivities',
                viewFieldName: 'workspaceMember',
                fieldName: 'workspaceMember',
                position: 11,
                isVisible: true,
                size: 150
            }
        })
    };
};

//# sourceMappingURL=compute-standard-timeline-activity-view-fields.util.js.map