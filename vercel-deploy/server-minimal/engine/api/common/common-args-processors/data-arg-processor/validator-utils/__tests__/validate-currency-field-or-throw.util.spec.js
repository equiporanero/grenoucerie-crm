"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validatecurrencyfieldorthrowutil = require("../validate-currency-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
describe('validateCurrencyFieldOrThrow', ()=>{
    describe('valid inputs', ()=>{
        it('should return null when value is null', ()=>{
            const result = (0, _validatecurrencyfieldorthrowutil.validateCurrencyFieldOrThrow)(null, 'testField');
            expect(result).toBeNull();
        });
        it('should return the currency object when both amountMicros and currencyCode are valid', ()=>{
            const currencyValue = {
                amountMicros: 1000000,
                currencyCode: 'USD'
            };
            const result = (0, _validatecurrencyfieldorthrowutil.validateCurrencyFieldOrThrow)(currencyValue, 'testField');
            expect(result).toEqual(currencyValue);
        });
        it('should return the currency object when only amountMicros is provided', ()=>{
            const currencyValue = {
                amountMicros: 5000000
            };
            const result = (0, _validatecurrencyfieldorthrowutil.validateCurrencyFieldOrThrow)(currencyValue, 'testField');
            expect(result).toEqual(currencyValue);
        });
    });
    describe('invalid inputs', ()=>{
        it('should throw when value is not an object', ()=>{
            expect(()=>(0, _validatecurrencyfieldorthrowutil.validateCurrencyFieldOrThrow)('not an object', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when amountMicros is not a valid numeric value', ()=>{
            const currencyValue = {
                amountMicros: 'not a number',
                currencyCode: 'USD'
            };
            expect(()=>(0, _validatecurrencyfieldorthrowutil.validateCurrencyFieldOrThrow)(currencyValue, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when currencyCode is not a string', ()=>{
            const currencyValue = {
                amountMicros: 1000000,
                currencyCode: 123
            };
            expect(()=>(0, _validatecurrencyfieldorthrowutil.validateCurrencyFieldOrThrow)(currencyValue, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when an invalid subfield is present', ()=>{
            const currencyValue = {
                amountMicros: 1000000,
                currencyCode: 'USD',
                invalidField: 'invalid'
            };
            expect(()=>(0, _validatecurrencyfieldorthrowutil.validateCurrencyFieldOrThrow)(currencyValue, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
    });
});

//# sourceMappingURL=validate-currency-field-or-throw.util.spec.js.map