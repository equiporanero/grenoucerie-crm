"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_WORKFLOW_AUTOMATED_TRIGGER_PAGE_LAYOUT_CONFIG", {
    enumerable: true,
    get: function() {
        return STANDARD_WORKFLOW_AUTOMATED_TRIGGER_PAGE_LAYOUT_CONFIG;
    }
});
const _metadata = require("twenty-shared/metadata");
const _pagelayouttypeenum = require("../../../../metadata-modules/page-layout/enums/page-layout-type.enum");
const _standardpagelayouttabstemplate = require("../../constants/standard-page-layout-tabs.template");
const WORKFLOW_AUTOMATED_TRIGGER_PAGE_TABS = {
    home: {
        universalIdentifier: '20202020-ab15-4015-8015-a0bcf1151501',
        ..._standardpagelayouttabstemplate.TAB_PROPS.home,
        widgets: {
            fields: {
                universalIdentifier: '20202020-ac15-4015-8015-a0bcf1151511',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.fields
            }
        }
    },
    timeline: {
        universalIdentifier: '20202020-ab15-4015-8015-a0bcf1151502',
        ..._standardpagelayouttabstemplate.TAB_PROPS.timeline,
        widgets: {
            timeline: {
                universalIdentifier: '20202020-ac15-4015-8015-a0bcf1151521',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.timeline
            }
        }
    }
};
const STANDARD_WORKFLOW_AUTOMATED_TRIGGER_PAGE_LAYOUT_CONFIG = {
    name: 'Default Workflow Automated Trigger Layout',
    type: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
    objectUniversalIdentifier: _metadata.STANDARD_OBJECTS.workflowAutomatedTrigger.universalIdentifier,
    universalIdentifier: '20202020-a115-4015-8015-a0bcf1150001',
    defaultTabUniversalIdentifier: null,
    tabs: WORKFLOW_AUTOMATED_TRIGGER_PAGE_TABS
};

//# sourceMappingURL=standard-workflow-automated-trigger-page-layout.config.js.map