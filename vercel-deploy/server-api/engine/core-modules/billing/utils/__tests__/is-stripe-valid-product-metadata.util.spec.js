/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _billingplankeyenum = require("../../enums/billing-plan-key.enum");
const _billingproductkeyenum = require("../../enums/billing-product-key.enum");
const _billingusagetypeenum = require("../../enums/billing-usage-type.enum");
const _isstripevalidproductmetadatautil = require("../is-stripe-valid-product-metadata.util");
describe('isStripeValidProductMetadata', ()=>{
    it('should return true if metadata is empty', ()=>{
        const metadata = {};
        expect((0, _isstripevalidproductmetadatautil.isStripeValidProductMetadata)(metadata)).toBe(true);
    });
    it('should return true if metadata has the correct keys with correct values', ()=>{
        const metadata = {
            planKey: _billingplankeyenum.BillingPlanKey.PRO,
            priceUsageBased: _billingusagetypeenum.BillingUsageType.METERED,
            productKey: _billingproductkeyenum.BillingProductKey.BASE_PRODUCT
        };
        expect((0, _isstripevalidproductmetadatautil.isStripeValidProductMetadata)(metadata)).toBe(true);
    });
    it('should return true if metadata has extra keys', ()=>{
        const metadata = {
            planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
            priceUsageBased: _billingusagetypeenum.BillingUsageType.METERED,
            productKey: _billingproductkeyenum.BillingProductKey.RESOURCE_CREDIT,
            randomKey: 'randomValue'
        };
        expect((0, _isstripevalidproductmetadatautil.isStripeValidProductMetadata)(metadata)).toBe(true);
    });
    it('should return false if metadata has invalid keys', ()=>{
        const metadata = {
            planKey: 'invalid',
            priceUsageBased: _billingusagetypeenum.BillingUsageType.METERED,
            productKey: 'invalid'
        };
        expect((0, _isstripevalidproductmetadatautil.isStripeValidProductMetadata)(metadata)).toBe(false);
    });
    it('should return false if metadata has invalid values', ()=>{
        const metadata = {
            planKey: _billingplankeyenum.BillingPlanKey.PRO,
            priceUsageBased: 'invalid',
            productKey: _billingproductkeyenum.BillingProductKey.BASE_PRODUCT
        };
        expect((0, _isstripevalidproductmetadatautil.isStripeValidProductMetadata)(metadata)).toBe(false);
    });
    it('should return false if the metadata does not have the required keys', ()=>{
        const metadata = {
            randomKey: 'randomValue'
        };
        expect((0, _isstripevalidproductmetadatautil.isStripeValidProductMetadata)(metadata)).toBe(false);
    });
});

//# sourceMappingURL=is-stripe-valid-product-metadata.util.spec.js.map