"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validateisoperatorfiltervalueorthrowutil = require("../validate-is-operator-filter-value-or-throw.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
describe('validateIsOperatorFilterValueOrThrow', ()=>{
    it('should not throw when value is NULL', ()=>{
        expect(()=>(0, _validateisoperatorfiltervalueorthrowutil.validateIsOperatorFilterValueOrThrow)('NULL')).not.toThrow();
    });
    it('should not throw when value is NOT_NULL', ()=>{
        expect(()=>(0, _validateisoperatorfiltervalueorthrowutil.validateIsOperatorFilterValueOrThrow)('NOT_NULL')).not.toThrow();
    });
    it('should throw when value is invalid', ()=>{
        expect(()=>(0, _validateisoperatorfiltervalueorthrowutil.validateIsOperatorFilterValueOrThrow)('invalid')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
    });
    it('should throw when value is null', ()=>{
        expect(()=>(0, _validateisoperatorfiltervalueorthrowutil.validateIsOperatorFilterValueOrThrow)(null)).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
    });
    it('should throw when value is empty string', ()=>{
        expect(()=>(0, _validateisoperatorfiltervalueorthrowutil.validateIsOperatorFilterValueOrThrow)('')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
    });
});

//# sourceMappingURL=validate-is-operator-filter-value-or-throw.util.spec.js.map