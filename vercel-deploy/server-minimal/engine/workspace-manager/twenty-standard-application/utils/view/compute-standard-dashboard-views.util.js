"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardDashboardViews", {
    enumerable: true,
    get: function() {
        return computeStandardDashboardViews;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewflatmetadatautil = require("./create-standard-view-flat-metadata.util");
const computeStandardDashboardViews = (args)=>{
    return {
        allDashboards: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'dashboard',
            context: {
                viewName: 'allDashboards',
                name: 'All {objectLabelPlural}',
                type: _types.ViewType.TABLE,
                key: _types.ViewKey.INDEX,
                position: 0,
                icon: 'IconList'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-dashboard-views.util.js.map