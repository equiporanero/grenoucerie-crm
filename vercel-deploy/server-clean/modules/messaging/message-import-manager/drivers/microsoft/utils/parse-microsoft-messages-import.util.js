"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseMicrosoftMessagesImportError", {
    enumerable: true,
    get: function() {
        return parseMicrosoftMessagesImportError;
    }
});
const _messageimportdriverexception = require("../../exceptions/message-import-driver.exception");
const _utils = require("twenty-shared/utils");
const parseMicrosoftMessagesImportError = (error, options)=>{
    if (error.statusCode === 400) {
        if (!(0, _utils.isDefined)(error.message)) {
            return new _messageimportdriverexception.MessageImportDriverException(`Microsoft Graph API returned 400 with empty error body`, _messageimportdriverexception.MessageImportDriverExceptionCode.TEMPORARY_ERROR, {
                cause: options?.cause
            });
        }
        return new _messageimportdriverexception.MessageImportDriverException(`Invalid request to Microsoft Graph API: ${error.message}`, _messageimportdriverexception.MessageImportDriverExceptionCode.UNKNOWN, {
            cause: options?.cause
        });
    }
    if (error.statusCode === 401) {
        return new _messageimportdriverexception.MessageImportDriverException('Unauthorized access to Microsoft Graph API', _messageimportdriverexception.MessageImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS, {
            cause: options?.cause
        });
    }
    if (error.statusCode === 403) {
        return new _messageimportdriverexception.MessageImportDriverException('Forbidden access to Microsoft Graph API', _messageimportdriverexception.MessageImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS, {
            cause: options?.cause
        });
    }
    if (error.statusCode === 404) {
        if (error.message?.includes('The mailbox is either inactive, soft-deleted, or is hosted on-premise.')) {
            return new _messageimportdriverexception.MessageImportDriverException(`Disabled, deleted, inactive or no licence Microsoft account - code:${error.code}`, _messageimportdriverexception.MessageImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS, {
                cause: options?.cause
            });
        } else {
            return new _messageimportdriverexception.MessageImportDriverException(`Not found - code:${error.code}`, _messageimportdriverexception.MessageImportDriverExceptionCode.NOT_FOUND, {
                cause: options?.cause
            });
        }
    }
    if (error.statusCode === 410) {
        return new _messageimportdriverexception.MessageImportDriverException(`Sync cursor error: ${error.message}`, _messageimportdriverexception.MessageImportDriverExceptionCode.SYNC_CURSOR_ERROR, {
            cause: options?.cause
        });
    }
    if (error.statusCode === 429 || error.statusCode === 500 || error.statusCode === 502 || error.statusCode === 503 || error.statusCode === 504 || error.statusCode === 509) {
        return new _messageimportdriverexception.MessageImportDriverException(`Microsoft Graph API ${error.code} ${error.statusCode} error: ${error.message}`, _messageimportdriverexception.MessageImportDriverExceptionCode.TEMPORARY_ERROR, {
            cause: options?.cause
        });
    }
    return new _messageimportdriverexception.MessageImportDriverException(`Microsoft Graph API unknown error: ${error} with status code ${error.statusCode}`, _messageimportdriverexception.MessageImportDriverExceptionCode.UNKNOWN, {
        cause: options?.cause
    });
};

//# sourceMappingURL=parse-microsoft-messages-import.util.js.map