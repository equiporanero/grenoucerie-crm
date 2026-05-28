"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _humanizesubfieldlabelutil = require("../humanize-sub-field-label.util");
describe('humanizeSubFieldLabel', ()=>{
    it('returns empty string for empty input', ()=>{
        expect((0, _humanizesubfieldlabelutil.humanizeSubFieldLabel)('')).toBe('');
    });
    it('handles camelCase field names', ()=>{
        expect((0, _humanizesubfieldlabelutil.humanizeSubFieldLabel)('addressCity')).toBe('Address City');
        expect((0, _humanizesubfieldlabelutil.humanizeSubFieldLabel)('firstName')).toBe('First Name');
        expect((0, _humanizesubfieldlabelutil.humanizeSubFieldLabel)('primaryEmailAddress')).toBe('Primary Email Address');
    });
    it('handles single word', ()=>{
        expect((0, _humanizesubfieldlabelutil.humanizeSubFieldLabel)('id')).toBe('Id');
        expect((0, _humanizesubfieldlabelutil.humanizeSubFieldLabel)('name')).toBe('Name');
    });
    it('handles snake_case field names', ()=>{
        expect((0, _humanizesubfieldlabelutil.humanizeSubFieldLabel)('address_city')).toBe('Address City');
        expect((0, _humanizesubfieldlabelutil.humanizeSubFieldLabel)('first_name')).toBe('First Name');
    });
    it('handles kebab-case field names', ()=>{
        expect((0, _humanizesubfieldlabelutil.humanizeSubFieldLabel)('address-city')).toBe('Address City');
    });
    it('handles mixed separators', ()=>{
        expect((0, _humanizesubfieldlabelutil.humanizeSubFieldLabel)('address_cityName')).toBe('Address City Name');
    });
    it('handles consecutive separators', ()=>{
        expect((0, _humanizesubfieldlabelutil.humanizeSubFieldLabel)('foo__bar')).toBe('Foo Bar');
        expect((0, _humanizesubfieldlabelutil.humanizeSubFieldLabel)('foo--bar')).toBe('Foo Bar');
    });
    it('handles uppercase input', ()=>{
        expect((0, _humanizesubfieldlabelutil.humanizeSubFieldLabel)('ADDRESS')).toBe('Address');
    });
    it('handles whitespace', ()=>{
        expect((0, _humanizesubfieldlabelutil.humanizeSubFieldLabel)('  firstName  ')).toBe('First Name');
    });
    it('handles numbers in field names', ()=>{
        expect((0, _humanizesubfieldlabelutil.humanizeSubFieldLabel)('address2City')).toBe('Address2 City');
    });
});

//# sourceMappingURL=humanize-sub-field-label.util.spec.js.map