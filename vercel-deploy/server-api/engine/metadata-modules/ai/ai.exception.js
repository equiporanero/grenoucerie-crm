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
    get AiException () {
        return AiException;
    },
    get AiExceptionCode () {
        return AiExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var AiExceptionCode = /*#__PURE__*/ function(AiExceptionCode) {
    AiExceptionCode["AGENT_NOT_FOUND"] = "AGENT_NOT_FOUND";
    AiExceptionCode["AGENT_ALREADY_EXISTS"] = "AGENT_ALREADY_EXISTS";
    AiExceptionCode["AGENT_IS_STANDARD"] = "AGENT_IS_STANDARD";
    AiExceptionCode["AGENT_EXECUTION_FAILED"] = "AGENT_EXECUTION_FAILED";
    AiExceptionCode["INVALID_AGENT_INPUT"] = "INVALID_AGENT_INPUT";
    AiExceptionCode["THREAD_NOT_FOUND"] = "THREAD_NOT_FOUND";
    AiExceptionCode["INVALID_CHAT_THREAD_TITLE"] = "INVALID_CHAT_THREAD_TITLE";
    AiExceptionCode["MESSAGE_NOT_FOUND"] = "MESSAGE_NOT_FOUND";
    AiExceptionCode["API_KEY_NOT_CONFIGURED"] = "API_KEY_NOT_CONFIGURED";
    AiExceptionCode["USER_WORKSPACE_ID_NOT_FOUND"] = "USER_WORKSPACE_ID_NOT_FOUND";
    AiExceptionCode["ROLE_NOT_FOUND"] = "ROLE_NOT_FOUND";
    AiExceptionCode["ROLE_CANNOT_BE_ASSIGNED_TO_AGENTS"] = "ROLE_CANNOT_BE_ASSIGNED_TO_AGENTS";
    return AiExceptionCode;
}({});
const getAiExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "AGENT_NOT_FOUND":
            return /*i18n*/ {
                id: "UxwIFr",
                message: "Agent not found."
            };
        case "AGENT_ALREADY_EXISTS":
            return /*i18n*/ {
                id: "Wnol69",
                message: "An agent with this name already exists."
            };
        case "AGENT_IS_STANDARD":
            return /*i18n*/ {
                id: "7XNKWU",
                message: "Standard agents cannot be modified."
            };
        case "AGENT_EXECUTION_FAILED":
            return /*i18n*/ {
                id: "kmAKx+",
                message: "Agent execution failed."
            };
        case "INVALID_AGENT_INPUT":
            return /*i18n*/ {
                id: "D/IcuN",
                message: "Invalid agent input."
            };
        case "THREAD_NOT_FOUND":
            return /*i18n*/ {
                id: "/VxChJ",
                message: "Chat thread not found."
            };
        case "INVALID_CHAT_THREAD_TITLE":
            return /*i18n*/ {
                id: "eLQjKW",
                message: "Chat thread title cannot be empty."
            };
        case "MESSAGE_NOT_FOUND":
            return /*i18n*/ {
                id: "erTWgO",
                message: "Chat message not found."
            };
        case "API_KEY_NOT_CONFIGURED":
            return /*i18n*/ {
                id: "fRWsMD",
                message: "API key is not configured."
            };
        case "USER_WORKSPACE_ID_NOT_FOUND":
            return /*i18n*/ {
                id: "lUEEso",
                message: "User workspace not found."
            };
        case "ROLE_NOT_FOUND":
            return /*i18n*/ {
                id: "/BTyf+",
                message: "Role not found."
            };
        case "ROLE_CANNOT_BE_ASSIGNED_TO_AGENTS":
            return /*i18n*/ {
                id: "rExecr",
                message: "This role cannot be assigned to agents."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let AiException = class AiException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getAiExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=ai.exception.js.map