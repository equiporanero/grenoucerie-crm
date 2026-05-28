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
    get UserException () {
        return UserException;
    },
    get UserExceptionCode () {
        return UserExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var UserExceptionCode = /*#__PURE__*/ function(UserExceptionCode) {
    UserExceptionCode["USER_NOT_FOUND"] = "USER_NOT_FOUND";
    UserExceptionCode["EMAIL_ALREADY_IN_USE"] = "EMAIL_ALREADY_IN_USE";
    UserExceptionCode["EMAIL_UNCHANGED"] = "EMAIL_UNCHANGED";
    UserExceptionCode["EMAIL_UPDATE_RESTRICTED_TO_SINGLE_WORKSPACE"] = "EMAIL_UPDATE_RESTRICTED_TO_SINGLE_WORKSPACE";
    return UserExceptionCode;
}({});
const getUserExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "USER_NOT_FOUND":
            return /*i18n*/ {
                id: "siJgSI",
                message: "User not found."
            };
        case "EMAIL_ALREADY_IN_USE":
            return /*i18n*/ {
                id: "NcQ6eO",
                message: "This email is already in use."
            };
        case "EMAIL_UNCHANGED":
            return /*i18n*/ {
                id: "y+BSWq",
                message: "Email is unchanged."
            };
        case "EMAIL_UPDATE_RESTRICTED_TO_SINGLE_WORKSPACE":
            return /*i18n*/ {
                id: "q87JH5",
                message: "Email update is restricted to single workspace users."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let UserException = class UserException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getUserExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=user.exception.js.map