"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_PERSON_PAGE_LAYOUT_CONFIG", {
    enumerable: true,
    get: function() {
        return STANDARD_PERSON_PAGE_LAYOUT_CONFIG;
    }
});
const _metadata = require("twenty-shared/metadata");
const _widgettypeenum = require("../../../../metadata-modules/page-layout-widget/enums/widget-type.enum");
const _pagelayouttypeenum = require("../../../../metadata-modules/page-layout/enums/page-layout-type.enum");
const _standardpagelayouttabstemplate = require("../../constants/standard-page-layout-tabs.template");
const PERSON_PAGE_TABS = {
    home: {
        universalIdentifier: '20202020-ab02-4002-8002-ae0a1ea11201',
        ..._standardpagelayouttabstemplate.TAB_PROPS.home,
        widgets: {
            fields: {
                universalIdentifier: '20202020-ac02-4002-8002-ae0a1ea11211',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.fields
            },
            company: {
                universalIdentifier: '20202020-ac02-4002-8002-ae0a1ea11212',
                title: 'Company',
                type: _widgettypeenum.WidgetType.FIELD,
                gridPosition: _standardpagelayouttabstemplate.GRID_POSITIONS.FULL_WIDTH,
                position: _standardpagelayouttabstemplate.VERTICAL_LIST_LAYOUT_POSITIONS.SECOND,
                fieldUniversalIdentifier: _metadata.STANDARD_OBJECTS.person.fields.company.universalIdentifier
            },
            pointOfContactForOpportunities: {
                universalIdentifier: '20202020-ac02-4002-8002-ae0a1ea11213',
                title: 'Opportunities',
                type: _widgettypeenum.WidgetType.FIELD,
                gridPosition: _standardpagelayouttabstemplate.GRID_POSITIONS.FULL_WIDTH,
                position: _standardpagelayouttabstemplate.VERTICAL_LIST_LAYOUT_POSITIONS.THIRD,
                fieldUniversalIdentifier: _metadata.STANDARD_OBJECTS.person.fields.pointOfContactForOpportunities.universalIdentifier
            }
        }
    },
    timeline: {
        universalIdentifier: '20202020-ab02-4002-8002-ae0a1ea11202',
        ..._standardpagelayouttabstemplate.TAB_PROPS.timeline,
        widgets: {
            timeline: {
                universalIdentifier: '20202020-ac02-4002-8002-ae0a1ea11221',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.timeline
            }
        }
    },
    tasks: {
        universalIdentifier: '20202020-ab02-4002-8002-ae0a1ea11203',
        ..._standardpagelayouttabstemplate.TAB_PROPS.tasks,
        widgets: {
            tasks: {
                universalIdentifier: '20202020-ac02-4002-8002-ae0a1ea11231',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.tasks
            }
        }
    },
    notes: {
        universalIdentifier: '20202020-ab02-4002-8002-ae0a1ea11204',
        ..._standardpagelayouttabstemplate.TAB_PROPS.notes,
        widgets: {
            notes: {
                universalIdentifier: '20202020-ac02-4002-8002-ae0a1ea11241',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.notes
            }
        }
    },
    files: {
        universalIdentifier: '20202020-ab02-4002-8002-ae0a1ea11205',
        ..._standardpagelayouttabstemplate.TAB_PROPS.files,
        widgets: {
            files: {
                universalIdentifier: '20202020-ac02-4002-8002-ae0a1ea11251',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.files
            }
        }
    },
    emails: {
        universalIdentifier: '20202020-ab02-4002-8002-ae0a1ea11206',
        ..._standardpagelayouttabstemplate.TAB_PROPS.emails,
        widgets: {
            emails: {
                universalIdentifier: '20202020-ac02-4002-8002-ae0a1ea11261',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.emails
            }
        }
    },
    calendar: {
        universalIdentifier: '20202020-ab02-4002-8002-ae0a1ea11207',
        ..._standardpagelayouttabstemplate.TAB_PROPS.calendar,
        widgets: {
            calendar: {
                universalIdentifier: '20202020-ac02-4002-8002-ae0a1ea11271',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.calendar
            }
        }
    }
};
const STANDARD_PERSON_PAGE_LAYOUT_CONFIG = {
    name: 'Default Person Layout',
    type: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
    objectUniversalIdentifier: _metadata.STANDARD_OBJECTS.person.universalIdentifier,
    universalIdentifier: '20202020-a102-4002-8002-ae0a1ea11002',
    defaultTabUniversalIdentifier: null,
    tabs: PERSON_PAGE_TABS
};

//# sourceMappingURL=standard-person-page-layout.config.js.map