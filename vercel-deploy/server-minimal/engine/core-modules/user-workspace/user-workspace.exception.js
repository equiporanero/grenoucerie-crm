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
    get UserWorkspaceException () {
        return UserWorkspaceException;
    },
    get UserWorkspaceExceptionCode () {
        return UserWorkspaceExceptionCode;
    },
    get UserWorkspaceNotFoundDefaultError () {
        return UserWorkspaceNotFoundDefaultError;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var UserWorkspaceExceptionCode = /*#__PURE__*/ function(UserWorkspaceExceptionCode) {
    UserWorkspaceExceptionCode["USER_WORKSPACE_NOT_FOUND"] = "WORKSPACE_NOT_FOUND";
    return UserWorkspaceExceptionCode;
}({});
const getUserWorkspaceExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "WORKSPACE_NOT_FOUND":
            return /*i18n*/ {
                id: "lUEEso",
                message: "User workspace not found."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let UserWorkspaceException = class UserWorkspaceException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getUserWorkspaceExceptionUserFriendlyMessage(code)
        });
    }
};
const UserWorkspaceNotFoundDefaultError = new UserWorkspaceException('User Workspace not found', "WORKSPACE_NOT_FOUND");

//# sourceMappingURL=user-workspace.exception.js.map