/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getDeletedStripeSubscriptionItemIdsFromStripeSubscriptionEvent", {
    enumerable: true,
    get: function() {
        return getDeletedStripeSubscriptionItemIdsFromStripeSubscriptionEvent;
    }
});
const _utils = require("twenty-shared/utils");
const getDeletedStripeSubscriptionItemIdsFromStripeSubscriptionEvent = (event)=>{
    const hasUpdatedSubscriptionItems = (0, _utils.isDefined)(event.data.previous_attributes?.items?.data);
    if (!hasUpdatedSubscriptionItems) {
        return [];
    }
    const subscriptionItemIds = event.data.object.items.data.map((item)=>item.id) ?? [];
    return event.data.previous_attributes?.items?.data.filter((item)=>!subscriptionItemIds.includes(item.id)).map((item)=>item.id) ?? [];
};

//# sourceMappingURL=get-deleted-stripe-subscription-item-ids-from-stripe-subscription-event.util.js.map