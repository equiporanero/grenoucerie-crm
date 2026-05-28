"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildStandardFlatViewMetadataMaps", {
    enumerable: true,
    get: function() {
        return buildStandardFlatViewMetadataMaps;
    }
});
const _createemptyflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _computestandardattachmentviewsutil = require("./compute-standard-attachment-views.util");
const _computestandardblocklistviewsutil = require("./compute-standard-blocklist-views.util");
const _computestandardcalendarchanneleventassociationviewsutil = require("./compute-standard-calendar-channel-event-association-views.util");
const _computestandardcalendareventparticipantviewsutil = require("./compute-standard-calendar-event-participant-views.util");
const _computestandardcalendareventviewsutil = require("./compute-standard-calendar-event-views.util");
const _computestandardcompanyviewsutil = require("./compute-standard-company-views.util");
const _computestandarddashboardviewsutil = require("./compute-standard-dashboard-views.util");
const _computestandardmessagechannelmessageassociationmessagefolderviewsutil = require("./compute-standard-message-channel-message-association-message-folder-views.util");
const _computestandardmessagechannelmessageassociationviewsutil = require("./compute-standard-message-channel-message-association-views.util");
const _computestandardmessageparticipantviewsutil = require("./compute-standard-message-participant-views.util");
const _computestandardmessagethreadviewsutil = require("./compute-standard-message-thread-views.util");
const _computestandardmessageviewsutil = require("./compute-standard-message-views.util");
const _computestandardnotetargetviewsutil = require("./compute-standard-note-target-views.util");
const _computestandardnoteviewsutil = require("./compute-standard-note-views.util");
const _computestandardopportunityviewsutil = require("./compute-standard-opportunity-views.util");
const _computestandardpersonviewsutil = require("./compute-standard-person-views.util");
const _computestandardtasktargetviewsutil = require("./compute-standard-task-target-views.util");
const _computestandardtaskviewsutil = require("./compute-standard-task-views.util");
const _computestandardtimelineactivityviewsutil = require("./compute-standard-timeline-activity-views.util");
const _computestandardworkflowautomatedtriggerviewsutil = require("./compute-standard-workflow-automated-trigger-views.util");
const _computestandardworkflowrunviewsutil = require("./compute-standard-workflow-run-views.util");
const _computestandardworkflowversionviewsutil = require("./compute-standard-workflow-version-views.util");
const _computestandardworkflowviewsutil = require("./compute-standard-workflow-views.util");
const _computestandardworkspacememberviewsutil = require("./compute-standard-workspace-member-views.util");
const STANDARD_FLAT_VIEW_METADATA_BUILDERS_BY_OBJECT_NAME = {
    attachment: _computestandardattachmentviewsutil.computeStandardAttachmentViews,
    blocklist: _computestandardblocklistviewsutil.computeStandardBlocklistViews,
    calendarChannelEventAssociation: _computestandardcalendarchanneleventassociationviewsutil.computeStandardCalendarChannelEventAssociationViews,
    calendarEvent: _computestandardcalendareventviewsutil.computeStandardCalendarEventViews,
    calendarEventParticipant: _computestandardcalendareventparticipantviewsutil.computeStandardCalendarEventParticipantViews,
    company: _computestandardcompanyviewsutil.computeStandardCompanyViews,
    dashboard: _computestandarddashboardviewsutil.computeStandardDashboardViews,
    message: _computestandardmessageviewsutil.computeStandardMessageViews,
    messageChannelMessageAssociation: _computestandardmessagechannelmessageassociationviewsutil.computeStandardMessageChannelMessageAssociationViews,
    messageChannelMessageAssociationMessageFolder: _computestandardmessagechannelmessageassociationmessagefolderviewsutil.computeStandardMessageChannelMessageAssociationMessageFolderViews,
    messageParticipant: _computestandardmessageparticipantviewsutil.computeStandardMessageParticipantViews,
    messageThread: _computestandardmessagethreadviewsutil.computeStandardMessageThreadViews,
    note: _computestandardnoteviewsutil.computeStandardNoteViews,
    noteTarget: _computestandardnotetargetviewsutil.computeStandardNoteTargetViews,
    opportunity: _computestandardopportunityviewsutil.computeStandardOpportunityViews,
    person: _computestandardpersonviewsutil.computeStandardPersonViews,
    task: _computestandardtaskviewsutil.computeStandardTaskViews,
    taskTarget: _computestandardtasktargetviewsutil.computeStandardTaskTargetViews,
    timelineActivity: _computestandardtimelineactivityviewsutil.computeStandardTimelineActivityViews,
    workflow: _computestandardworkflowviewsutil.computeStandardWorkflowViews,
    workflowAutomatedTrigger: _computestandardworkflowautomatedtriggerviewsutil.computeStandardWorkflowAutomatedTriggerViews,
    workflowRun: _computestandardworkflowrunviewsutil.computeStandardWorkflowRunViews,
    workflowVersion: _computestandardworkflowversionviewsutil.computeStandardWorkflowVersionViews,
    workspaceMember: _computestandardworkspacememberviewsutil.computeStandardWorkspaceMemberViews
};
const buildStandardFlatViewMetadataMaps = (args)=>{
    const allViewMetadatas = Object.keys(STANDARD_FLAT_VIEW_METADATA_BUILDERS_BY_OBJECT_NAME).flatMap((objectName)=>{
        const builder = STANDARD_FLAT_VIEW_METADATA_BUILDERS_BY_OBJECT_NAME[objectName];
        const result = builder({
            ...args,
            objectName
        });
        return Object.values(result);
    });
    let flatViewMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    for (const viewMetadata of allViewMetadatas){
        flatViewMaps = (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
            flatEntity: viewMetadata,
            flatEntityMaps: flatViewMaps
        });
    }
    return flatViewMaps;
};

//# sourceMappingURL=build-standard-flat-view-metadata-maps.util.js.map