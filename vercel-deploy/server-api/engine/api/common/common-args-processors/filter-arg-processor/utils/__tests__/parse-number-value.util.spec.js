"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _parsenumbervalueutil = require("../parse-number-value.util");
describe('parseNumberValue', ()=>{
    it('should return value unchanged when not a string', ()=>{
        expect((0, _parsenumbervalueutil.parseNumberValue)(42, _types.FieldMetadataType.NUMBER)).toBe(42);
    });
    it('should parse string to number for NUMBER field', ()=>{
        expect((0, _parsenumbervalueutil.parseNumberValue)('42', _types.FieldMetadataType.NUMBER)).toBe(42);
        expect((0, _parsenumbervalueutil.parseNumberValue)('-3.14', _types.FieldMetadataType.NUMERIC)).toBe(-3.14);
    });
    it('should parse string to number for POSITION field', ()=>{
        expect((0, _parsenumbervalueutil.parseNumberValue)('1.5', _types.FieldMetadataType.POSITION)).toBe(1.5);
    });
    it('should throw an error for unknown field type', ()=>{
        expect((0, _parsenumbervalueutil.parseNumberValue)('not-a-number', _types.FieldMetadataType.POSITION)).toBe(NaN);
    });
});

//# sourceMappingURL=parse-number-value.util.spec.js.map