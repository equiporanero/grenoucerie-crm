"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardWorkflowRunViews", {
    enumerable: true,
    get: function() {
        return computeStandardWorkflowRunViews;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewflatmetadatautil = require("./create-standard-view-flat-metadata.util");
const computeStandardWorkflowRunViews = (args)=>{
    return {
        allWorkflowRuns: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'workflowRun',
            context: {
                viewName: 'allWorkflowRuns',
                name: 'Runs',
                type: _types.ViewType.TABLE,
                key: _types.ViewKey.INDEX,
                position: 0,
                icon: 'IconPlayerPlay'
            }
        }),
        workflowRunRecordPageFields: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'workflowRun',
            context: {
                viewName: 'workflowRunRecordPageFields',
                name: 'Workflow Run Record Page Fields',
                type: _types.ViewType.FIELDS_WIDGET,
                key: null,
                position: 0,
                icon: 'IconList'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-workflow-run-views.util.js.map