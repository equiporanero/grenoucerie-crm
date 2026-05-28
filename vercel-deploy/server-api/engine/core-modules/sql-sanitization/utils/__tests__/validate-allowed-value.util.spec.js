"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validateallowedvalueutil = require("../validate-allowed-value.util");
describe('validateAllowedValue', ()=>{
    const allowedFruits = [
        'apple',
        'banana',
        'cherry'
    ];
    it('should accept allowed values', ()=>{
        expect(()=>(0, _validateallowedvalueutil.validateAllowedValue)('apple', allowedFruits, 'fruit')).not.toThrow();
        expect(()=>(0, _validateallowedvalueutil.validateAllowedValue)('banana', allowedFruits, 'fruit')).not.toThrow();
    });
    it('should reject disallowed values', ()=>{
        expect(()=>(0, _validateallowedvalueutil.validateAllowedValue)('mango', allowedFruits, 'fruit')).toThrow('Invalid fruit: mango');
    });
    it('should reject empty string when not in allowed list', ()=>{
        expect(()=>(0, _validateallowedvalueutil.validateAllowedValue)('', allowedFruits, 'fruit')).toThrow();
    });
    it('should be case-sensitive', ()=>{
        expect(()=>(0, _validateallowedvalueutil.validateAllowedValue)('Apple', allowedFruits, 'fruit')).toThrow();
    });
});

//# sourceMappingURL=validate-allowed-value.util.spec.js.map