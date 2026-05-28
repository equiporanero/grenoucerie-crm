"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseMicrosoftCalendarError", {
    enumerable: true,
    get: function() {
        return parseMicrosoftCalendarError;
    }
});
const _calendareventimportdriverexception = require("../../exceptions/calendar-event-import-driver.exception");
const _utils = require("twenty-shared/utils");
const parseMicrosoftCalendarError = (error)=>{
    const { statusCode, message } = error;
    switch(statusCode){
        case 400:
            if (!(0, _utils.isDefined)(message)) {
                return new _calendareventimportdriverexception.CalendarEventImportDriverException('Microsoft Graph API returned 400 with empty error body', _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.TEMPORARY_ERROR);
            }
            return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.UNKNOWN);
        case 404:
            if (message?.includes('The mailbox is either inactive, soft-deleted, or is hosted on-premise.')) {
                return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS);
            }
            return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.NOT_FOUND);
        case 410:
            return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.SYNC_CURSOR_ERROR);
        case 429:
        case 500:
        case 502:
        case 503:
        case 504:
        case 509:
            return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.TEMPORARY_ERROR);
        case 403:
            return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS);
        case 401:
            return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS);
        default:
            return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.UNKNOWN);
    }
};

//# sourceMappingURL=parse-microsoft-calendar-error.util.js.map