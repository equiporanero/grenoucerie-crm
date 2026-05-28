"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _stripesubscriptionupdatedevents = require("../../__mocks__/stripe-subscription-updated-events");
const _getdeletedstripesubscriptionitemidsfromstripesubscriptioneventutil = require("../get-deleted-stripe-subscription-item-ids-from-stripe-subscription-event.util");
describe('getDeletedStripeSubscriptionItemIdsFromStripeSubscriptionEvent', ()=>{
    it('should return an empty array if subscription items are not updated', ()=>{
        const result = (0, _getdeletedstripesubscriptionitemidsfromstripesubscriptioneventutil.getDeletedStripeSubscriptionItemIdsFromStripeSubscriptionEvent)(_stripesubscriptionupdatedevents.mockStripeSubscriptionUpdatedEventWithoutUpdatedItem);
        expect(result).toEqual([]);
    });
    it('should return an empty array if subscription items are updated but not deleted', ()=>{
        const result = (0, _getdeletedstripesubscriptionitemidsfromstripesubscriptioneventutil.getDeletedStripeSubscriptionItemIdsFromStripeSubscriptionEvent)(_stripesubscriptionupdatedevents.mockStripeSubscriptionUpdatedEventWithUpdatedItemOnly);
        expect(result).toEqual([]);
    });
    it('should return subscription item ids if subscription items are deleted', ()=>{
        const result = (0, _getdeletedstripesubscriptionitemidsfromstripesubscriptioneventutil.getDeletedStripeSubscriptionItemIdsFromStripeSubscriptionEvent)(_stripesubscriptionupdatedevents.mockStripeSubscriptionUpdatedEventWithDeletedItem);
        expect(result).toEqual([
            'deleted_item_id'
        ]);
    });
});

//# sourceMappingURL=get-deleted-stripe-subscription-item-ids-from-stripe-subscription-event.util.spec.js.map