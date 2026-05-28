"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validatefullnamefieldorthrowutil = require("../validate-full-name-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
describe('validateFullNameFieldOrThrow', ()=>{
    describe('valid inputs', ()=>{
        it('should return null when value is null', ()=>{
            const result = (0, _validatefullnamefieldorthrowutil.validateFullNameFieldOrThrow)(null, 'testField');
            expect(result).toBeNull();
        });
        it('should return valid full name object with both fields', ()=>{
            const value = {
                firstName: 'John',
                lastName: 'Doe'
            };
            const result = (0, _validatefullnamefieldorthrowutil.validateFullNameFieldOrThrow)(value, 'testField');
            expect(result).toEqual(value);
        });
        it('should return valid full name object with only firstName', ()=>{
            const value = {
                firstName: 'John'
            };
            const result = (0, _validatefullnamefieldorthrowutil.validateFullNameFieldOrThrow)(value, 'testField');
            expect(result).toEqual(value);
        });
        it('should return valid full name object with only lastName', ()=>{
            const value = {
                lastName: 'Doe'
            };
            const result = (0, _validatefullnamefieldorthrowutil.validateFullNameFieldOrThrow)(value, 'testField');
            expect(result).toEqual(value);
        });
    });
    describe('invalid inputs', ()=>{
        it('should throw when value is not an object', ()=>{
            expect(()=>(0, _validatefullnamefieldorthrowutil.validateFullNameFieldOrThrow)('invalid', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when firstName is not a string', ()=>{
            const value = {
                firstName: {
                    invalid: 'object'
                }
            };
            expect(()=>(0, _validatefullnamefieldorthrowutil.validateFullNameFieldOrThrow)(value, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when an invalid subfield is provided', ()=>{
            const value = {
                firstName: 'John',
                lastName: 'Doe',
                invalidSubField: 'invalid'
            };
            expect(()=>(0, _validatefullnamefieldorthrowutil.validateFullNameFieldOrThrow)(value, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
    });
});

//# sourceMappingURL=validate-full-name-field-or-throw.util.spec.js.map