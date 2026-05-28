"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _stripemptyvaluesutil = require("../strip-empty-values.util");
describe('stripEmptyValues', ()=>{
    it('should remove null values', ()=>{
        expect((0, _stripemptyvaluesutil.stripEmptyValues)({
            a: 1,
            b: null
        })).toEqual({
            a: 1
        });
    });
    it('should remove undefined values', ()=>{
        expect((0, _stripemptyvaluesutil.stripEmptyValues)({
            a: 1,
            b: undefined
        })).toEqual({
            a: 1
        });
    });
    it('should remove empty strings', ()=>{
        expect((0, _stripemptyvaluesutil.stripEmptyValues)({
            a: 'hello',
            b: ''
        })).toEqual({
            a: 'hello'
        });
    });
    it('should remove empty objects', ()=>{
        expect((0, _stripemptyvaluesutil.stripEmptyValues)({
            a: 1,
            b: {}
        })).toEqual({
            a: 1
        });
    });
    it('should remove empty arrays', ()=>{
        expect((0, _stripemptyvaluesutil.stripEmptyValues)({
            a: 1,
            b: []
        })).toEqual({
            a: 1
        });
    });
    it('should preserve non-empty values', ()=>{
        expect((0, _stripemptyvaluesutil.stripEmptyValues)({
            a: 0,
            b: false
        })).toEqual({
            a: 0,
            b: false
        });
    });
    it('should recursively strip nested objects', ()=>{
        const input = {
            name: 'Acme',
            address: {
                city: null,
                street: null,
                state: null,
                country: 'US'
            },
            links: {
                primaryLinkUrl: '',
                primaryLinkLabel: '',
                secondaryLinks: []
            }
        };
        expect((0, _stripemptyvaluesutil.stripEmptyValues)(input)).toEqual({
            name: 'Acme',
            address: {
                country: 'US'
            }
        });
    });
    it('should remove deeply nested empty objects', ()=>{
        const input = {
            name: 'Test',
            nested: {
                deep: {
                    empty: null,
                    alsoEmpty: ''
                }
            }
        };
        expect((0, _stripemptyvaluesutil.stripEmptyValues)(input)).toEqual({
            name: 'Test'
        });
    });
    it('should strip empty values from arrays of objects', ()=>{
        const input = {
            records: [
                {
                    id: '1',
                    name: 'Acme',
                    website: null,
                    industry: ''
                },
                {
                    id: '2',
                    name: 'Beta',
                    website: 'beta.com',
                    industry: null
                }
            ]
        };
        expect((0, _stripemptyvaluesutil.stripEmptyValues)(input)).toEqual({
            records: [
                {
                    id: '1',
                    name: 'Acme'
                },
                {
                    id: '2',
                    name: 'Beta',
                    website: 'beta.com'
                }
            ]
        });
    });
    it('should return undefined for entirely empty input', ()=>{
        expect((0, _stripemptyvaluesutil.stripEmptyValues)({
            a: null,
            b: '',
            c: {}
        })).toBeUndefined();
    });
    it('should handle a realistic tool output', ()=>{
        const toolOutput = {
            success: true,
            message: 'Found 2 company records',
            result: {
                records: [
                    {
                        id: 'abc-123',
                        name: 'Acme Corp',
                        employees: 500,
                        industry: 'Technology',
                        website: null,
                        address: {
                            city: null,
                            street: null,
                            state: null,
                            country: null
                        },
                        createdAt: '2024-01-01',
                        updatedAt: '2024-01-02',
                        deletedAt: null
                    }
                ],
                count: 1
            },
            recordReferences: [
                {
                    objectNameSingular: 'company',
                    recordId: 'abc-123',
                    displayName: 'Acme Corp'
                }
            ]
        };
        expect((0, _stripemptyvaluesutil.stripEmptyValues)(toolOutput)).toEqual({
            success: true,
            message: 'Found 2 company records',
            result: {
                records: [
                    {
                        id: 'abc-123',
                        name: 'Acme Corp',
                        employees: 500,
                        industry: 'Technology',
                        createdAt: '2024-01-01',
                        updatedAt: '2024-01-02'
                    }
                ],
                count: 1
            },
            recordReferences: [
                {
                    objectNameSingular: 'company',
                    recordId: 'abc-123',
                    displayName: 'Acme Corp'
                }
            ]
        });
    });
    it('should handle primitive values', ()=>{
        expect((0, _stripemptyvaluesutil.stripEmptyValues)(42)).toBe(42);
        expect((0, _stripemptyvaluesutil.stripEmptyValues)('hello')).toBe('hello');
        expect((0, _stripemptyvaluesutil.stripEmptyValues)(true)).toBe(true);
        expect((0, _stripemptyvaluesutil.stripEmptyValues)(false)).toBe(false);
        expect((0, _stripemptyvaluesutil.stripEmptyValues)(null)).toBeUndefined();
        expect((0, _stripemptyvaluesutil.stripEmptyValues)(undefined)).toBeUndefined();
        expect((0, _stripemptyvaluesutil.stripEmptyValues)('')).toBeUndefined();
    });
});

//# sourceMappingURL=strip-empty-values.util.spec.js.map