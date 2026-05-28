/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _getsubscriptionidfrominvoiceutil = require("../get-subscription-id-from-invoice.util");
describe('getSubscriptionIdFromInvoice', ()=>{
    it('should extract subscription ID from parent.subscription_details (SDK v19+ structure)', ()=>{
        const invoice = {
            parent: {
                subscription_details: {
                    subscription: 'sub_from_parent',
                    metadata: null
                },
                type: 'subscription_details',
                quote_details: null
            }
        };
        expect((0, _getsubscriptionidfrominvoiceutil.getSubscriptionIdFromInvoice)(invoice)).toBe('sub_from_parent');
    });
    it('should handle expanded subscription object in parent', ()=>{
        const invoice = {
            parent: {
                subscription_details: {
                    subscription: {
                        id: 'sub_expanded'
                    },
                    metadata: null
                },
                type: 'subscription_details',
                quote_details: null
            }
        };
        expect((0, _getsubscriptionidfrominvoiceutil.getSubscriptionIdFromInvoice)(invoice)).toBe('sub_expanded');
    });
    it('should fall back to legacy subscription field when parent is null', ()=>{
        const invoice = {
            parent: null,
            subscription: 'sub_legacy'
        };
        expect((0, _getsubscriptionidfrominvoiceutil.getSubscriptionIdFromInvoice)(invoice)).toBe('sub_legacy');
    });
    it('should return undefined when no subscription present', ()=>{
        const invoice = {
            parent: null
        };
        expect((0, _getsubscriptionidfrominvoiceutil.getSubscriptionIdFromInvoice)(invoice)).toBeUndefined();
    });
    it('should return undefined when parent exists but subscription_details is null', ()=>{
        const invoice = {
            parent: {
                subscription_details: null,
                quote_details: null,
                type: 'quote_details'
            }
        };
        expect((0, _getsubscriptionidfrominvoiceutil.getSubscriptionIdFromInvoice)(invoice)).toBeUndefined();
    });
});

//# sourceMappingURL=get-subscription-id-from-invoice.util.spec.js.map