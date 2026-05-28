"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createEmptyOrchestratorActionsReport", {
    enumerable: true,
    get: function() {
        return createEmptyOrchestratorActionsReport;
    }
});
const _metadata = require("twenty-shared/metadata");
const _getmetadataemptyworkspacemigrationactionrecordutil = require("../utils/get-metadata-empty-workspace-migration-action-record.util");
const createEmptyOrchestratorActionsReport = ()=>Object.keys(_metadata.ALL_METADATA_NAME).reduce((orchestratorReport, metadataName)=>({
            ...orchestratorReport,
            [metadataName]: (0, _getmetadataemptyworkspacemigrationactionrecordutil.getMetadataEmptyWorkspaceMigrationActionRecord)(metadataName)
        }), {});

//# sourceMappingURL=empty-orchestrator-actions-report.constant.js.map