"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardWorkflowAutomatedTriggerViewFieldGroups", {
    enumerable: true,
    get: function() {
        return computeStandardWorkflowAutomatedTriggerViewFieldGroups;
    }
});
const _createstandardviewfieldgroupflatmetadatautil = require("./create-standard-view-field-group-flat-metadata.util");
const computeStandardWorkflowAutomatedTriggerViewFieldGroups = (args)=>{
    return {
        workflowAutomatedTriggerRecordPageFieldsGeneral: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'workflowAutomatedTrigger',
            context: {
                viewName: 'workflowAutomatedTriggerRecordPageFields',
                viewFieldGroupName: 'general',
                name: 'General',
                position: 0,
                isVisible: true
            }
        }),
        workflowAutomatedTriggerRecordPageFieldsSystem: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'workflowAutomatedTrigger',
            context: {
                viewName: 'workflowAutomatedTriggerRecordPageFields',
                viewFieldGroupName: 'system',
                name: 'System',
                position: 1,
                isVisible: true
            }
        })
    };
};

//# sourceMappingURL=compute-standard-workflow-automated-trigger-view-field-groups.util.js.map