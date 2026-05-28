"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get CANVAS_LAYOUT_POSITIONS () {
        return CANVAS_LAYOUT_POSITIONS;
    },
    get CONDITIONAL_AVAILABILITY_EXPRESSION_DEVICE_DESKTOP () {
        return CONDITIONAL_AVAILABILITY_EXPRESSION_DEVICE_DESKTOP;
    },
    get CONDITIONAL_AVAILABILITY_EXPRESSION_DEVICE_MOBILE () {
        return CONDITIONAL_AVAILABILITY_EXPRESSION_DEVICE_MOBILE;
    },
    get CONDITIONAL_DISPLAY_DEVICE_DESKTOP () {
        return CONDITIONAL_DISPLAY_DEVICE_DESKTOP;
    },
    get CONDITIONAL_DISPLAY_DEVICE_MOBILE () {
        return CONDITIONAL_DISPLAY_DEVICE_MOBILE;
    },
    get GRID_LAYOUT_POSITIONS () {
        return GRID_LAYOUT_POSITIONS;
    },
    get GRID_POSITIONS () {
        return GRID_POSITIONS;
    },
    get TAB_PROPS () {
        return TAB_PROPS;
    },
    get VERTICAL_LIST_LAYOUT_POSITIONS () {
        return VERTICAL_LIST_LAYOUT_POSITIONS;
    },
    get WIDGET_PROPS () {
        return WIDGET_PROPS;
    }
});
const _types = require("twenty-shared/types");
const _widgettypeenum = require("../../../metadata-modules/page-layout-widget/enums/widget-type.enum");
const CONDITIONAL_DISPLAY_DEVICE_MOBILE = {
    and: [
        {
            '===': [
                {
                    var: 'device'
                },
                'MOBILE'
            ]
        }
    ]
};
const CONDITIONAL_DISPLAY_DEVICE_DESKTOP = {
    and: [
        {
            '===': [
                {
                    var: 'device'
                },
                'DESKTOP'
            ]
        }
    ]
};
const CONDITIONAL_AVAILABILITY_EXPRESSION_DEVICE_MOBILE = 'device == "MOBILE"';
const CONDITIONAL_AVAILABILITY_EXPRESSION_DEVICE_DESKTOP = 'device == "DESKTOP"';
const GRID_POSITIONS = {
    FULL_WIDTH: {
        row: 0,
        column: 0,
        rowSpan: 12,
        columnSpan: 12
    },
    HALF_HEIGHT: {
        row: 0,
        column: 0,
        rowSpan: 6,
        columnSpan: 12
    },
    RICH_TEXT: {
        row: 12,
        column: 0,
        rowSpan: 6,
        columnSpan: 12
    }
};
const GRID_LAYOUT_POSITIONS = {
    FULL_WIDTH: {
        layoutMode: _types.PageLayoutTabLayoutMode.GRID,
        row: 0,
        column: 0,
        rowSpan: 12,
        columnSpan: 12
    },
    HALF_HEIGHT: {
        layoutMode: _types.PageLayoutTabLayoutMode.GRID,
        row: 0,
        column: 0,
        rowSpan: 6,
        columnSpan: 12
    },
    RICH_TEXT: {
        layoutMode: _types.PageLayoutTabLayoutMode.GRID,
        row: 12,
        column: 0,
        rowSpan: 6,
        columnSpan: 12
    }
};
const VERTICAL_LIST_LAYOUT_POSITIONS = {
    FIRST: {
        layoutMode: _types.PageLayoutTabLayoutMode.VERTICAL_LIST,
        index: 0
    },
    SECOND: {
        layoutMode: _types.PageLayoutTabLayoutMode.VERTICAL_LIST,
        index: 1
    },
    THIRD: {
        layoutMode: _types.PageLayoutTabLayoutMode.VERTICAL_LIST,
        index: 2
    },
    FOURTH: {
        layoutMode: _types.PageLayoutTabLayoutMode.VERTICAL_LIST,
        index: 3
    }
};
const CANVAS_LAYOUT_POSITIONS = {
    DEFAULT: {
        layoutMode: _types.PageLayoutTabLayoutMode.CANVAS
    }
};
const TAB_PROPS = {
    home: {
        title: 'Home',
        position: 10,
        icon: 'IconHome',
        layoutMode: _types.PageLayoutTabLayoutMode.VERTICAL_LIST
    },
    timeline: {
        title: 'Timeline',
        position: 20,
        icon: 'IconTimelineEvent',
        layoutMode: _types.PageLayoutTabLayoutMode.CANVAS
    },
    tasks: {
        title: 'Tasks',
        position: 30,
        icon: 'IconCheckbox',
        layoutMode: _types.PageLayoutTabLayoutMode.CANVAS
    },
    notes: {
        title: 'Notes',
        position: 40,
        icon: 'IconNotes',
        layoutMode: _types.PageLayoutTabLayoutMode.CANVAS
    },
    files: {
        title: 'Files',
        position: 50,
        icon: 'IconPaperclip',
        layoutMode: _types.PageLayoutTabLayoutMode.CANVAS
    },
    emails: {
        title: 'Emails',
        position: 60,
        icon: 'IconMail',
        layoutMode: _types.PageLayoutTabLayoutMode.CANVAS
    },
    calendar: {
        title: 'Calendar',
        position: 70,
        icon: 'IconCalendarEvent',
        layoutMode: _types.PageLayoutTabLayoutMode.CANVAS
    },
    note: {
        title: 'Note',
        position: 15,
        icon: 'IconNotes',
        layoutMode: _types.PageLayoutTabLayoutMode.VERTICAL_LIST
    },
    flow: {
        title: 'Flow',
        position: 10,
        icon: 'IconSettings',
        layoutMode: _types.PageLayoutTabLayoutMode.CANVAS
    },
    flowSecondary: {
        title: 'Flow',
        position: 20,
        icon: 'IconSettings',
        layoutMode: _types.PageLayoutTabLayoutMode.CANVAS
    }
};
const WIDGET_PROPS = {
    fields: {
        title: 'Fields',
        type: _widgettypeenum.WidgetType.FIELDS,
        gridPosition: GRID_POSITIONS.FULL_WIDTH,
        position: VERTICAL_LIST_LAYOUT_POSITIONS.FIRST
    },
    timeline: {
        title: 'Timeline',
        type: _widgettypeenum.WidgetType.TIMELINE,
        gridPosition: GRID_POSITIONS.HALF_HEIGHT,
        position: CANVAS_LAYOUT_POSITIONS.DEFAULT
    },
    tasks: {
        title: 'Tasks',
        type: _widgettypeenum.WidgetType.TASKS,
        gridPosition: GRID_POSITIONS.HALF_HEIGHT,
        position: CANVAS_LAYOUT_POSITIONS.DEFAULT
    },
    notes: {
        title: 'Notes',
        type: _widgettypeenum.WidgetType.NOTES,
        gridPosition: GRID_POSITIONS.HALF_HEIGHT,
        position: CANVAS_LAYOUT_POSITIONS.DEFAULT
    },
    files: {
        title: 'Files',
        type: _widgettypeenum.WidgetType.FILES,
        gridPosition: GRID_POSITIONS.HALF_HEIGHT,
        position: CANVAS_LAYOUT_POSITIONS.DEFAULT
    },
    emails: {
        title: 'Emails',
        type: _widgettypeenum.WidgetType.EMAILS,
        gridPosition: GRID_POSITIONS.HALF_HEIGHT,
        position: CANVAS_LAYOUT_POSITIONS.DEFAULT
    },
    calendar: {
        title: 'Calendar',
        type: _widgettypeenum.WidgetType.CALENDAR,
        gridPosition: GRID_POSITIONS.HALF_HEIGHT,
        position: CANVAS_LAYOUT_POSITIONS.DEFAULT
    },
    noteRichText: {
        title: 'Note',
        type: _widgettypeenum.WidgetType.FIELD_RICH_TEXT,
        gridPosition: GRID_POSITIONS.RICH_TEXT,
        position: VERTICAL_LIST_LAYOUT_POSITIONS.FIRST
    },
    taskRichText: {
        title: 'Task',
        type: _widgettypeenum.WidgetType.FIELD_RICH_TEXT,
        gridPosition: GRID_POSITIONS.RICH_TEXT,
        position: VERTICAL_LIST_LAYOUT_POSITIONS.FIRST
    },
    workflow: {
        title: 'Flow',
        type: _widgettypeenum.WidgetType.WORKFLOW,
        gridPosition: GRID_POSITIONS.FULL_WIDTH,
        position: CANVAS_LAYOUT_POSITIONS.DEFAULT
    },
    workflowVersion: {
        title: 'Flow',
        type: _widgettypeenum.WidgetType.WORKFLOW_VERSION,
        gridPosition: GRID_POSITIONS.FULL_WIDTH,
        position: CANVAS_LAYOUT_POSITIONS.DEFAULT
    },
    workflowRun: {
        title: 'Flow',
        type: _widgettypeenum.WidgetType.WORKFLOW_RUN,
        gridPosition: GRID_POSITIONS.FULL_WIDTH,
        position: CANVAS_LAYOUT_POSITIONS.DEFAULT
    },
    emailThread: {
        title: 'Thread',
        type: _widgettypeenum.WidgetType.EMAIL_THREAD,
        gridPosition: GRID_POSITIONS.FULL_WIDTH,
        position: VERTICAL_LIST_LAYOUT_POSITIONS.SECOND
    }
};

//# sourceMappingURL=standard-page-layout-tabs.template.js.map