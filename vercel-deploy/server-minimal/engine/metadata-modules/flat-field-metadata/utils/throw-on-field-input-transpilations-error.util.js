"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "throwOnFieldInputTranspilationsError", {
    enumerable: true,
    get: function() {
        return throwOnFieldInputTranspilationsError;
    }
});
const _emptyorchestratorfailurereportconstant = require("../../../workspace-manager/workspace-migration/constant/empty-orchestrator-failure-report.constant");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const throwOnFieldInputTranspilationsError = (inputTranspilationResults, errorLabel)=>{
    const failedInputTranspilationErrors = inputTranspilationResults.flatMap((transpilationResult)=>transpilationResult.status === 'fail' ? transpilationResult.errors : []);
    if (failedInputTranspilationErrors.length > 0) {
        // We should create a dedicated exceptions instead of hacking through the WorkspaceMigrationBuilderException
        throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException({
            report: {
                ...(0, _emptyorchestratorfailurereportconstant.EMPTY_ORCHESTRATOR_FAILURE_REPORT)(),
                fieldMetadata: [
                    {
                        errors: failedInputTranspilationErrors,
                        type: 'create',
                        metadataName: 'fieldMetadata',
                        flatEntityMinimalInformation: {
                            id: ''
                        }
                    }
                ]
            },
            status: 'fail'
        }, errorLabel);
    }
};

//# sourceMappingURL=throw-on-field-input-transpilations-error.util.js.map