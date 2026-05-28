"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EngineComponentKey", {
    enumerable: true,
    get: function() {
        return EngineComponentKey;
    }
});
const _graphql = require("@nestjs/graphql");
var EngineComponentKey = /*#__PURE__*/ function(EngineComponentKey) {
    EngineComponentKey["NAVIGATE_TO_NEXT_RECORD"] = "NAVIGATE_TO_NEXT_RECORD";
    EngineComponentKey["NAVIGATE_TO_PREVIOUS_RECORD"] = "NAVIGATE_TO_PREVIOUS_RECORD";
    EngineComponentKey["CREATE_NEW_RECORD"] = "CREATE_NEW_RECORD";
    EngineComponentKey["DELETE_RECORDS"] = "DELETE_RECORDS";
    EngineComponentKey["RESTORE_RECORDS"] = "RESTORE_RECORDS";
    EngineComponentKey["DESTROY_RECORDS"] = "DESTROY_RECORDS";
    EngineComponentKey["ADD_TO_FAVORITES"] = "ADD_TO_FAVORITES";
    EngineComponentKey["REMOVE_FROM_FAVORITES"] = "REMOVE_FROM_FAVORITES";
    EngineComponentKey["EXPORT_NOTE_TO_PDF"] = "EXPORT_NOTE_TO_PDF";
    EngineComponentKey["EXPORT_RECORDS"] = "EXPORT_RECORDS";
    EngineComponentKey["UPDATE_MULTIPLE_RECORDS"] = "UPDATE_MULTIPLE_RECORDS";
    EngineComponentKey["MERGE_MULTIPLE_RECORDS"] = "MERGE_MULTIPLE_RECORDS";
    EngineComponentKey["IMPORT_RECORDS"] = "IMPORT_RECORDS";
    EngineComponentKey["EXPORT_VIEW"] = "EXPORT_VIEW";
    EngineComponentKey["SEE_DELETED_RECORDS"] = "SEE_DELETED_RECORDS";
    EngineComponentKey["CREATE_NEW_VIEW"] = "CREATE_NEW_VIEW";
    EngineComponentKey["HIDE_DELETED_RECORDS"] = "HIDE_DELETED_RECORDS";
    EngineComponentKey["EDIT_RECORD_PAGE_LAYOUT"] = "EDIT_RECORD_PAGE_LAYOUT";
    EngineComponentKey["EDIT_DASHBOARD_LAYOUT"] = "EDIT_DASHBOARD_LAYOUT";
    EngineComponentKey["SAVE_DASHBOARD_LAYOUT"] = "SAVE_DASHBOARD_LAYOUT";
    EngineComponentKey["CANCEL_DASHBOARD_LAYOUT"] = "CANCEL_DASHBOARD_LAYOUT";
    EngineComponentKey["DUPLICATE_DASHBOARD"] = "DUPLICATE_DASHBOARD";
    EngineComponentKey["ACTIVATE_WORKFLOW"] = "ACTIVATE_WORKFLOW";
    EngineComponentKey["DEACTIVATE_WORKFLOW"] = "DEACTIVATE_WORKFLOW";
    EngineComponentKey["DISCARD_DRAFT_WORKFLOW"] = "DISCARD_DRAFT_WORKFLOW";
    EngineComponentKey["TEST_WORKFLOW"] = "TEST_WORKFLOW";
    EngineComponentKey["SEE_ACTIVE_VERSION_WORKFLOW"] = "SEE_ACTIVE_VERSION_WORKFLOW";
    EngineComponentKey["SEE_RUNS_WORKFLOW"] = "SEE_RUNS_WORKFLOW";
    EngineComponentKey["SEE_VERSIONS_WORKFLOW"] = "SEE_VERSIONS_WORKFLOW";
    EngineComponentKey["ADD_NODE_WORKFLOW"] = "ADD_NODE_WORKFLOW";
    EngineComponentKey["TIDY_UP_WORKFLOW"] = "TIDY_UP_WORKFLOW";
    EngineComponentKey["DUPLICATE_WORKFLOW"] = "DUPLICATE_WORKFLOW";
    EngineComponentKey["SEE_VERSION_WORKFLOW_RUN"] = "SEE_VERSION_WORKFLOW_RUN";
    EngineComponentKey["SEE_WORKFLOW_WORKFLOW_RUN"] = "SEE_WORKFLOW_WORKFLOW_RUN";
    EngineComponentKey["STOP_WORKFLOW_RUN"] = "STOP_WORKFLOW_RUN";
    EngineComponentKey["SEE_RUNS_WORKFLOW_VERSION"] = "SEE_RUNS_WORKFLOW_VERSION";
    EngineComponentKey["SEE_WORKFLOW_WORKFLOW_VERSION"] = "SEE_WORKFLOW_WORKFLOW_VERSION";
    EngineComponentKey["USE_AS_DRAFT_WORKFLOW_VERSION"] = "USE_AS_DRAFT_WORKFLOW_VERSION";
    EngineComponentKey["SEE_VERSIONS_WORKFLOW_VERSION"] = "SEE_VERSIONS_WORKFLOW_VERSION";
    EngineComponentKey["SEARCH_RECORDS"] = "SEARCH_RECORDS";
    EngineComponentKey["SEARCH_RECORDS_FALLBACK"] = "SEARCH_RECORDS_FALLBACK";
    EngineComponentKey["ASK_AI"] = "ASK_AI";
    EngineComponentKey["VIEW_PREVIOUS_AI_CHATS"] = "VIEW_PREVIOUS_AI_CHATS";
    EngineComponentKey["NAVIGATION"] = "NAVIGATION";
    EngineComponentKey["TRIGGER_WORKFLOW_VERSION"] = "TRIGGER_WORKFLOW_VERSION";
    EngineComponentKey["FRONT_COMPONENT_RENDERER"] = "FRONT_COMPONENT_RENDERER";
    EngineComponentKey["REPLY_TO_EMAIL_THREAD"] = "REPLY_TO_EMAIL_THREAD";
    EngineComponentKey["COMPOSE_EMAIL"] = "COMPOSE_EMAIL";
    // TODO: Remove deprecated keys once upgrade:1-21:refactor-navigation-commands has run on all workspaces
    // Deprecated: replaced by NAVIGATION engine key with payload
    EngineComponentKey["GO_TO_PEOPLE"] = "GO_TO_PEOPLE";
    EngineComponentKey["GO_TO_COMPANIES"] = "GO_TO_COMPANIES";
    EngineComponentKey["GO_TO_DASHBOARDS"] = "GO_TO_DASHBOARDS";
    EngineComponentKey["GO_TO_OPPORTUNITIES"] = "GO_TO_OPPORTUNITIES";
    EngineComponentKey["GO_TO_SETTINGS"] = "GO_TO_SETTINGS";
    EngineComponentKey["GO_TO_TASKS"] = "GO_TO_TASKS";
    EngineComponentKey["GO_TO_NOTES"] = "GO_TO_NOTES";
    EngineComponentKey["GO_TO_WORKFLOWS"] = "GO_TO_WORKFLOWS";
    EngineComponentKey["GO_TO_RUNS"] = "GO_TO_RUNS";
    // Deprecated keys kept for backward compatibility until migration runs
    EngineComponentKey["DELETE_SINGLE_RECORD"] = "DELETE_SINGLE_RECORD";
    EngineComponentKey["DELETE_MULTIPLE_RECORDS"] = "DELETE_MULTIPLE_RECORDS";
    EngineComponentKey["RESTORE_SINGLE_RECORD"] = "RESTORE_SINGLE_RECORD";
    EngineComponentKey["RESTORE_MULTIPLE_RECORDS"] = "RESTORE_MULTIPLE_RECORDS";
    EngineComponentKey["DESTROY_SINGLE_RECORD"] = "DESTROY_SINGLE_RECORD";
    EngineComponentKey["DESTROY_MULTIPLE_RECORDS"] = "DESTROY_MULTIPLE_RECORDS";
    EngineComponentKey["EXPORT_FROM_RECORD_INDEX"] = "EXPORT_FROM_RECORD_INDEX";
    EngineComponentKey["EXPORT_FROM_RECORD_SHOW"] = "EXPORT_FROM_RECORD_SHOW";
    EngineComponentKey["EXPORT_MULTIPLE_RECORDS"] = "EXPORT_MULTIPLE_RECORDS";
    return EngineComponentKey;
}({});
(0, _graphql.registerEnumType)(EngineComponentKey, {
    name: 'EngineComponentKey'
});

//# sourceMappingURL=engine-component-key.enum.js.map