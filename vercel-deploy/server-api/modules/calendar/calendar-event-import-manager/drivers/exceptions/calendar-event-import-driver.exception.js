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
    get CalendarEventImportDriverException () {
        return CalendarEventImportDriverException;
    },
    get CalendarEventImportDriverExceptionCode () {
        return CalendarEventImportDriverExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../../utils/custom-exception");
var CalendarEventImportDriverExceptionCode = /*#__PURE__*/ function(CalendarEventImportDriverExceptionCode) {
    CalendarEventImportDriverExceptionCode["NOT_FOUND"] = "NOT_FOUND";
    CalendarEventImportDriverExceptionCode["TEMPORARY_ERROR"] = "TEMPORARY_ERROR";
    CalendarEventImportDriverExceptionCode["INSUFFICIENT_PERMISSIONS"] = "INSUFFICIENT_PERMISSIONS";
    CalendarEventImportDriverExceptionCode["SYNC_CURSOR_ERROR"] = "SYNC_CURSOR_ERROR";
    CalendarEventImportDriverExceptionCode["UNKNOWN"] = "UNKNOWN";
    CalendarEventImportDriverExceptionCode["UNKNOWN_NETWORK_ERROR"] = "UNKNOWN_NETWORK_ERROR";
    CalendarEventImportDriverExceptionCode["HANDLE_ALIASES_REQUIRED"] = "HANDLE_ALIASES_REQUIRED";
    CalendarEventImportDriverExceptionCode["CHANNEL_MISCONFIGURED"] = "CHANNEL_MISCONFIGURED";
    return CalendarEventImportDriverExceptionCode;
}({});
const getCalendarEventImportDriverExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "NOT_FOUND":
            return /*i18n*/ {
                id: "1t3DGy",
                message: "Calendar event not found."
            };
        case "TEMPORARY_ERROR":
            return /*i18n*/ {
                id: "c1qcYo",
                message: "A temporary error occurred. Please try again."
            };
        case "INSUFFICIENT_PERMISSIONS":
            return /*i18n*/ {
                id: "Bluaux",
                message: "Insufficient permissions to access calendar."
            };
        case "SYNC_CURSOR_ERROR":
            return /*i18n*/ {
                id: "CnNFfU",
                message: "Calendar sync error."
            };
        case "UNKNOWN":
            return /*i18n*/ {
                id: "q8ZbjA",
                message: "An unknown calendar error occurred."
            };
        case "UNKNOWN_NETWORK_ERROR":
            return /*i18n*/ {
                id: "ChJFls",
                message: "A network error occurred while accessing calendar."
            };
        case "HANDLE_ALIASES_REQUIRED":
            return /*i18n*/ {
                id: "CDiGGx",
                message: "Handle aliases are required."
            };
        case "CHANNEL_MISCONFIGURED":
            return /*i18n*/ {
                id: "bQS4UN",
                message: "Calendar channel is misconfigured."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let CalendarEventImportDriverException = class CalendarEventImportDriverException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getCalendarEventImportDriverExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=calendar-event-import-driver.exception.js.map