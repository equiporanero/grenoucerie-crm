"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "permissionGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return permissionGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _permissionsexception = require("../permissions.exception");
const permissionGraphqlApiExceptionHandler = (error)=>{
    switch(error.code){
        case _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED:
            throw new _graphqlerrorsutil.ForbiddenError(error.message, {
                userFriendlyMessage: /*i18n*/ {
                    id: "Sl1ElS",
                    message: "User does not have permission."
                },
                subCode: error.code
            });
        case _permissionsexception.PermissionsExceptionCode.NO_AUTHENTICATION_CONTEXT:
            throw new _graphqlerrorsutil.ForbiddenError(error.message, {
                userFriendlyMessage: /*i18n*/ {
                    id: "/BipSk",
                    message: "No valid authentication context found."
                },
                subCode: error.code
            });
        case _permissionsexception.PermissionsExceptionCode.ROLE_LABEL_ALREADY_EXISTS:
            throw new _graphqlerrorsutil.ForbiddenError(error);
        case _permissionsexception.PermissionsExceptionCode.CANNOT_UNASSIGN_LAST_ADMIN:
        case _permissionsexception.PermissionsExceptionCode.CANNOT_UPDATE_SELF_ROLE:
        case _permissionsexception.PermissionsExceptionCode.CANNOT_DELETE_LAST_ADMIN_USER:
        case _permissionsexception.PermissionsExceptionCode.ROLE_NOT_EDITABLE:
        case _permissionsexception.PermissionsExceptionCode.CANNOT_ADD_OBJECT_PERMISSION_ON_SYSTEM_OBJECT:
        case _permissionsexception.PermissionsExceptionCode.CANNOT_ADD_FIELD_PERMISSION_ON_SYSTEM_OBJECT:
            throw new _graphqlerrorsutil.ForbiddenError(error);
        case _permissionsexception.PermissionsExceptionCode.INVALID_ARG:
        case _permissionsexception.PermissionsExceptionCode.INVALID_SETTING:
        case _permissionsexception.PermissionsExceptionCode.CANNOT_GIVE_WRITING_PERMISSION_ON_NON_READABLE_OBJECT:
        case _permissionsexception.PermissionsExceptionCode.CANNOT_GIVE_WRITING_PERMISSION_WITHOUT_READING_PERMISSION:
        case _permissionsexception.PermissionsExceptionCode.ONLY_FIELD_RESTRICTION_ALLOWED:
        case _permissionsexception.PermissionsExceptionCode.FIELD_RESTRICTION_ONLY_ALLOWED_ON_READABLE_OBJECT:
        case _permissionsexception.PermissionsExceptionCode.FIELD_RESTRICTION_ON_UPDATE_ONLY_ALLOWED_ON_UPDATABLE_OBJECT:
        case _permissionsexception.PermissionsExceptionCode.EMPTY_FIELD_PERMISSION_NOT_ALLOWED:
        case _permissionsexception.PermissionsExceptionCode.ROLE_MUST_HAVE_AT_LEAST_ONE_TARGET:
        case _permissionsexception.PermissionsExceptionCode.ROLE_CANNOT_BE_ASSIGNED_TO_USERS:
        case _permissionsexception.PermissionsExceptionCode.ROLE_CANNOT_BE_ASSIGNED_TO_API_KEYS:
        case _permissionsexception.PermissionsExceptionCode.ROLE_CANNOT_BE_ASSIGNED_TO_AGENTS:
            throw new _graphqlerrorsutil.UserInputError(error);
        case _permissionsexception.PermissionsExceptionCode.ROLE_NOT_FOUND:
        case _permissionsexception.PermissionsExceptionCode.OBJECT_METADATA_NOT_FOUND:
        case _permissionsexception.PermissionsExceptionCode.FIELD_METADATA_NOT_FOUND:
        case _permissionsexception.PermissionsExceptionCode.FIELD_PERMISSION_NOT_FOUND:
        case _permissionsexception.PermissionsExceptionCode.PERMISSION_NOT_FOUND:
            throw new _graphqlerrorsutil.NotFoundError(error);
        case _permissionsexception.PermissionsExceptionCode.UPSERT_FIELD_PERMISSION_FAILED:
        case _permissionsexception.PermissionsExceptionCode.DEFAULT_ROLE_NOT_FOUND:
        case _permissionsexception.PermissionsExceptionCode.WORKSPACE_ID_ROLE_USER_WORKSPACE_MISMATCH:
        case _permissionsexception.PermissionsExceptionCode.TOO_MANY_ADMIN_CANDIDATES:
        case _permissionsexception.PermissionsExceptionCode.USER_WORKSPACE_ALREADY_HAS_ROLE:
        case _permissionsexception.PermissionsExceptionCode.ADMIN_ROLE_NOT_FOUND:
        case _permissionsexception.PermissionsExceptionCode.DEFAULT_ROLE_CANNOT_BE_DELETED:
        case _permissionsexception.PermissionsExceptionCode.WORKSPACE_MEMBER_NOT_FOUND:
        case _permissionsexception.PermissionsExceptionCode.UNKNOWN_OPERATION_NAME:
        case _permissionsexception.PermissionsExceptionCode.UNKNOWN_REQUIRED_PERMISSION:
        case _permissionsexception.PermissionsExceptionCode.NO_ROLE_FOUND_FOR_USER_WORKSPACE:
        case _permissionsexception.PermissionsExceptionCode.NO_PERMISSIONS_FOUND_IN_DATASOURCE:
        case _permissionsexception.PermissionsExceptionCode.METHOD_NOT_ALLOWED:
        case _permissionsexception.PermissionsExceptionCode.RAW_SQL_NOT_ALLOWED:
        case _permissionsexception.PermissionsExceptionCode.OBJECT_PERMISSION_NOT_FOUND:
        case _permissionsexception.PermissionsExceptionCode.API_KEY_ROLE_NOT_FOUND:
        case _permissionsexception.PermissionsExceptionCode.JOIN_COLUMN_NAME_REQUIRED:
        case _permissionsexception.PermissionsExceptionCode.COMPOSITE_TYPE_NOT_FOUND:
        case _permissionsexception.PermissionsExceptionCode.USER_WORKSPACE_NOT_FOUND:
        case _permissionsexception.PermissionsExceptionCode.APPLICATION_ROLE_NOT_FOUND:
        case _permissionsexception.PermissionsExceptionCode.ROLE_BELONGS_TO_ANOTHER_APPLICATION:
            throw error;
        default:
            {
                return (0, _utils.assertUnreachable)(error.code);
            }
    }
};

//# sourceMappingURL=permission-graphql-api-exception-handler.util.js.map