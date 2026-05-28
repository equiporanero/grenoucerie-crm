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
    get TwentyORMException () {
        return TwentyORMException;
    },
    get TwentyORMExceptionCode () {
        return TwentyORMExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../api/common/common-query-runners/errors/standard-error-message.constant");
const _customexception = require("../../../utils/custom-exception");
var TwentyORMExceptionCode = /*#__PURE__*/ function(TwentyORMExceptionCode) {
    TwentyORMExceptionCode["METADATA_VERSION_MISMATCH"] = "METADATA_VERSION_MISMATCH";
    TwentyORMExceptionCode["WORKSPACE_SCHEMA_NOT_FOUND"] = "WORKSPACE_SCHEMA_NOT_FOUND";
    TwentyORMExceptionCode["ROLES_PERMISSIONS_VERSION_NOT_FOUND"] = "ROLES_PERMISSIONS_VERSION_NOT_FOUND";
    TwentyORMExceptionCode["FEATURE_FLAG_MAP_VERSION_NOT_FOUND"] = "FEATURE_FLAG_MAP_VERSION_NOT_FOUND";
    TwentyORMExceptionCode["USER_WORKSPACE_ROLE_MAP_VERSION_NOT_FOUND"] = "USER_WORKSPACE_ROLE_MAP_VERSION_NOT_FOUND";
    TwentyORMExceptionCode["API_KEY_ROLE_MAP_VERSION_NOT_FOUND"] = "API_KEY_ROLE_MAP_VERSION_NOT_FOUND";
    TwentyORMExceptionCode["MALFORMED_METADATA"] = "MALFORMED_METADATA";
    TwentyORMExceptionCode["WORKSPACE_NOT_FOUND"] = "WORKSPACE_NOT_FOUND";
    TwentyORMExceptionCode["CONNECT_RECORD_NOT_FOUND"] = "CONNECT_RECORD_NOT_FOUND";
    TwentyORMExceptionCode["CONNECT_NOT_ALLOWED"] = "CONNECT_NOT_ALLOWED";
    TwentyORMExceptionCode["CONNECT_UNIQUE_CONSTRAINT_ERROR"] = "CONNECT_UNIQUE_CONSTRAINT_ERROR";
    TwentyORMExceptionCode["MISSING_MAIN_ALIAS_TARGET"] = "MISSING_MAIN_ALIAS_TARGET";
    TwentyORMExceptionCode["METHOD_NOT_ALLOWED"] = "METHOD_NOT_ALLOWED";
    TwentyORMExceptionCode["ENUM_TYPE_NAME_NOT_FOUND"] = "ENUM_TYPE_NAME_NOT_FOUND";
    TwentyORMExceptionCode["QUERY_READ_TIMEOUT"] = "QUERY_READ_TIMEOUT";
    TwentyORMExceptionCode["DUPLICATE_ENTRY_DETECTED"] = "DUPLICATE_ENTRY_DETECTED";
    TwentyORMExceptionCode["TOO_MANY_RECORDS_TO_UPDATE"] = "TOO_MANY_RECORDS_TO_UPDATE";
    TwentyORMExceptionCode["INVALID_INPUT"] = "INVALID_INPUT";
    TwentyORMExceptionCode["ORM_EVENT_DATA_CORRUPTED"] = "ORM_EVENT_DATA_CORRUPTED";
    TwentyORMExceptionCode["RLS_VALIDATION_FAILED"] = "RLS_VALIDATION_FAILED";
    TwentyORMExceptionCode["NO_ROLE_FOUND_FOR_USER_WORKSPACE"] = "NO_ROLE_FOUND_FOR_USER_WORKSPACE";
    return TwentyORMExceptionCode;
}({});
const getTwentyORMExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "METADATA_VERSION_MISMATCH":
            return /*i18n*/ {
                id: "/sRN4g",
                message: "Data version mismatch. Please refresh and try again."
            };
        case "WORKSPACE_SCHEMA_NOT_FOUND":
            return /*i18n*/ {
                id: "7wxAZI",
                message: "Workspace schema not found."
            };
        case "ROLES_PERMISSIONS_VERSION_NOT_FOUND":
            return /*i18n*/ {
                id: "Ub8R48",
                message: "Roles and permissions configuration not found."
            };
        case "FEATURE_FLAG_MAP_VERSION_NOT_FOUND":
            return /*i18n*/ {
                id: "Ai7knL",
                message: "Feature configuration not found."
            };
        case "USER_WORKSPACE_ROLE_MAP_VERSION_NOT_FOUND":
            return /*i18n*/ {
                id: "9mCrQp",
                message: "User workspace role configuration not found."
            };
        case "API_KEY_ROLE_MAP_VERSION_NOT_FOUND":
            return /*i18n*/ {
                id: "TLSelA",
                message: "API key role configuration not found."
            };
        case "MALFORMED_METADATA":
            return /*i18n*/ {
                id: "Bv/LBb",
                message: "Data structure is invalid."
            };
        case "WORKSPACE_NOT_FOUND":
            return /*i18n*/ {
                id: "EhVOPs",
                message: "Workspace not found."
            };
        case "CONNECT_RECORD_NOT_FOUND":
            return /*i18n*/ {
                id: "2dNwZB",
                message: "Related record not found."
            };
        case "CONNECT_NOT_ALLOWED":
            return /*i18n*/ {
                id: "ADtO2E",
                message: "This connection is not allowed."
            };
        case "CONNECT_UNIQUE_CONSTRAINT_ERROR":
            return /*i18n*/ {
                id: "sieBE7",
                message: "A record with this relationship already exists."
            };
        case "MISSING_MAIN_ALIAS_TARGET":
            return /*i18n*/ {
                id: "u8IV9J",
                message: "Missing main alias target."
            };
        case "METHOD_NOT_ALLOWED":
            return /*i18n*/ {
                id: "7ZdJO2",
                message: "This operation is not allowed."
            };
        case "QUERY_READ_TIMEOUT":
            return /*i18n*/ {
                id: "6H9kMC",
                message: "Query timed out. Please try again."
            };
        case "DUPLICATE_ENTRY_DETECTED":
            return /*i18n*/ {
                id: "Hjj8vT",
                message: "A duplicate entry was detected."
            };
        case "TOO_MANY_RECORDS_TO_UPDATE":
            return /*i18n*/ {
                id: "ExheIC",
                message: "Too many records to update at once."
            };
        case "INVALID_INPUT":
            return /*i18n*/ {
                id: "t7SpQO",
                message: "Invalid input provided."
            };
        case "RLS_VALIDATION_FAILED":
            return /*i18n*/ {
                id: "EESfI5",
                message: "Record does not satisfy security constraints."
            };
        case "ENUM_TYPE_NAME_NOT_FOUND":
        case "ORM_EVENT_DATA_CORRUPTED":
            return _standarderrormessageconstant.STANDARD_ERROR_MESSAGE;
        case "NO_ROLE_FOUND_FOR_USER_WORKSPACE":
            return /*i18n*/ {
                id: "ISCcTE",
                message: "No role found for user."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let TwentyORMException = class TwentyORMException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getTwentyORMExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=twenty-orm.exception.js.map