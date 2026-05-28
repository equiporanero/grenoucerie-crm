"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardPersonViewFieldGroups", {
    enumerable: true,
    get: function() {
        return computeStandardPersonViewFieldGroups;
    }
});
const _createstandardviewfieldgroupflatmetadatautil = require("./create-standard-view-field-group-flat-metadata.util");
const computeStandardPersonViewFieldGroups = (args)=>{
    return {
        personRecordPageFieldsGeneral: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldGroupName: 'general',
                name: 'General',
                position: 0,
                isVisible: true
            }
        }),
        personRecordPageFieldsWork: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldGroupName: 'work',
                name: 'Work',
                position: 1,
                isVisible: true
            }
        }),
        personRecordPageFieldsSocial: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldGroupName: 'social',
                name: 'Social',
                position: 2,
                isVisible: true
            }
        }),
        personRecordPageFieldsSystem: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'person',
            context: {
                viewName: 'personRecordPageFields',
                viewFieldGroupName: 'system',
                name: 'System',
                position: 3,
                isVisible: true
            }
        })
    };
};

//# sourceMappingURL=compute-standard-person-view-field-groups.util.js.map