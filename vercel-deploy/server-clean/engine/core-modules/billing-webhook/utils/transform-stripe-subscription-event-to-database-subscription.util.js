/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get getSubscriptionStatus () {
        return getSubscriptionStatus;
    },
    get transformStripeSubscriptionEventToDatabaseSubscription () {
        return transformStripeSubscriptionEventToDatabaseSubscription;
    }
});
const _transformstripesubscriptionscheduleeventtodatabasesubscriptionphaseutil = require("./transform-stripe-subscription-schedule-event-to-database-subscription-phase.util");
const _billingsubscriptioncollectionmethodenum = require("../../billing/enums/billing-subscription-collection-method.enum");
const _billingsubscriptionstatusenum = require("../../billing/enums/billing-subscription-status.enum");
// Converts Stripe AutomaticTax to serialized JSON for JSONB storage
// Normalizes expandable fields (e.g., liability.account) to string IDs
const toAutomaticTaxJson = (value)=>{
    if (!value) {
        return undefined;
    }
    return {
        disabled_reason: value.disabled_reason,
        enabled: value.enabled,
        liability: value.liability ? {
            type: value.liability.type,
            account: typeof value.liability.account === 'string' ? value.liability.account : value.liability.account?.id
        } : null
    };
};
// Converts Stripe CancellationDetails to serialized JSON for JSONB storage
const toCancellationDetailsJson = (value)=>{
    if (!value) {
        return undefined;
    }
    return {
        comment: value.comment,
        feedback: value.feedback,
        reason: value.reason
    };
};
const transformStripeSubscriptionEventToDatabaseSubscription = (workspaceId, subscription)=>{
    // In Stripe SDK v19+, current_period_start/end moved from Subscription to SubscriptionItem
    const firstItem = subscription.items.data[0];
    return {
        workspaceId,
        stripeCustomerId: String(subscription.customer),
        stripeSubscriptionId: subscription.id,
        status: getSubscriptionStatus(subscription.status),
        interval: firstItem.plan.interval,
        phases: subscription.schedule ? (0, _transformstripesubscriptionscheduleeventtodatabasesubscriptionphaseutil.transformStripeSubscriptionScheduleEventToDatabaseSubscriptionPhase)(subscription.schedule) : [],
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        currency: subscription.currency.toUpperCase(),
        currentPeriodEnd: getDateFromTimestamp(firstItem.current_period_end),
        currentPeriodStart: getDateFromTimestamp(firstItem.current_period_start),
        metadata: subscription.metadata,
        collectionMethod: // @ts-expect-error legacy noImplicitAny
        _billingsubscriptioncollectionmethodenum.BillingSubscriptionCollectionMethod[subscription.collection_method.toUpperCase()],
        automaticTax: toAutomaticTaxJson(subscription.automatic_tax),
        cancellationDetails: toCancellationDetailsJson(subscription.cancellation_details),
        endedAt: subscription.ended_at ? getDateFromTimestamp(subscription.ended_at) : undefined,
        trialStart: subscription.trial_start ? getDateFromTimestamp(subscription.trial_start) : undefined,
        trialEnd: subscription.trial_end ? getDateFromTimestamp(subscription.trial_end) : undefined,
        cancelAt: subscription.cancel_at ? getDateFromTimestamp(subscription.cancel_at) : undefined,
        canceledAt: subscription.canceled_at ? getDateFromTimestamp(subscription.canceled_at) : undefined
    };
};
const getSubscriptionStatus = (status)=>{
    switch(status){
        case 'active':
            return _billingsubscriptionstatusenum.SubscriptionStatus.Active;
        case 'canceled':
            return _billingsubscriptionstatusenum.SubscriptionStatus.Canceled;
        case 'incomplete':
            return _billingsubscriptionstatusenum.SubscriptionStatus.Incomplete;
        case 'incomplete_expired':
            return _billingsubscriptionstatusenum.SubscriptionStatus.IncompleteExpired;
        case 'past_due':
            return _billingsubscriptionstatusenum.SubscriptionStatus.PastDue;
        case 'paused':
            return _billingsubscriptionstatusenum.SubscriptionStatus.Paused;
        case 'trialing':
            return _billingsubscriptionstatusenum.SubscriptionStatus.Trialing;
        case 'unpaid':
            return _billingsubscriptionstatusenum.SubscriptionStatus.Unpaid;
    }
};
const getDateFromTimestamp = (timestamp)=>{
    return new Date(timestamp * 1000);
};

//# sourceMappingURL=transform-stripe-subscription-event-to-database-subscription.util.js.map