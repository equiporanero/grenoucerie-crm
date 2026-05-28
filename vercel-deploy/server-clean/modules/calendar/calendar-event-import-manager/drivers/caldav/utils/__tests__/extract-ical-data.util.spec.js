"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _extracticaldatautil = require("../extract-ical-data.util");
const VCALENDAR_PAYLOAD = 'BEGIN:VCALENDAR\r\nEND:VCALENDAR';
describe('extractICalData', ()=>{
    it('returns the string as-is when it already contains VCALENDAR', ()=>{
        expect((0, _extracticaldatautil.extractICalData)(VCALENDAR_PAYLOAD)).toBe(VCALENDAR_PAYLOAD);
    });
    it('unwraps nested CDATA-style wrappers', ()=>{
        expect((0, _extracticaldatautil.extractICalData)({
            _cdata: VCALENDAR_PAYLOAD
        })).toBe(VCALENDAR_PAYLOAD);
    });
    it('recurses through arbitrarily nested objects', ()=>{
        expect((0, _extracticaldatautil.extractICalData)({
            outer: {
                inner: {
                    deeper: VCALENDAR_PAYLOAD
                }
            }
        })).toBe(VCALENDAR_PAYLOAD);
    });
    it('returns null when no VCALENDAR block is found', ()=>{
        expect((0, _extracticaldatautil.extractICalData)('not a calendar')).toBeNull();
        expect((0, _extracticaldatautil.extractICalData)({
            random: 'payload'
        })).toBeNull();
    });
    it.each([
        null,
        undefined,
        ''
    ])('returns null for empty input %s', (value)=>{
        expect((0, _extracticaldatautil.extractICalData)(value)).toBeNull();
    });
});

//# sourceMappingURL=extract-ical-data.util.spec.js.map