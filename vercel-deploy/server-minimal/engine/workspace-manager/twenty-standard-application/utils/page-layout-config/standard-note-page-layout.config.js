"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_NOTE_PAGE_LAYOUT_CONFIG", {
    enumerable: true,
    get: function() {
        return STANDARD_NOTE_PAGE_LAYOUT_CONFIG;
    }
});
const _metadata = require("twenty-shared/metadata");
const _pagelayouttypeenum = require("../../../../metadata-modules/page-layout/enums/page-layout-type.enum");
const _standardpagelayouttabstemplate = require("../../constants/standard-page-layout-tabs.template");
const NOTE_PAGE_TABS = {
    home: {
        universalIdentifier: '20202020-ab04-4004-8004-a0be5a11a401',
        ..._standardpagelayouttabstemplate.TAB_PROPS.home,
        widgets: {
            fields: {
                universalIdentifier: '20202020-ac04-4004-8004-a0be5a11a411',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.fields
            },
            noteRichText: {
                universalIdentifier: '20202020-ac04-4004-8004-a0be5a11a412',
                title: _standardpagelayouttabstemplate.WIDGET_PROPS.noteRichText.title,
                type: _standardpagelayouttabstemplate.WIDGET_PROPS.noteRichText.type,
                gridPosition: _standardpagelayouttabstemplate.WIDGET_PROPS.noteRichText.gridPosition,
                position: {
                    layoutMode: _standardpagelayouttabstemplate.TAB_PROPS.home.layoutMode,
                    index: 1
                },
                conditionalDisplay: _standardpagelayouttabstemplate.CONDITIONAL_DISPLAY_DEVICE_MOBILE,
                conditionalAvailabilityExpression: _standardpagelayouttabstemplate.CONDITIONAL_AVAILABILITY_EXPRESSION_DEVICE_MOBILE
            }
        }
    },
    note: {
        universalIdentifier: '20202020-ab04-4004-8004-a0be5a11a402',
        ..._standardpagelayouttabstemplate.TAB_PROPS.note,
        widgets: {
            noteRichText: {
                universalIdentifier: '20202020-ac04-4004-8004-a0be5a11a421',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.noteRichText,
                conditionalDisplay: _standardpagelayouttabstemplate.CONDITIONAL_DISPLAY_DEVICE_DESKTOP,
                conditionalAvailabilityExpression: _standardpagelayouttabstemplate.CONDITIONAL_AVAILABILITY_EXPRESSION_DEVICE_DESKTOP
            }
        }
    },
    timeline: {
        universalIdentifier: '20202020-ab04-4004-8004-a0be5a11a403',
        ..._standardpagelayouttabstemplate.TAB_PROPS.timeline,
        widgets: {
            timeline: {
                universalIdentifier: '20202020-ac04-4004-8004-a0be5a11a431',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.timeline
            }
        }
    },
    files: {
        universalIdentifier: '20202020-ab04-4004-8004-a0be5a11a404',
        ..._standardpagelayouttabstemplate.TAB_PROPS.files,
        widgets: {
            files: {
                universalIdentifier: '20202020-ac04-4004-8004-a0be5a11a441',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.files
            }
        }
    }
};
const STANDARD_NOTE_PAGE_LAYOUT_CONFIG = {
    name: 'Default Note Layout',
    type: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
    objectUniversalIdentifier: _metadata.STANDARD_OBJECTS.note.universalIdentifier,
    universalIdentifier: '20202020-a104-4004-8004-a0be5a11a004',
    defaultTabUniversalIdentifier: null,
    tabs: NOTE_PAGE_TABS
};

//# sourceMappingURL=standard-note-page-layout.config.js.map