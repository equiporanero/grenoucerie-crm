"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "indexMetadataGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return indexMetadataGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _indexfieldmetadataexception = require("../index-field-metadata.exception");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationbuildergraphqlapiexceptionhandlerutil = require("../../../workspace-manager/workspace-migration/interceptors/utils/workspace-migration-builder-graphql-api-exception-handler.util");
const indexMetadataGraphqlApiExceptionHandler = (error)=>{
    if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
        return (0, _workspacemigrationbuildergraphqlapiexceptionhandlerutil.workspaceMigrationBuilderGraphqlApiExceptionHandler)(error);
    }
    if (error instanceof _indexfieldmetadataexception.IndexMetadataException) {
        switch(error.code){
            case _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_OBJECT_NOT_FOUND:
            case _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error);
            case _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_FIELDS_REQUIRED:
            case _indexfieldmetadataexception.IndexMetadataExceptionCode.DUPLICATE_INDEX_FIELDS:
            case _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_FIELD_NOT_FOUND_ON_OBJECT:
            case _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_NOT_SUPPORTED_FOR_COMPOSITE_FIELD:
            case _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_NOT_SUPPORTED_FOR_MORH_RELATION_FIELD_AND_RELATION_FIELD:
            case _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_TYPE_NOT_SUPPORTED_FOR_FIELD_TYPE:
            case _indexfieldmetadataexception.IndexMetadataExceptionCode.DUPLICATE_UNIQUE_INDEX:
                throw new _graphqlerrorsutil.UserInputError(error);
            case _indexfieldmetadataexception.IndexMetadataExceptionCode.CANNOT_DELETE_SYSTEM_INDEX:
                throw new _graphqlerrorsutil.ForbiddenError(error);
            case _indexfieldmetadataexception.IndexMetadataExceptionCode.CUSTOM_INDEX_LIMIT_REACHED:
                throw new _graphqlerrorsutil.ConflictError(error);
            case _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_CREATION_FAILED:
                throw new _graphqlerrorsutil.InternalServerError(error);
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    throw error;
};

//# sourceMappingURL=index-metadata-graphql-api-exception-handler.util.js.map