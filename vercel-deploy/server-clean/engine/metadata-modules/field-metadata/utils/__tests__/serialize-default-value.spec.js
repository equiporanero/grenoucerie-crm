"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _fieldmetadataexception = require("../../field-metadata.exception");
const _serializedefaultvalue = require("../serialize-default-value");
describe('serializeDefaultValue', ()=>{
    it('should return null for undefined defaultValue', ()=>{
        expect((0, _serializedefaultvalue.serializeDefaultValue)()).toBeNull();
    });
    it('should handle uuid dynamic default value', ()=>{
        expect((0, _serializedefaultvalue.serializeDefaultValue)('uuid')).toBe('public.uuid_generate_v4()');
    });
    it('should handle now dynamic default value', ()=>{
        expect((0, _serializedefaultvalue.serializeDefaultValue)('now')).toBe('now()');
    });
    it('should throw FieldMetadataException for invalid dynamic default value type', ()=>{
        expect(()=>(0, _serializedefaultvalue.serializeDefaultValue)('invalid')).toThrow(_fieldmetadataexception.FieldMetadataException);
    });
    it('should handle string static default value', ()=>{
        expect((0, _serializedefaultvalue.serializeDefaultValue)("'test'")).toBe("'test'");
    });
    it('should handle number static default value', ()=>{
        expect((0, _serializedefaultvalue.serializeDefaultValue)(123)).toBe(123);
    });
    it('should handle boolean static default value', ()=>{
        expect((0, _serializedefaultvalue.serializeDefaultValue)(true)).toBe(true);
        expect((0, _serializedefaultvalue.serializeDefaultValue)(false)).toBe(false);
    });
    it('should handle Date static default value', ()=>{
        const date = new Date('2023-01-01');
        expect((0, _serializedefaultvalue.serializeDefaultValue)(date)).toBe(`'${date.toISOString()}'`);
    });
});

//# sourceMappingURL=serialize-default-value.spec.js.map