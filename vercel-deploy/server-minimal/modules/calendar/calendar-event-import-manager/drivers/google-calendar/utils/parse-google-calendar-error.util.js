"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseGoogleCalendarError", {
    enumerable: true,
    get: function() {
        return parseGoogleCalendarError;
    }
});
const _calendareventimportdriverexception = require("../../exceptions/calendar-event-import-driver.exception");
const parseGoogleCalendarError = (error)=>{
    const { code, reason, message } = error;
    switch(code){
        case 400:
            if (reason === 'invalid_grant') {
                return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS);
            }
            if (reason === 'failedPrecondition') {
                return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.TEMPORARY_ERROR);
            }
            return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.UNKNOWN);
        case 404:
            return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.NOT_FOUND);
        case 429:
            return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.TEMPORARY_ERROR);
        case 403:
            if (reason === 'rateLimitExceeded' || reason === 'userRateLimitExceeded') {
                return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.TEMPORARY_ERROR);
            } else {
                return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS);
            }
        case 401:
            return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS);
        case 500:
            if (reason === 'backendError' || reason === 'internal_failure') {
                return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.TEMPORARY_ERROR);
            } else {
                return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.UNKNOWN);
            }
        default:
            break;
    }
    return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.UNKNOWN);
};

//# sourceMappingURL=parse-google-calendar-error.util.js.map