"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validateoverriddenpositionfieldorthrowutil = require("../validate-overridden-position-field-or-throw.util");
describe('validateOverriddenPositionFieldOrThrow', ()=>{
    describe('valid inputs', ()=>{
        it('should return the position when value is a positive integer', ()=>{
            const result = (0, _validateoverriddenpositionfieldorthrowutil.validateOverriddenPositionFieldOrThrow)(123, 'testField');
            expect(result).toBe(123);
        });
        it('should return the position when value is zero', ()=>{
            const result = (0, _validateoverriddenpositionfieldorthrowutil.validateOverriddenPositionFieldOrThrow)(0, 'testField');
            expect(result).toBe(0);
        });
        it('should return the position when value is negative integer', ()=>{
            const result = (0, _validateoverriddenpositionfieldorthrowutil.validateOverriddenPositionFieldOrThrow)(-3, 'testField');
            expect(result).toBe(-3);
        });
        it('should return the position when value is negative float', ()=>{
            const result = (0, _validateoverriddenpositionfieldorthrowutil.validateOverriddenPositionFieldOrThrow)(-0.5, 'testField');
            expect(result).toBe(-0.5);
        });
    });
    describe('invalid inputs', ()=>{
        it('should throw when value is null', ()=>{
            expect(()=>(0, _validateoverriddenpositionfieldorthrowutil.validateOverriddenPositionFieldOrThrow)(null, 'testField')).toThrow('Invalid position value null for field "testField"');
        });
        it('should throw when value is undefined', ()=>{
            expect(()=>(0, _validateoverriddenpositionfieldorthrowutil.validateOverriddenPositionFieldOrThrow)(undefined, 'testField')).toThrow('Invalid position value undefined for field "testField"');
        });
        it('should throw when value is a string with a number', ()=>{
            expect(()=>(0, _validateoverriddenpositionfieldorthrowutil.validateOverriddenPositionFieldOrThrow)('123', 'testField')).toThrow('Invalid position value \'123\' for field "testField"');
        });
        it('should throw when value is an empty string', ()=>{
            expect(()=>(0, _validateoverriddenpositionfieldorthrowutil.validateOverriddenPositionFieldOrThrow)('', 'testField')).toThrow('Invalid position value \'\' for field "testField"');
        });
        it('should throw when value is a boolean (true)', ()=>{
            expect(()=>(0, _validateoverriddenpositionfieldorthrowutil.validateOverriddenPositionFieldOrThrow)(true, 'testField')).toThrow('Invalid position value true for field "testField"');
        });
        it('should throw when value is a boolean (false)', ()=>{
            expect(()=>(0, _validateoverriddenpositionfieldorthrowutil.validateOverriddenPositionFieldOrThrow)(false, 'testField')).toThrow('Invalid position value false for field "testField"');
        });
        it('should throw when value is an array', ()=>{
            expect(()=>(0, _validateoverriddenpositionfieldorthrowutil.validateOverriddenPositionFieldOrThrow)([
                    1,
                    2,
                    3
                ], 'testField')).toThrow('Invalid position value [ 1, 2, 3 ] for field "testField"');
        });
        it('should throw when value is an object', ()=>{
            expect(()=>(0, _validateoverriddenpositionfieldorthrowutil.validateOverriddenPositionFieldOrThrow)({
                    key: 'value'
                }, 'testField')).toThrow('Invalid position value { key: \'value\' } for field "testField"');
        });
        it('should throw when value is NaN', ()=>{
            expect(()=>(0, _validateoverriddenpositionfieldorthrowutil.validateOverriddenPositionFieldOrThrow)(NaN, 'testField')).toThrow('Invalid position value NaN for field "testField"');
        });
    });
});

//# sourceMappingURL=validate-overridden-position-field-or-throw.util.spec.js.map