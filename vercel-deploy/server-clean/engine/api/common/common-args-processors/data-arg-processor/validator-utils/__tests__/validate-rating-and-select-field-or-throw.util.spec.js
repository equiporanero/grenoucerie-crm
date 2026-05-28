"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validateratingandselectfieldorthrowutil = require("../validate-rating-and-select-field-or-throw.util");
describe('validateRatingAndSelectFieldOrThrow', ()=>{
    const validOptions = [
        'option1',
        'option2',
        'option3'
    ];
    describe('valid inputs', ()=>{
        it('should return null when value is null', ()=>{
            const result = (0, _validateratingandselectfieldorthrowutil.validateRatingAndSelectFieldOrThrow)(null, 'testField', validOptions);
            expect(result).toBeNull();
        });
        it('should return the string when value is a valid option', ()=>{
            const result = (0, _validateratingandselectfieldorthrowutil.validateRatingAndSelectFieldOrThrow)('option1', 'testField', validOptions);
            expect(result).toBe('option1');
        });
    });
    describe('invalid inputs', ()=>{
        it('should throw when options is undefined', ()=>{
            expect(()=>(0, _validateratingandselectfieldorthrowutil.validateRatingAndSelectFieldOrThrow)('option1', 'testField', undefined)).toThrow('Invalid options for field "testField"');
        });
        it('should throw when value is not in the options list and include valid options in error', ()=>{
            expect(()=>(0, _validateratingandselectfieldorthrowutil.validateRatingAndSelectFieldOrThrow)('invalidOption', 'testField', validOptions)).toThrow('Invalid value "invalidOption" for field "testField". Valid values are: option1, option2, option3');
        });
        it('should throw when value is a number', ()=>{
            expect(()=>(0, _validateratingandselectfieldorthrowutil.validateRatingAndSelectFieldOrThrow)(123, 'testField', validOptions)).toThrow('Invalid string value 123 for text field "testField"');
        });
    });
});

//# sourceMappingURL=validate-rating-and-select-field-or-throw.util.spec.js.map