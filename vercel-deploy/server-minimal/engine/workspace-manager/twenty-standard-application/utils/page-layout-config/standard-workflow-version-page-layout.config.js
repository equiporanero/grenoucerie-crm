"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_WORKFLOW_VERSION_PAGE_LAYOUT_CONFIG", {
    enumerable: true,
    get: function() {
        return STANDARD_WORKFLOW_VERSION_PAGE_LAYOUT_CONFIG;
    }
});
const _metadata = require("twenty-shared/metadata");
const _widgettypeenum = require("../../../../metadata-modules/page-layout-widget/enums/widget-type.enum");
const _pagelayouttypeenum = require("../../../../metadata-modules/page-layout/enums/page-layout-type.enum");
const _standardpagelayouttabstemplate = require("../../constants/standard-page-layout-tabs.template");
const WORKFLOW_VERSION_PAGE_TABS = {
    home: {
        universalIdentifier: '20202020-ab07-4007-8007-a0bcf10a7701',
        ..._standardpagelayouttabstemplate.TAB_PROPS.home,
        widgets: {
            fields: {
                universalIdentifier: '20202020-ac07-4007-8007-a0bcf10a7711',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.fields
            },
            workflow: {
                universalIdentifier: '20202020-ac07-4007-8007-a0bcf10a7712',
                title: 'Workflow',
                type: _widgettypeenum.WidgetType.FIELD,
                gridPosition: _standardpagelayouttabstemplate.GRID_POSITIONS.FULL_WIDTH,
                position: _standardpagelayouttabstemplate.VERTICAL_LIST_LAYOUT_POSITIONS.SECOND,
                fieldUniversalIdentifier: _metadata.STANDARD_OBJECTS.workflowVersion.fields.workflow.universalIdentifier
            }
        }
    },
    flow: {
        universalIdentifier: '20202020-ab07-4007-8007-a0bcf10a7702',
        ..._standardpagelayouttabstemplate.TAB_PROPS.flowSecondary,
        widgets: {
            workflowVersion: {
                universalIdentifier: '20202020-ac07-4007-8007-a0bcf10a7721',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.workflowVersion
            }
        }
    }
};
const STANDARD_WORKFLOW_VERSION_PAGE_LAYOUT_CONFIG = {
    name: 'Default Workflow Version Layout',
    type: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
    objectUniversalIdentifier: _metadata.STANDARD_OBJECTS.workflowVersion.universalIdentifier,
    universalIdentifier: '20202020-a107-4007-8007-a0bcf10ab007',
    defaultTabUniversalIdentifier: WORKFLOW_VERSION_PAGE_TABS.flow.universalIdentifier,
    tabs: WORKFLOW_VERSION_PAGE_TABS
};

//# sourceMappingURL=standard-workflow-version-page-layout.config.js.map