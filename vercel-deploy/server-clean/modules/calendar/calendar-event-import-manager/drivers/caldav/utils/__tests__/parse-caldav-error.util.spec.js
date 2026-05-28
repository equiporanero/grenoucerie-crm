"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _calendareventimportdriverexception = require("../../../exceptions/calendar-event-import-driver.exception");
const _parsecaldaverrorutil = require("../parse-caldav-error.util");
describe('parseCalDAVError', ()=>{
    it('maps tsdav auth-failure messages to INSUFFICIENT_PERMISSIONS', ()=>{
        for (const message of [
            'no account for fetchCalendars',
            'Must have account before syncCalendars',
            'Invalid credentials',
            'Invalid auth method'
        ]){
            const result = (0, _parsecaldaverrorutil.parseCalDAVError)(new Error(message));
            expect(result).toBeInstanceOf(_calendareventimportdriverexception.CalendarEventImportDriverException);
            expect(result.code).toBe(_calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS);
        }
    });
    it('maps tsdav not-found messages to NOT_FOUND', ()=>{
        for (const message of [
            'Collection does not exist on server',
            'cannot find homeUrl',
            'cannot fetchCalendarObjects for undefined calendar'
        ]){
            expect((0, _parsecaldaverrorutil.parseCalDAVError)(new Error(message)).code).toBe(_calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.NOT_FOUND);
        }
    });
    it('falls back to UNKNOWN for unrecognised errors', ()=>{
        expect((0, _parsecaldaverrorutil.parseCalDAVError)(new Error('TLS handshake failed')).code).toBe(_calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.UNKNOWN);
    });
    it('forwards the original error message untouched', ()=>{
        const result = (0, _parsecaldaverrorutil.parseCalDAVError)(new Error('Invalid credentials'));
        expect(result.message).toBe('Invalid credentials');
    });
});

//# sourceMappingURL=parse-caldav-error.util.spec.js.map