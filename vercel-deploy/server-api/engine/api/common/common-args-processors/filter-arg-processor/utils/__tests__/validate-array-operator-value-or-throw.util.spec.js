"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validatearrayoperatorvalueorthrowutil = require("../validate-array-operator-value-or-throw.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
describe('validateArrayOperatorValueOrThrow', ()=>{
    it('should not throw when value is an array', ()=>{
        expect(()=>(0, _validatearrayoperatorvalueorthrowutil.validateArrayOperatorValueOrThrow)([
                1,
                2
            ], 'in', 'fieldName')).not.toThrow();
    });
    it('should throw when value is not an array', ()=>{
        expect(()=>(0, _validatearrayoperatorvalueorthrowutil.validateArrayOperatorValueOrThrow)('not-array', 'in', 'fieldName')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
    });
    it('should throw when value is object', ()=>{
        expect(()=>(0, _validatearrayoperatorvalueorthrowutil.validateArrayOperatorValueOrThrow)({}, 'containsAny', 'fieldName')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
    });
});

//# sourceMappingURL=validate-array-operator-value-or-throw.util.spec.js.map