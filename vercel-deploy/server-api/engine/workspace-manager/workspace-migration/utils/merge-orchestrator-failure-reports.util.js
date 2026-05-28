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
    get mergeOrchestratorFailureReports () {
        return mergeOrchestratorFailureReports;
    },
    get pushToOrchestratorFailureReport () {
        return pushToOrchestratorFailureReport;
    }
});
const _metadata = require("twenty-shared/metadata");
const pushToOrchestratorFailureReport = ({ report, metadataName, items })=>{
    report[metadataName].push(...items);
};
const mergeOrchestratorFailureReports = ({ target, source })=>{
    for (const metadataName of Object.values(_metadata.ALL_METADATA_NAME)){
        pushToOrchestratorFailureReport({
            report: target,
            metadataName,
            items: source[metadataName]
        });
    }
};

//# sourceMappingURL=merge-orchestrator-failure-reports.util.js.map