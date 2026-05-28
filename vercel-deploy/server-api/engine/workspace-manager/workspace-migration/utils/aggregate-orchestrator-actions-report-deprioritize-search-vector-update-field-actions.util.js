"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "aggregateOrchestratorActionsReportDeprioritizeSearchVectorUpdateFieldActions", {
    enumerable: true,
    get: function() {
        return aggregateOrchestratorActionsReportDeprioritizeSearchVectorUpdateFieldActions;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _searchvectorfieldconstants = require("../../../metadata-modules/search-field-metadata/constants/search-vector-field.constants");
const aggregateOrchestratorActionsReportDeprioritizeSearchVectorUpdateFieldActions = ({ orchestratorActionsReport, flatFieldMetadataMaps })=>{
    (0, _utils.assertIsDefinedOrThrow)(flatFieldMetadataMaps);
    const updateFieldActions = orchestratorActionsReport.fieldMetadata.update;
    const { searchVectorUpdateFieldActions, otherUpdateFieldActions } = updateFieldActions.reduce((acc, updateFieldAction)=>{
        const flatFieldMetadata = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            flatEntityMaps: flatFieldMetadataMaps,
            universalIdentifier: updateFieldAction.universalIdentifier
        });
        const isSearchVectorUpdateFieldAction = flatFieldMetadata.name === _searchvectorfieldconstants.SEARCH_VECTOR_FIELD.name;
        if (isSearchVectorUpdateFieldAction) {
            return {
                ...acc,
                searchVectorUpdateFieldActions: [
                    ...acc.searchVectorUpdateFieldActions,
                    updateFieldAction
                ]
            };
        }
        return {
            ...acc,
            otherUpdateFieldActions: [
                ...acc.otherUpdateFieldActions,
                updateFieldAction
            ]
        };
    }, {
        searchVectorUpdateFieldActions: [],
        otherUpdateFieldActions: []
    });
    return {
        ...orchestratorActionsReport,
        fieldMetadata: {
            ...orchestratorActionsReport.fieldMetadata,
            update: [
                ...otherUpdateFieldActions,
                ...searchVectorUpdateFieldActions
            ]
        }
    };
};

//# sourceMappingURL=aggregate-orchestrator-actions-report-deprioritize-search-vector-update-field-actions.util.js.map