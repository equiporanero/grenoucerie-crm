"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardOpportunityViewFieldGroups", {
    enumerable: true,
    get: function() {
        return computeStandardOpportunityViewFieldGroups;
    }
});
const _createstandardviewfieldgroupflatmetadatautil = require("./create-standard-view-field-group-flat-metadata.util");
const computeStandardOpportunityViewFieldGroups = (args)=>{
    return {
        opportunityRecordPageFieldsDeal: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'opportunityRecordPageFields',
                viewFieldGroupName: 'deal',
                name: 'Deal',
                position: 0,
                isVisible: true
            }
        }),
        opportunityRecordPageFieldsRelations: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'opportunityRecordPageFields',
                viewFieldGroupName: 'relations',
                name: 'Relations',
                position: 1,
                isVisible: true
            }
        }),
        opportunityRecordPageFieldsSystem: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'opportunity',
            context: {
                viewName: 'opportunityRecordPageFields',
                viewFieldGroupName: 'system',
                name: 'System',
                position: 2,
                isVisible: true
            }
        })
    };
};

//# sourceMappingURL=compute-standard-opportunity-view-field-groups.util.js.map