"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _removesqlinjectionutil = require("../remove-sql-injection.util");
describe('removeSqlDDLInjection', ()=>{
    it('should strip non-alphanumeric/underscore characters', ()=>{
        expect((0, _removesqlinjectionutil.removeSqlDDLInjection)('my_table')).toBe('my_table');
        expect((0, _removesqlinjectionutil.removeSqlDDLInjection)('table"name')).toBe('tablename');
        expect((0, _removesqlinjectionutil.removeSqlDDLInjection)('drop;--')).toBe('drop');
    });
});
describe('escapeIdentifier', ()=>{
    it('should wrap identifier in double quotes', ()=>{
        expect((0, _removesqlinjectionutil.escapeIdentifier)('myTable')).toBe('"myTable"');
    });
    it('should double internal double-quote characters', ()=>{
        expect((0, _removesqlinjectionutil.escapeIdentifier)('my"table')).toBe('"my""table"');
        expect((0, _removesqlinjectionutil.escapeIdentifier)('a""b')).toBe('"a""""b"');
    });
    it('should handle empty string', ()=>{
        expect((0, _removesqlinjectionutil.escapeIdentifier)('')).toBe('""');
    });
    it('should handle single-quote characters without modification', ()=>{
        expect((0, _removesqlinjectionutil.escapeIdentifier)("it's")).toBe('"it\'s"');
    });
    it('should reject null bytes', ()=>{
        expect(()=>(0, _removesqlinjectionutil.escapeIdentifier)('my\0table')).toThrow('Null bytes are not allowed in PostgreSQL identifiers');
    });
    it('should handle SQL injection attempts in identifiers', ()=>{
        expect((0, _removesqlinjectionutil.escapeIdentifier)('"; DROP TABLE users; --')).toBe('"""; DROP TABLE users; --"');
    });
});
describe('escapeLiteral', ()=>{
    it('should wrap value in single quotes', ()=>{
        expect((0, _removesqlinjectionutil.escapeLiteral)('hello')).toBe("'hello'");
    });
    it('should double internal single-quote characters', ()=>{
        expect((0, _removesqlinjectionutil.escapeLiteral)("it's")).toBe("'it''s'");
        expect((0, _removesqlinjectionutil.escapeLiteral)("a''b")).toBe("'a''''b'");
    });
    it('should handle empty string', ()=>{
        expect((0, _removesqlinjectionutil.escapeLiteral)('')).toBe("''");
    });
    it('should escape backslashes and add E prefix', ()=>{
        expect((0, _removesqlinjectionutil.escapeLiteral)('test\\value')).toBe("E'test\\\\value'");
    });
    it('should handle both single quotes and backslashes', ()=>{
        expect((0, _removesqlinjectionutil.escapeLiteral)("it's a \\path")).toBe("E'it''s a \\\\path'");
    });
    it('should not add E prefix when no backslashes present', ()=>{
        expect((0, _removesqlinjectionutil.escapeLiteral)('simple')).toBe("'simple'");
        expect((0, _removesqlinjectionutil.escapeLiteral)("it's")).toBe("'it''s'");
    });
    it('should reject null bytes', ()=>{
        expect(()=>(0, _removesqlinjectionutil.escapeLiteral)('my\0value')).toThrow('Null bytes are not allowed in PostgreSQL string literals');
    });
    it('should handle SQL injection attempts in literals', ()=>{
        expect((0, _removesqlinjectionutil.escapeLiteral)("'; DROP TABLE users; --")).toBe("'''; DROP TABLE users; --'");
    });
    it('should handle double quotes without modification', ()=>{
        expect((0, _removesqlinjectionutil.escapeLiteral)('test"value')).toBe("'test\"value'");
    });
});

//# sourceMappingURL=remove-sql-injection.util.spec.js.map