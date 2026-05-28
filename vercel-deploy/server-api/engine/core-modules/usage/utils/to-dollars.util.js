"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "toDollars", {
    enumerable: true,
    get: function() {
        return toDollars;
    }
});
const _dollartocreditmultiplier = require("../../../metadata-modules/ai/ai-billing/constants/dollar-to-credit-multiplier");
const toDollars = (internalCredits)=>Math.round(internalCredits / _dollartocreditmultiplier.DOLLAR_TO_CREDIT_MULTIPLIER * 100) / 100;

//# sourceMappingURL=to-dollars.util.js.map