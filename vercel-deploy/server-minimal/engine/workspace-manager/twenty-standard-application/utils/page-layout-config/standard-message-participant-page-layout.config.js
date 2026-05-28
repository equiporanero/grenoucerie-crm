"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_MESSAGE_PARTICIPANT_PAGE_LAYOUT_CONFIG", {
    enumerable: true,
    get: function() {
        return STANDARD_MESSAGE_PARTICIPANT_PAGE_LAYOUT_CONFIG;
    }
});
const _metadata = require("twenty-shared/metadata");
const _pagelayouttypeenum = require("../../../../metadata-modules/page-layout/enums/page-layout-type.enum");
const _standardpagelayouttabstemplate = require("../../constants/standard-page-layout-tabs.template");
const MESSAGE_PARTICIPANT_PAGE_TABS = {
    home: {
        universalIdentifier: '20202020-ab14-4014-8014-a5ea10141401',
        ..._standardpagelayouttabstemplate.TAB_PROPS.home,
        widgets: {
            fields: {
                universalIdentifier: '20202020-ac14-4014-8014-a5ea10141411',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.fields
            }
        }
    },
    timeline: {
        universalIdentifier: '20202020-ab14-4014-8014-a5ea10141402',
        ..._standardpagelayouttabstemplate.TAB_PROPS.timeline,
        widgets: {
            timeline: {
                universalIdentifier: '20202020-ac14-4014-8014-a5ea10141421',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.timeline
            }
        }
    }
};
const STANDARD_MESSAGE_PARTICIPANT_PAGE_LAYOUT_CONFIG = {
    name: 'Default Message Participant Layout',
    type: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
    objectUniversalIdentifier: _metadata.STANDARD_OBJECTS.messageParticipant.universalIdentifier,
    universalIdentifier: '20202020-a114-4014-8014-a5ea10140001',
    defaultTabUniversalIdentifier: null,
    tabs: MESSAGE_PARTICIPANT_PAGE_TABS
};

//# sourceMappingURL=standard-message-participant-page-layout.config.js.map