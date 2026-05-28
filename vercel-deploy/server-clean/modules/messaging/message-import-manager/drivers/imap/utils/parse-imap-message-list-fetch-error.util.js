"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseImapMessageListFetchError", {
    enumerable: true,
    get: function() {
        return parseImapMessageListFetchError;
    }
});
const _messageimportdriverexception = require("../../exceptions/message-import-driver.exception");
const _isimapflowerrorutil = require("./is-imap-flow-error.util");
const _isimapnetworkerrorutil = require("./is-imap-network-error.util");
const parseImapMessageListFetchError = (error, options)=>{
    if (!error) {
        return new _messageimportdriverexception.MessageImportDriverException('Unknown IMAP message list fetch error: No error provided', _messageimportdriverexception.MessageImportDriverExceptionCode.UNKNOWN, {
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
        return new _messageimportdriverexception.MessageImportDriverException(`Unknown IMAP message list fetch error: ${errorMessage}`, _messageimportdriverexception.MessageImportDriverExceptionCode.UNKNOWN, {
            cause: options?.cause || error
        });
    }
    if (error.responseText) {
        if (error.responseText.includes('Invalid search') || error.responseText.includes('invalid sequence set')) {
            return new _messageimportdriverexception.MessageImportDriverException(`IMAP sync cursor error: ${error.responseText}`, _messageimportdriverexception.MessageImportDriverExceptionCode.SYNC_CURSOR_ERROR, {
                cause: options?.cause || error
            });
        }
        if (error.responseText.includes('No matching messages')) {
            return new _messageimportdriverexception.MessageImportDriverException('No messages found for next sync cursor', _messageimportdriverexception.MessageImportDriverExceptionCode.NO_NEXT_SYNC_CURSOR, {
                cause: options?.cause || error
            });
        }
    }
    if (errorMessage.includes('Invalid sequence set')) {
        return new _messageimportdriverexception.MessageImportDriverException(`IMAP sync cursor error: ${errorMessage}`, _messageimportdriverexception.MessageImportDriverExceptionCode.SYNC_CURSOR_ERROR, {
            cause: options?.cause || error
        });
    }
    if (errorMessage.includes('No messages found')) {
        return new _messageimportdriverexception.MessageImportDriverException('No messages found for next sync cursor', _messageimportdriverexception.MessageImportDriverExceptionCode.NO_NEXT_SYNC_CURSOR, {
            cause: options?.cause || error
        });
    }
    return new _messageimportdriverexception.MessageImportDriverException(`Unknown IMAP message list fetch error: code: ${error.code} | responseText: ${error.responseText} | executedCommand: ${error.executedCommand}`, _messageimportdriverexception.MessageImportDriverExceptionCode.UNKNOWN, {
        cause: options?.cause || error
    });
};

//# sourceMappingURL=parse-imap-message-list-fetch-error.util.js.map