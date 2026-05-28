"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EMPTY_ORCHESTRATOR_FAILURE_REPORT", {
    enumerable: true,
    get: function() {
        return EMPTY_ORCHESTRATOR_FAILURE_REPORT;
    }
});
const _metadata = require("twenty-shared/metadata");
const EMPTY_ORCHESTRATOR_FAILURE_REPORT = ()=>Object.keys(_metadata.ALL_METADATA_NAME).reduce((orchestratorReport, metadataName)=>({
            ...orchestratorReport,
            [metadataName]: []
        }), {});

//# sourceMappingURL=empty-orchestrator-failure-report.constant.js.map