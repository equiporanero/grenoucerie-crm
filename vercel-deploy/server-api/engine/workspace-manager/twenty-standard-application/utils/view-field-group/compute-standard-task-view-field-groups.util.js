"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardTaskViewFieldGroups", {
    enumerable: true,
    get: function() {
        return computeStandardTaskViewFieldGroups;
    }
});
const _createstandardviewfieldgroupflatmetadatautil = require("./create-standard-view-field-group-flat-metadata.util");
const computeStandardTaskViewFieldGroups = (args)=>{
    return {
        taskRecordPageFieldsGeneral: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'task',
            context: {
                viewName: 'taskRecordPageFields',
                viewFieldGroupName: 'general',
                name: 'General',
                position: 0,
                isVisible: true
            }
        }),
        taskRecordPageFieldsSystem: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'task',
            context: {
                viewName: 'taskRecordPageFields',
                viewFieldGroupName: 'system',
                name: 'System',
                position: 1,
                isVisible: true
            }
        })
    };
};

//# sourceMappingURL=compute-standard-task-view-field-groups.util.js.map