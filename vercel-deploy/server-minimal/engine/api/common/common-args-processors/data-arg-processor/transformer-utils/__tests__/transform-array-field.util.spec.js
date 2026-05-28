"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _transformarrayfieldutil = require("../transform-array-field.util");
describe('transformArrayField', ()=>{
    it('should return null when value is null', ()=>{
        const result = (0, _transformarrayfieldutil.transformArrayField)(null);
        expect(result).toBeNull();
    });
    it('should return null when value is an empty array', ()=>{
        const result = (0, _transformarrayfieldutil.transformArrayField)([]);
        expect(result).toBeNull();
    });
    it('should return an array when value is a string', ()=>{
        const result = (0, _transformarrayfieldutil.transformArrayField)('singleString');
        expect(result).toEqual([
            'singleString'
        ]);
    });
    it('should return an array when value is an array of strings', ()=>{
        const result = (0, _transformarrayfieldutil.transformArrayField)([
            'string1',
            'string2',
            'string3'
        ]);
        expect(result).toEqual([
            'string1',
            'string2',
            'string3'
        ]);
    });
});

//# sourceMappingURL=transform-array-field.util.spec.js.map