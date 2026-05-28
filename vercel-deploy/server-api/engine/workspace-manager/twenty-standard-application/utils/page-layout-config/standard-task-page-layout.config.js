"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_TASK_PAGE_LAYOUT_CONFIG", {
    enumerable: true,
    get: function() {
        return STANDARD_TASK_PAGE_LAYOUT_CONFIG;
    }
});
const _metadata = require("twenty-shared/metadata");
const _pagelayouttypeenum = require("../../../../metadata-modules/page-layout/enums/page-layout-type.enum");
const _standardpagelayouttabstemplate = require("../../constants/standard-page-layout-tabs.template");
const TASK_PAGE_TABS = {
    home: {
        universalIdentifier: '20202020-ab05-4005-8005-ba5ca11a5501',
        ..._standardpagelayouttabstemplate.TAB_PROPS.home,
        widgets: {
            fields: {
                universalIdentifier: '20202020-ac05-4005-8005-ba5ca11a5511',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.fields
            },
            taskRichText: {
                universalIdentifier: '20202020-ac05-4005-8005-ba5ca11a5512',
                title: _standardpagelayouttabstemplate.WIDGET_PROPS.taskRichText.title,
                type: _standardpagelayouttabstemplate.WIDGET_PROPS.taskRichText.type,
                gridPosition: _standardpagelayouttabstemplate.WIDGET_PROPS.taskRichText.gridPosition,
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
        universalIdentifier: '20202020-ab05-4005-8005-ba5ca11a5502',
        ..._standardpagelayouttabstemplate.TAB_PROPS.note,
        widgets: {
            taskRichText: {
                universalIdentifier: '20202020-ac05-4005-8005-ba5ca11a5521',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.taskRichText,
                conditionalDisplay: _standardpagelayouttabstemplate.CONDITIONAL_DISPLAY_DEVICE_DESKTOP,
                conditionalAvailabilityExpression: _standardpagelayouttabstemplate.CONDITIONAL_AVAILABILITY_EXPRESSION_DEVICE_DESKTOP
            }
        }
    },
    timeline: {
        universalIdentifier: '20202020-ab05-4005-8005-ba5ca11a5503',
        ..._standardpagelayouttabstemplate.TAB_PROPS.timeline,
        widgets: {
            timeline: {
                universalIdentifier: '20202020-ac05-4005-8005-ba5ca11a5531',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.timeline
            }
        }
    },
    files: {
        universalIdentifier: '20202020-ab05-4005-8005-ba5ca11a5504',
        ..._standardpagelayouttabstemplate.TAB_PROPS.files,
        widgets: {
            files: {
                universalIdentifier: '20202020-ac05-4005-8005-ba5ca11a5541',
                ..._standardpagelayouttabstemplate.WIDGET_PROPS.files
            }
        }
    }
};
const STANDARD_TASK_PAGE_LAYOUT_CONFIG = {
    name: 'Default Task Layout',
    type: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
    objectUniversalIdentifier: _metadata.STANDARD_OBJECTS.task.universalIdentifier,
    universalIdentifier: '20202020-a105-4005-8005-ba5ca11a1005',
    defaultTabUniversalIdentifier: null,
    tabs: TASK_PAGE_TABS
};

//# sourceMappingURL=standard-task-page-layout.config.js.map