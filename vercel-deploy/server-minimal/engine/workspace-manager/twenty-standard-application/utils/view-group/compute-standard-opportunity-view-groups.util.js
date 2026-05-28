"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardOpportunityViewGroups", {
    enumerable: true,
    get: function() {
        return computeStandardOpportunityViewGroups;
    }
});
const _createstandardviewgroupflatmetadatautil = require("./create-standard-view-group-flat-metadata.util");
const computeStandardOpportunityViewGroups = (args)=>{
    return {
        byStageNew: (0, _createstandardviewgroupflatmetadatautil.createStandardViewGroupFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'byStage',
                viewGroupName: 'new',
                isVisible: true,
                fieldValue: 'NEW',
                position: 0
            }
        }),
        byStageScreening: (0, _createstandardviewgroupflatmetadatautil.createStandardViewGroupFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'byStage',
                viewGroupName: 'screening',
                isVisible: true,
                fieldValue: 'SCREENING',
                position: 1
            }
        }),
        byStageMeeting: (0, _createstandardviewgroupflatmetadatautil.createStandardViewGroupFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'byStage',
                viewGroupName: 'meeting',
                isVisible: true,
                fieldValue: 'MEETING',
                position: 2
            }
        }),
        byStageProposal: (0, _createstandardviewgroupflatmetadatautil.createStandardViewGroupFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'byStage',
                viewGroupName: 'proposal',
                isVisible: true,
                fieldValue: 'PROPOSAL',
                position: 3
            }
        }),
        byStageCustomer: (0, _createstandardviewgroupflatmetadatautil.createStandardViewGroupFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'byStage',
                viewGroupName: 'customer',
                isVisible: true,
                fieldValue: 'CUSTOMER',
                position: 4
            }
        })
    };
};

//# sourceMappingURL=compute-standard-opportunity-view-groups.util.js.map