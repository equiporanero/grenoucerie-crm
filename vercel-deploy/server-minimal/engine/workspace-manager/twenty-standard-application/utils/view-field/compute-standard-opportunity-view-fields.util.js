"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardOpportunityViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardOpportunityViewFields;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardOpportunityViewFields = (args)=>{
    return {
        // allOpportunities view fields
        allOpportunitiesName: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'allOpportunities',
                viewFieldName: 'name',
                fieldName: 'name',
                position: 0,
                isVisible: true,
                size: 150
            }
        }),
        allOpportunitiesAmount: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'allOpportunities',
                viewFieldName: 'amount',
                fieldName: 'amount',
                position: 1,
                isVisible: true,
                size: 150,
                aggregateOperation: _types.AggregateOperations.AVG
            }
        }),
        allOpportunitiesCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'allOpportunities',
                viewFieldName: 'createdBy',
                fieldName: 'createdBy',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        allOpportunitiesCloseDate: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'allOpportunities',
                viewFieldName: 'closeDate',
                fieldName: 'closeDate',
                position: 3,
                isVisible: true,
                size: 150,
                aggregateOperation: _types.AggregateOperations.MIN
            }
        }),
        allOpportunitiesCompany: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'allOpportunities',
                viewFieldName: 'company',
                fieldName: 'company',
                position: 4,
                isVisible: true,
                size: 150
            }
        }),
        allOpportunitiesPointOfContact: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'allOpportunities',
                viewFieldName: 'pointOfContact',
                fieldName: 'pointOfContact',
                position: 5,
                isVisible: true,
                size: 150
            }
        }),
        // byStage view fields
        byStageName: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'byStage',
                viewFieldName: 'name',
                fieldName: 'name',
                position: 0,
                isVisible: true,
                size: 150
            }
        }),
        byStageAmount: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'byStage',
                viewFieldName: 'amount',
                fieldName: 'amount',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        byStageCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'byStage',
                viewFieldName: 'createdBy',
                fieldName: 'createdBy',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        byStageCloseDate: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'byStage',
                viewFieldName: 'closeDate',
                fieldName: 'closeDate',
                position: 3,
                isVisible: true,
                size: 150
            }
        }),
        byStageCompany: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'byStage',
                viewFieldName: 'company',
                fieldName: 'company',
                position: 4,
                isVisible: true,
                size: 150
            }
        }),
        byStagePointOfContact: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'byStage',
                viewFieldName: 'pointOfContact',
                fieldName: 'pointOfContact',
                position: 5,
                isVisible: true,
                size: 150
            }
        }),
        // opportunityRecordPageFields view fields
        // Deal group
        opportunityRecordPageFieldsAmount: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'opportunityRecordPageFields',
                viewFieldName: 'amount',
                fieldName: 'amount',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'deal'
            }
        }),
        opportunityRecordPageFieldsStage: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'opportunityRecordPageFields',
                viewFieldName: 'stage',
                fieldName: 'stage',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'deal'
            }
        }),
        opportunityRecordPageFieldsCloseDate: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'opportunityRecordPageFields',
                viewFieldName: 'closeDate',
                fieldName: 'closeDate',
                position: 2,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'deal'
            }
        }),
        opportunityRecordPageFieldsTaskTargets: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'opportunityRecordPageFields',
                viewFieldName: 'taskTargets',
                fieldName: 'taskTargets',
                position: 4,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'deal'
            }
        }),
        opportunityRecordPageFieldsNoteTargets: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'opportunityRecordPageFields',
                viewFieldName: 'noteTargets',
                fieldName: 'noteTargets',
                position: 5,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'deal'
            }
        }),
        opportunityRecordPageFieldsAttachments: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'opportunityRecordPageFields',
                viewFieldName: 'attachments',
                fieldName: 'attachments',
                position: 6,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'deal'
            }
        }),
        opportunityRecordPageFieldsTimelineActivities: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'opportunityRecordPageFields',
                viewFieldName: 'timelineActivities',
                fieldName: 'timelineActivities',
                position: 7,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'deal'
            }
        }),
        // Relations group
        opportunityRecordPageFieldsCompany: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'opportunityRecordPageFields',
                viewFieldName: 'company',
                fieldName: 'company',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'relations'
            }
        }),
        opportunityRecordPageFieldsPointOfContact: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'opportunityRecordPageFields',
                viewFieldName: 'pointOfContact',
                fieldName: 'pointOfContact',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'relations'
            }
        }),
        opportunityRecordPageFieldsOwner: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'opportunityRecordPageFields',
                viewFieldName: 'owner',
                fieldName: 'owner',
                position: 2,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'relations'
            }
        }),
        // System group
        opportunityRecordPageFieldsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'opportunityRecordPageFields',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 0,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        opportunityRecordPageFieldsCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'opportunityRecordPageFields',
                viewFieldName: 'createdBy',
                fieldName: 'createdBy',
                position: 1,
                isVisible: true,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        opportunityRecordPageFieldsUpdatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'opportunityRecordPageFields',
                viewFieldName: 'updatedAt',
                fieldName: 'updatedAt',
                position: 2,
                isVisible: false,
                size: 150,
                viewFieldGroupName: 'system'
            }
        }),
        opportunityRecordPageFieldsUpdatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'opportunityRecordPageFields',
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

//# sourceMappingURL=compute-standard-opportunity-view-fields.util.js.map