"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_OPPORTUNITY_PAGE_LAYOUT_CONFIG", {
    enumerable: true,
    get: function() {
        return STANDARD_OPPORTUNITY_PAGE_LAYOUT_CONFIG;
    }
});
const _metadata = require("twenty-shared/metadata");
const _widgettypeenum = require("../../../../metadata-modules/page-layout-widget/enums/widget-type.enum");
const _pagelayouttypeenum = require("../../../../metadata-modules/page-layout/enums/page-layout-type.enum");
const _standardpagelayouttabstemplate = require("../../constants/standard-page-layout-tabs.template");
const OPPORTUNITY_PAGE_TABS = {
    home: {
        universalIdentifier: '20202020-ab03-4003-8003-0aa0b1ca1301',
        ..._standardpagelayouttabstemplate.TAB_PROPS.home,
        widgets: {
            fields: {
                universalIdentifier: '20202020-ac03-4003-8003-0aa0b1ca1311',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.fields
            },
            pointOfContact: {
                universalIdentifier: '20202020-ac03-4003-8003-0aa0b1ca1312',
                title: 'Point of Contact',
                type: _widgettypeenum.WidgetType.FIELD,
                gridPosition: _standardpagelayouttabstemplate.GRID_POSITIONS.FULL_WIDTH,
                position: _standardpagelayouttabstemplate.VERTICAL_LIST_LAYOUT_POSITIONS.SECOND,
                fieldUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.fields.pointOfContact.universalIdentifier
            },
            company: {
                universalIdentifier: '20202020-ac03-4003-8003-0aa0b1ca1313',
                title: 'Company',
                type: _widgettypeenum.WidgetType.FIELD,
                gridPosition: _standardpagelayouttabstemplate.GRID_POSITIONS.FULL_WIDTH,
                position: _standardpagelayouttabstemplate.VERTICAL_LIST_LAYOUT_POSITIONS.THIRD,
                fieldUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.fields.company.universalIdentifier
            },
            owner: {
                universalIdentifier: '20202020-ac03-4003-8003-0aa0b1ca1314',
                title: 'Owner',
                type: _widgettypeenum.WidgetType.FIELD,
                gridPosition: _standardpagelayouttabstemplate.GRID_POSITIONS.FULL_WIDTH,
                position: _standardpagelayouttabstemplate.VERTICAL_LIST_LAYOUT_POSITIONS.FOURTH,
                fieldUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.fields.owner.universalIdentifier
            }
        }
    },
    timeline: {
        universalIdentifier: '20202020-ab03-4003-8003-0aa0b1ca1302',
        ..._standardpagelayouttabstemplate.TAB_PROPS.timeline,
        widgets: {
            timeline: {
                universalIdentifier: '20202020-ac03-4003-8003-0aa0b1ca1321',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.timeline
            }
        }
    },
    tasks: {
        universalIdentifier: '20202020-ab03-4003-8003-0aa0b1ca1303',
        ..._standardpagelayouttabstemplate.TAB_PROPS.tasks,
        widgets: {
            tasks: {
                universalIdentifier: '20202020-ac03-4003-8003-0aa0b1ca1331',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.tasks
            }
        }
    },
    notes: {
        universalIdentifier: '20202020-ab03-4003-8003-0aa0b1ca1304',
        ..._standardpagelayouttabstemplate.TAB_PROPS.notes,
        widgets: {
            notes: {
                universalIdentifier: '20202020-ac03-4003-8003-0aa0b1ca1341',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.notes
            }
        }
    },
    files: {
        universalIdentifier: '20202020-ab03-4003-8003-0aa0b1ca1305',
        ..._standardpagelayouttabstemplate.TAB_PROPS.files,
        widgets: {
            files: {
                universalIdentifier: '20202020-ac03-4003-8003-0aa0b1ca1351',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.files
            }
        }
    },
    emails: {
        universalIdentifier: '20202020-ab03-4003-8003-0aa0b1ca1306',
        ..._standardpagelayouttabstemplate.TAB_PROPS.emails,
        widgets: {
            emails: {
                universalIdentifier: '20202020-ac03-4003-8003-0aa0b1ca1361',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.emails
            }
        }
    },
    calendar: {
        universalIdentifier: '20202020-ab03-4003-8003-0aa0b1ca1307',
        ..._standardpagelayouttabstemplate.TAB_PROPS.calendar,
        widgets: {
            calendar: {
                universalIdentifier: '20202020-ac03-4003-8003-0aa0b1ca1371',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.calendar
            }
        }
    }
};
const STANDARD_OPPORTUNITY_PAGE_LAYOUT_CONFIG = {
    name: 'Default Opportunity Layout',
    type: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
    objectUniversalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.universalIdentifier,
    universalIdentifier: '20202020-a103-4003-8003-0aa0b1ca1003',
    defaultTabUniversalIdentifier: null,
    tabs: OPPORTUNITY_PAGE_TABS
};

//# sourceMappingURL=standard-opportunity-page-layout.config.js.map