"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validatenumericfieldorthrowutil = require("../validate-numeric-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
describe('validateNumericFieldOrThrow', ()=>{
    describe('valid inputs', ()=>{
        it('should return null when value is null', ()=>{
            const result = (0, _validatenumericfieldorthrowutil.validateNumericFieldOrThrow)(null, 'testField');
            expect(result).toBeNull();
        });
        it('should return null when value is an empty string', ()=>{
            const result = (0, _validatenumericfieldorthrowutil.validateNumericFieldOrThrow)('', 'testField');
            expect(result).toBeNull();
        });
        it('should return the number when value is a float', ()=>{
            const result = (0, _validatenumericfieldorthrowutil.validateNumericFieldOrThrow)(3.14159, 'testField');
            expect(result).toBe(3.14159);
        });
    });
    describe('invalid inputs', ()=>{
        it('should throw when value is NaN', ()=>{
            expect(()=>(0, _validatenumericfieldorthrowutil.validateNumericFieldOrThrow)(NaN, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a non-numeric string', ()=>{
            expect(()=>(0, _validatenumericfieldorthrowutil.validateNumericFieldOrThrow)('not a number', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is undefined', ()=>{
            expect(()=>(0, _validatenumericfieldorthrowutil.validateNumericFieldOrThrow)(undefined, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is an array', ()=>{
            expect(()=>(0, _validatenumericfieldorthrowutil.validateNumericFieldOrThrow)([
                    1,
                    2,
                    3
                ], 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
    });
});

//# sourceMappingURL=validate-numeric-field-or-throw.util.spec.js.map