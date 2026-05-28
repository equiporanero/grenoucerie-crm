"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseGmailApiError", {
    enumerable: true,
    get: function() {
        return parseGmailApiError;
    }
});
const _messageimportdriverexception = require("../../exceptions/message-import-driver.exception");
const _parsegmailerrorretryafterutil = require("./parse-gmail-error-retry-after.util");
const parseGmailApiError = (error)=>{
    const gmailApiError = {
        code: error.response?.status,
        reason: error.response?.data?.error?.errors?.[0].reason || error.response?.data?.error || 'Unknown reason',
        message: error.response?.data?.error?.errors?.[0].message || error.response?.data?.error_description || 'Unknown error'
    };
    switch(gmailApiError.code){
        case 400:
            if (gmailApiError.reason === 'invalid_grant') {
                return new _messageimportdriverexception.MessageImportDriverException(gmailApiError.message, _messageimportdriverexception.MessageImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS);
            }
            if (gmailApiError.reason === 'failedPrecondition') {
                if (gmailApiError.message.includes('Mail service not enabled')) {
                    return new _messageimportdriverexception.MessageImportDriverException(gmailApiError.message, _messageimportdriverexception.MessageImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS);
                }
                return new _messageimportdriverexception.MessageImportDriverException(gmailApiError.message, _messageimportdriverexception.MessageImportDriverExceptionCode.TEMPORARY_ERROR);
            }
            return new _messageimportdriverexception.MessageImportDriverException(gmailApiError.message, _messageimportdriverexception.MessageImportDriverExceptionCode.UNKNOWN);
        case 404:
            return new _messageimportdriverexception.MessageImportDriverException(gmailApiError.message, _messageimportdriverexception.MessageImportDriverExceptionCode.SYNC_CURSOR_ERROR);
        case 429:
            return new _messageimportdriverexception.MessageImportDriverException(gmailApiError.message, _messageimportdriverexception.MessageImportDriverExceptionCode.TEMPORARY_ERROR, {
                throttleRetryAfter: (0, _parsegmailerrorretryafterutil.parseGmailErrorRetryAfter)(gmailApiError.message)
            });
        case 403:
            if (gmailApiError.reason === 'rateLimitExceeded' || gmailApiError.reason === 'userRateLimitExceeded' || gmailApiError.reason === 'dailyLimitExceeded') {
                return new _messageimportdriverexception.MessageImportDriverException(gmailApiError.message, _messageimportdriverexception.MessageImportDriverExceptionCode.TEMPORARY_ERROR, {
                    throttleRetryAfter: (0, _parsegmailerrorretryafterutil.parseGmailErrorRetryAfter)(gmailApiError.message)
                });
            }
            if (gmailApiError.reason === 'domainPolicy') {
                return new _messageimportdriverexception.MessageImportDriverException(gmailApiError.message, _messageimportdriverexception.MessageImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS);
            }
            if (gmailApiError.reason === 'insufficientPermissions') {
                return new _messageimportdriverexception.MessageImportDriverException(gmailApiError.message, _messageimportdriverexception.MessageImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS);
            }
            break;
        case 401:
            return new _messageimportdriverexception.MessageImportDriverException(gmailApiError.message, _messageimportdriverexception.MessageImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS);
        case 503:
            return new _messageimportdriverexception.MessageImportDriverException(gmailApiError.message, _messageimportdriverexception.MessageImportDriverExceptionCode.TEMPORARY_ERROR);
        case 500:
        case 502:
        case 504:
            if (gmailApiError.reason === 'backendError') {
                return new _messageimportdriverexception.MessageImportDriverException(gmailApiError.message, _messageimportdriverexception.MessageImportDriverExceptionCode.TEMPORARY_ERROR);
            }
            if (gmailApiError.message.includes(`Authentication backend unavailable`)) {
                return new _messageimportdriverexception.MessageImportDriverException(`${gmailApiError.code} - ${gmailApiError.message}`, _messageimportdriverexception.MessageImportDriverExceptionCode.TEMPORARY_ERROR);
            }
            if (gmailApiError.reason === 'internal_failure') {
                return new _messageimportdriverexception.MessageImportDriverException(`${gmailApiError.code} - ${gmailApiError.message}`, _messageimportdriverexception.MessageImportDriverExceptionCode.TEMPORARY_ERROR);
            }
            break;
        default:
            break;
    }
    return new _messageimportdriverexception.MessageImportDriverException(gmailApiError.message, _messageimportdriverexception.MessageImportDriverExceptionCode.UNKNOWN);
};

//# sourceMappingURL=parse-gmail-api-error.util.js.map