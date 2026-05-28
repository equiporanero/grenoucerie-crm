"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "workspaceMigrationBuilderGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return workspaceMigrationBuilderGraphqlApiExceptionHandler;
    }
});
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const _pluralize = require("pluralize");
const _graphqlerrorsutil = require("../../../../core-modules/graphql/utils/graphql-errors.util");
const _buildmetadatavalidationerrorpayloadutil = require("./build-metadata-validation-error-payload.util");
const workspaceMigrationBuilderGraphqlApiExceptionHandler = (exception)=>{
    const payload = (0, _buildmetadatavalidationerrorpayloadutil.buildMetadataValidationErrorPayload)(exception);
    const validationSummaryMessage = `Validation failed for ${Object.values(_metadata.ALL_METADATA_NAME).flatMap((metadataName)=>{
        const count = payload.summary[metadataName];
        if (!(0, _utils.isDefined)(count) || count === 0) {
            return [];
        }
        return [
            `${count} ${count === 1 ? metadataName : (0, _pluralize.plural)(metadataName)}`
        ];
    }).join(', ')}`;
    throw new _graphqlerrorsutil.BaseGraphQLError(exception.message, _graphqlerrorsutil.ErrorCode.METADATA_VALIDATION_FAILED, {
        code: 'METADATA_VALIDATION_ERROR',
        ...payload,
        message: validationSummaryMessage
    });
};

//# sourceMappingURL=workspace-migration-builder-graphql-api-exception-handler.util.js.map