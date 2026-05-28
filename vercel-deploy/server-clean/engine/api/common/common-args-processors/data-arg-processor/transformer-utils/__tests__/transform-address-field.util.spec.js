"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _transformaddressfieldutil = require("../transform-address-field.util");
describe('transformAddressField', ()=>{
    it('should return null when value is null', ()=>{
        const result = (0, _transformaddressfieldutil.transformAddressField)(null);
        expect(result).toBeNull();
    });
    it('should return an empty object when value is an empty object', ()=>{
        const result = (0, _transformaddressfieldutil.transformAddressField)({});
        expect(result).toEqual({});
    });
    it('should preserve undefined for fields that are not provided', ()=>{
        const result = (0, _transformaddressfieldutil.transformAddressField)({
            addressStreet1: '123 Main St',
            addressCity: 'San Francisco'
        });
        expect(result).toEqual({
            addressStreet1: '123 Main St',
            addressCity: 'San Francisco'
        });
    });
    it('should handle mixed null, undefined, and valid values', ()=>{
        const result = (0, _transformaddressfieldutil.transformAddressField)({
            addressStreet1: '123 Main St',
            addressStreet2: null,
            addressCity: 'San Francisco',
            addressLat: 37.7749,
            addressLng: null
        });
        expect(result).toEqual({
            addressStreet1: '123 Main St',
            addressStreet2: null,
            addressCity: 'San Francisco',
            addressLat: 37.7749,
            addressLng: null
        });
    });
});

//# sourceMappingURL=transform-address-field.util.spec.js.map