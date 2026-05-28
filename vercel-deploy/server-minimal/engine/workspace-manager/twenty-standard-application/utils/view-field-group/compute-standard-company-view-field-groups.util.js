"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardCompanyViewFieldGroups", {
    enumerable: true,
    get: function() {
        return computeStandardCompanyViewFieldGroups;
    }
});
const _createstandardviewfieldgroupflatmetadatautil = require("./create-standard-view-field-group-flat-metadata.util");
const computeStandardCompanyViewFieldGroups = (args)=>{
    return {
        companyRecordPageFieldsGeneral: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldGroupName: 'general',
                name: 'General',
                position: 0,
                isVisible: true
            }
        }),
        companyRecordPageFieldsBusiness: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldGroupName: 'business',
                name: 'Business',
                position: 1,
                isVisible: true
            }
        }),
        companyRecordPageFieldsContact: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldGroupName: 'contact',
                name: 'Contact',
                position: 2,
                isVisible: true
            }
        }),
        companyRecordPageFieldsSystem: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'company',
            context: {
                viewName: 'companyRecordPageFields',
                viewFieldGroupName: 'system',
                name: 'System',
                position: 3,
                isVisible: true
            }
        })
    };
};

//# sourceMappingURL=compute-standard-company-view-field-groups.util.js.map