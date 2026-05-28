"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _formatsqlvalueutil = require("../format-sql-value.util");
describe('formatSqlValue', ()=>{
    it('should return NULL for null and undefined', ()=>{
        expect((0, _formatsqlvalueutil.formatSqlValue)(null)).toBe('NULL');
        expect((0, _formatsqlvalueutil.formatSqlValue)(undefined)).toBe('NULL');
    });
    it('should return unquoted TRUE/FALSE for booleans', ()=>{
        expect((0, _formatsqlvalueutil.formatSqlValue)(true)).toBe('TRUE');
        expect((0, _formatsqlvalueutil.formatSqlValue)(false)).toBe('FALSE');
    });
    it('should return unquoted numbers', ()=>{
        expect((0, _formatsqlvalueutil.formatSqlValue)(42)).toBe('42');
        expect((0, _formatsqlvalueutil.formatSqlValue)(3.14)).toBe('3.14');
        expect((0, _formatsqlvalueutil.formatSqlValue)(-1)).toBe('-1');
        expect((0, _formatsqlvalueutil.formatSqlValue)(0)).toBe('0');
    });
    it('should return NULL for NaN and Infinity', ()=>{
        expect((0, _formatsqlvalueutil.formatSqlValue)(NaN)).toBe('NULL');
        expect((0, _formatsqlvalueutil.formatSqlValue)(Infinity)).toBe('NULL');
        expect((0, _formatsqlvalueutil.formatSqlValue)(-Infinity)).toBe('NULL');
    });
    it('should return unquoted bigint', ()=>{
        expect((0, _formatsqlvalueutil.formatSqlValue)(BigInt(9007199254740991))).toBe('9007199254740991');
    });
    it('should escape single quotes in strings', ()=>{
        expect((0, _formatsqlvalueutil.formatSqlValue)("it's")).toBe("'it''s'");
    });
    it('should handle backslashes with E-string prefix', ()=>{
        expect((0, _formatsqlvalueutil.formatSqlValue)('path\\to\\file')).toBe("E'path\\\\to\\\\file'");
    });
    it('should format dates as escaped ISO strings', ()=>{
        const date = new Date('2024-01-15T10:30:00.000Z');
        expect((0, _formatsqlvalueutil.formatSqlValue)(date)).toBe("'2024-01-15T10:30:00.000Z'");
    });
    it('should JSON-serialize objects when isJsonColumn is true', ()=>{
        const value = {
            key: 'value'
        };
        expect((0, _formatsqlvalueutil.formatSqlValue)(value, true)).toBe('\'{"key":"value"}\'');
    });
    it('should JSON-serialize plain objects even when isJsonColumn is false', ()=>{
        const value = {
            key: 'value'
        };
        expect((0, _formatsqlvalueutil.formatSqlValue)(value, false)).toBe('\'{"key":"value"}\'');
    });
    it('should return empty PostgreSQL array literal for empty arrays', ()=>{
        expect((0, _formatsqlvalueutil.formatSqlValue)([])).toBe("'{}'");
    });
    it('should format string arrays as PostgreSQL array literals', ()=>{
        expect((0, _formatsqlvalueutil.formatSqlValue)([
            'a',
            'b',
            'c'
        ])).toBe('\'{"a","b","c"}\'');
    });
    it('should escape single quotes in array elements', ()=>{
        expect((0, _formatsqlvalueutil.formatSqlValue)([
            "O'Reilly"
        ])).toBe("'{\"O''Reilly\"}'");
    });
    it('should format arrays with null elements as PostgreSQL array literals', ()=>{
        expect((0, _formatsqlvalueutil.formatSqlValue)([
            null,
            'foo',
            'bar'
        ])).toBe('\'{NULL,"foo","bar"}\'');
    });
    it('should JSON-serialize arrays of objects', ()=>{
        const value = [
            {
                id: 1
            },
            {
                id: 2
            }
        ];
        expect((0, _formatsqlvalueutil.formatSqlValue)(value)).toBe('\'[{"id":1},{"id":2}]\'');
    });
    it('should throw on strings containing null bytes', ()=>{
        expect(()=>(0, _formatsqlvalueutil.formatSqlValue)('hello\0world')).toThrow('Null bytes are not allowed');
    });
});

//# sourceMappingURL=format-sql-value.util.spec.js.map