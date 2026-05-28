"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_WORKFLOW_PAGE_LAYOUT_CONFIG", {
    enumerable: true,
    get: function() {
        return STANDARD_WORKFLOW_PAGE_LAYOUT_CONFIG;
    }
});
const _metadata = require("twenty-shared/metadata");
const _pagelayouttypeenum = require("../../../../metadata-modules/page-layout/enums/page-layout-type.enum");
const _standardpagelayouttabstemplate = require("../../constants/standard-page-layout-tabs.template");
const WORKFLOW_PAGE_TABS = {
    flow: {
        universalIdentifier: '20202020-ab06-4006-8006-a0bcf10a6601',
        ..._standardpagelayouttabstemplate.TAB_PROPS.flow,
        widgets: {
            workflow: {
                universalIdentifier: '20202020-ac06-4006-8006-a0bcf10a6611',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.workflow
            }
        }
    }
};
const STANDARD_WORKFLOW_PAGE_LAYOUT_CONFIG = {
    name: 'Default Workflow Layout',
    type: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
    objectUniversalIdentifier: _metadata.STANDARD_OBJECTS.workflow.universalIdentifier,
    universalIdentifier: '20202020-a106-4006-8006-a0bcf10aa006',
    defaultTabUniversalIdentifier: null,
    tabs: WORKFLOW_PAGE_TABS
};

//# sourceMappingURL=standard-workflow-page-layout.config.js.map