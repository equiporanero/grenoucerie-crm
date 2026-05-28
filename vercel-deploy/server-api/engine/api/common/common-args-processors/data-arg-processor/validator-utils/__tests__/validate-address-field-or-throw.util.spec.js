"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validateaddressfieldorthrowutil = require("../validate-address-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
describe('validateAddressFieldOrThrow', ()=>{
    describe('valid inputs', ()=>{
        it('should return null when value is null', ()=>{
            const result = (0, _validateaddressfieldorthrowutil.validateAddressFieldOrThrow)(null, 'testField');
            expect(result).toBeNull();
        });
        it('should return valid address object with all text fields', ()=>{
            const value = {
                addressStreet1: '123 Main St',
                addressStreet2: 'Apt 4B',
                addressCity: 'New York',
                addressState: 'NY',
                addressPostcode: '10001',
                addressCountry: 'USA'
            };
            const result = (0, _validateaddressfieldorthrowutil.validateAddressFieldOrThrow)(value, 'testField');
            expect(result).toEqual(value);
        });
        it('should return valid address object with coordinates', ()=>{
            const value = {
                addressStreet1: '123 Main St',
                addressCity: 'New York',
                addressLat: 40.7128,
                addressLng: -74.006
            };
            const result = (0, _validateaddressfieldorthrowutil.validateAddressFieldOrThrow)(value, 'testField');
            expect(result).toEqual(value);
        });
        it('should return valid address object with null subfields', ()=>{
            const value = {
                addressStreet1: '123 Main St',
                addressStreet2: null,
                addressCity: 'New York',
                addressState: null,
                addressPostcode: null,
                addressCountry: null,
                addressLat: null,
                addressLng: null
            };
            const result = (0, _validateaddressfieldorthrowutil.validateAddressFieldOrThrow)(value, 'testField');
            expect(result).toEqual(value);
        });
    });
    describe('invalid inputs', ()=>{
        it('should throw when value is not an object', ()=>{
            expect(()=>(0, _validateaddressfieldorthrowutil.validateAddressFieldOrThrow)('invalid', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is an array', ()=>{
            expect(()=>(0, _validateaddressfieldorthrowutil.validateAddressFieldOrThrow)([
                    '123 Main St'
                ], 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when addressStreet1 is not a string or number', ()=>{
            const value = {
                addressStreet1: {
                    invalid: 'object'
                }
            };
            expect(()=>(0, _validateaddressfieldorthrowutil.validateAddressFieldOrThrow)(value, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when addressStreet2 is not a string', ()=>{
            const value = {
                addressStreet2: 123
            };
            expect(()=>(0, _validateaddressfieldorthrowutil.validateAddressFieldOrThrow)(value, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when addressCity is not a string', ()=>{
            const value = {
                addressCity: true
            };
            expect(()=>(0, _validateaddressfieldorthrowutil.validateAddressFieldOrThrow)(value, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when addressState is not a string', ()=>{
            const value = {
                addressState: [
                    'NY'
                ]
            };
            expect(()=>(0, _validateaddressfieldorthrowutil.validateAddressFieldOrThrow)(value, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when addressPostcode is not a string', ()=>{
            const value = {
                addressPostcode: 10001
            };
            expect(()=>(0, _validateaddressfieldorthrowutil.validateAddressFieldOrThrow)(value, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when addressCountry is not a string', ()=>{
            const value = {
                addressCountry: {
                    code: 'US'
                }
            };
            expect(()=>(0, _validateaddressfieldorthrowutil.validateAddressFieldOrThrow)(value, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when addressLat is not a number', ()=>{
            const value = {
                addressLat: 'not a number'
            };
            expect(()=>(0, _validateaddressfieldorthrowutil.validateAddressFieldOrThrow)(value, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when addressLng is not a number', ()=>{
            const value = {
                addressLng: 'not a number'
            };
            expect(()=>(0, _validateaddressfieldorthrowutil.validateAddressFieldOrThrow)(value, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when an invalid subfield is provided', ()=>{
            const value = {
                addressStreet1: '123 Main St',
                invalidSubField: 'invalid'
            };
            expect(()=>(0, _validateaddressfieldorthrowutil.validateAddressFieldOrThrow)(value, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
    });
});

//# sourceMappingURL=validate-address-field-or-throw.util.spec.js.map