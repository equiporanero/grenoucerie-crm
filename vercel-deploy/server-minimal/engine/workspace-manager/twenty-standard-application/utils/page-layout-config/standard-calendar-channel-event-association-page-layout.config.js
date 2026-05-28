"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_CALENDAR_CHANNEL_EVENT_ASSOCIATION_PAGE_LAYOUT_CONFIG", {
    enumerable: true,
    get: function() {
        return STANDARD_CALENDAR_CHANNEL_EVENT_ASSOCIATION_PAGE_LAYOUT_CONFIG;
    }
});
const _metadata = require("twenty-shared/metadata");
const _pagelayouttypeenum = require("../../../../metadata-modules/page-layout/enums/page-layout-type.enum");
const _standardpagelayouttabstemplate = require("../../constants/standard-page-layout-tabs.template");
const CALENDAR_CHANNEL_EVENT_ASSOCIATION_PAGE_TABS = {
    home: {
        universalIdentifier: '20202020-ab0b-400b-800b-ca1c4e0b0b01',
        ..._standardpagelayouttabstemplate.TAB_PROPS.home,
        widgets: {
            fields: {
                universalIdentifier: '20202020-ac0b-400b-800b-ca1c4e0b0b11',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.fields
            }
        }
    },
    timeline: {
        universalIdentifier: '20202020-ab0b-400b-800b-ca1c4e0b0b02',
        ..._standardpagelayouttabstemplate.TAB_PROPS.timeline,
        widgets: {
            timeline: {
                universalIdentifier: '20202020-ac0b-400b-800b-ca1c4e0b0b21',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.timeline
            }
        }
    }
};
const STANDARD_CALENDAR_CHANNEL_EVENT_ASSOCIATION_PAGE_LAYOUT_CONFIG = {
    name: 'Default Calendar Channel Event Association Layout',
    type: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
    objectUniversalIdentifier: _metadata.STANDARD_OBJECTS.calendarChannelEventAssociation.universalIdentifier,
    universalIdentifier: '20202020-a10b-400b-800b-ca1c4e0b0001',
    defaultTabUniversalIdentifier: null,
    tabs: CALENDAR_CHANNEL_EVENT_ASSOCIATION_PAGE_TABS
};

//# sourceMappingURL=standard-calendar-channel-event-association-page-layout.config.js.map