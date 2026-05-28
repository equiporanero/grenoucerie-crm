"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _sanitizedefaultvalueutil = require("../sanitize-default-value.util");
describe('sanitizeDefaultValue', ()=>{
    describe('allowed functions', ()=>{
        it('should allow uuid_generate_v4() function', ()=>{
            const input = 'public.uuid_generate_v4()';
            const result = (0, _sanitizedefaultvalueutil.sanitizeDefaultValue)(input);
            expect(result).toBe('public.uuid_generate_v4()');
        });
        it('should allow now() function', ()=>{
            const input = 'now()';
            const result = (0, _sanitizedefaultvalueutil.sanitizeDefaultValue)(input);
            expect(result).toBe('now()');
        });
        it('should be case insensitive for allowed functions', ()=>{
            expect((0, _sanitizedefaultvalueutil.sanitizeDefaultValue)('NOW()')).toBe('NOW()');
        });
    });
    describe('SQL injection prevention via escapeLiteral', ()=>{
        it('should escape single quotes to prevent SQL injection', ()=>{
            const maliciousInput = "'; DROP TABLE users; --";
            const result = (0, _sanitizedefaultvalueutil.sanitizeDefaultValue)(maliciousInput);
            // Single quotes are doubled, making injection impossible
            expect(result).toBe("'''; DROP TABLE users; --'");
        });
        it('should preserve double quotes inside string literals (safe in SQL strings)', ()=>{
            const inputWithQuotes = 'test"value';
            const result = (0, _sanitizedefaultvalueutil.sanitizeDefaultValue)(inputWithQuotes);
            expect(result).toBe("'test\"value'");
        });
        it('should preserve parentheses inside string literals (safe in SQL strings)', ()=>{
            const inputWithParens = 'test(value)';
            const result = (0, _sanitizedefaultvalueutil.sanitizeDefaultValue)(inputWithParens);
            expect(result).toBe("'test(value)'");
        });
        it('should escape backslashes with E-string syntax', ()=>{
            const inputWithBackslash = 'test\\value';
            const result = (0, _sanitizedefaultvalueutil.sanitizeDefaultValue)(inputWithBackslash);
            expect(result).toBe("E'test\\\\value'");
        });
        it('should preserve comment-like patterns inside string literals (safe in SQL strings)', ()=>{
            const inputWithComments = 'value/*comment*/test';
            const result = (0, _sanitizedefaultvalueutil.sanitizeDefaultValue)(inputWithComments);
            expect(result).toBe("'value/*comment*/test'");
        });
    });
    describe('regular values', ()=>{
        it('should preserve simple string values', ()=>{
            const input = 'simple_value';
            const result = (0, _sanitizedefaultvalueutil.sanitizeDefaultValue)(input);
            expect(result).toBe("'simple_value'");
        });
        it('should preserve numeric values', ()=>{
            expect((0, _sanitizedefaultvalueutil.sanitizeDefaultValue)(12345)).toBe(12345);
        });
        it('should preserve boolean values', ()=>{
            expect((0, _sanitizedefaultvalueutil.sanitizeDefaultValue)(true)).toBe(true);
            expect((0, _sanitizedefaultvalueutil.sanitizeDefaultValue)(false)).toBe(false);
        });
        it('should handle empty string', ()=>{
            expect((0, _sanitizedefaultvalueutil.sanitizeDefaultValue)('')).toBe("''");
        });
        it('should preserve whitespace in string values', ()=>{
            const input = '  test  ';
            const result = (0, _sanitizedefaultvalueutil.sanitizeDefaultValue)(input);
            expect(result).toBe("'  test  '");
        });
        it('should preserve alphanumeric values with underscores', ()=>{
            const input = 'test_value_123';
            const result = (0, _sanitizedefaultvalueutil.sanitizeDefaultValue)(input);
            expect(result).toBe("'test_value_123'");
        });
    });
    describe('mixed cases', ()=>{
        it('should distinguish between allowed functions and similar strings', ()=>{
            expect((0, _sanitizedefaultvalueutil.sanitizeDefaultValue)('now()')).toBe('now()');
            expect((0, _sanitizedefaultvalueutil.sanitizeDefaultValue)('now_test')).toBe("'now_test'");
            expect((0, _sanitizedefaultvalueutil.sanitizeDefaultValue)('not_now()')).toBe("'not_now()'");
        });
        it('should handle functions with different casing but escape non-functions', ()=>{
            expect((0, _sanitizedefaultvalueutil.sanitizeDefaultValue)('NOW()')).toBe('NOW()');
            expect((0, _sanitizedefaultvalueutil.sanitizeDefaultValue)('now_function')).toBe("'now_function'");
        });
        it('should properly escape complex mixed input', ()=>{
            const complexInput = 'test"value; DROP TABLE users; /* comment */ now()';
            const result = (0, _sanitizedefaultvalueutil.sanitizeDefaultValue)(complexInput);
            expect(result).toBe("'test\"value; DROP TABLE users; /* comment */ now()'");
        });
    });
    describe('edge cases', ()=>{
        it('should handle null', ()=>{
            expect((0, _sanitizedefaultvalueutil.sanitizeDefaultValue)(null)).toBe('NULL');
        });
        it('should handle strings that start with allowed function names', ()=>{
            expect((0, _sanitizedefaultvalueutil.sanitizeDefaultValue)('now_extended')).toBe("'now_extended'");
            expect((0, _sanitizedefaultvalueutil.sanitizeDefaultValue)('gen_random_uuid_custom')).toBe("'gen_random_uuid_custom'");
        });
        it('should escape all special characters properly', ()=>{
            const specialChars = '!@#$%^&*()+=[]{}|\\:";\'<>?,.';
            const result = (0, _sanitizedefaultvalueutil.sanitizeDefaultValue)(specialChars);
            // Backslash triggers E-string, single quotes are doubled
            expect(result).toContain('E');
            expect(result).toContain("''");
        });
        it('should handle very long strings with injection attempts', ()=>{
            const longString = 'a'.repeat(1000) + "'; DROP TABLE users;";
            const result = (0, _sanitizedefaultvalueutil.sanitizeDefaultValue)(longString);
            // The single quote in the injection attempt is properly escaped
            expect(result).toBe(`'${'a'.repeat(1000)}''; DROP TABLE users;'`);
        });
    });
});

//# sourceMappingURL=sanitize-default-value.util.spec.js.map