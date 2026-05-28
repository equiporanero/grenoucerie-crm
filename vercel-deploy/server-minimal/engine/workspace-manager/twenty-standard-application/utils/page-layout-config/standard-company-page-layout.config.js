"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_COMPANY_PAGE_LAYOUT_CONFIG", {
    enumerable: true,
    get: function() {
        return STANDARD_COMPANY_PAGE_LAYOUT_CONFIG;
    }
});
const _metadata = require("twenty-shared/metadata");
const _widgettypeenum = require("../../../../metadata-modules/page-layout-widget/enums/widget-type.enum");
const _pagelayouttypeenum = require("../../../../metadata-modules/page-layout/enums/page-layout-type.enum");
const _standardpagelayouttabstemplate = require("../../constants/standard-page-layout-tabs.template");
const COMPANY_PAGE_TABS = {
    home: {
        universalIdentifier: '20202020-ab01-4001-8001-c0aba11c0101',
        ..._standardpagelayouttabstemplate.TAB_PROPS.home,
        widgets: {
            fields: {
                universalIdentifier: '20202020-ac01-4001-8001-c0aba11c0111',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.fields
            },
            people: {
                universalIdentifier: '20202020-ac01-4001-8001-c0aba11c0112',
                title: 'People',
                type: _widgettypeenum.WidgetType.FIELD,
                gridPosition: _standardpagelayouttabstemplate.GRID_POSITIONS.FULL_WIDTH,
                position: _standardpagelayouttabstemplate.VERTICAL_LIST_LAYOUT_POSITIONS.SECOND,
                fieldUniversalIdentifier: _metadata.STANDARD_OBJECTS.company.fields.people.universalIdentifier
            },
            opportunities: {
                universalIdentifier: '20202020-ac01-4001-8001-c0aba11c0114',
                title: 'Opportunities',
                type: _widgettypeenum.WidgetType.FIELD,
                gridPosition: _standardpagelayouttabstemplate.GRID_POSITIONS.FULL_WIDTH,
                position: _standardpagelayouttabstemplate.VERTICAL_LIST_LAYOUT_POSITIONS.THIRD,
                fieldUniversalIdentifier: _metadata.STANDARD_OBJECTS.company.fields.opportunities.universalIdentifier
            }
        }
    },
    timeline: {
        universalIdentifier: '20202020-ab01-4001-8001-c0aba11c0102',
        ..._standardpagelayouttabstemplate.TAB_PROPS.timeline,
        widgets: {
            timeline: {
                universalIdentifier: '20202020-ac01-4001-8001-c0aba11c0121',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.timeline
            }
        }
    },
    tasks: {
        universalIdentifier: '20202020-ab01-4001-8001-c0aba11c0103',
        ..._standardpagelayouttabstemplate.TAB_PROPS.tasks,
        widgets: {
            tasks: {
                universalIdentifier: '20202020-ac01-4001-8001-c0aba11c0131',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.tasks
            }
        }
    },
    notes: {
        universalIdentifier: '20202020-ab01-4001-8001-c0aba11c0104',
        ..._standardpagelayouttabstemplate.TAB_PROPS.notes,
        widgets: {
            notes: {
                universalIdentifier: '20202020-ac01-4001-8001-c0aba11c0141',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.notes
            }
        }
    },
    files: {
        universalIdentifier: '20202020-ab01-4001-8001-c0aba11c0105',
        ..._standardpagelayouttabstemplate.TAB_PROPS.files,
        widgets: {
            files: {
                universalIdentifier: '20202020-ac01-4001-8001-c0aba11c0151',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.files
            }
        }
    },
    emails: {
        universalIdentifier: '20202020-ab01-4001-8001-c0aba11c0106',
        ..._standardpagelayouttabstemplate.TAB_PROPS.emails,
        widgets: {
            emails: {
                universalIdentifier: '20202020-ac01-4001-8001-c0aba11c0161',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.emails
            }
        }
    },
    calendar: {
        universalIdentifier: '20202020-ab01-4001-8001-c0aba11c0107',
        ..._standardpagelayouttabstemplate.TAB_PROPS.calendar,
        widgets: {
            calendar: {
                universalIdentifier: '20202020-ac01-4001-8001-c0aba11c0171',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.calendar
            }
        }
    }
};
const STANDARD_COMPANY_PAGE_LAYOUT_CONFIG = {
    name: 'Default Company Layout',
    type: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
    objectUniversalIdentifier: _metadata.STANDARD_OBJECTS.company.universalIdentifier,
    universalIdentifier: '20202020-a101-4001-8001-c0aba11c0001',
    defaultTabUniversalIdentifier: null,
    tabs: COMPANY_PAGE_TABS
};

//# sourceMappingURL=standard-company-page-layout.config.js.map