"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get PermissionsException () {
        return PermissionsException;
    },
    get PermissionsExceptionCode () {
        return PermissionsExceptionCode;
    },
    get PermissionsExceptionMessage () {
        return PermissionsExceptionMessage;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var PermissionsExceptionCode = /*#__PURE__*/ function(PermissionsExceptionCode) {
    PermissionsExceptionCode["PERMISSION_DENIED"] = "PERMISSION_DENIED";
    PermissionsExceptionCode["ADMIN_ROLE_NOT_FOUND"] = "ADMIN_ROLE_NOT_FOUND";
    PermissionsExceptionCode["USER_WORKSPACE_NOT_FOUND"] = "USER_WORKSPACE_NOT_FOUND";
    PermissionsExceptionCode["WORKSPACE_ID_ROLE_USER_WORKSPACE_MISMATCH"] = "WORKSPACE_ID_ROLE_USER_WORKSPACE_MISMATCH";
    PermissionsExceptionCode["TOO_MANY_ADMIN_CANDIDATES"] = "TOO_MANY_ADMIN_CANDIDATES";
    PermissionsExceptionCode["USER_WORKSPACE_ALREADY_HAS_ROLE"] = "USER_WORKSPACE_ALREADY_HAS_ROLE";
    PermissionsExceptionCode["WORKSPACE_MEMBER_NOT_FOUND"] = "WORKSPACE_MEMBER_NOT_FOUND";
    PermissionsExceptionCode["ROLE_NOT_FOUND"] = "ROLE_NOT_FOUND";
    PermissionsExceptionCode["CANNOT_UNASSIGN_LAST_ADMIN"] = "CANNOT_UNASSIGN_LAST_ADMIN";
    PermissionsExceptionCode["CANNOT_DELETE_LAST_ADMIN_USER"] = "CANNOT_DELETE_LAST_ADMIN_USER";
    PermissionsExceptionCode["UNKNOWN_OPERATION_NAME"] = "UNKNOWN_OPERATION_NAME_PERMISSIONS";
    PermissionsExceptionCode["UNKNOWN_REQUIRED_PERMISSION"] = "UNKNOWN_REQUIRED_PERMISSION";
    PermissionsExceptionCode["CANNOT_UPDATE_SELF_ROLE"] = "CANNOT_UPDATE_SELF_ROLE";
    PermissionsExceptionCode["NO_ROLE_FOUND_FOR_USER_WORKSPACE"] = "NO_ROLE_FOUND_FOR_USER_WORKSPACE";
    PermissionsExceptionCode["API_KEY_ROLE_NOT_FOUND"] = "API_KEY_ROLE_NOT_FOUND";
    PermissionsExceptionCode["NO_AUTHENTICATION_CONTEXT"] = "NO_AUTHENTICATION_CONTEXT";
    PermissionsExceptionCode["INVALID_ARG"] = "INVALID_ARG_PERMISSIONS";
    PermissionsExceptionCode["ROLE_LABEL_ALREADY_EXISTS"] = "ROLE_LABEL_ALREADY_EXISTS";
    PermissionsExceptionCode["DEFAULT_ROLE_NOT_FOUND"] = "DEFAULT_ROLE_NOT_FOUND";
    PermissionsExceptionCode["OBJECT_METADATA_NOT_FOUND"] = "OBJECT_METADATA_NOT_FOUND_PERMISSIONS";
    PermissionsExceptionCode["INVALID_SETTING"] = "INVALID_SETTING_PERMISSIONS";
    PermissionsExceptionCode["ROLE_NOT_EDITABLE"] = "ROLE_NOT_EDITABLE";
    PermissionsExceptionCode["DEFAULT_ROLE_CANNOT_BE_DELETED"] = "DEFAULT_ROLE_CANNOT_BE_DELETED";
    PermissionsExceptionCode["NO_PERMISSIONS_FOUND_IN_DATASOURCE"] = "NO_PERMISSIONS_FOUND_IN_DATASOURCE";
    PermissionsExceptionCode["CANNOT_ADD_OBJECT_PERMISSION_ON_SYSTEM_OBJECT"] = "CANNOT_ADD_OBJECT_PERMISSION_ON_SYSTEM_OBJECT";
    PermissionsExceptionCode["CANNOT_ADD_FIELD_PERMISSION_ON_SYSTEM_OBJECT"] = "CANNOT_ADD_FIELD_PERMISSION_ON_SYSTEM_OBJECT";
    PermissionsExceptionCode["METHOD_NOT_ALLOWED"] = "METHOD_NOT_ALLOWED";
    PermissionsExceptionCode["RAW_SQL_NOT_ALLOWED"] = "RAW_SQL_NOT_ALLOWED";
    PermissionsExceptionCode["CANNOT_GIVE_WRITING_PERMISSION_ON_NON_READABLE_OBJECT"] = "CANNOT_GIVE_WRITING_PERMISSION_ON_NON_READABLE_OBJECT";
    PermissionsExceptionCode["CANNOT_GIVE_WRITING_PERMISSION_WITHOUT_READING_PERMISSION"] = "CANNOT_GIVE_WRITING_PERMISSION_WITHOUT_READING_PERMISSION";
    PermissionsExceptionCode["FIELD_METADATA_NOT_FOUND"] = "FIELD_METADATA_NOT_FOUND";
    PermissionsExceptionCode["ONLY_FIELD_RESTRICTION_ALLOWED"] = "ONLY_FIELD_RESTRICTION_ALLOWED";
    PermissionsExceptionCode["FIELD_RESTRICTION_ONLY_ALLOWED_ON_READABLE_OBJECT"] = "FIELD_RESTRICTION_ONLY_ALLOWED_ON_READABLE_OBJECT";
    PermissionsExceptionCode["FIELD_RESTRICTION_ON_UPDATE_ONLY_ALLOWED_ON_UPDATABLE_OBJECT"] = "FIELD_RESTRICTION_ON_UPDATE_ONLY_ALLOWED_ON_UPDATABLE_OBJECT";
    PermissionsExceptionCode["UPSERT_FIELD_PERMISSION_FAILED"] = "UPSERT_FIELD_PERMISSION_FAILED";
    PermissionsExceptionCode["PERMISSION_NOT_FOUND"] = "PERMISSION_NOT_FOUND";
    PermissionsExceptionCode["OBJECT_PERMISSION_NOT_FOUND"] = "OBJECT_PERMISSION_NOT_FOUND";
    PermissionsExceptionCode["FIELD_PERMISSION_NOT_FOUND"] = "FIELD_PERMISSION_NOT_FOUND";
    PermissionsExceptionCode["EMPTY_FIELD_PERMISSION_NOT_ALLOWED"] = "EMPTY_FIELD_PERMISSION_NOT_ALLOWED";
    PermissionsExceptionCode["JOIN_COLUMN_NAME_REQUIRED"] = "JOIN_COLUMN_NAME_REQUIRED";
    PermissionsExceptionCode["COMPOSITE_TYPE_NOT_FOUND"] = "COMPOSITE_TYPE_NOT_FOUND";
    PermissionsExceptionCode["ROLE_MUST_HAVE_AT_LEAST_ONE_TARGET"] = "ROLE_MUST_HAVE_AT_LEAST_ONE_TARGET";
    PermissionsExceptionCode["ROLE_CANNOT_BE_ASSIGNED_TO_USERS"] = "ROLE_CANNOT_BE_ASSIGNED_TO_USERS";
    PermissionsExceptionCode["ROLE_CANNOT_BE_ASSIGNED_TO_API_KEYS"] = "ROLE_CANNOT_BE_ASSIGNED_TO_API_KEYS";
    PermissionsExceptionCode["ROLE_CANNOT_BE_ASSIGNED_TO_AGENTS"] = "ROLE_CANNOT_BE_ASSIGNED_TO_AGENTS";
    PermissionsExceptionCode["APPLICATION_ROLE_NOT_FOUND"] = "APPLICATION_ROLE_NOT_FOUND";
    PermissionsExceptionCode["ROLE_BELONGS_TO_ANOTHER_APPLICATION"] = "ROLE_BELONGS_TO_ANOTHER_APPLICATION";
    return PermissionsExceptionCode;
}({});
const getPermissionsExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "PERMISSION_DENIED":
            return /*i18n*/ {
                id: "q5OVn+",
                message: "You do not have permission to perform this action."
            };
        case "ADMIN_ROLE_NOT_FOUND":
            return /*i18n*/ {
                id: "VmatbA",
                message: "Admin role not found."
            };
        case "USER_WORKSPACE_NOT_FOUND":
            return /*i18n*/ {
                id: "lUEEso",
                message: "User workspace not found."
            };
        case "WORKSPACE_ID_ROLE_USER_WORKSPACE_MISMATCH":
            return /*i18n*/ {
                id: "oLh4c+",
                message: "Workspace ID and role mismatch."
            };
        case "TOO_MANY_ADMIN_CANDIDATES":
            return /*i18n*/ {
                id: "/ObxXq",
                message: "Too many admin candidates found."
            };
        case "USER_WORKSPACE_ALREADY_HAS_ROLE":
            return /*i18n*/ {
                id: "9QHVZ2",
                message: "User already has a role assigned."
            };
        case "WORKSPACE_MEMBER_NOT_FOUND":
            return /*i18n*/ {
                id: "rnnLQA",
                message: "Workspace member not found."
            };
        case "ROLE_NOT_FOUND":
            return /*i18n*/ {
                id: "/BTyf+",
                message: "Role not found."
            };
        case "CANNOT_UNASSIGN_LAST_ADMIN":
            return /*i18n*/ {
                id: "Q0diyJ",
                message: "Cannot remove the last admin from the workspace."
            };
        case "CANNOT_DELETE_LAST_ADMIN_USER":
            return /*i18n*/ {
                id: "/olFYI",
                message: "Cannot delete the last admin user."
            };
        case "UNKNOWN_OPERATION_NAME_PERMISSIONS":
            return /*i18n*/ {
                id: "tEncxN",
                message: "Unknown operation."
            };
        case "UNKNOWN_REQUIRED_PERMISSION":
            return /*i18n*/ {
                id: "BIxgma",
                message: "Unknown permission required."
            };
        case "CANNOT_UPDATE_SELF_ROLE":
            return /*i18n*/ {
                id: "bAPURS",
                message: "You cannot update your own role."
            };
        case "NO_ROLE_FOUND_FOR_USER_WORKSPACE":
            return /*i18n*/ {
                id: "5ZMHXg",
                message: "No role found for this user in the workspace."
            };
        case "API_KEY_ROLE_NOT_FOUND":
            return /*i18n*/ {
                id: "tGfHmi",
                message: "API key role not found."
            };
        case "NO_AUTHENTICATION_CONTEXT":
            return /*i18n*/ {
                id: "cgNV3G",
                message: "Authentication is required."
            };
        case "INVALID_ARG_PERMISSIONS":
            return /*i18n*/ {
                id: "KNrRpL",
                message: "Invalid argument provided."
            };
        case "ROLE_LABEL_ALREADY_EXISTS":
            return /*i18n*/ {
                id: "Q2De+v",
                message: "A role with this label already exists."
            };
        case "DEFAULT_ROLE_NOT_FOUND":
            return /*i18n*/ {
                id: "cgV4xo",
                message: "Default role not found."
            };
        case "OBJECT_METADATA_NOT_FOUND_PERMISSIONS":
            return /*i18n*/ {
                id: "rHce90",
                message: "Object metadata not found."
            };
        case "INVALID_SETTING_PERMISSIONS":
            return /*i18n*/ {
                id: "Pt2vVA",
                message: "Invalid permission setting."
            };
        case "ROLE_NOT_EDITABLE":
            return /*i18n*/ {
                id: "2jnsqJ",
                message: "This role cannot be edited."
            };
        case "DEFAULT_ROLE_CANNOT_BE_DELETED":
            return /*i18n*/ {
                id: "0biWRI",
                message: "The default role cannot be deleted."
            };
        case "NO_PERMISSIONS_FOUND_IN_DATASOURCE":
            return /*i18n*/ {
                id: "D2A/H0",
                message: "No permissions found in datasource."
            };
        case "CANNOT_ADD_OBJECT_PERMISSION_ON_SYSTEM_OBJECT":
            return /*i18n*/ {
                id: "FxFlC4",
                message: "Cannot add permissions on system objects."
            };
        case "CANNOT_ADD_FIELD_PERMISSION_ON_SYSTEM_OBJECT":
            return /*i18n*/ {
                id: "QYS2AB",
                message: "Cannot add field permissions on system objects."
            };
        case "METHOD_NOT_ALLOWED":
            return /*i18n*/ {
                id: "6Z/zIt",
                message: "This method is not allowed."
            };
        case "RAW_SQL_NOT_ALLOWED":
            return /*i18n*/ {
                id: "8G8dJM",
                message: "Raw SQL queries are not allowed."
            };
        case "CANNOT_GIVE_WRITING_PERMISSION_ON_NON_READABLE_OBJECT":
            return /*i18n*/ {
                id: "lDTqT7",
                message: "Cannot give write permission on non-readable objects."
            };
        case "CANNOT_GIVE_WRITING_PERMISSION_WITHOUT_READING_PERMISSION":
            return /*i18n*/ {
                id: "r4uEo5",
                message: "Cannot give write permission without read permission."
            };
        case "FIELD_METADATA_NOT_FOUND":
            return /*i18n*/ {
                id: "JrAl/I",
                message: "Field metadata not found."
            };
        case "ONLY_FIELD_RESTRICTION_ALLOWED":
            return /*i18n*/ {
                id: "eYgzEd",
                message: "Only field restrictions are allowed."
            };
        case "FIELD_RESTRICTION_ONLY_ALLOWED_ON_READABLE_OBJECT":
            return /*i18n*/ {
                id: "ylQono",
                message: "Field restrictions only apply to readable objects."
            };
        case "FIELD_RESTRICTION_ON_UPDATE_ONLY_ALLOWED_ON_UPDATABLE_OBJECT":
            return /*i18n*/ {
                id: "lHCFXi",
                message: "Update field restrictions only apply to updatable objects."
            };
        case "UPSERT_FIELD_PERMISSION_FAILED":
            return /*i18n*/ {
                id: "Cr+NSQ",
                message: "Failed to update field permission."
            };
        case "PERMISSION_NOT_FOUND":
            return /*i18n*/ {
                id: "vcvSI3",
                message: "Permission not found."
            };
        case "OBJECT_PERMISSION_NOT_FOUND":
            return /*i18n*/ {
                id: "Qy6mMO",
                message: "Object permission not found."
            };
        case "FIELD_PERMISSION_NOT_FOUND":
            return /*i18n*/ {
                id: "yqmAnC",
                message: "Field permission not found."
            };
        case "EMPTY_FIELD_PERMISSION_NOT_ALLOWED":
            return /*i18n*/ {
                id: "aVGG1u",
                message: "Empty field permissions are not allowed."
            };
        case "JOIN_COLUMN_NAME_REQUIRED":
            return /*i18n*/ {
                id: "cCj4vg",
                message: "Join column name is required."
            };
        case "COMPOSITE_TYPE_NOT_FOUND":
            return /*i18n*/ {
                id: "L1uQuF",
                message: "Composite type not found."
            };
        case "ROLE_MUST_HAVE_AT_LEAST_ONE_TARGET":
            return /*i18n*/ {
                id: "zeffu9",
                message: "Role must have at least one target."
            };
        case "ROLE_CANNOT_BE_ASSIGNED_TO_USERS":
            return /*i18n*/ {
                id: "c68K+k",
                message: "This role cannot be assigned to users."
            };
        case "ROLE_CANNOT_BE_ASSIGNED_TO_API_KEYS":
            return /*i18n*/ {
                id: "UP3ZAj",
                message: "This role cannot be assigned to API keys."
            };
        case "ROLE_CANNOT_BE_ASSIGNED_TO_AGENTS":
            return /*i18n*/ {
                id: "rExecr",
                message: "This role cannot be assigned to agents."
            };
        case "APPLICATION_ROLE_NOT_FOUND":
            return /*i18n*/ {
                id: "iHQYLb",
                message: "No role assigned to the application."
            };
        case "ROLE_BELONGS_TO_ANOTHER_APPLICATION":
            return /*i18n*/ {
                id: "2ET75e",
                message: "Cannot target a role owned by another application."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let PermissionsException = class PermissionsException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getPermissionsExceptionUserFriendlyMessage(code)
        });
    }
};
var PermissionsExceptionMessage = /*#__PURE__*/ function(PermissionsExceptionMessage) {
    PermissionsExceptionMessage["PERMISSION_DENIED"] = "Entity performing the request does not have permission";
    PermissionsExceptionMessage["USER_WORKSPACE_NOT_FOUND"] = "User workspace not found";
    PermissionsExceptionMessage["ROLE_NOT_FOUND"] = "Role not found";
    PermissionsExceptionMessage["CANNOT_UNASSIGN_LAST_ADMIN"] = "Cannot unassign admin role from last admin of the workspace";
    PermissionsExceptionMessage["CANNOT_DELETE_LAST_ADMIN_USER"] = "Cannot delete account: user is the unique admin of a workspace";
    PermissionsExceptionMessage["UNKNOWN_OPERATION_NAME"] = "Unknown operation name, cannot determine required permission";
    PermissionsExceptionMessage["CANNOT_UPDATE_SELF_ROLE"] = "Cannot update self role";
    PermissionsExceptionMessage["NO_ROLE_FOUND_FOR_USER_WORKSPACE"] = "No role found for userWorkspace";
    PermissionsExceptionMessage["API_KEY_ROLE_NOT_FOUND"] = "API key has no role assigned";
    PermissionsExceptionMessage["NO_AUTHENTICATION_CONTEXT"] = "No valid authentication context found";
    PermissionsExceptionMessage["ROLE_LABEL_ALREADY_EXISTS"] = "A role with this label already exists";
    PermissionsExceptionMessage["DEFAULT_ROLE_NOT_FOUND"] = "Default role not found";
    PermissionsExceptionMessage["OBJECT_METADATA_NOT_FOUND"] = "Object metadata not found";
    PermissionsExceptionMessage["INVALID_SETTING"] = "Invalid permission setting (unknown value)";
    PermissionsExceptionMessage["ROLE_NOT_EDITABLE"] = "Role is not editable";
    PermissionsExceptionMessage["DEFAULT_ROLE_CANNOT_BE_DELETED"] = "Default role cannot be deleted";
    PermissionsExceptionMessage["CANNOT_ADD_OBJECT_PERMISSION_ON_SYSTEM_OBJECT"] = "Cannot add object permission on system object";
    PermissionsExceptionMessage["CANNOT_ADD_FIELD_PERMISSION_ON_SYSTEM_OBJECT"] = "Cannot add field permission on system object";
    PermissionsExceptionMessage["CANNOT_GIVE_WRITING_PERMISSION_ON_NON_READABLE_OBJECT"] = "Cannot give update permission to non-readable object";
    PermissionsExceptionMessage["CANNOT_GIVE_WRITING_PERMISSION_WITHOUT_READING_PERMISSION"] = "Cannot give writing permission without reading permission";
    PermissionsExceptionMessage["FIELD_METADATA_NOT_FOUND"] = "Field metadata not found";
    PermissionsExceptionMessage["ONLY_FIELD_RESTRICTION_ALLOWED"] = "Field permission can only introduce a restriction";
    PermissionsExceptionMessage["FIELD_RESTRICTION_ONLY_ALLOWED_ON_READABLE_OBJECT"] = "Field restriction only makes sense on readable object";
    PermissionsExceptionMessage["FIELD_RESTRICTION_ON_UPDATE_ONLY_ALLOWED_ON_UPDATABLE_OBJECT"] = "Field restriction on update only makes sense on updatable object";
    PermissionsExceptionMessage["OBJECT_PERMISSION_NOT_FOUND"] = "Object permission not found";
    PermissionsExceptionMessage["FIELD_PERMISSION_NOT_FOUND"] = "Field permission not found";
    PermissionsExceptionMessage["EMPTY_FIELD_PERMISSION_NOT_ALLOWED"] = "Empty field permission not allowed";
    PermissionsExceptionMessage["ROLE_MUST_HAVE_AT_LEAST_ONE_TARGET"] = "Role must be assignable to at least one target type";
    PermissionsExceptionMessage["ROLE_CANNOT_BE_ASSIGNED_TO_USERS"] = "Role cannot be assigned to users";
    PermissionsExceptionMessage["APPLICATION_ROLE_NOT_FOUND"] = "Application role not found";
    return PermissionsExceptionMessage;
}({});

//# sourceMappingURL=permissions.exception.js.map