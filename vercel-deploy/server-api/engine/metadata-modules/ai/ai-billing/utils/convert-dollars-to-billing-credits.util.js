"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "convertDollarsToBillingCredits", {
    enumerable: true,
    get: function() {
        return convertDollarsToBillingCredits;
    }
});
const _dollartocreditmultiplier = require("../constants/dollar-to-credit-multiplier");
const convertDollarsToBillingCredits = (dollars)=>dollars * _dollartocreditmultiplier.DOLLAR_TO_CREDIT_MULTIPLIER;

//# sourceMappingURL=convert-dollars-to-billing-credits.util.js.map