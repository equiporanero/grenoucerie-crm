"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _cleanentitynameutil = require("../clean-entity-name.util");
describe('cleanEntityName', ()=>{
    test('should camelCase strings', ()=>{
        expect((0, _cleanentitynameutil.cleanEntityName)('hello world')).toBe('helloWorld');
        expect((0, _cleanentitynameutil.cleanEntityName)('my name is John')).toBe('myNameIsJohn');
    });
    test('should remove numbers at the beginning', ()=>{
        expect((0, _cleanentitynameutil.cleanEntityName)('123hello')).toBe('hello');
        expect((0, _cleanentitynameutil.cleanEntityName)('456hello world')).toBe('helloWorld');
    });
    test('should remove special characters', ()=>{
        expect((0, _cleanentitynameutil.cleanEntityName)('hello$world')).toBe('helloWorld');
        expect((0, _cleanentitynameutil.cleanEntityName)('some#special&chars')).toBe('someSpecialChars');
    });
    test('should handle empty strings', ()=>{
        expect((0, _cleanentitynameutil.cleanEntityName)('')).toBe('');
    });
});

//# sourceMappingURL=clean-entity-name.spec.js.map