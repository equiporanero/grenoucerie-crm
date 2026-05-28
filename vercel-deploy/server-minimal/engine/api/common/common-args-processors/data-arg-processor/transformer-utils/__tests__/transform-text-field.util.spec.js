"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _transformtextfieldutil = require("../transform-text-field.util");
describe('transformTextField', ()=>{
    it('should return null when value is null', ()=>{
        const result = (0, _transformtextfieldutil.transformTextField)(null);
        expect(result).toBeNull();
    });
    it('should return null when value is empty string', ()=>{
        const result = (0, _transformtextfieldutil.transformTextField)('');
        expect(result).toBeNull();
    });
    it('should return the string when value is a non-empty string', ()=>{
        const result = (0, _transformtextfieldutil.transformTextField)('hello world');
        expect(result).toBe('hello world');
    });
});

//# sourceMappingURL=transform-text-field.util.spec.js.map