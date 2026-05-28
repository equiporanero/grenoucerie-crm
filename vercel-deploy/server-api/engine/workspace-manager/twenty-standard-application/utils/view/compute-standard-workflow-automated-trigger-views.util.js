"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardWorkflowAutomatedTriggerViews", {
    enumerable: true,
    get: function() {
        return computeStandardWorkflowAutomatedTriggerViews;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewflatmetadatautil = require("./create-standard-view-flat-metadata.util");
const computeStandardWorkflowAutomatedTriggerViews = (args)=>{
    return {
        allWorkflowAutomatedTriggers: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'workflowAutomatedTrigger',
            context: {
                viewName: 'allWorkflowAutomatedTriggers',
                name: 'All {objectLabelPlural}',
                type: _types.ViewType.TABLE,
                key: _types.ViewKey.INDEX,
                position: 0,
                icon: 'IconList'
            }
        }),
        workflowAutomatedTriggerRecordPageFields: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'workflowAutomatedTrigger',
            context: {
                viewName: 'workflowAutomatedTriggerRecordPageFields',
                name: 'Workflow Automated Trigger Record Page Fields',
                type: _types.ViewType.FIELDS_WIDGET,
                key: null,
                position: 0,
                icon: 'IconList'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-workflow-automated-trigger-views.util.js.map