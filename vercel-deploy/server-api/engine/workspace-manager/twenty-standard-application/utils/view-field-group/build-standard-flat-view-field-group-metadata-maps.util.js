"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildStandardFlatViewFieldGroupMetadataMaps", {
    enumerable: true,
    get: function() {
        return buildStandardFlatViewFieldGroupMetadataMaps;
    }
});
const _createemptyflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _computestandardblocklistviewfieldgroupsutil = require("./compute-standard-blocklist-view-field-groups.util");
const _computestandardcalendarchanneleventassociationviewfieldgroupsutil = require("./compute-standard-calendar-channel-event-association-view-field-groups.util");
const _computestandardcalendareventparticipantviewfieldgroupsutil = require("./compute-standard-calendar-event-participant-view-field-groups.util");
const _computestandardcompanyviewfieldgroupsutil = require("./compute-standard-company-view-field-groups.util");
const _computestandardmessagechannelmessageassociationviewfieldgroupsutil = require("./compute-standard-message-channel-message-association-view-field-groups.util");
const _computestandardmessagechannelmessageassociationmessagefolderviewfieldgroupsutil = require("./compute-standard-message-channel-message-association-message-folder-view-field-groups.util");
const _computestandardmessageparticipantviewfieldgroupsutil = require("./compute-standard-message-participant-view-field-groups.util");
const _computestandardnoteviewfieldgroupsutil = require("./compute-standard-note-view-field-groups.util");
const _computestandardopportunityviewfieldgroupsutil = require("./compute-standard-opportunity-view-field-groups.util");
const _computestandardpersonviewfieldgroupsutil = require("./compute-standard-person-view-field-groups.util");
const _computestandardtaskviewfieldgroupsutil = require("./compute-standard-task-view-field-groups.util");
const _computestandardworkflowautomatedtriggerviewfieldgroupsutil = require("./compute-standard-workflow-automated-trigger-view-field-groups.util");
const _computestandardworkflowrunviewfieldgroupsutil = require("./compute-standard-workflow-run-view-field-groups.util");
const _computestandardworkflowversionviewfieldgroupsutil = require("./compute-standard-workflow-version-view-field-groups.util");
const STANDARD_FLAT_VIEW_FIELD_GROUP_METADATA_BUILDERS_BY_OBJECT_NAME = {
    blocklist: _computestandardblocklistviewfieldgroupsutil.computeStandardBlocklistViewFieldGroups,
    calendarChannelEventAssociation: _computestandardcalendarchanneleventassociationviewfieldgroupsutil.computeStandardCalendarChannelEventAssociationViewFieldGroups,
    calendarEventParticipant: _computestandardcalendareventparticipantviewfieldgroupsutil.computeStandardCalendarEventParticipantViewFieldGroups,
    company: _computestandardcompanyviewfieldgroupsutil.computeStandardCompanyViewFieldGroups,
    messageChannelMessageAssociation: _computestandardmessagechannelmessageassociationviewfieldgroupsutil.computeStandardMessageChannelMessageAssociationViewFieldGroups,
    messageChannelMessageAssociationMessageFolder: _computestandardmessagechannelmessageassociationmessagefolderviewfieldgroupsutil.computeStandardMessageChannelMessageAssociationMessageFolderViewFieldGroups,
    messageParticipant: _computestandardmessageparticipantviewfieldgroupsutil.computeStandardMessageParticipantViewFieldGroups,
    note: _computestandardnoteviewfieldgroupsutil.computeStandardNoteViewFieldGroups,
    opportunity: _computestandardopportunityviewfieldgroupsutil.computeStandardOpportunityViewFieldGroups,
    person: _computestandardpersonviewfieldgroupsutil.computeStandardPersonViewFieldGroups,
    task: _computestandardtaskviewfieldgroupsutil.computeStandardTaskViewFieldGroups,
    workflowAutomatedTrigger: _computestandardworkflowautomatedtriggerviewfieldgroupsutil.computeStandardWorkflowAutomatedTriggerViewFieldGroups,
    workflowRun: _computestandardworkflowrunviewfieldgroupsutil.computeStandardWorkflowRunViewFieldGroups,
    workflowVersion: _computestandardworkflowversionviewfieldgroupsutil.computeStandardWorkflowVersionViewFieldGroups
};
const buildStandardFlatViewFieldGroupMetadataMaps = (args)=>{
    const allViewFieldGroupMetadatas = Object.keys(STANDARD_FLAT_VIEW_FIELD_GROUP_METADATA_BUILDERS_BY_OBJECT_NAME).flatMap((objectName)=>{
        const builder = STANDARD_FLAT_VIEW_FIELD_GROUP_METADATA_BUILDERS_BY_OBJECT_NAME[objectName];
        const result = builder({
            ...args,
            objectName
        });
        return Object.values(result);
    });
    let flatViewFieldGroupMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    for (const viewFieldGroupMetadata of allViewFieldGroupMetadatas){
        flatViewFieldGroupMaps = (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
            flatEntity: viewFieldGroupMetadata,
            flatEntityMaps: flatViewFieldGroupMaps
        });
    }
    return flatViewFieldGroupMaps;
};

//# sourceMappingURL=build-standard-flat-view-field-group-metadata-maps.util.js.map