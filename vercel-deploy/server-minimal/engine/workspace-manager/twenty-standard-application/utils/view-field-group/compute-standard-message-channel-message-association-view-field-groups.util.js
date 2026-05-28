"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardMessageChannelMessageAssociationViewFieldGroups", {
    enumerable: true,
    get: function() {
        return computeStandardMessageChannelMessageAssociationViewFieldGroups;
    }
});
const _createstandardviewfieldgroupflatmetadatautil = require("./create-standard-view-field-group-flat-metadata.util");
const computeStandardMessageChannelMessageAssociationViewFieldGroups = (args)=>{
    return {
        messageChannelMessageAssociationRecordPageFieldsGeneral: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'messageChannelMessageAssociation',
            context: {
                viewName: 'messageChannelMessageAssociationRecordPageFields',
                viewFieldGroupName: 'general',
                name: 'General',
                position: 0,
                isVisible: true
            }
        }),
        messageChannelMessageAssociationRecordPageFieldsSystem: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'messageChannelMessageAssociation',
            context: {
                viewName: 'messageChannelMessageAssociationRecordPageFields',
                viewFieldGroupName: 'system',
                name: 'System',
                position: 1,
                isVisible: true
            }
        })
    };
};

//# sourceMappingURL=compute-standard-message-channel-message-association-view-field-groups.util.js.map