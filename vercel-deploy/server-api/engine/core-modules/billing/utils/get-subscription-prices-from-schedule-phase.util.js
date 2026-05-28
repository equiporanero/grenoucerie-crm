"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getSubscriptionPricesFromSchedulePhase", {
    enumerable: true,
    get: function() {
        return getSubscriptionPricesFromSchedulePhase;
    }
});
const _utils = require("twenty-shared/utils");
const _normalizepricerefutils = require("./normalize-price-ref.utils");
const getSubscriptionPricesFromSchedulePhase = (phase)=>{
    const licensedItem = (0, _utils.findOrThrow)(phase.items, (item)=>item.quantity != null);
    (0, _utils.assertIsDefinedOrThrow)(licensedItem.quantity);
    const meteredItem = (0, _utils.findOrThrow)(phase.items, (item)=>item.quantity == null);
    return {
        licensedPriceId: (0, _normalizepricerefutils.normalizePriceRef)(licensedItem.price),
        meteredPriceId: (0, _normalizepricerefutils.normalizePriceRef)(meteredItem.price),
        seats: licensedItem.quantity
    };
};

//# sourceMappingURL=get-subscription-prices-from-schedule-phase.util.js.map