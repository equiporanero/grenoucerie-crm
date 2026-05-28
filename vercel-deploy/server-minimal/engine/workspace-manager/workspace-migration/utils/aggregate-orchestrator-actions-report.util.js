"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "aggregateOrchestratorActionsReport", {
    enumerable: true,
    get: function() {
        return aggregateOrchestratorActionsReport;
    }
});
const _aggregatenonrelationfieldsintoobjectactionsutil = require("./aggregate-non-relation-fields-into-object-actions.util");
const _aggregateorchestratoractionsreportdeprioritizesearchvectorupdatefieldactionsutil = require("./aggregate-orchestrator-actions-report-deprioritize-search-vector-update-field-actions.util");
const _aggregaterelationfieldpairsutil = require("./aggregate-relation-field-pairs.util");
const aggregateOrchestratorActionsReport = ({ orchestratorActionsReport, flatFieldMetadataMaps })=>{
    const aggregatedOrchestratorActionsReport = [
        _aggregatenonrelationfieldsintoobjectactionsutil.aggregateNonRelationFieldsIntoObjectActions,
        _aggregaterelationfieldpairsutil.aggregateRelationFieldPairs,
        _aggregateorchestratoractionsreportdeprioritizesearchvectorupdatefieldactionsutil.aggregateOrchestratorActionsReportDeprioritizeSearchVectorUpdateFieldActions
    ].reduce((currentOrchestratorActionsReport, aggregator)=>aggregator({
            orchestratorActionsReport: currentOrchestratorActionsReport,
            flatFieldMetadataMaps
        }), orchestratorActionsReport);
    return {
        aggregatedOrchestratorActionsReport
    };
};

//# sourceMappingURL=aggregate-orchestrator-actions-report.util.js.map