"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateUniversalIdentifierCrossEntityUniquenessThroughReportMutation", {
    enumerable: true,
    get: function() {
        return validateUniversalIdentifierCrossEntityUniquenessThroughReportMutation;
    }
});
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const _buildalluniversalidentifiermaputil = require("./build-all-universal-identifier-map.util");
const _mergeorchestratorfailurereportsutil = require("./merge-orchestrator-failure-reports.util");
const _getflatentityvalidationerrorutil = require("../workspace-migration-builder/builders/utils/get-flat-entity-validation-error.util");
const validateUniversalIdentifierCrossEntityUniquenessThroughReportMutation = ({ optimisticUniversalFlatMaps, orchestratorActionsReport, orchestratorFailureReport })=>{
    const allUniversalIdentifierMap = (0, _buildalluniversalidentifiermaputil.buildAllUniversalIdentifierMap)(optimisticUniversalFlatMaps);
    for (const metadataName of Object.values(_metadata.ALL_METADATA_NAME)){
        const createActions = orchestratorActionsReport[metadataName]?.create;
        if (!(0, _utils.isDefined)(createActions) || createActions.length === 0) {
            continue;
        }
        for (const createAction of createActions){
            const universalIdentifier = createAction.flatEntity.universalIdentifier;
            const existingOwner = allUniversalIdentifierMap.get(universalIdentifier);
            if (!existingOwner || existingOwner.metadataName === metadataName) {
                continue;
            }
            const failedValidation = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
                flatEntityMinimalInformation: {
                    universalIdentifier
                },
                metadataName,
                type: 'create'
            });
            failedValidation.errors.push({
                code: _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_ALREADY_EXISTS,
                message: `Cannot create ${metadataName}: universalIdentifier "${universalIdentifier}" is already taken by ${existingOwner.metadataName} from application "${existingOwner.applicationUniversalIdentifier}"`
            });
            (0, _mergeorchestratorfailurereportsutil.pushToOrchestratorFailureReport)({
                report: orchestratorFailureReport,
                metadataName,
                items: [
                    failedValidation
                ]
            });
        }
    }
};

//# sourceMappingURL=validate-universal-identifier-cross-entity-uniqueness-through-report-mutation.util.js.map