"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardWorkflowViews", {
    enumerable: true,
    get: function() {
        return computeStandardWorkflowViews;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewflatmetadatautil = require("./create-standard-view-flat-metadata.util");
const computeStandardWorkflowViews = (args)=>{
    return {
        allWorkflows: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'workflow',
            context: {
                viewName: 'allWorkflows',
                name: 'All {objectLabelPlural}',
                type: _types.ViewType.TABLE,
                key: _types.ViewKey.INDEX,
                position: 0,
                icon: 'IconTable'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-workflow-views.util.js.map