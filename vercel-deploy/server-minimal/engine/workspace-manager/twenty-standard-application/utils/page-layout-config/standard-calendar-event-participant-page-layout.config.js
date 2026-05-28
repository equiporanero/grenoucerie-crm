"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_CALENDAR_EVENT_PARTICIPANT_PAGE_LAYOUT_CONFIG", {
    enumerable: true,
    get: function() {
        return STANDARD_CALENDAR_EVENT_PARTICIPANT_PAGE_LAYOUT_CONFIG;
    }
});
const _metadata = require("twenty-shared/metadata");
const _pagelayouttypeenum = require("../../../../metadata-modules/page-layout/enums/page-layout-type.enum");
const _standardpagelayouttabstemplate = require("../../constants/standard-page-layout-tabs.template");
const CALENDAR_EVENT_PARTICIPANT_PAGE_TABS = {
    home: {
        universalIdentifier: '20202020-ab0c-400c-800c-ca1e0a0c0c01',
        ..._standardpagelayouttabstemplate.TAB_PROPS.home,
        widgets: {
            fields: {
                universalIdentifier: '20202020-ac0c-400c-800c-ca1e0a0c0c11',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.fields
            }
        }
    },
    timeline: {
        universalIdentifier: '20202020-ab0c-400c-800c-ca1e0a0c0c02',
        ..._standardpagelayouttabstemplate.TAB_PROPS.timeline,
        widgets: {
            timeline: {
                universalIdentifier: '20202020-ac0c-400c-800c-ca1e0a0c0c21',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.timeline
            }
        }
    }
};
const STANDARD_CALENDAR_EVENT_PARTICIPANT_PAGE_LAYOUT_CONFIG = {
    name: 'Default Calendar Event Participant Layout',
    type: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
    objectUniversalIdentifier: _metadata.STANDARD_OBJECTS.calendarEventParticipant.universalIdentifier,
    universalIdentifier: '20202020-a10c-400c-800c-ca1e0a0c0001',
    defaultTabUniversalIdentifier: null,
    tabs: CALENDAR_EVENT_PARTICIPANT_PAGE_TABS
};

//# sourceMappingURL=standard-calendar-event-participant-page-layout.config.js.map