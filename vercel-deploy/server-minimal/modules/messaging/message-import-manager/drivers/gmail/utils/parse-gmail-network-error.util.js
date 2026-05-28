"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseGmailNetworkError", {
    enumerable: true,
    get: function() {
        return parseGmailNetworkError;
    }
});
const _messageimportdriverexception = require("../../exceptions/message-import-driver.exception");
const parseGmailNetworkError = (error)=>{
    return new _messageimportdriverexception.MessageImportDriverException(error.message, _messageimportdriverexception.MessageImportDriverExceptionCode.TEMPORARY_ERROR, {
        cause: error
    });
};

//# sourceMappingURL=parse-gmail-network-error.util.js.map