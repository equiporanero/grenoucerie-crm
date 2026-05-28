"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validateisemptyarrayoperatorvalueorthrowutil = require("../validate-is-empty-array-operator-value-or-throw.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
describe('validateIsEmptyArrayOperatorValueOrThrow', ()=>{
    it('should not throw when value is true', ()=>{
        expect(()=>(0, _validateisemptyarrayoperatorvalueorthrowutil.validateIsEmptyArrayOperatorValueOrThrow)(true, 'fieldName')).not.toThrow();
    });
    it('should not throw when value is false', ()=>{
        expect(()=>(0, _validateisemptyarrayoperatorvalueorthrowutil.validateIsEmptyArrayOperatorValueOrThrow)(false, 'fieldName')).not.toThrow();
    });
    it('should throw when value is not a boolean', ()=>{
        expect(()=>(0, _validateisemptyarrayoperatorvalueorthrowutil.validateIsEmptyArrayOperatorValueOrThrow)('true', 'fieldName')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
    });
    it('should throw when value is an array', ()=>{
        expect(()=>(0, _validateisemptyarrayoperatorvalueorthrowutil.validateIsEmptyArrayOperatorValueOrThrow)([], 'fieldName')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
    });
});

//# sourceMappingURL=validate-is-empty-array-operator-value-or-throw.util.spec.js.map