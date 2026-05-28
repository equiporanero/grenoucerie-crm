"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _isnullequivalentarrayfieldvalueutil = require("../is-null-equivalent-array-field-value.util");
describe('isNullEquivalentArrayFieldValue', ()=>{
    describe('null-equivalent values', ()=>{
        it('should return true when value is null', ()=>{
            const result = (0, _isnullequivalentarrayfieldvalueutil.isNullEquivalentArrayFieldValue)(null);
            expect(result).toBe(true);
        });
        it('should return true when value is an empty array', ()=>{
            const result = (0, _isnullequivalentarrayfieldvalueutil.isNullEquivalentArrayFieldValue)([]);
            expect(result).toBe(true);
        });
    });
    describe('non-null-equivalent values', ()=>{
        it('should return false when value is undefined', ()=>{
            const result = (0, _isnullequivalentarrayfieldvalueutil.isNullEquivalentArrayFieldValue)(undefined);
            expect(result).toBe(false);
        });
        it('should return false when value is an array with one item', ()=>{
            const result = (0, _isnullequivalentarrayfieldvalueutil.isNullEquivalentArrayFieldValue)([
                'item'
            ]);
            expect(result).toBe(false);
        });
        it('should return false when value is a string', ()=>{
            const result = (0, _isnullequivalentarrayfieldvalueutil.isNullEquivalentArrayFieldValue)('hello');
            expect(result).toBe(false);
        });
        it('should return false when value is an empty string', ()=>{
            const result = (0, _isnullequivalentarrayfieldvalueutil.isNullEquivalentArrayFieldValue)('');
            expect(result).toBe(false);
        });
    });
});

//# sourceMappingURL=is-null-equivalent-array-field.util.spec.js.map