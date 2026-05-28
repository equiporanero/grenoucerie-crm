"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _isnullequivalentrawjsonfieldvalueutil = require("../is-null-equivalent-raw-json-field-value.util");
describe('isNullEquivalentRawJsonFieldValue', ()=>{
    describe('null-equivalent values', ()=>{
        it('should return true when value is null', ()=>{
            const result = (0, _isnullequivalentrawjsonfieldvalueutil.isNullEquivalentRawJsonFieldValue)(null);
            expect(result).toBe(true);
        });
        it('should return true when value is an empty object', ()=>{
            const result = (0, _isnullequivalentrawjsonfieldvalueutil.isNullEquivalentRawJsonFieldValue)({});
            expect(result).toBe(true);
        });
        it('should return true when value is an empty array', ()=>{
            const result = (0, _isnullequivalentrawjsonfieldvalueutil.isNullEquivalentRawJsonFieldValue)([]);
            expect(result).toBe(true);
        });
    });
    describe('non-null-equivalent values', ()=>{
        it('should return false when value is undefined', ()=>{
            const result = (0, _isnullequivalentrawjsonfieldvalueutil.isNullEquivalentRawJsonFieldValue)(undefined);
            expect(result).toBe(false);
        });
        it('should return false when value is an object with properties', ()=>{
            const result = (0, _isnullequivalentrawjsonfieldvalueutil.isNullEquivalentRawJsonFieldValue)({
                key: 'value'
            });
            expect(result).toBe(false);
        });
        it('should return false when value is a string', ()=>{
            const result = (0, _isnullequivalentrawjsonfieldvalueutil.isNullEquivalentRawJsonFieldValue)('hello');
            expect(result).toBe(false);
        });
        it('should return false when value is an empty string', ()=>{
            const result = (0, _isnullequivalentrawjsonfieldvalueutil.isNullEquivalentRawJsonFieldValue)('');
            expect(result).toBe(false);
        });
    });
});

//# sourceMappingURL=is-null-equivalent-raw-json-field.util.spec.js.map