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
    get WorkspaceInvitationException () {
        return WorkspaceInvitationException;
    },
    get WorkspaceInvitationExceptionCode () {
        return WorkspaceInvitationExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var WorkspaceInvitationExceptionCode = /*#__PURE__*/ function(WorkspaceInvitationExceptionCode) {
    WorkspaceInvitationExceptionCode["INVALID_APP_TOKEN_TYPE"] = "INVALID_APP_TOKEN_TYPE";
    WorkspaceInvitationExceptionCode["INVITATION_CORRUPTED"] = "INVITATION_CORRUPTED";
    WorkspaceInvitationExceptionCode["INVITATION_ALREADY_EXIST"] = "INVITATION_ALREADY_EXIST";
    WorkspaceInvitationExceptionCode["USER_ALREADY_EXIST"] = "USER_ALREADY_EXIST";
    WorkspaceInvitationExceptionCode["INVALID_INVITATION"] = "INVALID_INVITATION";
    WorkspaceInvitationExceptionCode["EMAIL_MISSING"] = "EMAIL_MISSING";
    return WorkspaceInvitationExceptionCode;
}({});
const getWorkspaceInvitationExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "INVALID_APP_TOKEN_TYPE":
        case "INVITATION_CORRUPTED":
        case "INVALID_INVITATION":
            return /*i18n*/ {
                id: "mTxjri",
                message: "There is an issue with your invitation. Please try again."
            };
        case "INVITATION_ALREADY_EXIST":
            return /*i18n*/ {
                id: "SOp/Vw",
                message: "An invitation has already been sent to this email."
            };
        case "USER_ALREADY_EXIST":
            return /*i18n*/ {
                id: "GEN5Cv",
                message: "This user is already a member of the workspace."
            };
        case "EMAIL_MISSING":
            return /*i18n*/ {
                id: "Qof3ks",
                message: "Email is required."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let WorkspaceInvitationException = class WorkspaceInvitationException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getWorkspaceInvitationExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=workspace-invitation.exception.js.map