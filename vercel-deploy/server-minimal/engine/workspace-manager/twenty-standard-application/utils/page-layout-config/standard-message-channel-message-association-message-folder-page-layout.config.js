"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_MESSAGE_FOLDER_PAGE_LAYOUT_CONFIG", {
    enumerable: true,
    get: function() {
        return STANDARD_MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_MESSAGE_FOLDER_PAGE_LAYOUT_CONFIG;
    }
});
const _metadata = require("twenty-shared/metadata");
const _pagelayouttypeenum = require("../../../../metadata-modules/page-layout/enums/page-layout-type.enum");
const _standardpagelayouttabstemplate = require("../../constants/standard-page-layout-tabs.template");
const MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_MESSAGE_FOLDER_PAGE_TABS = {
    home: {
        universalIdentifier: '20202020-ab12-4012-8012-a5c4a6121201',
        ..._standardpagelayouttabstemplate.TAB_PROPS.home,
        widgets: {
            fields: {
                universalIdentifier: '20202020-ac12-4012-8012-a5c4a6121211',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.fields
            }
        }
    },
    timeline: {
        universalIdentifier: '20202020-ab12-4012-8012-a5c4a6121202',
        ..._standardpagelayouttabstemplate.TAB_PROPS.timeline,
        widgets: {
            timeline: {
                universalIdentifier: '20202020-ac12-4012-8012-a5c4a6121221',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.timeline
            }
        }
    }
};
const STANDARD_MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_MESSAGE_FOLDER_PAGE_LAYOUT_CONFIG = {
    name: 'Default Message Channel Message Association Message Folder Layout',
    type: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
    objectUniversalIdentifier: _metadata.STANDARD_OBJECTS.messageChannelMessageAssociationMessageFolder.universalIdentifier,
    universalIdentifier: '20202020-a112-4012-8012-a5c4a6120001',
    defaultTabUniversalIdentifier: null,
    tabs: MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_MESSAGE_FOLDER_PAGE_TABS
};

//# sourceMappingURL=standard-message-channel-message-association-message-folder-page-layout.config.js.map