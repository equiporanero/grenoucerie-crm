"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _configtransformersutil = require("../config-transformers.util");
describe('configTransformers', ()=>{
    describe('boolean', ()=>{
        it('should handle true values correctly', ()=>{
            expect(_configtransformersutil.configTransformers.boolean(true)).toBe(true);
            expect(_configtransformersutil.configTransformers.boolean('true')).toBe(true);
            expect(_configtransformersutil.configTransformers.boolean('True')).toBe(true);
            expect(_configtransformersutil.configTransformers.boolean('yes')).toBe(true);
            expect(_configtransformersutil.configTransformers.boolean('on')).toBe(true);
            expect(_configtransformersutil.configTransformers.boolean('1')).toBe(true);
            expect(_configtransformersutil.configTransformers.boolean(1)).toBe(true);
        });
        it('should handle false values correctly', ()=>{
            expect(_configtransformersutil.configTransformers.boolean(false)).toBe(false);
            expect(_configtransformersutil.configTransformers.boolean('false')).toBe(false);
            expect(_configtransformersutil.configTransformers.boolean('False')).toBe(false);
            expect(_configtransformersutil.configTransformers.boolean('no')).toBe(false);
            expect(_configtransformersutil.configTransformers.boolean('off')).toBe(false);
            expect(_configtransformersutil.configTransformers.boolean('0')).toBe(false);
            expect(_configtransformersutil.configTransformers.boolean(0)).toBe(false);
        });
        it('should return undefined for invalid values', ()=>{
            expect(_configtransformersutil.configTransformers.boolean('invalid')).toBeUndefined();
            expect(_configtransformersutil.configTransformers.boolean('random_string')).toBeUndefined();
            expect(_configtransformersutil.configTransformers.boolean({})).toBeUndefined();
            expect(_configtransformersutil.configTransformers.boolean([])).toBeUndefined();
        });
        it('should handle null and undefined', ()=>{
            expect(_configtransformersutil.configTransformers.boolean(null)).toBeUndefined();
            expect(_configtransformersutil.configTransformers.boolean(undefined)).toBeUndefined();
        });
    });
    describe('number', ()=>{
        it('should handle valid number values', ()=>{
            expect(_configtransformersutil.configTransformers.number(42)).toBe(42);
            expect(_configtransformersutil.configTransformers.number('42')).toBe(42);
            expect(_configtransformersutil.configTransformers.number('-42')).toBe(-42);
            expect(_configtransformersutil.configTransformers.number('3.14')).toBe(3.14);
            expect(_configtransformersutil.configTransformers.number('0')).toBe(0);
        });
        it('should handle boolean values', ()=>{
            expect(_configtransformersutil.configTransformers.number(true)).toBe(1);
            expect(_configtransformersutil.configTransformers.number(false)).toBe(0);
        });
        it('should return undefined for invalid values', ()=>{
            expect(_configtransformersutil.configTransformers.number('invalid')).toBeUndefined();
            expect(_configtransformersutil.configTransformers.number('forty-two')).toBeUndefined();
            expect(_configtransformersutil.configTransformers.number({})).toBeUndefined();
            expect(_configtransformersutil.configTransformers.number([])).toBeUndefined();
        });
        it('should handle null and undefined', ()=>{
            expect(_configtransformersutil.configTransformers.number(null)).toBeUndefined();
            expect(_configtransformersutil.configTransformers.number(undefined)).toBeUndefined();
        });
    });
    describe('string', ()=>{
        it('should handle string values', ()=>{
            expect(_configtransformersutil.configTransformers.string('test')).toBe('test');
            expect(_configtransformersutil.configTransformers.string('')).toBe('');
        });
        it('should convert numbers to strings', ()=>{
            expect(_configtransformersutil.configTransformers.string(42)).toBe('42');
            expect(_configtransformersutil.configTransformers.string(0)).toBe('0');
            expect(_configtransformersutil.configTransformers.string(3.14)).toBe('3.14');
        });
        it('should convert booleans to strings', ()=>{
            expect(_configtransformersutil.configTransformers.string(true)).toBe('true');
            expect(_configtransformersutil.configTransformers.string(false)).toBe('false');
        });
        it('should convert arrays and objects to JSON strings', ()=>{
            expect(_configtransformersutil.configTransformers.string([
                'a',
                'b',
                'c'
            ])).toBe('["a","b","c"]');
            expect(_configtransformersutil.configTransformers.string({
                a: 1,
                b: 2
            })).toBe('{"a":1,"b":2}');
        });
        it('should handle null and undefined', ()=>{
            expect(_configtransformersutil.configTransformers.string(null)).toBeUndefined();
            expect(_configtransformersutil.configTransformers.string(undefined)).toBeUndefined();
        });
        it('should handle failed JSON stringification', ()=>{
            const circular = {};
            circular.self = circular;
            expect(_configtransformersutil.configTransformers.string(circular)).toBeUndefined();
        });
    });
});

//# sourceMappingURL=config-transformers.util.spec.js.map