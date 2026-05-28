"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _formatpgcopyvalueutil = require("../format-pg-copy-value.util");
describe('formatPgCopyField', ()=>{
    it('should return \\N for null and undefined', ()=>{
        expect((0, _formatpgcopyvalueutil.formatPgCopyField)(null)).toBe('\\N');
        expect((0, _formatpgcopyvalueutil.formatPgCopyField)(undefined)).toBe('\\N');
    });
    it('should return t/f for booleans (not true/false)', ()=>{
        expect((0, _formatpgcopyvalueutil.formatPgCopyField)(true)).toBe('t');
        expect((0, _formatpgcopyvalueutil.formatPgCopyField)(false)).toBe('f');
    });
    it('should return \\N for non-finite numbers', ()=>{
        expect((0, _formatpgcopyvalueutil.formatPgCopyField)(NaN)).toBe('\\N');
        expect((0, _formatpgcopyvalueutil.formatPgCopyField)(Infinity)).toBe('\\N');
    });
    it('should escape tabs, newlines, and backslashes in strings', ()=>{
        expect((0, _formatpgcopyvalueutil.formatPgCopyField)('col1\tcol2')).toBe('col1\\tcol2');
        expect((0, _formatpgcopyvalueutil.formatPgCopyField)('line1\nline2')).toBe('line1\\nline2');
        expect((0, _formatpgcopyvalueutil.formatPgCopyField)('path\\to\\file')).toBe('path\\\\to\\\\file');
        expect((0, _formatpgcopyvalueutil.formatPgCopyField)('a\r\nb')).toBe('a\\r\\nb');
    });
    it('should not quote strings (COPY format is unquoted)', ()=>{
        const result = (0, _formatpgcopyvalueutil.formatPgCopyField)('hello world');
        expect(result).toBe('hello world');
        expect(result).not.toContain("'");
    });
    it('should format dates as ISO strings without quotes', ()=>{
        const date = new Date('2024-01-15T10:30:00.000Z');
        expect((0, _formatpgcopyvalueutil.formatPgCopyField)(date)).toBe('2024-01-15T10:30:00.000Z');
    });
    it('should escape special chars in JSON column values', ()=>{
        const value = {
            key: 'value\twith\ttabs'
        };
        expect((0, _formatpgcopyvalueutil.formatPgCopyField)(value, true)).toBe('{"key":"value\\\\twith\\\\ttabs"}');
    });
    it('should format PostgreSQL array literals', ()=>{
        expect((0, _formatpgcopyvalueutil.formatPgCopyField)([])).toBe('{}');
        expect((0, _formatpgcopyvalueutil.formatPgCopyField)([
            'a',
            'b'
        ])).toBe('{"a","b"}');
        expect((0, _formatpgcopyvalueutil.formatPgCopyField)([
            'val\twith\ttab'
        ])).toBe('{"val\\twith\\ttab"}');
    });
    it('should JSON-serialize arrays of objects with escaping', ()=>{
        const value = [
            {
                id: 1,
                name: 'test\ttab'
            }
        ];
        expect((0, _formatpgcopyvalueutil.formatPgCopyField)(value)).toBe('[{"id":1,"name":"test\\\\ttab"}]');
    });
    it('should handle a row with mixed types matching COPY tab-delimited format', ()=>{
        const fields = [
            (0, _formatpgcopyvalueutil.formatPgCopyField)('abc-123'),
            (0, _formatpgcopyvalueutil.formatPgCopyField)(null),
            (0, _formatpgcopyvalueutil.formatPgCopyField)(true),
            (0, _formatpgcopyvalueutil.formatPgCopyField)(42),
            (0, _formatpgcopyvalueutil.formatPgCopyField)(new Date('2025-03-28T00:00:00.000Z'))
        ];
        expect(fields.join('\t')).toBe('abc-123\t\\N\tt\t42\t2025-03-28T00:00:00.000Z');
    });
});

//# sourceMappingURL=format-copy-value.util.spec.js.map