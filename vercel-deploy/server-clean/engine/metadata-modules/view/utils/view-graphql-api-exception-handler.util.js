"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "viewGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return viewGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _viewfieldgroupexception = require("../../view-field-group/exceptions/view-field-group.exception");
const _viewfieldexception = require("../../view-field/exceptions/view-field.exception");
const _viewfiltergroupexception = require("../../view-filter-group/exceptions/view-filter-group.exception");
const _viewfilterexception = require("../../view-filter/exceptions/view-filter.exception");
const _viewgroupexception = require("../../view-group/exceptions/view-group.exception");
const _viewsortexception = require("../../view-sort/exceptions/view-sort.exception");
const _viewexception = require("../exceptions/view.exception");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationbuildergraphqlapiexceptionhandlerutil = require("../../../workspace-manager/workspace-migration/interceptors/utils/workspace-migration-builder-graphql-api-exception-handler.util");
const viewGraphqlApiExceptionHandler = (error)=>{
    if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
        return (0, _workspacemigrationbuildergraphqlapiexceptionhandlerutil.workspaceMigrationBuilderGraphqlApiExceptionHandler)(error);
    }
    if (error instanceof _viewexception.ViewException) {
        switch(error.code){
            case _viewexception.ViewExceptionCode.VIEW_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _viewexception.ViewExceptionCode.INVALID_VIEW_DATA:
                throw new _graphqlerrorsutil.UserInputError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            case _viewexception.ViewExceptionCode.VIEW_CREATE_PERMISSION_DENIED:
                throw new _graphqlerrorsutil.ForbiddenError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            case _viewexception.ViewExceptionCode.VIEW_MODIFY_PERMISSION_DENIED:
                throw new _graphqlerrorsutil.ForbiddenError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            case _viewexception.ViewExceptionCode.VIEW_WIDGET_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    if (error instanceof _viewfieldexception.ViewFieldException) {
        switch(error.code){
            case _viewfieldexception.ViewFieldExceptionCode.VIEW_FIELD_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _viewfieldexception.ViewFieldExceptionCode.VIEW_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _viewfieldexception.ViewFieldExceptionCode.INVALID_VIEW_FIELD_DATA:
                throw new _graphqlerrorsutil.UserInputError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    if (error instanceof _viewfieldgroupexception.ViewFieldGroupException) {
        switch(error.code){
            case _viewfieldgroupexception.ViewFieldGroupExceptionCode.VIEW_FIELD_GROUP_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _viewfieldgroupexception.ViewFieldGroupExceptionCode.VIEW_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _viewfieldgroupexception.ViewFieldGroupExceptionCode.FIELDS_WIDGET_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _viewfieldgroupexception.ViewFieldGroupExceptionCode.INVALID_VIEW_FIELD_GROUP_DATA:
                throw new _graphqlerrorsutil.UserInputError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    if (error instanceof _viewfilterexception.ViewFilterException) {
        switch(error.code){
            case _viewfilterexception.ViewFilterExceptionCode.VIEW_FILTER_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _viewfilterexception.ViewFilterExceptionCode.VIEW_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _viewfilterexception.ViewFilterExceptionCode.INVALID_VIEW_FILTER_DATA:
                throw new _graphqlerrorsutil.UserInputError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    if (error instanceof _viewfiltergroupexception.ViewFilterGroupException) {
        switch(error.code){
            case _viewfiltergroupexception.ViewFilterGroupExceptionCode.VIEW_FILTER_GROUP_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _viewfiltergroupexception.ViewFilterGroupExceptionCode.VIEW_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _viewfiltergroupexception.ViewFilterGroupExceptionCode.INVALID_VIEW_FILTER_GROUP_DATA:
                throw new _graphqlerrorsutil.UserInputError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            case _viewfiltergroupexception.ViewFilterGroupExceptionCode.CIRCULAR_DEPENDENCY:
                throw new _graphqlerrorsutil.UserInputError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            case _viewfiltergroupexception.ViewFilterGroupExceptionCode.MAX_DEPTH_EXCEEDED:
                throw new _graphqlerrorsutil.UserInputError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    if (error instanceof _viewgroupexception.ViewGroupException) {
        switch(error.code){
            case _viewgroupexception.ViewGroupExceptionCode.VIEW_GROUP_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _viewgroupexception.ViewGroupExceptionCode.VIEW_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _viewgroupexception.ViewGroupExceptionCode.INVALID_VIEW_GROUP_DATA:
                throw new _graphqlerrorsutil.UserInputError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            case _viewgroupexception.ViewGroupExceptionCode.MISSING_MAIN_GROUP_BY_FIELD_METADATA_ID:
                throw new _graphqlerrorsutil.InternalServerError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    if (error instanceof _viewsortexception.ViewSortException) {
        switch(error.code){
            case _viewsortexception.ViewSortExceptionCode.VIEW_SORT_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _viewsortexception.ViewSortExceptionCode.VIEW_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _viewsortexception.ViewSortExceptionCode.INVALID_VIEW_SORT_DATA:
                throw new _graphqlerrorsutil.UserInputError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    throw error;
};

//# sourceMappingURL=view-graphql-api-exception-handler.util.js.map