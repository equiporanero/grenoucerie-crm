"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "workspaceMigrationBuilderRestApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return workspaceMigrationBuilderRestApiExceptionHandler;
    }
});
const _buildmetadatavalidationerrorpayloadutil = require("./build-metadata-validation-error-payload.util");
const _translateuserfriendlymessagedescriptorsutil = require("../../../../core-modules/i18n/utils/translate-user-friendly-message-descriptors.util");
const workspaceMigrationBuilderRestApiExceptionHandler = ({ exception, response, i18n })=>{
    const payload = (0, _translateuserfriendlymessagedescriptorsutil.translateUserFriendlyMessageDescriptors)((0, _buildmetadatavalidationerrorpayloadutil.buildMetadataValidationErrorPayload)(exception), i18n);
    return response.status(400).json({
        statusCode: 400,
        error: 'METADATA_VALIDATION_ERROR',
        message: exception.message || 'Validation failed',
        ...payload
    });
};

//# sourceMappingURL=workspace-migration-builder-rest-api-exception-handler.util.js.map