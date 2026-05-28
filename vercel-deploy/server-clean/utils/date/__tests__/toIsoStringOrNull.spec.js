"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _toIsoStringOrNull = require("../toIsoStringOrNull");
describe('toIsoStringOrNull', ()=>{
    it('should return null for null or undefined', ()=>{
        expect((0, _toIsoStringOrNull.toIsoStringOrNull)(null)).toBeNull();
        expect((0, _toIsoStringOrNull.toIsoStringOrNull)(undefined)).toBeNull();
    });
    it('should convert Date to ISO string', ()=>{
        const date = new Date('2024-01-15T10:30:00.000Z');
        expect((0, _toIsoStringOrNull.toIsoStringOrNull)(date)).toBe('2024-01-15T10:30:00.000Z');
    });
    it('should pass through strings unchanged', ()=>{
        expect((0, _toIsoStringOrNull.toIsoStringOrNull)('2024-01-15T10:30:00.000Z')).toBe('2024-01-15T10:30:00.000Z');
    });
    it('should throw on invalid Date', ()=>{
        expect(()=>(0, _toIsoStringOrNull.toIsoStringOrNull)(new Date('invalid'))).toThrow(RangeError);
    });
});

//# sourceMappingURL=toIsoStringOrNull.spec.js.map