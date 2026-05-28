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
    get MessageFolderException () {
        return MessageFolderException;
    },
    get MessageFolderExceptionCode () {
        return MessageFolderExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var MessageFolderExceptionCode = /*#__PURE__*/ function(MessageFolderExceptionCode) {
    MessageFolderExceptionCode["MESSAGE_FOLDER_NOT_FOUND"] = "MESSAGE_FOLDER_NOT_FOUND";
    MessageFolderExceptionCode["INVALID_MESSAGE_FOLDER_INPUT"] = "INVALID_MESSAGE_FOLDER_INPUT";
    MessageFolderExceptionCode["MESSAGE_FOLDER_OWNERSHIP_VIOLATION"] = "MESSAGE_FOLDER_OWNERSHIP_VIOLATION";
    return MessageFolderExceptionCode;
}({});
const getMessageFolderExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "MESSAGE_FOLDER_NOT_FOUND":
            return /*i18n*/ {
                id: "BZbxut",
                message: "Message folder not found."
            };
        case "INVALID_MESSAGE_FOLDER_INPUT":
            return /*i18n*/ {
                id: "zUyPBT",
                message: "Invalid message folder input."
            };
        case "MESSAGE_FOLDER_OWNERSHIP_VIOLATION":
            return /*i18n*/ {
                id: "dmOWfL",
                message: "You do not have access to this message folder."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let MessageFolderException = class MessageFolderException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getMessageFolderExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=message-folder.exception.js.map