"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _isvalidcaldavhrefutil = require("../is-valid-caldav-href.util");
describe('isValidCalDavHref', ()=>{
    it.each([
        'https://caldav.example.com/calendars/user/event.ics',
        'https://caldav.example.com/calendars/user/event.ICS',
        'https://caldav.example.com/calendars/user/message.eml'
    ])('accepts CalDAV-format href %s', (href)=>{
        expect((0, _isvalidcaldavhrefutil.isValidCalDavHref)(href)).toBe(true);
    });
    it.each([
        'https://caldav.example.com/calendars/user/notes.txt',
        'https://caldav.example.com/calendars/user/data.json'
    ])('rejects non-CalDAV extension %s', (href)=>{
        expect((0, _isvalidcaldavhrefutil.isValidCalDavHref)(href)).toBe(false);
    });
    it('treats hrefs without an extension as ics (some servers omit it)', ()=>{
        expect((0, _isvalidcaldavhrefutil.isValidCalDavHref)('https://caldav.example.com/calendars/user/abc123')).toBe(true);
    });
    it('treats trailing slash as no-extension', ()=>{
        expect((0, _isvalidcaldavhrefutil.isValidCalDavHref)('https://caldav.example.com/calendars/user/')).toBe(true);
    });
});

//# sourceMappingURL=is-valid-caldav-href.util.spec.js.map