"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isWorkflowRelatedObject", {
    enumerable: true,
    get: function() {
        return isWorkflowRelatedObject;
    }
});
const _metadata = require("twenty-shared/metadata");
// All workflow-related standard object IDs that should be filtered out from agent access
const WORKFLOW_STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS = [
    _metadata.STANDARD_OBJECTS.workflow.universalIdentifier,
    _metadata.STANDARD_OBJECTS.workflowRun.universalIdentifier,
    _metadata.STANDARD_OBJECTS.workflowVersion.universalIdentifier,
    _metadata.STANDARD_OBJECTS.workflowAutomatedTrigger.universalIdentifier
];
const isWorkflowRelatedObject = (objectMetadata)=>{
    return WORKFLOW_STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.includes(objectMetadata.universalIdentifier);
};

//# sourceMappingURL=is-workflow-run-object.util.js.map