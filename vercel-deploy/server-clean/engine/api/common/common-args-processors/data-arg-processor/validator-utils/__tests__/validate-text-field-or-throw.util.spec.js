"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validatetextfieldorthrowutil = require("../validate-text-field-or-throw.util");
describe('validateTextFieldOrThrow', ()=>{
    describe('valid inputs', ()=>{
        it('should return null when value is null', ()=>{
            const result = (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(null, 'testField');
            expect(result).toBeNull();
        });
        it('should return empty string when value is an empty string', ()=>{
            const result = (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)('', 'testField');
            expect(result).toEqual('');
        });
        it('should return the string when value is a regular string', ()=>{
            const result = (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)('hello world', 'testField');
            expect(result).toBe('hello world');
        });
    });
    describe('invalid inputs', ()=>{
        it('should throw when value is undefined', ()=>{
            expect(()=>(0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(undefined, 'testField')).toThrow('Invalid string value undefined for text field "testField"');
        });
        it('should throw when value is a number', ()=>{
            expect(()=>(0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(123, 'testField')).toThrow('Invalid string value 123 for text field "testField"');
        });
        it('should throw when value is a float number', ()=>{
            expect(()=>(0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(123.45, 'testField')).toThrow('Invalid string value 123.45 for text field "testField"');
        });
        it('should throw when value is a boolean (true)', ()=>{
            expect(()=>(0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(true, 'testField')).toThrow('Invalid string value true for text field "testField"');
        });
        it('should throw when value is a boolean (false)', ()=>{
            expect(()=>(0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(false, 'testField')).toThrow('Invalid string value false for text field "testField"');
        });
        it('should throw when value is an array', ()=>{
            expect(()=>(0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)([
                    1,
                    2,
                    3
                ], 'testField')).toThrow('Invalid string value [ 1, 2, 3 ] for text field "testField"');
        });
        it('should throw when value is an object', ()=>{
            expect(()=>(0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)({
                    key: 'value'
                }, 'testField')).toThrow('Invalid string value { key: \'value\' } for text field "testField"');
        });
    });
});

//# sourceMappingURL=validate-text-field-or-throw.util.spec.js.map