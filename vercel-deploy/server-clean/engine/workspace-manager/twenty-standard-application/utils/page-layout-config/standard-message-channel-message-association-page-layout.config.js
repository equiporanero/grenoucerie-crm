"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_PAGE_LAYOUT_CONFIG", {
    enumerable: true,
    get: function() {
        return STANDARD_MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_PAGE_LAYOUT_CONFIG;
    }
});
const _metadata = require("twenty-shared/metadata");
const _pagelayouttypeenum = require("../../../../metadata-modules/page-layout/enums/page-layout-type.enum");
const _standardpagelayouttabstemplate = require("../../constants/standard-page-layout-tabs.template");
const MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_PAGE_TABS = {
    home: {
        universalIdentifier: '20202020-ab11-4011-8011-a5c4a5111101',
        ..._standardpagelayouttabstemplate.TAB_PROPS.home,
        widgets: {
            fields: {
                universalIdentifier: '20202020-ac11-4011-8011-a5c4a5111111',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.fields
            }
        }
    },
    timeline: {
        universalIdentifier: '20202020-ab11-4011-8011-a5c4a5111102',
        ..._standardpagelayouttabstemplate.TAB_PROPS.timeline,
        widgets: {
            timeline: {
                universalIdentifier: '20202020-ac11-4011-8011-a5c4a5111121',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.timeline
            }
        }
    }
};
const STANDARD_MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_PAGE_LAYOUT_CONFIG = {
    name: 'Default Message Channel Message Association Layout',
    type: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
    objectUniversalIdentifier: _metadata.STANDARD_OBJECTS.messageChannelMessageAssociation.universalIdentifier,
    universalIdentifier: '20202020-a111-4011-8011-a5c4a5110001',
    defaultTabUniversalIdentifier: null,
    tabs: MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_PAGE_TABS
};

//# sourceMappingURL=standard-message-channel-message-association-page-layout.config.js.map