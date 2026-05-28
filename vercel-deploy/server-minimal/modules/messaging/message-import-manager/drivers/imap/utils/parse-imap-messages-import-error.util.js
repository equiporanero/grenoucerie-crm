"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseImapMessagesImportError", {
    enumerable: true,
    get: function() {
        return parseImapMessagesImportError;
    }
});
const _messageimportdriverexception = require("../../exceptions/message-import-driver.exception");
const _isimapflowerrorutil = require("./is-imap-flow-error.util");
const _isimapnetworkerrorutil = require("./is-imap-network-error.util");
const parseImapMessagesImportError = (error, messageExternalId, options)=>{
    if (!error) {
        return new _messageimportdriverexception.MessageImportDriverException(`Unknown IMAP message import error for message ${messageExternalId}: No error provided`, _messageimportdriverexception.MessageImportDriverExceptionCode.UNKNOWN, {
            cause: options?.cause
        });
    }
    if ((0, _isimapnetworkerrorutil.isImapNetworkError)(error)) {
        return new _messageimportdriverexception.MessageImportDriverException(`IMAP network error: ${error.message}`, _messageimportdriverexception.MessageImportDriverExceptionCode.TEMPORARY_ERROR, {
            cause: options?.cause
        });
    }
    const errorMessage = error.message || '';
    if (!(0, _isimapflowerrorutil.isImapFlowError)(error)) {
        return new _messageimportdriverexception.MessageImportDriverException(`Unknown IMAP message import error for message ${messageExternalId}: ${errorMessage}`, _messageimportdriverexception.MessageImportDriverExceptionCode.UNKNOWN, {
            cause: options?.cause || error
        });
    }
    if (error.responseText) {
        if (error.responseText.includes('No such message')) {
            return new _messageimportdriverexception.MessageImportDriverException(`IMAP message not found: ${messageExternalId}`, _messageimportdriverexception.MessageImportDriverExceptionCode.NOT_FOUND, {
                cause: options?.cause || error
            });
        }
        if (error.responseText.includes('expunged')) {
            return new _messageimportdriverexception.MessageImportDriverException(`IMAP message no longer exists (expunged): ${messageExternalId}`, _messageimportdriverexception.MessageImportDriverExceptionCode.NOT_FOUND, {
                cause: options?.cause || error
            });
        }
        if (error.responseText.includes('message size exceeds')) {
            return new _messageimportdriverexception.MessageImportDriverException(`IMAP message fetch error for message ${messageExternalId}: ${error.responseText}`, _messageimportdriverexception.MessageImportDriverExceptionCode.TEMPORARY_ERROR, {
                cause: options?.cause || error
            });
        }
    }
    if (errorMessage.includes('Message not found') || errorMessage.includes('Invalid sequence set')) {
        return new _messageimportdriverexception.MessageImportDriverException(`IMAP message not found: ${messageExternalId}`, _messageimportdriverexception.MessageImportDriverExceptionCode.NOT_FOUND, {
            cause: options?.cause || error
        });
    }
    if (errorMessage.includes('Failed to fetch message')) {
        return new _messageimportdriverexception.MessageImportDriverException(`IMAP message fetch error for message ${messageExternalId}: ${errorMessage}`, _messageimportdriverexception.MessageImportDriverExceptionCode.TEMPORARY_ERROR, {
            cause: options?.cause || error
        });
    }
    return new _messageimportdriverexception.MessageImportDriverException(`Unknown IMAP message import error for message ${messageExternalId}: ${errorMessage}`, _messageimportdriverexception.MessageImportDriverExceptionCode.UNKNOWN, {
        cause: options?.cause || error
    });
};

//# sourceMappingURL=parse-imap-messages-import-error.util.js.map