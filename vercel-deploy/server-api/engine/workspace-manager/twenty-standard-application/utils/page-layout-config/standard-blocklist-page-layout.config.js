"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_BLOCKLIST_PAGE_LAYOUT_CONFIG", {
    enumerable: true,
    get: function() {
        return STANDARD_BLOCKLIST_PAGE_LAYOUT_CONFIG;
    }
});
const _metadata = require("twenty-shared/metadata");
const _pagelayouttypeenum = require("../../../../metadata-modules/page-layout/enums/page-layout-type.enum");
const _standardpagelayouttabstemplate = require("../../constants/standard-page-layout-tabs.template");
const BLOCKLIST_PAGE_TABS = {
    home: {
        universalIdentifier: '20202020-ab09-4009-8009-b10c115b0901',
        ..._standardpagelayouttabstemplate.TAB_PROPS.home,
        widgets: {
            fields: {
                universalIdentifier: '20202020-ac09-4009-8009-b10c115b0911',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.fields
            }
        }
    },
    timeline: {
        universalIdentifier: '20202020-ab09-4009-8009-b10c115b0902',
        ..._standardpagelayouttabstemplate.TAB_PROPS.timeline,
        widgets: {
            timeline: {
                universalIdentifier: '20202020-ac09-4009-8009-b10c115b0921',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.timeline
            }
        }
    }
};
const STANDARD_BLOCKLIST_PAGE_LAYOUT_CONFIG = {
    name: 'Default Blocklist Layout',
    type: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
    objectUniversalIdentifier: _metadata.STANDARD_OBJECTS.blocklist.universalIdentifier,
    universalIdentifier: '20202020-a109-4009-8009-b10c115b0001',
    defaultTabUniversalIdentifier: null,
    tabs: BLOCKLIST_PAGE_TABS
};

//# sourceMappingURL=standard-blocklist-page-layout.config.js.map