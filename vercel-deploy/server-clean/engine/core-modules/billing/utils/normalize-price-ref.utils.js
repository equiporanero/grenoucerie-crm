"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "normalizePriceRef", {
    enumerable: true,
    get: function() {
        return normalizePriceRef;
    }
});
const normalizePriceRef = (priceRef)=>{
    return typeof priceRef === 'string' ? priceRef : priceRef.id;
};

//# sourceMappingURL=normalize-price-ref.utils.js.map