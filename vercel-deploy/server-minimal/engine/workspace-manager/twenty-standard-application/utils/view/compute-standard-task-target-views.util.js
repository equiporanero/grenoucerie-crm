"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardTaskTargetViews", {
    enumerable: true,
    get: function() {
        return computeStandardTaskTargetViews;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewflatmetadatautil = require("./create-standard-view-flat-metadata.util");
const computeStandardTaskTargetViews = (args)=>{
    return {
        allTaskTargets: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'taskTarget',
            context: {
                viewName: 'allTaskTargets',
                name: 'All {objectLabelPlural}',
                type: _types.ViewType.TABLE,
                key: _types.ViewKey.INDEX,
                position: 0,
                icon: 'IconList'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-task-target-views.util.js.map