"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardCompanyViews", {
    enumerable: true,
    get: function() {
        return computeStandardCompanyViews;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewflatmetadatautil = require("./create-standard-view-flat-metadata.util");
const computeStandardCompanyViews = (args)=>{
    return {
        allCompanies: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'allCompanies',
                name: 'All {objectLabelPlural}',
                type: _types.ViewType.TABLE,
                key: _types.ViewKey.INDEX,
                position: 0,
                icon: 'IconList'
            }
        }),
        companyRecordPageFields: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                name: 'Company Record Page Fields',
                type: _types.ViewType.FIELDS_WIDGET,
                key: null,
                position: 0,
                icon: 'IconList'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-company-views.util.js.map