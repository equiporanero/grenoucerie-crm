"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildStandardFlatFieldMetadataMaps", {
    enumerable: true,
    get: function() {
        return buildStandardFlatFieldMetadataMaps;
    }
});
const _createemptyflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _computeattachmentstandardflatfieldmetadatautil = require("./compute-attachment-standard-flat-field-metadata.util");
const _computeblockliststandardflatfieldmetadatautil = require("./compute-blocklist-standard-flat-field-metadata.util");
const _computecalendarchanneleventassociationstandardflatfieldmetadatautil = require("./compute-calendar-channel-event-association-standard-flat-field-metadata.util");
const _computecalendareventparticipantstandardflatfieldmetadatautil = require("./compute-calendar-event-participant-standard-flat-field-metadata.util");
const _computecalendareventstandardflatfieldmetadatautil = require("./compute-calendar-event-standard-flat-field-metadata.util");
const _computecompanystandardflatfieldmetadatautil = require("./compute-company-standard-flat-field-metadata.util");
const _computedashboardstandardflatfieldmetadatautil = require("./compute-dashboard-standard-flat-field-metadata.util");
const _computemessagechannelmessageassociationmessagefolderstandardflatfieldmetadatautil = require("./compute-message-channel-message-association-message-folder-standard-flat-field-metadata.util");
const _computemessagechannelmessageassociationstandardflatfieldmetadatautil = require("./compute-message-channel-message-association-standard-flat-field-metadata.util");
const _computemessageparticipantstandardflatfieldmetadatautil = require("./compute-message-participant-standard-flat-field-metadata.util");
const _computemessagestandardflatfieldmetadatautil = require("./compute-message-standard-flat-field-metadata.util");
const _computemessagethreadstandardflatfieldmetadatautil = require("./compute-message-thread-standard-flat-field-metadata.util");
const _computenotestandardflatfieldmetadatautil = require("./compute-note-standard-flat-field-metadata.util");
const _computenotetargetstandardflatfieldmetadatautil = require("./compute-note-target-standard-flat-field-metadata.util");
const _computeopportunitystandardflatfieldmetadatautil = require("./compute-opportunity-standard-flat-field-metadata.util");
const _computepersonstandardflatfieldmetadatautil = require("./compute-person-standard-flat-field-metadata.util");
const _computetaskstandardflatfieldmetadatautil = require("./compute-task-standard-flat-field-metadata.util");
const _computetasktargetstandardflatfieldmetadatautil = require("./compute-task-target-standard-flat-field-metadata.util");
const _computetimelineactivitystandardflatfieldmetadatautil = require("./compute-timeline-activity-standard-flat-field-metadata.util");
const _computeworkflowautomatedtriggerstandardflatfieldmetadatautil = require("./compute-workflow-automated-trigger-standard-flat-field-metadata.util");
const _computeworkflowrunstandardflatfieldmetadatautil = require("./compute-workflow-run-standard-flat-field-metadata.util");
const _computeworkflowstandardflatfieldmetadatautil = require("./compute-workflow-standard-flat-field-metadata.util");
const _computeworkflowversionstandardflatfieldmetadatautil = require("./compute-workflow-version-standard-flat-field-metadata.util");
const _computeworkspacememberstandardflatfieldmetadatautil = require("./compute-workspace-member-standard-flat-field-metadata.util");
const STANDARD_FLAT_FIELD_METADATA_BUILDERS_BY_OBJECT_NAME = {
    attachment: _computeattachmentstandardflatfieldmetadatautil.buildAttachmentStandardFlatFieldMetadatas,
    blocklist: _computeblockliststandardflatfieldmetadatautil.buildBlocklistStandardFlatFieldMetadatas,
    calendarChannelEventAssociation: _computecalendarchanneleventassociationstandardflatfieldmetadatautil.buildCalendarChannelEventAssociationStandardFlatFieldMetadatas,
    calendarEventParticipant: _computecalendareventparticipantstandardflatfieldmetadatautil.buildCalendarEventParticipantStandardFlatFieldMetadatas,
    calendarEvent: _computecalendareventstandardflatfieldmetadatautil.buildCalendarEventStandardFlatFieldMetadatas,
    company: _computecompanystandardflatfieldmetadatautil.buildCompanyStandardFlatFieldMetadatas,
    dashboard: _computedashboardstandardflatfieldmetadatautil.buildDashboardStandardFlatFieldMetadatas,
    message: _computemessagestandardflatfieldmetadatautil.buildMessageStandardFlatFieldMetadatas,
    messageChannelMessageAssociation: _computemessagechannelmessageassociationstandardflatfieldmetadatautil.buildMessageChannelMessageAssociationStandardFlatFieldMetadatas,
    messageChannelMessageAssociationMessageFolder: _computemessagechannelmessageassociationmessagefolderstandardflatfieldmetadatautil.buildMessageChannelMessageAssociationMessageFolderStandardFlatFieldMetadatas,
    messageParticipant: _computemessageparticipantstandardflatfieldmetadatautil.buildMessageParticipantStandardFlatFieldMetadatas,
    messageThread: _computemessagethreadstandardflatfieldmetadatautil.buildMessageThreadStandardFlatFieldMetadatas,
    note: _computenotestandardflatfieldmetadatautil.buildNoteStandardFlatFieldMetadatas,
    noteTarget: _computenotetargetstandardflatfieldmetadatautil.buildNoteTargetStandardFlatFieldMetadatas,
    opportunity: _computeopportunitystandardflatfieldmetadatautil.buildOpportunityStandardFlatFieldMetadatas,
    person: _computepersonstandardflatfieldmetadatautil.buildPersonStandardFlatFieldMetadatas,
    task: _computetaskstandardflatfieldmetadatautil.buildTaskStandardFlatFieldMetadatas,
    taskTarget: _computetasktargetstandardflatfieldmetadatautil.buildTaskTargetStandardFlatFieldMetadatas,
    timelineActivity: _computetimelineactivitystandardflatfieldmetadatautil.buildTimelineActivityStandardFlatFieldMetadatas,
    workflow: _computeworkflowstandardflatfieldmetadatautil.buildWorkflowStandardFlatFieldMetadatas,
    workflowAutomatedTrigger: _computeworkflowautomatedtriggerstandardflatfieldmetadatautil.buildWorkflowAutomatedTriggerStandardFlatFieldMetadatas,
    workflowRun: _computeworkflowrunstandardflatfieldmetadatautil.buildWorkflowRunStandardFlatFieldMetadatas,
    workflowVersion: _computeworkflowversionstandardflatfieldmetadatautil.buildWorkflowVersionStandardFlatFieldMetadatas,
    workspaceMember: _computeworkspacememberstandardflatfieldmetadatautil.buildWorkspaceMemberStandardFlatFieldMetadatas
};
const buildStandardFlatFieldMetadataMaps = (args)=>{
    const allFieldMetadatas = Object.keys(STANDARD_FLAT_FIELD_METADATA_BUILDERS_BY_OBJECT_NAME).flatMap((objectName)=>{
        const builder = STANDARD_FLAT_FIELD_METADATA_BUILDERS_BY_OBJECT_NAME[objectName];
        const result = builder({
            ...args,
            objectName
        });
        return Object.values(result);
    });
    let flatFieldMetadataMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    for (const fieldMetadata of allFieldMetadatas){
        flatFieldMetadataMaps = (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
            flatEntity: fieldMetadata,
            flatEntityMaps: flatFieldMetadataMaps
        });
    }
    return flatFieldMetadataMaps;
};

//# sourceMappingURL=build-standard-flat-field-metadata-maps.util.js.map