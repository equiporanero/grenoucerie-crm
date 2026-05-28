"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _transformphonesvalueutil = require("../transform-phones-value.util");
describe('transformPhonesValue', ()=>{
    it('should return null when input is null', ()=>{
        const result = (0, _transformphonesvalueutil.transformPhonesValue)({
            input: null
        });
        expect(result).toBeNull();
    });
    it('should normalize all empty primary sub-fields to null', ()=>{
        const result = (0, _transformphonesvalueutil.transformPhonesValue)({
            input: {
                primaryPhoneNumber: '',
                primaryPhoneCallingCode: '',
                primaryPhoneCountryCode: ''
            }
        });
        expect(result).toEqual({
            additionalPhones: null,
            primaryPhoneNumber: null,
            primaryPhoneCallingCode: null,
            primaryPhoneCountryCode: null
        });
    });
    it('should normalize empty number inside an additionalPhones entry to null', ()=>{
        const result = (0, _transformphonesvalueutil.transformPhonesValue)({
            input: {
                primaryPhoneNumber: '',
                additionalPhones: JSON.stringify([
                    {
                        number: ''
                    }
                ])
            }
        });
        expect(result?.additionalPhones).toBe(JSON.stringify([
            {
                number: null
            }
        ]));
    });
    it('should parse a valid international phone number into its canonical parts', ()=>{
        const result = (0, _transformphonesvalueutil.transformPhonesValue)({
            input: {
                primaryPhoneNumber: '+14155552671'
            }
        });
        expect(result).toEqual({
            additionalPhones: null,
            primaryPhoneNumber: '4155552671',
            primaryPhoneCallingCode: '+1',
            primaryPhoneCountryCode: 'US'
        });
    });
    it('should infer callingCode from the number when callingCode is an empty string', ()=>{
        const result = (0, _transformphonesvalueutil.transformPhonesValue)({
            input: {
                primaryPhoneNumber: '+14155552671',
                primaryPhoneCallingCode: ''
            }
        });
        expect(result).toEqual({
            additionalPhones: null,
            primaryPhoneNumber: '4155552671',
            primaryPhoneCallingCode: '+1',
            primaryPhoneCountryCode: 'US'
        });
    });
    it('should accept additionalPhones as an array of phone objects', ()=>{
        const result = (0, _transformphonesvalueutil.transformPhonesValue)({
            input: {
                primaryPhoneNumber: '+14155552671',
                additionalPhones: [
                    {
                        number: '+442071838750',
                        callingCode: '+44',
                        countryCode: 'GB'
                    }
                ]
            }
        });
        expect(result?.additionalPhones).toBe(JSON.stringify([
            {
                countryCode: 'GB',
                callingCode: '+44',
                number: '2071838750'
            }
        ]));
    });
});

//# sourceMappingURL=transform-phones-value.util.spec.js.map