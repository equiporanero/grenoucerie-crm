"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "objectMetadataGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return objectMetadataGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _objectmetadataexception = require("../object-metadata.exception");
const _invalidmetadataexception = require("../../utils/exceptions/invalid-metadata.exception");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationbuildergraphqlapiexceptionhandlerutil = require("../../../workspace-manager/workspace-migration/interceptors/utils/workspace-migration-builder-graphql-api-exception-handler.util");
const objectMetadataGraphqlApiExceptionHandler = (error)=>{
    if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
        return (0, _workspacemigrationbuildergraphqlapiexceptionhandlerutil.workspaceMigrationBuilderGraphqlApiExceptionHandler)(error);
    }
    if (error instanceof _invalidmetadataexception.InvalidMetadataException) {
        throw new _graphqlerrorsutil.UserInputError(error);
    }
    if (error instanceof _objectmetadataexception.ObjectMetadataException) {
        switch(error.code){
            case _objectmetadataexception.ObjectMetadataExceptionCode.OBJECT_METADATA_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error);
            case _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT:
                throw new _graphqlerrorsutil.UserInputError(error);
            case _objectmetadataexception.ObjectMetadataExceptionCode.OBJECT_MUTATION_NOT_ALLOWED:
            case _objectmetadataexception.ObjectMetadataExceptionCode.NAME_CONFLICT:
                throw new _graphqlerrorsutil.ForbiddenError(error);
            case _objectmetadataexception.ObjectMetadataExceptionCode.OBJECT_ALREADY_EXISTS:
                throw new _graphqlerrorsutil.ConflictError(error);
            case _objectmetadataexception.ObjectMetadataExceptionCode.INTERNAL_SERVER_ERROR:
            case _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_ORM_OUTPUT:
                throw new _graphqlerrorsutil.InternalServerError(error);
            case _objectmetadataexception.ObjectMetadataExceptionCode.MISSING_CUSTOM_OBJECT_DEFAULT_LABEL_IDENTIFIER_FIELD:
            case _objectmetadataexception.ObjectMetadataExceptionCode.APPLICATION_NOT_FOUND:
                throw error;
            case _objectmetadataexception.ObjectMetadataExceptionCode.MISSING_SYSTEM_FIELD:
            case _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_SYSTEM_FIELD:
                throw new _graphqlerrorsutil.UserInputError(error);
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    throw error;
};

//# sourceMappingURL=object-metadata-graphql-api-exception-handler.util.js.map