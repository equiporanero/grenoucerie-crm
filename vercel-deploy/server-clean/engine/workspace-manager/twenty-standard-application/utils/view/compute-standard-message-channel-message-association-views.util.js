"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardMessageChannelMessageAssociationViews", {
    enumerable: true,
    get: function() {
        return computeStandardMessageChannelMessageAssociationViews;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewflatmetadatautil = require("./create-standard-view-flat-metadata.util");
const computeStandardMessageChannelMessageAssociationViews = (args)=>{
    return {
        allMessageChannelMessageAssociations: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'messageChannelMessageAssociation',
            context: {
                viewName: 'allMessageChannelMessageAssociations',
                name: 'All {objectLabelPlural}',
                type: _types.ViewType.TABLE,
                key: _types.ViewKey.INDEX,
                position: 0,
                icon: 'IconList'
            }
        }),
        messageChannelMessageAssociationRecordPageFields: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'messageChannelMessageAssociation',
            context: {
                viewName: 'messageChannelMessageAssociationRecordPageFields',
                name: 'Message Channel Message Association Record Page Fields',
                type: _types.ViewType.FIELDS_WIDGET,
                key: null,
                position: 0,
                icon: 'IconList'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-message-channel-message-association-views.util.js.map