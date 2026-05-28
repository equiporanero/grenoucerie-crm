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
    get MessageImportDriverException () {
        return MessageImportDriverException;
    },
    get MessageImportDriverExceptionCode () {
        return MessageImportDriverExceptionCode;
    }
});
let MessageImportDriverException = class MessageImportDriverException extends Error {
    constructor(message, code, options){
        super(message);
        this.name = 'MessageImportDriverException';
        this.code = code;
        this.cause = options?.cause;
        this.throttleRetryAfter = options?.throttleRetryAfter;
        this.context = options?.context;
        if (options?.cause?.stack) {
            this.stack = `${this.stack}\nCaused by: ${options.cause.stack}`;
        }
    }
};
var MessageImportDriverExceptionCode = /*#__PURE__*/ function(MessageImportDriverExceptionCode) {
    MessageImportDriverExceptionCode["NOT_FOUND"] = "NOT_FOUND";
    MessageImportDriverExceptionCode["TEMPORARY_ERROR"] = "TEMPORARY_ERROR";
    MessageImportDriverExceptionCode["INSUFFICIENT_PERMISSIONS"] = "INSUFFICIENT_PERMISSIONS";
    MessageImportDriverExceptionCode["UNKNOWN"] = "UNKNOWN";
    MessageImportDriverExceptionCode["UNKNOWN_NETWORK_ERROR"] = "UNKNOWN_NETWORK_ERROR";
    MessageImportDriverExceptionCode["NO_NEXT_SYNC_CURSOR"] = "NO_NEXT_SYNC_CURSOR";
    MessageImportDriverExceptionCode["SYNC_CURSOR_ERROR"] = "SYNC_CURSOR_ERROR";
    MessageImportDriverExceptionCode["PROVIDER_NOT_SUPPORTED"] = "PROVIDER_NOT_SUPPORTED";
    MessageImportDriverExceptionCode["CLIENT_NOT_AVAILABLE"] = "CLIENT_NOT_AVAILABLE";
    MessageImportDriverExceptionCode["ACCESS_TOKEN_MISSING"] = "ACCESS_TOKEN_MISSING";
    MessageImportDriverExceptionCode["CHANNEL_MISCONFIGURED"] = "CHANNEL_MISCONFIGURED";
    return MessageImportDriverExceptionCode;
}({});

//# sourceMappingURL=message-import-driver.exception.js.map