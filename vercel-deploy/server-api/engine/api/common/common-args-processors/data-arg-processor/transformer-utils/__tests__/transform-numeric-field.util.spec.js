"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _transformnumericfieldutil = require("../transform-numeric-field.util");
describe('transformNumericField', ()=>{
    it('should return null when value is null', ()=>{
        const result = (0, _transformnumericfieldutil.transformNumericField)(null);
        expect(result).toBeNull();
    });
    it('should return the number when value is a float', ()=>{
        const result = (0, _transformnumericfieldutil.transformNumericField)(3.14159);
        expect(result).toBe(3.14159);
    });
    it('should transform a numeric string with decimals to a number', ()=>{
        const result = (0, _transformnumericfieldutil.transformNumericField)('123.456');
        expect(result).toBe(123.456);
    });
});

//# sourceMappingURL=transform-numeric-field.util.spec.js.map