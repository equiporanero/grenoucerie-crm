"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validatebooleanfieldorthrowutil = require("../validate-boolean-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
describe('validateBooleanFieldOrThrow', ()=>{
    describe('valid inputs', ()=>{
        it('should return null when value is null', ()=>{
            const result = (0, _validatebooleanfieldorthrowutil.validateBooleanFieldOrThrow)(null, 'testField');
            expect(result).toBeNull();
        });
        it('should return true when value is true', ()=>{
            const result = (0, _validatebooleanfieldorthrowutil.validateBooleanFieldOrThrow)(true, 'testField');
            expect(result).toBe(true);
        });
        it('should return false when value is false', ()=>{
            const result = (0, _validatebooleanfieldorthrowutil.validateBooleanFieldOrThrow)(false, 'testField');
            expect(result).toBe(false);
        });
    });
    describe('invalid inputs', ()=>{
        it('should throw when value is undefined', ()=>{
            expect(()=>(0, _validatebooleanfieldorthrowutil.validateBooleanFieldOrThrow)(undefined, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a string "true"', ()=>{
            expect(()=>(0, _validatebooleanfieldorthrowutil.validateBooleanFieldOrThrow)('true', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is an empty string', ()=>{
            expect(()=>(0, _validatebooleanfieldorthrowutil.validateBooleanFieldOrThrow)('', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a number 1', ()=>{
            expect(()=>(0, _validatebooleanfieldorthrowutil.validateBooleanFieldOrThrow)(1, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a number 0', ()=>{
            expect(()=>(0, _validatebooleanfieldorthrowutil.validateBooleanFieldOrThrow)(0, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is an object', ()=>{
            expect(()=>(0, _validatebooleanfieldorthrowutil.validateBooleanFieldOrThrow)({}, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a function', ()=>{
            const functionValue = ()=>true;
            expect(()=>(0, _validatebooleanfieldorthrowutil.validateBooleanFieldOrThrow)(functionValue, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
    });
});

//# sourceMappingURL=validate-boolean-field-or-throw.util.spec.js.map