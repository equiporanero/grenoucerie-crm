"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _nullifyemptyphonesdefaultvalueutil = require("../nullify-empty-phones-default-value.util");
describe('nullifyEmptyPhonesDefaultValue', ()=>{
    it('returns null when all fields are null-equivalent', ()=>{
        expect((0, _nullifyemptyphonesdefaultvalueutil.nullifyEmptyPhonesDefaultValue)({
            primaryPhoneNumber: "''",
            primaryPhoneCountryCode: "''",
            primaryPhoneCallingCode: null,
            additionalPhones: null
        })).toBeNull();
    });
    it('returns normalized object when primaryPhoneNumber has a value', ()=>{
        expect((0, _nullifyemptyphonesdefaultvalueutil.nullifyEmptyPhonesDefaultValue)({
            primaryPhoneNumber: '+33612345678',
            primaryPhoneCountryCode: "''",
            primaryPhoneCallingCode: '',
            additionalPhones: null
        })).toEqual({
            primaryPhoneNumber: '+33612345678',
            primaryPhoneCountryCode: null,
            primaryPhoneCallingCode: null,
            additionalPhones: null
        });
    });
});

//# sourceMappingURL=nullify-empty-phones-default-value.spec.js.map