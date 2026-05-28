"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildMetadataValidationErrorPayload", {
    enumerable: true,
    get: function() {
        return buildMetadataValidationErrorPayload;
    }
});
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const MANY_VALIDATION_ERRORS_MESSAGE = /*i18n*/ {
    id: "Mwvtvf",
    message: "Many validation errors"
};
const METADATA_VALIDATION_FAILED_MESSAGE = /*i18n*/ {
    id: "PslTPV",
    message: "Metadata validation failed"
};
const getMetadataValidationUserFriendlyMessage = (metadataValidation)=>{
    if (metadataValidation.summary.totalErrors > 1) {
        return MANY_VALIDATION_ERRORS_MESSAGE;
    }
    for (const metadataName of Object.values(_metadata.ALL_METADATA_NAME)){
        const failedValidations = metadataValidation.errors[metadataName];
        if (!(0, _utils.isDefined)(failedValidations) || failedValidations.length === 0) {
            continue;
        }
        for (const failedValidation of failedValidations){
            for (const validationError of failedValidation.errors){
                if ((0, _utils.isDefined)(validationError.userFriendlyMessage)) {
                    return validationError.userFriendlyMessage;
                }
            }
        }
    }
    return METADATA_VALIDATION_FAILED_MESSAGE;
};
const buildMetadataValidationErrorPayload = (exception)=>{
    const { report } = exception.failedWorkspaceMigrationBuildResult;
    const { errors, summary } = Object.keys(report).reduce((acc, metadataName)=>{
        const failedMetadataValidation = report[metadataName];
        if (failedMetadataValidation.length === 0) {
            return acc;
        }
        return {
            errors: {
                ...acc.errors,
                [metadataName]: failedMetadataValidation
            },
            summary: {
                ...acc.summary,
                totalErrors: acc.summary.totalErrors + failedMetadataValidation.length,
                [metadataName]: failedMetadataValidation.length
            }
        };
    }, {
        errors: {},
        summary: {
            totalErrors: 0
        }
    });
    return {
        errors,
        summary,
        userFriendlyMessage: getMetadataValidationUserFriendlyMessage({
            errors,
            summary
        })
    };
};

//# sourceMappingURL=build-metadata-validation-error-payload.util.js.map