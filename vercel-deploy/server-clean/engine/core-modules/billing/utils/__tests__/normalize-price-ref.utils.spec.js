"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _normalizepricerefutils = require("../normalize-price-ref.utils");
describe('normalizePriceRef', ()=>{
    it('returns the same string when input is a string id', ()=>{
        expect((0, _normalizepricerefutils.normalizePriceRef)('price_123')).toBe('price_123');
    });
    it('returns the id field when input is an object with id', ()=>{
        expect((0, _normalizepricerefutils.normalizePriceRef)({
            id: 'price_abc'
        })).toBe('price_abc');
    });
});

//# sourceMappingURL=normalize-price-ref.utils.spec.js.map