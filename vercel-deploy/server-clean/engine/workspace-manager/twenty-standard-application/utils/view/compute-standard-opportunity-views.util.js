"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardOpportunityViews", {
    enumerable: true,
    get: function() {
        return computeStandardOpportunityViews;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewflatmetadatautil = require("./create-standard-view-flat-metadata.util");
const computeStandardOpportunityViews = (args)=>{
    return {
        allOpportunities: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'allOpportunities',
                name: 'All {objectLabelPlural}',
                type: _types.ViewType.TABLE,
                key: _types.ViewKey.INDEX,
                position: 0,
                icon: 'IconList'
            }
        }),
        byStage: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'byStage',
                name: 'By Stage',
                type: _types.ViewType.KANBAN,
                key: null,
                position: 2,
                icon: 'IconLayoutKanban',
                mainGroupByFieldName: 'stage',
                kanbanAggregateOperation: _types.AggregateOperations.SUM,
                kanbanAggregateOperationFieldName: 'amount'
            }
        }),
        opportunityRecordPageFields: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'opportunityRecordPageFields',
                name: 'Opportunity Record Page Fields',
                type: _types.ViewType.FIELDS_WIDGET,
                key: null,
                position: 0,
                icon: 'IconList'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-opportunity-views.util.js.map