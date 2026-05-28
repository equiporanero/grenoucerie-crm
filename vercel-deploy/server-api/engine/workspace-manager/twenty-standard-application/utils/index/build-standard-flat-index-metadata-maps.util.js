"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildStandardFlatIndexMetadataMaps", {
    enumerable: true,
    get: function() {
        return buildStandardFlatIndexMetadataMaps;
    }
});
const _createemptyflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _computeattachmentstandardflatindexmetadatautil = require("./compute-attachment-standard-flat-index-metadata.util");
const _computeblockliststandardflatindexmetadatautil = require("./compute-blocklist-standard-flat-index-metadata.util");
const _computecalendarchanneleventassociationstandardflatindexmetadatautil = require("./compute-calendar-channel-event-association-standard-flat-index-metadata.util");
const _computecalendareventparticipantstandardflatindexmetadatautil = require("./compute-calendar-event-participant-standard-flat-index-metadata.util");
const _computecompanystandardflatindexmetadatautil = require("./compute-company-standard-flat-index-metadata.util");
const _computedashboardstandardflatindexmetadatautil = require("./compute-dashboard-standard-flat-index-metadata.util");
const _computemessagechannelmessageassociationmessagefolderstandardflatindexmetadatautil = require("./compute-message-channel-message-association-message-folder-standard-flat-index-metadata.util");
const _computemessagechannelmessageassociationstandardflatindexmetadatautil = require("./compute-message-channel-message-association-standard-flat-index-metadata.util");
const _computemessageparticipantstandardflatindexmetadatautil = require("./compute-message-participant-standard-flat-index-metadata.util");
const _computemessagestandardflatindexmetadatautil = require("./compute-message-standard-flat-index-metadata.util");
const _computenotestandardflatindexmetadatautil = require("./compute-note-standard-flat-index-metadata.util");
const _computenotetargetstandardflatindexmetadatautil = require("./compute-note-target-standard-flat-index-metadata.util");
const _computeopportunitystandardflatindexmetadatautil = require("./compute-opportunity-standard-flat-index-metadata.util");
const _computepersonstandardflatindexmetadatautil = require("./compute-person-standard-flat-index-metadata.util");
const _computetaskstandardflatindexmetadatautil = require("./compute-task-standard-flat-index-metadata.util");
const _computetasktargetstandardflatindexmetadatautil = require("./compute-task-target-standard-flat-index-metadata.util");
const _computetimelineactivitystandardflatindexmetadatautil = require("./compute-timeline-activity-standard-flat-index-metadata.util");
const _computeworkflowautomatedtriggerstandardflatindexmetadatautil = require("./compute-workflow-automated-trigger-standard-flat-index-metadata.util");
const _computeworkflowrunstandardflatindexmetadatautil = require("./compute-workflow-run-standard-flat-index-metadata.util");
const _computeworkflowstandardflatindexmetadatautil = require("./compute-workflow-standard-flat-index-metadata.util");
const _computeworkflowversionstandardflatindexmetadatautil = require("./compute-workflow-version-standard-flat-index-metadata.util");
const _computeworkspacememberstandardflatindexmetadatautil = require("./compute-workspace-member-standard-flat-index-metadata.util");
const STANDARD_FLAT_INDEX_METADATA_BUILDERS_BY_OBJECT_NAME = {
    attachment: _computeattachmentstandardflatindexmetadatautil.buildAttachmentStandardFlatIndexMetadatas,
    blocklist: _computeblockliststandardflatindexmetadatautil.buildBlocklistStandardFlatIndexMetadatas,
    calendarChannelEventAssociation: _computecalendarchanneleventassociationstandardflatindexmetadatautil.buildCalendarChannelEventAssociationStandardFlatIndexMetadatas,
    calendarEventParticipant: _computecalendareventparticipantstandardflatindexmetadatautil.buildCalendarEventParticipantStandardFlatIndexMetadatas,
    company: _computecompanystandardflatindexmetadatautil.buildCompanyStandardFlatIndexMetadatas,
    dashboard: _computedashboardstandardflatindexmetadatautil.buildDashboardStandardFlatIndexMetadatas,
    message: _computemessagestandardflatindexmetadatautil.buildMessageStandardFlatIndexMetadatas,
    messageChannelMessageAssociation: _computemessagechannelmessageassociationstandardflatindexmetadatautil.buildMessageChannelMessageAssociationStandardFlatIndexMetadatas,
    messageChannelMessageAssociationMessageFolder: _computemessagechannelmessageassociationmessagefolderstandardflatindexmetadatautil.buildMessageChannelMessageAssociationMessageFolderStandardFlatIndexMetadatas,
    messageParticipant: _computemessageparticipantstandardflatindexmetadatautil.buildMessageParticipantStandardFlatIndexMetadatas,
    note: _computenotestandardflatindexmetadatautil.buildNoteStandardFlatIndexMetadatas,
    noteTarget: _computenotetargetstandardflatindexmetadatautil.buildNoteTargetStandardFlatIndexMetadatas,
    opportunity: _computeopportunitystandardflatindexmetadatautil.buildOpportunityStandardFlatIndexMetadatas,
    person: _computepersonstandardflatindexmetadatautil.buildPersonStandardFlatIndexMetadatas,
    task: _computetaskstandardflatindexmetadatautil.buildTaskStandardFlatIndexMetadatas,
    taskTarget: _computetasktargetstandardflatindexmetadatautil.buildTaskTargetStandardFlatIndexMetadatas,
    timelineActivity: _computetimelineactivitystandardflatindexmetadatautil.buildTimelineActivityStandardFlatIndexMetadatas,
    workflow: _computeworkflowstandardflatindexmetadatautil.buildWorkflowStandardFlatIndexMetadatas,
    workflowAutomatedTrigger: _computeworkflowautomatedtriggerstandardflatindexmetadatautil.buildWorkflowAutomatedTriggerStandardFlatIndexMetadatas,
    workflowRun: _computeworkflowrunstandardflatindexmetadatautil.buildWorkflowRunStandardFlatIndexMetadatas,
    workflowVersion: _computeworkflowversionstandardflatindexmetadatautil.buildWorkflowVersionStandardFlatIndexMetadatas,
    workspaceMember: _computeworkspacememberstandardflatindexmetadatautil.buildWorkspaceMemberStandardFlatIndexMetadatas
};
const buildStandardFlatIndexMetadataMaps = (args)=>{
    const allIndexMetadatas = Object.keys(STANDARD_FLAT_INDEX_METADATA_BUILDERS_BY_OBJECT_NAME).flatMap((objectName)=>{
        const builder = STANDARD_FLAT_INDEX_METADATA_BUILDERS_BY_OBJECT_NAME[objectName];
        const result = builder({
            ...args,
            objectName
        });
        return Object.values(result);
    });
    let flatIndexMetadataMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    for (const indexMetadata of allIndexMetadatas){
        flatIndexMetadataMaps = (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
            flatEntity: indexMetadata,
            flatEntityMaps: flatIndexMetadataMaps
        });
    }
    return flatIndexMetadataMaps;
};

//# sourceMappingURL=build-standard-flat-index-metadata-maps.util.js.map