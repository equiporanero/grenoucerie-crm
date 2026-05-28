"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardDashboardViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardDashboardViewFields;
    }
});
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardDashboardViewFields = (args)=>{
    return {
        allDashboardsTitle: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'dashboard',
            context: {
                viewName: 'allDashboards',
                viewFieldName: 'title',
                fieldName: 'title',
                position: 0,
                isVisible: true,
                size: 200
            }
        }),
        allDashboardsCreatedBy: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'dashboard',
            context: {
                viewName: 'allDashboards',
                viewFieldName: 'createdBy',
                fieldName: 'createdBy',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        allDashboardsCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'dashboard',
            context: {
                viewName: 'allDashboards',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        allDashboardsUpdatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'dashboard',
            context: {
                viewName: 'allDashboards',
                viewFieldName: 'updatedAt',
                fieldName: 'updatedAt',
                position: 3,
                isVisible: true,
                size: 150
            }
        })
    };
};

//# sourceMappingURL=compute-standard-dashboard-view-fields.util.js.map