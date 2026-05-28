"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardMessageChannelMessageAssociationMessageFolderViews", {
    enumerable: true,
    get: function() {
        return computeStandardMessageChannelMessageAssociationMessageFolderViews;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewflatmetadatautil = require("./create-standard-view-flat-metadata.util");
const computeStandardMessageChannelMessageAssociationMessageFolderViews = (args)=>{
    return {
        allMessageChannelMessageAssociationMessageFolders: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'messageChannelMessageAssociationMessageFolder',
            context: {
                viewName: 'allMessageChannelMessageAssociationMessageFolders',
                name: 'All {objectLabelPlural}',
                type: _types.ViewType.TABLE,
                key: _types.ViewKey.INDEX,
                position: 0,
                icon: 'IconList'
            }
        }),
        messageChannelMessageAssociationMessageFolderRecordPageFields: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'messageChannelMessageAssociationMessageFolder',
            context: {
                viewName: 'messageChannelMessageAssociationMessageFolderRecordPageFields',
                name: 'Message Channel Message Association Message Folder Record Page Fields',
                type: _types.ViewType.FIELDS_WIDGET,
                key: null,
                position: 0,
                icon: 'IconList'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-message-channel-message-association-message-folder-views.util.js.map