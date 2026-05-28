"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_WORKFLOW_RUN_PAGE_LAYOUT_CONFIG", {
    enumerable: true,
    get: function() {
        return STANDARD_WORKFLOW_RUN_PAGE_LAYOUT_CONFIG;
    }
});
const _metadata = require("twenty-shared/metadata");
const _widgettypeenum = require("../../../../metadata-modules/page-layout-widget/enums/widget-type.enum");
const _pagelayouttypeenum = require("../../../../metadata-modules/page-layout/enums/page-layout-type.enum");
const _standardpagelayouttabstemplate = require("../../constants/standard-page-layout-tabs.template");
const WORKFLOW_RUN_PAGE_TABS = {
    home: {
        universalIdentifier: '20202020-ab08-4008-8008-a0bcf10a8801',
        ..._standardpagelayouttabstemplate.TAB_PROPS.home,
        widgets: {
            fields: {
                universalIdentifier: '20202020-ac08-4008-8008-a0bcf10a8811',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.fields
            },
            workflow: {
                universalIdentifier: '20202020-ac08-4008-8008-a0bcf10a8813',
                title: 'Workflow',
                type: _widgettypeenum.WidgetType.FIELD,
                gridPosition: _standardpagelayouttabstemplate.GRID_POSITIONS.FULL_WIDTH,
                position: _standardpagelayouttabstemplate.VERTICAL_LIST_LAYOUT_POSITIONS.THIRD,
                fieldUniversalIdentifier: _metadata.STANDARD_OBJECTS.workflowRun.fields.workflow.universalIdentifier
            }
        }
    },
    flow: {
        universalIdentifier: '20202020-ab08-4008-8008-a0bcf10a8802',
        ..._standardpagelayouttabstemplate.TAB_PROPS.flowSecondary,
        widgets: {
            workflowRun: {
                universalIdentifier: '20202020-ac08-4008-8008-a0bcf10a8821',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.workflowRun
            }
        }
    }
};
const STANDARD_WORKFLOW_RUN_PAGE_LAYOUT_CONFIG = {
    name: 'Default Workflow Run Layout',
    type: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
    objectUniversalIdentifier: _metadata.STANDARD_OBJECTS.workflowRun.universalIdentifier,
    universalIdentifier: '20202020-a108-4008-8008-a0bcf10ac008',
    defaultTabUniversalIdentifier: WORKFLOW_RUN_PAGE_TABS.flow.universalIdentifier,
    tabs: WORKFLOW_RUN_PAGE_TABS
};

//# sourceMappingURL=standard-workflow-run-page-layout.config.js.map