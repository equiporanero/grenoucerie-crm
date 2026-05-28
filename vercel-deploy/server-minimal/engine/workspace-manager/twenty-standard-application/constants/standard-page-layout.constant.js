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
    get STANDARD_PAGE_LAYOUTS () {
        return STANDARD_PAGE_LAYOUTS;
    },
    get STANDARD_RECORD_PAGE_LAYOUTS () {
        return STANDARD_RECORD_PAGE_LAYOUTS;
    }
});
const _pagelayoutconfig = require("../utils/page-layout-config");
const STANDARD_PAGE_LAYOUTS = {
    myFirstDashboard: _pagelayoutconfig.STANDARD_DASHBOARD_PAGE_LAYOUT_CONFIG,
    blocklistRecordPage: _pagelayoutconfig.STANDARD_BLOCKLIST_PAGE_LAYOUT_CONFIG,
    calendarChannelEventAssociationRecordPage: _pagelayoutconfig.STANDARD_CALENDAR_CHANNEL_EVENT_ASSOCIATION_PAGE_LAYOUT_CONFIG,
    calendarEventParticipantRecordPage: _pagelayoutconfig.STANDARD_CALENDAR_EVENT_PARTICIPANT_PAGE_LAYOUT_CONFIG,
    companyRecordPage: _pagelayoutconfig.STANDARD_COMPANY_PAGE_LAYOUT_CONFIG,
    messageChannelMessageAssociationRecordPage: _pagelayoutconfig.STANDARD_MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_PAGE_LAYOUT_CONFIG,
    messageChannelMessageAssociationMessageFolderRecordPage: _pagelayoutconfig.STANDARD_MESSAGE_CHANNEL_MESSAGE_ASSOCIATION_MESSAGE_FOLDER_PAGE_LAYOUT_CONFIG,
    messageParticipantRecordPage: _pagelayoutconfig.STANDARD_MESSAGE_PARTICIPANT_PAGE_LAYOUT_CONFIG,
    messageThreadRecordPage: _pagelayoutconfig.STANDARD_MESSAGE_THREAD_PAGE_LAYOUT_CONFIG,
    noteRecordPage: _pagelayoutconfig.STANDARD_NOTE_PAGE_LAYOUT_CONFIG,
    opportunityRecordPage: _pagelayoutconfig.STANDARD_OPPORTUNITY_PAGE_LAYOUT_CONFIG,
    personRecordPage: _pagelayoutconfig.STANDARD_PERSON_PAGE_LAYOUT_CONFIG,
    taskRecordPage: _pagelayoutconfig.STANDARD_TASK_PAGE_LAYOUT_CONFIG,
    workflowRecordPage: _pagelayoutconfig.STANDARD_WORKFLOW_PAGE_LAYOUT_CONFIG,
    workflowAutomatedTriggerRecordPage: _pagelayoutconfig.STANDARD_WORKFLOW_AUTOMATED_TRIGGER_PAGE_LAYOUT_CONFIG,
    workflowVersionRecordPage: _pagelayoutconfig.STANDARD_WORKFLOW_VERSION_PAGE_LAYOUT_CONFIG,
    workflowRunRecordPage: _pagelayoutconfig.STANDARD_WORKFLOW_RUN_PAGE_LAYOUT_CONFIG
};
const { myFirstDashboard: _myFirstDashboard, ...recordPageLayouts } = STANDARD_PAGE_LAYOUTS;
const STANDARD_RECORD_PAGE_LAYOUTS = recordPageLayouts;

//# sourceMappingURL=standard-page-layout.constant.js.map