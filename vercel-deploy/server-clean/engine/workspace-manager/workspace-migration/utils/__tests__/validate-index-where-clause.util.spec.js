"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validateindexwhereclauseutil = require("../validate-index-where-clause.util");
describe('validateAndReturnIndexWhereClause', ()=>{
    it('should return undefined for null/undefined/empty input', ()=>{
        expect((0, _validateindexwhereclauseutil.validateAndReturnIndexWhereClause)(null)).toBeUndefined();
        expect((0, _validateindexwhereclauseutil.validateAndReturnIndexWhereClause)(undefined)).toBeUndefined();
        expect((0, _validateindexwhereclauseutil.validateAndReturnIndexWhereClause)('')).toBeUndefined();
    });
    it('should return the clause when it is in the allowlist', ()=>{
        expect((0, _validateindexwhereclauseutil.validateAndReturnIndexWhereClause)('"deletedAt" IS NULL')).toBe('"deletedAt" IS NULL');
    });
    it('should throw for clauses not in the allowlist', ()=>{
        expect(()=>(0, _validateindexwhereclauseutil.validateAndReturnIndexWhereClause)('1=1; DROP TABLE users;')).toThrow('Unsupported index WHERE clause');
    });
    it('should throw for subtle variants of allowed clauses', ()=>{
        expect(()=>(0, _validateindexwhereclauseutil.validateAndReturnIndexWhereClause)('"deletedAt" IS NOT NULL')).toThrow('Unsupported index WHERE clause');
    });
});

//# sourceMappingURL=validate-index-where-clause.util.spec.js.map