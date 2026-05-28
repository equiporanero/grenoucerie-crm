/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _transformstripeentitlementupdatedeventtodatabaseentitlementutil = require("../transform-stripe-entitlement-updated-event-to-database-entitlement.util");
const _billingentitlementkeyenum = require("../../../billing/enums/billing-entitlement-key.enum");
describe('transformStripeEntitlementUpdatedEventToDatabaseEntitlement', ()=>{
    it('should return the SSO key with true value', ()=>{
        const data = {
            object: {
                customer: 'cus_123',
                entitlements: {
                    data: [
                        {
                            lookup_key: 'SSO',
                            feature: 'SSO',
                            livemode: false,
                            id: 'ent_123',
                            object: 'entitlements.active_entitlement'
                        }
                    ],
                    object: 'list',
                    has_more: false,
                    url: ''
                },
                livemode: false,
                object: 'entitlements.active_entitlement_summary'
            }
        };
        const result = (0, _transformstripeentitlementupdatedeventtodatabaseentitlementutil.transformStripeEntitlementUpdatedEventToDatabaseEntitlement)('workspaceId', data);
        expect(result).toEqual([
            {
                workspaceId: 'workspaceId',
                key: _billingentitlementkeyenum.BillingEntitlementKey.SSO,
                value: true,
                stripeCustomerId: 'cus_123'
            },
            {
                key: _billingentitlementkeyenum.BillingEntitlementKey.CUSTOM_DOMAIN,
                stripeCustomerId: 'cus_123',
                value: false,
                workspaceId: 'workspaceId'
            },
            {
                key: _billingentitlementkeyenum.BillingEntitlementKey.RLS,
                stripeCustomerId: 'cus_123',
                value: false,
                workspaceId: 'workspaceId'
            },
            {
                key: _billingentitlementkeyenum.BillingEntitlementKey.AUDIT_LOGS,
                stripeCustomerId: 'cus_123',
                value: false,
                workspaceId: 'workspaceId'
            }
        ]);
    });
    it('should return the SSO key with false value,should only render the values that are listed in BillingEntitlementKeys', ()=>{
        const data = {
            object: {
                customer: 'cus_123',
                entitlements: {
                    data: [
                        {
                            id: 'ent_123',
                            object: 'entitlements.active_entitlement',
                            lookup_key: 'DIFFERENT_KEY',
                            feature: 'DIFFERENT_FEATURE',
                            livemode: false
                        }
                    ],
                    object: 'list',
                    has_more: false,
                    url: ''
                },
                livemode: false,
                object: 'entitlements.active_entitlement_summary'
            }
        };
        const result = (0, _transformstripeentitlementupdatedeventtodatabaseentitlementutil.transformStripeEntitlementUpdatedEventToDatabaseEntitlement)('workspaceId', data);
        expect(result).toEqual([
            {
                workspaceId: 'workspaceId',
                key: _billingentitlementkeyenum.BillingEntitlementKey.SSO,
                value: false,
                stripeCustomerId: 'cus_123'
            },
            {
                key: _billingentitlementkeyenum.BillingEntitlementKey.CUSTOM_DOMAIN,
                stripeCustomerId: 'cus_123',
                value: false,
                workspaceId: 'workspaceId'
            },
            {
                key: _billingentitlementkeyenum.BillingEntitlementKey.RLS,
                stripeCustomerId: 'cus_123',
                value: false,
                workspaceId: 'workspaceId'
            },
            {
                key: _billingentitlementkeyenum.BillingEntitlementKey.AUDIT_LOGS,
                stripeCustomerId: 'cus_123',
                value: false,
                workspaceId: 'workspaceId'
            }
        ]);
    });
});

//# sourceMappingURL=transform-stripe-entitlement-updated-event-to-database-entitlement.util.spec.js.map