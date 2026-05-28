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
    get PermissionFlagException () {
        return PermissionFlagException;
    },
    get PermissionFlagExceptionCode () {
        return PermissionFlagExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var PermissionFlagExceptionCode = /*#__PURE__*/ function(PermissionFlagExceptionCode) {
    PermissionFlagExceptionCode["PERMISSION_FLAG_NOT_FOUND"] = "PERMISSION_FLAG_NOT_FOUND";
    PermissionFlagExceptionCode["PERMISSION_FLAG_ALREADY_EXISTS"] = "PERMISSION_FLAG_ALREADY_EXISTS";
    PermissionFlagExceptionCode["INVALID_PERMISSION_FLAG_KEY"] = "INVALID_PERMISSION_FLAG_KEY";
    PermissionFlagExceptionCode["INVALID_PERMISSION_FLAG_PERMISSION_TYPE"] = "INVALID_PERMISSION_FLAG_PERMISSION_TYPE";
    PermissionFlagExceptionCode["PERMISSION_FLAG_KEY_IMMUTABLE"] = "PERMISSION_FLAG_KEY_IMMUTABLE";
    PermissionFlagExceptionCode["PERMISSION_FLAG_IS_STANDARD"] = "PERMISSION_FLAG_IS_STANDARD";
    PermissionFlagExceptionCode["PERMISSION_FLAG_IN_USE"] = "PERMISSION_FLAG_IN_USE";
    return PermissionFlagExceptionCode;
}({});
const getPermissionFlagExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "PERMISSION_FLAG_NOT_FOUND":
            return /*i18n*/ {
                id: "3qYOk2",
                message: "Permission flag not found."
            };
        case "PERMISSION_FLAG_ALREADY_EXISTS":
            return /*i18n*/ {
                id: "3zRddX",
                message: "Permission flag already exists."
            };
        case "INVALID_PERMISSION_FLAG_KEY":
            return /*i18n*/ {
                id: "LI7Gn/",
                message: "Invalid permission flag key."
            };
        case "INVALID_PERMISSION_FLAG_PERMISSION_TYPE":
            return /*i18n*/ {
                id: "OqxwMi",
                message: "Invalid permission flag permission type."
            };
        case "PERMISSION_FLAG_KEY_IMMUTABLE":
            return /*i18n*/ {
                id: "09NaoU",
                message: "Permission flag key cannot be changed."
            };
        case "PERMISSION_FLAG_IS_STANDARD":
            return /*i18n*/ {
                id: "Xn/1qY",
                message: "Standard permission flags cannot be modified."
            };
        case "PERMISSION_FLAG_IN_USE":
            return /*i18n*/ {
                id: "7A0rAw",
                message: "Permission flag is still assigned to a role."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let PermissionFlagException = class PermissionFlagException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getPermissionFlagExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=permission-flag.exception.js.map