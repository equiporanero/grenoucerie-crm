"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseImapAuthenticationError", {
    enumerable: true,
    get: function() {
        return parseImapAuthenticationError;
    }
});
const _utils = require("twenty-shared/utils");
const _messageimportdriverexception = require("../../exceptions/message-import-driver.exception");
const _isimapnetworkerrorutil = require("./is-imap-network-error.util");
const TRANSIENT_IMAP_RESPONSE_CODES = new Set([
    'UNAVAILABLE',
    'INUSE',
    'SERVERBUG'
]);
const parseImapAuthenticationError = (error)=>{
    if ((0, _isimapnetworkerrorutil.isImapNetworkError)(error)) {
        return new _messageimportdriverexception.MessageImportDriverException(`IMAP network error: ${error.message}`, _messageimportdriverexception.MessageImportDriverExceptionCode.TEMPORARY_ERROR, {
            cause: error
        });
    }
    if ((0, _utils.isDefined)(error.serverResponseCode) && TRANSIENT_IMAP_RESPONSE_CODES.has(error.serverResponseCode)) {
        return new _messageimportdriverexception.MessageImportDriverException(`IMAP transient error [${error.serverResponseCode}]: ${error.responseText ?? error.message}`, _messageimportdriverexception.MessageImportDriverExceptionCode.TEMPORARY_ERROR, {
            cause: error
        });
    }
    if (error.authenticationFailed === true) {
        return new _messageimportdriverexception.MessageImportDriverException(`IMAP authentication error: ${error.message}`, _messageimportdriverexception.MessageImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS, {
            cause: error
        });
    }
    return new _messageimportdriverexception.MessageImportDriverException(`Unknown IMAP authentication error: ${error.message}`, _messageimportdriverexception.MessageImportDriverExceptionCode.UNKNOWN, {
        cause: error
    });
};

//# sourceMappingURL=parse-imap-authentication-error.util.js.map