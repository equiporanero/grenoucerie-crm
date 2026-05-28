"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardWorkflowVersionViews", {
    enumerable: true,
    get: function() {
        return computeStandardWorkflowVersionViews;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewflatmetadatautil = require("./create-standard-view-flat-metadata.util");
const computeStandardWorkflowVersionViews = (args)=>{
    return {
        allWorkflowVersions: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'workflowVersion',
            context: {
                viewName: 'allWorkflowVersions',
                name: 'Versions',
                type: _types.ViewType.TABLE,
                key: _types.ViewKey.INDEX,
                position: 0,
                icon: 'IconRestore'
            }
        }),
        workflowVersionRecordPageFields: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'workflowVersion',
            context: {
                viewName: 'workflowVersionRecordPageFields',
                name: 'Workflow Version Record Page Fields',
                type: _types.ViewType.FIELDS_WIDGET,
                key: null,
                position: 0,
                icon: 'IconList'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-workflow-version-views.util.js.map