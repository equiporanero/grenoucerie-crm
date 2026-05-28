"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "billingValidator", {
    enumerable: true,
    get: function() {
        return billingValidator;
    }
});
const _utils = require("twenty-shared/utils");
const _classvalidator = require("class-validator");
const _billingexception = require("./billing.exception");
const _billingproductkeyenum = require("./enums/billing-product-key.enum");
const _billingusagetypeenum = require("./enums/billing-usage-type.enum");
const assertIsMeteredTiersSchemaOrThrow = (tiers)=>{
    const error = new _billingexception.BillingException('Metered price must have exactly two tiers and only one must have a defined limitation (up_to)', _billingexception.BillingExceptionCode.BILLING_PRICE_INVALID_TIERS);
    if (!isMeteredTiersSchema(tiers)) {
        throw error;
    }
    return;
};
const isMeteredTiersSchema = (tiers)=>{
    if (!(0, _utils.isDefined)(tiers)) {
        return false;
    }
    if (tiers.length !== 2 || typeof tiers[0].up_to !== 'number' || tiers[1].up_to !== null) {
        return false;
    }
    return true;
};
const assertIsLicensedSubscriptionItem = (subscriptionItem)=>{
    if (subscriptionItem.quantity !== null && subscriptionItem.billingProduct.metadata.priceUsageBased === _billingusagetypeenum.BillingUsageType.LICENSED) return;
    throw new _billingexception.BillingException('Subscription Item is not a licence subscription item', _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_ITEM_INVALID);
};
const assertIsMeteredSubscriptionItem = (subscriptionItem)=>{
    if (subscriptionItem.quantity === null && subscriptionItem.billingProduct.metadata.priceUsageBased === _billingusagetypeenum.BillingUsageType.METERED) return;
    throw new _billingexception.BillingException('Subscription Item is not a meter subscription item', _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_ITEM_INVALID);
};
const assertIsMeteredPrice = (price)=>{
    if (price.billingProduct?.metadata.priceUsageBased !== _billingusagetypeenum.BillingUsageType.METERED) {
        throw new _billingexception.BillingException('Price is not a metered price', _billingexception.BillingExceptionCode.BILLING_PRICE_INVALID);
    }
    if (!isMeteredTiersSchema(price.tiers)) {
        throw new _billingexception.BillingException('Tiers declare in price do not match metered price schema. Price must have exactly two tiers and only one must have a defined limitation (up_to). Example: [{up_to: 100}, {up_to: null}]', _billingexception.BillingExceptionCode.BILLING_PRICE_INVALID);
    }
    return;
};
const isMeteredPrice = (price)=>{
    if (price.billingProduct?.metadata.priceUsageBased !== _billingusagetypeenum.BillingUsageType.METERED || !isMeteredTiersSchema(price.tiers)) {
        return false;
    }
    return true;
};
const assertIsSubscription = (subscription)=>{
    if (!(0, _utils.isDefined)(subscription)) {
        throw new _billingexception.BillingException('Subscription is not defined', _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_NOT_FOUND);
    }
    if (!(0, _utils.isDefined)(subscription.billingSubscriptionItems)) {
        throw new _billingexception.BillingException('Subscription items is not defined. Check the relation in the query', _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_ITEM_NOT_FOUND);
    }
    if (subscription.billingSubscriptionItems.length !== 2) {
        throw new _billingexception.BillingException('Subscription must have exactly two subscription items. Check that stripe and database are in sync', _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_INVALID, {
            userFriendlyMessage: /*i18n*/ {
                id: "J5Vm4Q",
                message: "Your billing subscription is corrupted. Please contact support."
            }
        });
    }
    return;
};
// V2 validators — do not throw for V1 items; only used on V2 code paths
const isLicensedResourceCreditItem = (subscriptionItem)=>{
    return subscriptionItem.billingProduct?.metadata?.productKey === _billingproductkeyenum.BillingProductKey.RESOURCE_CREDIT;
};
const assertIsLicensedResourceCreditPrice = (price)=>{
    if (price.billingProduct?.metadata?.productKey !== _billingproductkeyenum.BillingProductKey.RESOURCE_CREDIT) {
        throw new _billingexception.BillingException('Price is not a RESOURCE_CREDIT licensed price', _billingexception.BillingExceptionCode.BILLING_PRICE_INVALID);
    }
    const creditAmount = price.metadata?.credit_amount;
    if (!(0, _utils.isDefined)(creditAmount) || !(0, _classvalidator.isNumber)(Number(creditAmount))) {
        throw new _billingexception.BillingException('RESOURCE_CREDIT price must have a credit_amount in metadata', _billingexception.BillingExceptionCode.BILLING_PRICE_INVALID);
    }
};
const getCapFromCreditMetadata = (price)=>{
    assertIsLicensedResourceCreditPrice(price);
    return Number(price.metadata?.credit_amount);
};
const billingValidator = {
    assertIsMeteredTiersSchemaOrThrow,
    isMeteredTiersSchema,
    assertIsLicensedSubscriptionItem,
    assertIsMeteredSubscriptionItem,
    assertIsMeteredPrice,
    assertIsSubscription,
    isMeteredPrice,
    assertIsLicensedResourceCreditPrice,
    isLicensedResourceCreditItem,
    getCapFromCreditMetadata
};

//# sourceMappingURL=billing.validate.js.map