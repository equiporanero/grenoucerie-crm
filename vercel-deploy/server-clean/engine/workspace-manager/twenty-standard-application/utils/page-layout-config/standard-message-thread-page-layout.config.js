"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_MESSAGE_THREAD_PAGE_LAYOUT_CONFIG", {
    enumerable: true,
    get: function() {
        return STANDARD_MESSAGE_THREAD_PAGE_LAYOUT_CONFIG;
    }
});
const _metadata = require("twenty-shared/metadata");
const _pagelayouttypeenum = require("../../../../metadata-modules/page-layout/enums/page-layout-type.enum");
const _standardpagelayouttabstemplate = require("../../constants/standard-page-layout-tabs.template");
const MESSAGE_THREAD_PAGE_TABS = {
    home: {
        universalIdentifier: '20202020-f639-48a0-9a44-027cf4e3cd15',
        ..._standardpagelayouttabstemplate.TAB_PROPS.home,
        widgets: {
            emailThread: {
                universalIdentifier: '20202020-d57e-44cb-b220-69a881feb9c3',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.emailThread
            }
        }
    }
};
const STANDARD_MESSAGE_THREAD_PAGE_LAYOUT_CONFIG = {
    name: 'Default Message Thread Layout',
    type: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
    objectUniversalIdentifier: _metadata.STANDARD_OBJECTS.messageThread.universalIdentifier,
    universalIdentifier: '20202020-95bb-40eb-a699-70e7ea02a79e',
    defaultTabUniversalIdentifier: null,
    tabs: MESSAGE_THREAD_PAGE_TABS
};

//# sourceMappingURL=standard-message-thread-page-layout.config.js.map