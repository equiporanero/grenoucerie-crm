/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _billingpriceentity = require("../../entities/billing-price.entity");
const _billingsubscriptionentity = require("../../entities/billing-subscription.entity");
const _billingproductkeyenum = require("../../enums/billing-product-key.enum");
const _resourcecreditservice = require("../resource-credit.service");
const _getworkspacescopedrepositorytokenutil = require("../../../../twenty-orm/workspace-scoped-repository/get-workspace-scoped-repository-token.util");
describe('ResourceCreditService', ()=>{
    let service;
    let billingSubscriptionRepository;
    const buildSubscriptionWithResourceCredit = (creditAmount, unitAmount = 0)=>({
            id: 'sub_123',
            billingSubscriptionItems: [
                {
                    stripePriceId: 'price_rc_123',
                    billingProduct: {
                        metadata: {
                            productKey: _billingproductkeyenum.BillingProductKey.RESOURCE_CREDIT
                        },
                        billingPrices: [
                            {
                                stripePriceId: 'price_rc_123',
                                metadata: {
                                    credit_amount: String(creditAmount)
                                },
                                unitAmount
                            }
                        ]
                    }
                }
            ]
        });
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _resourcecreditservice.ResourceCreditService,
                {
                    provide: (0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(_billingsubscriptionentity.BillingSubscriptionEntity),
                    useValue: {
                        findOne: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_billingpriceentity.BillingPriceEntity),
                    useValue: {
                        findOneOrFail: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_resourcecreditservice.ResourceCreditService);
        billingSubscriptionRepository = module.get((0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(_billingsubscriptionentity.BillingSubscriptionEntity));
    });
    describe('extractResourceCreditPricingInfo', ()=>{
        it('returns pricing info for a valid resource credit subscription', ()=>{
            const subscription = buildSubscriptionWithResourceCredit(1000, 10);
            const result = service.extractResourceCreditPricingInfo(subscription);
            expect(result).toEqual({
                tierCap: 1000,
                unitPriceCents: 10
            });
        });
        it('returns null when no RESOURCE_CREDIT item found', ()=>{
            const subscription = {
                billingSubscriptionItems: [
                    {
                        stripePriceId: 'price_base',
                        billingProduct: {
                            metadata: {
                                productKey: _billingproductkeyenum.BillingProductKey.BASE_PRODUCT
                            },
                            billingPrices: []
                        }
                    }
                ]
            };
            expect(service.extractResourceCreditPricingInfo(subscription)).toBeNull();
        });
        it('returns null when credit_amount is 0', ()=>{
            const subscription = buildSubscriptionWithResourceCredit(0);
            expect(service.extractResourceCreditPricingInfo(subscription)).toBeNull();
        });
        it('returns null when matching price not found', ()=>{
            const subscription = {
                billingSubscriptionItems: [
                    {
                        stripePriceId: 'price_rc_different',
                        billingProduct: {
                            metadata: {
                                productKey: _billingproductkeyenum.BillingProductKey.RESOURCE_CREDIT
                            },
                            billingPrices: [
                                {
                                    stripePriceId: 'price_rc_other',
                                    metadata: {
                                        credit_amount: '500'
                                    }
                                }
                            ]
                        }
                    }
                ]
            };
            expect(service.extractResourceCreditPricingInfo(subscription)).toBeNull();
        });
    });
    describe('getResourceCreditRolloverParameters', ()=>{
        it('returns parameters when resource credit item found', async ()=>{
            const subscription = buildSubscriptionWithResourceCredit(5000, 5);
            billingSubscriptionRepository.findOne.mockResolvedValue(subscription);
            const result = await service.getResourceCreditRolloverParameters('ws_1', 'sub_123');
            expect(result).toEqual({
                tierQuantity: 5000,
                unitPriceCents: 5
            });
        });
        it('returns null when subscription not found', async ()=>{
            billingSubscriptionRepository.findOne.mockResolvedValue(null);
            const result = await service.getResourceCreditRolloverParameters('ws_1', 'sub_123');
            expect(result).toBeNull();
        });
        it('returns null when resource credit pricing info not extractable', async ()=>{
            billingSubscriptionRepository.findOne.mockResolvedValue({
                billingSubscriptionItems: []
            });
            const result = await service.getResourceCreditRolloverParameters('ws_1', 'sub_123');
            expect(result).toBeNull();
        });
    });
});

//# sourceMappingURL=resource-credit.service.spec.js.map