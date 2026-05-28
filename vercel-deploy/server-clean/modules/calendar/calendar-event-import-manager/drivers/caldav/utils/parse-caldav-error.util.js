"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseCalDAVError", {
    enumerable: true,
    get: function() {
        return parseCalDAVError;
    }
});
const _calendareventimportdriverexception = require("../../exceptions/calendar-event-import-driver.exception");
const parseCalDAVError = (error)=>{
    const { message } = error;
    switch(message){
        case 'Collection does not exist on server':
            return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.NOT_FOUND);
        case 'no account for smartCollectionSync':
        case 'no account for fetchAddressBooks':
        case 'no account for fetchCalendars':
        case 'Must have account before syncCalendars':
            return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS);
        case 'cannot fetchVCards for undefined addressBook':
        case 'cannot find calendarUserAddresses':
        case 'cannot fetchCalendarObjects for undefined calendar':
        case 'cannot find homeUrl':
            return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.NOT_FOUND);
        case 'Invalid credentials':
            return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS);
        case 'Invalid auth method':
            return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS);
    }
    return new _calendareventimportdriverexception.CalendarEventImportDriverException(message, _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.UNKNOWN);
};

//# sourceMappingURL=parse-caldav-error.util.js.map