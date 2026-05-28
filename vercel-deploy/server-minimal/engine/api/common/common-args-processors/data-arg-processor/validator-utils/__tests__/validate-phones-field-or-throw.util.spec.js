"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validatephonesfieldorthrowutil = require("../validate-phones-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
describe('validatePhonesFieldOrThrow', ()=>{
    describe('valid inputs', ()=>{
        it('should return null when value is null', ()=>{
            const result = (0, _validatephonesfieldorthrowutil.validatePhonesFieldOrThrow)(null, 'testField');
            expect(result).toBeNull();
        });
        it('should return the phones object when all fields are valid', ()=>{
            const phonesValue = {
                primaryPhoneNumber: '+1234567890',
                primaryPhoneCountryCode: 'US',
                primaryPhoneCallingCode: '+1',
                additionalPhones: null
            };
            const result = (0, _validatephonesfieldorthrowutil.validatePhonesFieldOrThrow)(phonesValue, 'testField');
            expect(result).toEqual(phonesValue);
        });
        it('should return the phones object when only primaryPhoneNumber is provided', ()=>{
            const phonesValue = {
                primaryPhoneNumber: '+1234567890'
            };
            const result = (0, _validatephonesfieldorthrowutil.validatePhonesFieldOrThrow)(phonesValue, 'testField');
            expect(result).toEqual(phonesValue);
        });
    });
    describe('invalid inputs', ()=>{
        it('should throw when value is not an object', ()=>{
            expect(()=>(0, _validatephonesfieldorthrowutil.validatePhonesFieldOrThrow)('not an object', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is undefined', ()=>{
            expect(()=>(0, _validatephonesfieldorthrowutil.validatePhonesFieldOrThrow)(undefined, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when primaryPhoneNumber is not a string', ()=>{
            const phonesValue = {
                primaryPhoneNumber: 123456
            };
            expect(()=>(0, _validatephonesfieldorthrowutil.validatePhonesFieldOrThrow)(phonesValue, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when primaryPhoneCountryCode is not a string', ()=>{
            const phonesValue = {
                primaryPhoneCountryCode: 123
            };
            expect(()=>(0, _validatephonesfieldorthrowutil.validatePhonesFieldOrThrow)(phonesValue, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when primaryPhoneCallingCode is not a string', ()=>{
            const phonesValue = {
                primaryPhoneCallingCode: 1
            };
            expect(()=>(0, _validatephonesfieldorthrowutil.validatePhonesFieldOrThrow)(phonesValue, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when an invalid subfield is present', ()=>{
            const phonesValue = {
                primaryPhoneNumber: '+1234567890',
                invalidField: 'invalid'
            };
            expect(()=>(0, _validatephonesfieldorthrowutil.validatePhonesFieldOrThrow)(phonesValue, 'testField')).toThrow('Invalid subfield invalidField for phones field "testField"');
        });
    });
});

//# sourceMappingURL=validate-phones-field-or-throw.util.spec.js.map