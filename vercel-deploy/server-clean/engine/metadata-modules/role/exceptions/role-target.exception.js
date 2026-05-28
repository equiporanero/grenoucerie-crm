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
    get RoleTargetException () {
        return RoleTargetException;
    },
    get RoleTargetExceptionCode () {
        return RoleTargetExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var RoleTargetExceptionCode = /*#__PURE__*/ function(RoleTargetExceptionCode) {
    RoleTargetExceptionCode["ROLE_TARGET_NOT_FOUND"] = "ROLE_TARGET_NOT_FOUND";
    RoleTargetExceptionCode["INVALID_ROLE_TARGET_DATA"] = "INVALID_ROLE_TARGET_DATA";
    RoleTargetExceptionCode["ROLE_TARGET_MISSING_IDENTIFIER"] = "ROLE_TARGET_MISSING_IDENTIFIER";
    RoleTargetExceptionCode["ROLE_CANNOT_BE_ASSIGNED_TO_ENTITY"] = "ROLE_CANNOT_BE_ASSIGNED_TO_ENTITY";
    RoleTargetExceptionCode["ROLE_NOT_FOUND"] = "ROLE_NOT_FOUND";
    return RoleTargetExceptionCode;
}({});
const getRoleTargetExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "ROLE_TARGET_NOT_FOUND":
            return /*i18n*/ {
                id: "gz6uii",
                message: "Role target not found."
            };
        case "INVALID_ROLE_TARGET_DATA":
            return /*i18n*/ {
                id: "hVbdKt",
                message: "Invalid role target data."
            };
        case "ROLE_TARGET_MISSING_IDENTIFIER":
            return /*i18n*/ {
                id: "ctpIGF",
                message: "Role target is missing identifier."
            };
        case "ROLE_CANNOT_BE_ASSIGNED_TO_ENTITY":
            return /*i18n*/ {
                id: "ViBevc",
                message: "Role cannot be assigned to this entity."
            };
        case "ROLE_NOT_FOUND":
            return /*i18n*/ {
                id: "/BTyf+",
                message: "Role not found."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let RoleTargetException = class RoleTargetException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getRoleTargetExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=role-target.exception.js.map