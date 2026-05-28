"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _billingpriceentity = require("../../entities/billing-price.entity");
const _billingsubscriptionitementity = require("../../entities/billing-subscription-item.entity");
const _billingsubscriptionentity = require("../../entities/billing-subscription.entity");
const _billingplankeyenum = require("../../enums/billing-plan-key.enum");
const _billingsubscriptionintervalenum = require("../../enums/billing-subscription-interval.enum");
const _billingpriceservice = require("../billing-price.service");
const _billingproductservice = require("../billing-product.service");
const _billingsubscriptionphaseservice = require("../billing-subscription-phase.service");
const _billingsubscriptionupdateservice = require("../billing-subscription-update.service");
const _billingsubscriptionservice = require("../billing-subscription.service");
const _resourcecreditservice = require("../resource-credit.service");
const _stripeinvoiceservice = require("../../stripe/services/stripe-invoice.service");
const _stripesubscriptionscheduleservice = require("../../stripe/services/stripe-subscription-schedule.service");
const _stripesubscriptionservice = require("../../stripe/services/stripe-subscription.service");
const _billingsubscriptionupdatetype = require("../../types/billing-subscription-update.type");
const _getworkspacescopedrepositorytokenutil = require("../../../../twenty-orm/workspace-scoped-repository/get-workspace-scoped-repository-token.util");
const _mockbuildersutil = require("./utils/mock-builders.util");
const _priceconstants = require("./utils/price.constants");
describe('BillingSubscriptionUpdateService', ()=>{
    let module;
    let service;
    let billingSubscriptionRepository;
    let billingPriceRepository;
    let billingProductService;
    let stripeSubscriptionScheduleService;
    let stripeSubscriptionService;
    let billingSubscriptionPhaseService;
    let billingSubscriptionService;
    beforeEach(async ()=>{
        module = await _testing.Test.createTestingModule({
            providers: [
                _billingsubscriptionupdateservice.BillingSubscriptionUpdateService,
                {
                    provide: _stripeinvoiceservice.StripeInvoiceService,
                    useValue: {
                        createImmediateUpgradeInvoice: jest.fn().mockResolvedValue(undefined)
                    }
                },
                {
                    provide: _billingsubscriptionservice.BillingSubscriptionService,
                    useValue: {
                        syncSubscriptionToDatabase: jest.fn().mockResolvedValue({})
                    }
                },
                {
                    provide: _billingproductservice.BillingProductService,
                    useValue: {
                        getProductPrices: jest.fn()
                    }
                },
                {
                    provide: _stripesubscriptionscheduleservice.StripeSubscriptionScheduleService,
                    useValue: {
                        loadSubscriptionSchedule: jest.fn(),
                        createSubscriptionSchedule: jest.fn(),
                        updateSchedule: jest.fn().mockResolvedValue({}),
                        releaseSubscriptionSchedule: jest.fn(),
                        getSubscriptionWithSchedule: jest.fn()
                    }
                },
                {
                    provide: _stripesubscriptionservice.StripeSubscriptionService,
                    useValue: {
                        updateSubscription: jest.fn().mockResolvedValue({})
                    }
                },
                {
                    provide: _billingsubscriptionphaseservice.BillingSubscriptionPhaseService,
                    useValue: {
                        toPhaseUpdateParams: jest.fn(),
                        buildPhaseUpdateParams: jest.fn().mockImplementation(({ toUpdatePrices, startDate, endDate })=>({
                                start_date: startDate,
                                ...endDate ? {
                                    end_date: endDate
                                } : {},
                                proration_behavior: 'none',
                                items: [
                                    {
                                        price: toUpdatePrices.licensedPriceId,
                                        quantity: toUpdatePrices.seats
                                    },
                                    {
                                        price: toUpdatePrices.resourceCreditPriceId,
                                        quantity: 1
                                    }
                                ]
                            })),
                        isSamePhaseSignature: jest.fn().mockResolvedValue(false)
                    }
                },
                {
                    provide: (0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(_billingsubscriptionentity.BillingSubscriptionEntity),
                    useValue: (0, _mockbuildersutil.repoMock)()
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_billingpriceentity.BillingPriceEntity),
                    useValue: (0, _mockbuildersutil.repoMock)()
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_billingsubscriptionitementity.BillingSubscriptionItemEntity),
                    useValue: (0, _mockbuildersutil.repoMock)()
                },
                {
                    provide: _resourcecreditservice.ResourceCreditService,
                    useValue: {
                        extractResourceCreditPricingInfo: jest.fn().mockReturnValue({
                            tierCap: 1000,
                            unitPriceCents: 10
                        })
                    }
                },
                _billingpriceservice.BillingPriceService
            ]
        }).compile();
        service = module.get(_billingsubscriptionupdateservice.BillingSubscriptionUpdateService);
        billingSubscriptionRepository = module.get((0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(_billingsubscriptionentity.BillingSubscriptionEntity));
        billingPriceRepository = module.get((0, _typeorm.getRepositoryToken)(_billingpriceentity.BillingPriceEntity));
        billingProductService = module.get(_billingproductservice.BillingProductService);
        stripeSubscriptionScheduleService = module.get(_stripesubscriptionscheduleservice.StripeSubscriptionScheduleService);
        stripeSubscriptionService = module.get(_stripesubscriptionservice.StripeSubscriptionService);
        billingSubscriptionPhaseService = module.get(_billingsubscriptionphaseservice.BillingSubscriptionPhaseService);
        billingSubscriptionService = module.get(_billingsubscriptionservice.BillingSubscriptionService);
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    describe('updateSubscription - Plan update', ()=>{
        it('should update from PRO to ENTERPRISE - without schedule', async ()=>{
            (0, _mockbuildersutil.arrangeBillingSubscriptionRepositoryFindOneOrFail)(billingSubscriptionRepository, {
                planKey: _billingplankeyenum.BillingPlanKey.PRO,
                interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                licensedPriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                seats: 1
            });
            (0, _mockbuildersutil.arrangeBillingPriceRepositoryFindOneOrFail)(billingPriceRepository, {
                [_priceconstants.LICENSE_PRICE_PRO_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: false
                }),
                [_priceconstants.METER_PRICE_PRO_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            });
            (0, _mockbuildersutil.arrangeStripeSubscriptionScheduleServiceLoadSubscriptionSchedule)(stripeSubscriptionScheduleService, {});
            (0, _mockbuildersutil.arrangeBillingProductServiceGetProductPrices)(billingProductService, [
                (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: false
                }),
                (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            ]);
            await service.updateSubscription('ws_1', 'sub_db_1', {
                type: _billingsubscriptionupdatetype.SubscriptionUpdateType.PLAN,
                newPlan: _billingplankeyenum.BillingPlanKey.ENTERPRISE
            });
            expect(stripeSubscriptionService.updateSubscription).toHaveBeenCalledWith('sub_1', {
                items: [
                    {
                        id: 'si_licensed',
                        price: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                        quantity: 1
                    },
                    {
                        id: 'si_resource_credit',
                        price: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                        quantity: 1
                    }
                ],
                proration_behavior: 'always_invoice',
                metadata: {
                    plan: _billingplankeyenum.BillingPlanKey.ENTERPRISE
                }
            });
            expect(stripeSubscriptionScheduleService.updateSchedule).not.toHaveBeenCalled();
            expect(billingSubscriptionService.syncSubscriptionToDatabase).toHaveBeenCalled();
        });
        it('should update from PRO to ENTERPRISE - with schedule', async ()=>{
            (0, _mockbuildersutil.arrangeBillingSubscriptionRepositoryFindOneOrFail)(billingSubscriptionRepository, {
                planKey: _billingplankeyenum.BillingPlanKey.PRO,
                interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                licensedPriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                seats: 1
            });
            (0, _mockbuildersutil.arrangeBillingPriceRepositoryFindOneOrFail)(billingPriceRepository, {
                [_priceconstants.LICENSE_PRICE_PRO_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: false
                }),
                [_priceconstants.METER_PRICE_PRO_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                }),
                [_priceconstants.LICENSE_PRICE_PRO_YEAR_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_PRO_YEAR_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                    isMetered: false
                }),
                [_priceconstants.METER_PRICE_PRO_YEAR_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_PRO_YEAR_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            });
            const currentPhase = (0, _mockbuildersutil.buildSchedulePhase)({
                licensedPriceId: _priceconstants.LICENSE_PRICE_PRO_YEAR_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_PRO_YEAR_ID,
                seats: 1
            });
            const nextPhase = (0, _mockbuildersutil.buildSchedulePhase)({
                licensedPriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                seats: 1
            });
            (0, _mockbuildersutil.arrangeBillingProductServiceGetProductPrices)(billingProductService, [
                (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: false
                }),
                (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            ]);
            const refreshedCurrentPhase = (0, _mockbuildersutil.buildSchedulePhase)({
                licensedPriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_YEAR_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_ENTERPRISE_YEAR_ID,
                seats: 1
            });
            jest.spyOn(stripeSubscriptionScheduleService, 'loadSubscriptionSchedule').mockResolvedValueOnce({
                schedule: {
                    id: 'schedule_1'
                },
                currentPhase,
                nextPhase
            }).mockResolvedValueOnce({
                schedule: {
                    id: 'schedule_1'
                },
                currentPhase: refreshedCurrentPhase,
                nextPhase
            });
            (0, _mockbuildersutil.arrangeBillingSubscriptionPhaseServiceToPhaseUpdateParams)(billingSubscriptionPhaseService, {
                items: currentPhase.items
            });
            await service.updateSubscription('ws_1', 'sub_db_1', {
                type: _billingsubscriptionupdatetype.SubscriptionUpdateType.PLAN,
                newPlan: _billingplankeyenum.BillingPlanKey.ENTERPRISE
            });
            expect(stripeSubscriptionService.updateSubscription).toHaveBeenCalledWith('sub_1', {
                items: [
                    {
                        id: 'si_licensed',
                        price: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                        quantity: 1
                    },
                    {
                        id: 'si_resource_credit',
                        price: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                        quantity: 1
                    }
                ],
                proration_behavior: 'always_invoice',
                metadata: {
                    plan: _billingplankeyenum.BillingPlanKey.ENTERPRISE
                }
            });
            expect(stripeSubscriptionScheduleService.updateSchedule).toHaveBeenCalledWith('schedule_1', {
                phases: [
                    expect.objectContaining({
                        items: currentPhase.items
                    }),
                    expect.objectContaining({
                        items: [
                            {
                                price: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                                quantity: 1
                            },
                            {
                                price: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                                quantity: 1
                            }
                        ]
                    })
                ]
            });
            expect(billingSubscriptionService.syncSubscriptionToDatabase).toHaveBeenCalled();
        });
        it('should update from ENTERPRISE to PRO - without schedule', async ()=>{
            (0, _mockbuildersutil.arrangeBillingSubscriptionRepositoryFindOneOrFail)(billingSubscriptionRepository, {
                planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                licensedPriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                seats: 1
            });
            (0, _mockbuildersutil.arrangeBillingPriceRepositoryFindOneOrFail)(billingPriceRepository, {
                [_priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: false
                }),
                [_priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            });
            (0, _mockbuildersutil.arrangeStripeSubscriptionScheduleServiceLoadSubscriptionSchedule)(stripeSubscriptionScheduleService, {});
            const currentPhase = (0, _mockbuildersutil.buildSchedulePhase)({
                licensedPriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                seats: 1
            });
            (0, _mockbuildersutil.arrangeStripeSubscriptionScheduleServiceCreateSubscriptionSchedule)(stripeSubscriptionScheduleService, currentPhase);
            (0, _mockbuildersutil.arrangeBillingProductServiceGetProductPrices)(billingProductService, [
                (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: false
                }),
                (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            ]);
            (0, _mockbuildersutil.arrangeBillingSubscriptionPhaseServiceToPhaseUpdateParams)(billingSubscriptionPhaseService, {
                items: currentPhase.items
            });
            await service.updateSubscription('ws_1', 'sub_db_1', {
                type: _billingsubscriptionupdatetype.SubscriptionUpdateType.PLAN,
                newPlan: _billingplankeyenum.BillingPlanKey.PRO
            });
            expect(stripeSubscriptionScheduleService.createSubscriptionSchedule).toHaveBeenCalled();
            expect(stripeSubscriptionScheduleService.updateSchedule).toHaveBeenCalledWith('schedule_1', {
                phases: [
                    expect.objectContaining({
                        items: currentPhase.items
                    }),
                    expect.objectContaining({
                        items: [
                            {
                                price: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                                quantity: 1
                            },
                            {
                                price: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                                quantity: 1
                            }
                        ]
                    })
                ]
            });
            expect(stripeSubscriptionService.updateSubscription).not.toHaveBeenCalled();
            expect(billingSubscriptionService.syncSubscriptionToDatabase).toHaveBeenCalled();
        });
        it('should update from ENTERPRISE to PRO - with schedule', async ()=>{
            (0, _mockbuildersutil.arrangeBillingSubscriptionRepositoryFindOneOrFail)(billingSubscriptionRepository, {
                planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                licensedPriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                seats: 1
            });
            (0, _mockbuildersutil.arrangeBillingPriceRepositoryFindOneOrFail)(billingPriceRepository, {
                [_priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: false
                }),
                [_priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                }),
                [_priceconstants.LICENSE_PRICE_ENTERPRISE_YEAR_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_YEAR_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                    isMetered: false
                }),
                [_priceconstants.METER_PRICE_ENTERPRISE_YEAR_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_ENTERPRISE_YEAR_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            });
            const currentPhase = (0, _mockbuildersutil.buildSchedulePhase)({
                licensedPriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_YEAR_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_ENTERPRISE_YEAR_ID,
                seats: 1
            });
            const nextPhase = (0, _mockbuildersutil.buildSchedulePhase)({
                licensedPriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                seats: 1
            });
            (0, _mockbuildersutil.arrangeStripeSubscriptionScheduleServiceLoadSubscriptionSchedule)(stripeSubscriptionScheduleService, {
                schedule: {
                    id: 'schedule_1'
                },
                currentPhase,
                nextPhase
            });
            (0, _mockbuildersutil.arrangeBillingProductServiceGetProductPrices)(billingProductService, [
                (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: false
                }),
                (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            ]);
            (0, _mockbuildersutil.arrangeBillingSubscriptionPhaseServiceToPhaseUpdateParams)(billingSubscriptionPhaseService, {
                items: currentPhase.items
            });
            await service.updateSubscription('ws_1', 'sub_db_1', {
                type: _billingsubscriptionupdatetype.SubscriptionUpdateType.PLAN,
                newPlan: _billingplankeyenum.BillingPlanKey.PRO
            });
            expect(stripeSubscriptionScheduleService.updateSchedule).toHaveBeenCalledWith('schedule_1', {
                phases: [
                    expect.objectContaining({
                        items: currentPhase.items
                    }),
                    expect.objectContaining({
                        items: [
                            {
                                price: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                                quantity: 1
                            },
                            {
                                price: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                                quantity: 1
                            }
                        ]
                    })
                ]
            });
            expect(stripeSubscriptionService.updateSubscription).not.toHaveBeenCalled();
            expect(billingSubscriptionService.syncSubscriptionToDatabase).toHaveBeenCalled();
        });
    });
    describe('updateSubscription - Interval update', ()=>{
        it('should change interval from monthly to yearly - without schedule', async ()=>{
            (0, _mockbuildersutil.arrangeBillingSubscriptionRepositoryFindOneOrFail)(billingSubscriptionRepository, {
                planKey: _billingplankeyenum.BillingPlanKey.PRO,
                interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                licensedPriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                seats: 1
            });
            (0, _mockbuildersutil.arrangeBillingPriceRepositoryFindOneOrFail)(billingPriceRepository, {
                [_priceconstants.LICENSE_PRICE_PRO_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: false
                }),
                [_priceconstants.METER_PRICE_PRO_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            });
            (0, _mockbuildersutil.arrangeStripeSubscriptionScheduleServiceLoadSubscriptionSchedule)(stripeSubscriptionScheduleService, {});
            (0, _mockbuildersutil.arrangeBillingProductServiceGetProductPrices)(billingProductService, [
                (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_PRO_YEAR_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                    isMetered: false
                }),
                (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_PRO_YEAR_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            ]);
            await service.updateSubscription('ws_1', 'sub_db_1', {
                type: _billingsubscriptionupdatetype.SubscriptionUpdateType.INTERVAL,
                newInterval: _billingsubscriptionintervalenum.SubscriptionInterval.Year
            });
            expect(stripeSubscriptionService.updateSubscription).toHaveBeenCalledWith('sub_1', {
                items: [
                    {
                        id: 'si_licensed',
                        price: _priceconstants.LICENSE_PRICE_PRO_YEAR_ID,
                        quantity: 1
                    },
                    {
                        id: 'si_resource_credit',
                        price: _priceconstants.METER_PRICE_PRO_YEAR_ID,
                        quantity: 1
                    }
                ],
                proration_behavior: 'create_prorations',
                billing_cycle_anchor: 'now'
            });
            expect(billingSubscriptionService.syncSubscriptionToDatabase).toHaveBeenCalled();
        });
        it('should change interval from monthly to yearly - with schedule (ENTERPRISE monthly to PRO yearly downgrade)', async ()=>{
            (0, _mockbuildersutil.arrangeBillingSubscriptionRepositoryFindOneOrFail)(billingSubscriptionRepository, {
                planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                licensedPriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                seats: 1
            });
            (0, _mockbuildersutil.arrangeBillingPriceRepositoryFindOneOrFail)(billingPriceRepository, {
                [_priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: false
                }),
                [_priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                }),
                [_priceconstants.LICENSE_PRICE_PRO_YEAR_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_PRO_YEAR_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                    isMetered: false
                }),
                [_priceconstants.METER_PRICE_PRO_YEAR_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_PRO_YEAR_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            });
            const currentPhase = (0, _mockbuildersutil.buildSchedulePhase)({
                licensedPriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                seats: 1
            });
            const nextPhase = (0, _mockbuildersutil.buildSchedulePhase)({
                licensedPriceId: _priceconstants.LICENSE_PRICE_PRO_YEAR_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_PRO_YEAR_ID,
                seats: 1
            });
            jest.spyOn(stripeSubscriptionScheduleService, 'loadSubscriptionSchedule').mockResolvedValueOnce({
                schedule: {
                    id: 'schedule_1'
                },
                currentPhase,
                nextPhase
            }).mockResolvedValueOnce({
                schedule: {
                    id: 'schedule_1'
                },
                currentPhase: (0, _mockbuildersutil.buildSchedulePhase)({
                    licensedPriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_YEAR_ID,
                    resourceCreditPriceId: _priceconstants.METER_PRICE_ENTERPRISE_YEAR_ID,
                    seats: 1
                }),
                nextPhase
            });
            (0, _mockbuildersutil.arrangeBillingProductServiceGetProductPrices)(billingProductService, [
                (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_YEAR_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                    isMetered: false
                }),
                (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_ENTERPRISE_YEAR_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            ]);
            (0, _mockbuildersutil.arrangeBillingSubscriptionPhaseServiceToPhaseUpdateParams)(billingSubscriptionPhaseService, {
                items: currentPhase.items
            });
            await service.updateSubscription('ws_1', 'sub_db_1', {
                type: _billingsubscriptionupdatetype.SubscriptionUpdateType.INTERVAL,
                newInterval: _billingsubscriptionintervalenum.SubscriptionInterval.Year
            });
            expect(stripeSubscriptionService.updateSubscription).toHaveBeenCalledWith('sub_1', {
                items: [
                    {
                        id: 'si_licensed',
                        price: _priceconstants.LICENSE_PRICE_ENTERPRISE_YEAR_ID,
                        quantity: 1
                    },
                    {
                        id: 'si_resource_credit',
                        price: _priceconstants.METER_PRICE_ENTERPRISE_YEAR_ID,
                        quantity: 1
                    }
                ],
                proration_behavior: 'create_prorations',
                billing_cycle_anchor: 'now'
            });
            expect(stripeSubscriptionScheduleService.updateSchedule).toHaveBeenCalledWith('schedule_1', {
                phases: [
                    expect.objectContaining({
                        items: currentPhase.items
                    }),
                    expect.objectContaining({
                        items: [
                            {
                                price: _priceconstants.LICENSE_PRICE_PRO_YEAR_ID,
                                quantity: 1
                            },
                            {
                                price: _priceconstants.METER_PRICE_PRO_YEAR_ID,
                                quantity: 1
                            }
                        ]
                    })
                ]
            });
            expect(billingSubscriptionService.syncSubscriptionToDatabase).toHaveBeenCalled();
        });
        it('should change interval from yearly to monthly - without schedule', async ()=>{
            (0, _mockbuildersutil.arrangeBillingSubscriptionRepositoryFindOneOrFail)(billingSubscriptionRepository, {
                planKey: _billingplankeyenum.BillingPlanKey.PRO,
                interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                licensedPriceId: _priceconstants.LICENSE_PRICE_PRO_YEAR_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_PRO_YEAR_ID,
                seats: 1
            });
            (0, _mockbuildersutil.arrangeBillingPriceRepositoryFindOneOrFail)(billingPriceRepository, {
                [_priceconstants.LICENSE_PRICE_PRO_YEAR_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_PRO_YEAR_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                    isMetered: false
                }),
                [_priceconstants.METER_PRICE_PRO_YEAR_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_PRO_YEAR_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            });
            (0, _mockbuildersutil.arrangeStripeSubscriptionScheduleServiceLoadSubscriptionSchedule)(stripeSubscriptionScheduleService, {});
            const currentPhase = (0, _mockbuildersutil.buildSchedulePhase)({
                licensedPriceId: _priceconstants.LICENSE_PRICE_PRO_YEAR_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_PRO_YEAR_ID,
                seats: 1
            });
            (0, _mockbuildersutil.arrangeStripeSubscriptionScheduleServiceCreateSubscriptionSchedule)(stripeSubscriptionScheduleService, currentPhase);
            (0, _mockbuildersutil.arrangeBillingProductServiceGetProductPrices)(billingProductService, [
                (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: false
                }),
                (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            ]);
            (0, _mockbuildersutil.arrangeBillingSubscriptionPhaseServiceToPhaseUpdateParams)(billingSubscriptionPhaseService, {
                items: currentPhase.items
            });
            await service.updateSubscription('ws_1', 'sub_db_1', {
                type: _billingsubscriptionupdatetype.SubscriptionUpdateType.INTERVAL,
                newInterval: _billingsubscriptionintervalenum.SubscriptionInterval.Month
            });
            expect(stripeSubscriptionScheduleService.createSubscriptionSchedule).toHaveBeenCalled();
            expect(stripeSubscriptionScheduleService.updateSchedule).toHaveBeenCalledWith('schedule_1', {
                phases: [
                    expect.objectContaining({
                        items: currentPhase.items
                    }),
                    expect.objectContaining({
                        items: [
                            {
                                price: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                                quantity: 1
                            },
                            {
                                price: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                                quantity: 1
                            }
                        ]
                    })
                ]
            });
            expect(stripeSubscriptionService.updateSubscription).not.toHaveBeenCalled();
            expect(billingSubscriptionService.syncSubscriptionToDatabase).toHaveBeenCalled();
        });
        it('should change interval from yearly to monthly - with schedule (ENTERPRISE yearly to PRO monthly downgrade)', async ()=>{
            (0, _mockbuildersutil.arrangeBillingSubscriptionRepositoryFindOneOrFail)(billingSubscriptionRepository, {
                planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                licensedPriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_YEAR_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_ENTERPRISE_YEAR_ID,
                seats: 1
            });
            (0, _mockbuildersutil.arrangeBillingPriceRepositoryFindOneOrFail)(billingPriceRepository, {
                [_priceconstants.LICENSE_PRICE_ENTERPRISE_YEAR_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_YEAR_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                    isMetered: false
                }),
                [_priceconstants.METER_PRICE_ENTERPRISE_YEAR_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_ENTERPRISE_YEAR_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                }),
                [_priceconstants.LICENSE_PRICE_PRO_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: false
                }),
                [_priceconstants.METER_PRICE_PRO_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            });
            const currentPhase = (0, _mockbuildersutil.buildSchedulePhase)({
                licensedPriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_YEAR_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_ENTERPRISE_YEAR_ID,
                seats: 1
            });
            const nextPhase = (0, _mockbuildersutil.buildSchedulePhase)({
                licensedPriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                seats: 1
            });
            (0, _mockbuildersutil.arrangeStripeSubscriptionScheduleServiceLoadSubscriptionSchedule)(stripeSubscriptionScheduleService, {
                schedule: {
                    id: 'schedule_1'
                },
                currentPhase,
                nextPhase
            });
            (0, _mockbuildersutil.arrangeBillingProductServiceGetProductPrices)(billingProductService, [
                (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: false
                }),
                (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            ]);
            (0, _mockbuildersutil.arrangeBillingSubscriptionPhaseServiceToPhaseUpdateParams)(billingSubscriptionPhaseService, {
                items: currentPhase.items
            });
            await service.updateSubscription('ws_1', 'sub_db_1', {
                type: _billingsubscriptionupdatetype.SubscriptionUpdateType.INTERVAL,
                newInterval: _billingsubscriptionintervalenum.SubscriptionInterval.Month
            });
            expect(stripeSubscriptionScheduleService.updateSchedule).toHaveBeenCalledWith('schedule_1', {
                phases: [
                    expect.objectContaining({
                        items: currentPhase.items
                    }),
                    expect.objectContaining({
                        items: [
                            {
                                price: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                                quantity: 1
                            },
                            {
                                price: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                                quantity: 1
                            }
                        ]
                    })
                ]
            });
            expect(stripeSubscriptionService.updateSubscription).not.toHaveBeenCalled();
            expect(billingSubscriptionService.syncSubscriptionToDatabase).toHaveBeenCalled();
        });
    });
    describe('updateSubscription - Seats update', ()=>{
        it('should change seats from 1 to 2 - without schedule', async ()=>{
            (0, _mockbuildersutil.arrangeBillingSubscriptionRepositoryFindOneOrFail)(billingSubscriptionRepository, {
                planKey: _billingplankeyenum.BillingPlanKey.PRO,
                interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                licensedPriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                seats: 1
            });
            (0, _mockbuildersutil.arrangeBillingPriceRepositoryFindOneOrFail)(billingPriceRepository, {
                [_priceconstants.LICENSE_PRICE_PRO_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: false
                }),
                [_priceconstants.METER_PRICE_PRO_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            });
            (0, _mockbuildersutil.arrangeStripeSubscriptionScheduleServiceLoadSubscriptionSchedule)(stripeSubscriptionScheduleService, {});
            await service.updateSubscription('ws_1', 'sub_db_1', {
                type: _billingsubscriptionupdatetype.SubscriptionUpdateType.SEATS,
                newSeats: 2
            });
            expect(stripeSubscriptionService.updateSubscription).toHaveBeenCalledWith('sub_1', {
                items: [
                    {
                        id: 'si_licensed',
                        price: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                        quantity: 2
                    },
                    {
                        id: 'si_resource_credit',
                        price: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                        quantity: 1
                    }
                ],
                proration_behavior: 'create_prorations'
            });
            expect(billingSubscriptionService.syncSubscriptionToDatabase).toHaveBeenCalled();
        });
        it('should change seats from 1 to 2 - with schedule (ENTERPRISE monthly to PRO yearly downgrade)', async ()=>{
            (0, _mockbuildersutil.arrangeBillingSubscriptionRepositoryFindOneOrFail)(billingSubscriptionRepository, {
                planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                licensedPriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                seats: 1
            });
            (0, _mockbuildersutil.arrangeBillingPriceRepositoryFindOneOrFail)(billingPriceRepository, {
                [_priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: false
                }),
                [_priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.ENTERPRISE,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                }),
                [_priceconstants.LICENSE_PRICE_PRO_YEAR_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_PRO_YEAR_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                    isMetered: false
                }),
                [_priceconstants.METER_PRICE_PRO_YEAR_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_PRO_YEAR_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            });
            const currentPhase = (0, _mockbuildersutil.buildSchedulePhase)({
                licensedPriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                seats: 1
            });
            const nextPhase = (0, _mockbuildersutil.buildSchedulePhase)({
                licensedPriceId: _priceconstants.LICENSE_PRICE_PRO_YEAR_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_PRO_YEAR_ID,
                seats: 1
            });
            jest.spyOn(stripeSubscriptionScheduleService, 'loadSubscriptionSchedule').mockResolvedValueOnce({
                schedule: {
                    id: 'schedule_1'
                },
                currentPhase,
                nextPhase
            }).mockResolvedValueOnce({
                schedule: {
                    id: 'schedule_1'
                },
                currentPhase: (0, _mockbuildersutil.buildSchedulePhase)({
                    licensedPriceId: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                    resourceCreditPriceId: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                    seats: 2
                }),
                nextPhase
            });
            (0, _mockbuildersutil.arrangeBillingSubscriptionPhaseServiceToPhaseUpdateParams)(billingSubscriptionPhaseService, {
                items: currentPhase.items
            });
            await service.updateSubscription('ws_1', 'sub_db_1', {
                type: _billingsubscriptionupdatetype.SubscriptionUpdateType.SEATS,
                newSeats: 2
            });
            expect(stripeSubscriptionService.updateSubscription).toHaveBeenCalledWith('sub_1', {
                items: [
                    {
                        id: 'si_licensed',
                        price: _priceconstants.LICENSE_PRICE_ENTERPRISE_MONTH_ID,
                        quantity: 2
                    },
                    {
                        id: 'si_resource_credit',
                        price: _priceconstants.METER_PRICE_ENTERPRISE_MONTH_ID,
                        quantity: 1
                    }
                ],
                proration_behavior: 'create_prorations'
            });
            expect(stripeSubscriptionScheduleService.updateSchedule).toHaveBeenCalledWith('schedule_1', {
                phases: [
                    expect.objectContaining({
                        items: currentPhase.items
                    }),
                    expect.objectContaining({
                        items: [
                            {
                                price: _priceconstants.LICENSE_PRICE_PRO_YEAR_ID,
                                quantity: 2
                            },
                            {
                                price: _priceconstants.METER_PRICE_PRO_YEAR_ID,
                                quantity: 1
                            }
                        ]
                    })
                ]
            });
            expect(billingSubscriptionService.syncSubscriptionToDatabase).toHaveBeenCalled();
        });
        it('should change seats from 2 to 1 - without schedule', async ()=>{
            (0, _mockbuildersutil.arrangeBillingSubscriptionRepositoryFindOneOrFail)(billingSubscriptionRepository, {
                planKey: _billingplankeyenum.BillingPlanKey.PRO,
                interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                licensedPriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                seats: 2
            });
            (0, _mockbuildersutil.arrangeBillingPriceRepositoryFindOneOrFail)(billingPriceRepository, {
                [_priceconstants.LICENSE_PRICE_PRO_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: false
                }),
                [_priceconstants.METER_PRICE_PRO_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            });
            (0, _mockbuildersutil.arrangeStripeSubscriptionScheduleServiceLoadSubscriptionSchedule)(stripeSubscriptionScheduleService, {});
            await service.updateSubscription('ws_1', 'sub_db_1', {
                type: _billingsubscriptionupdatetype.SubscriptionUpdateType.SEATS,
                newSeats: 1
            });
            expect(stripeSubscriptionService.updateSubscription).toHaveBeenCalledWith('sub_1', {
                items: [
                    {
                        id: 'si_licensed',
                        price: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                        quantity: 1
                    },
                    {
                        id: 'si_resource_credit',
                        price: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                        quantity: 1
                    }
                ],
                proration_behavior: 'create_prorations'
            });
            expect(billingSubscriptionService.syncSubscriptionToDatabase).toHaveBeenCalled();
        });
        it('should change seats from 2 to 1 - with schedule', async ()=>{
            (0, _mockbuildersutil.arrangeBillingSubscriptionRepositoryFindOneOrFail)(billingSubscriptionRepository, {
                planKey: _billingplankeyenum.BillingPlanKey.PRO,
                interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                licensedPriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                seats: 2
            });
            (0, _mockbuildersutil.arrangeBillingPriceRepositoryFindOneOrFail)(billingPriceRepository, {
                [_priceconstants.LICENSE_PRICE_PRO_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: false
                }),
                [_priceconstants.METER_PRICE_PRO_MONTH_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                }),
                [_priceconstants.LICENSE_PRICE_PRO_YEAR_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.LICENSE_PRICE_PRO_YEAR_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                    isMetered: false
                }),
                [_priceconstants.METER_PRICE_PRO_YEAR_ID]: (0, _mockbuildersutil.buildBillingPriceEntity)({
                    stripePriceId: _priceconstants.METER_PRICE_PRO_YEAR_ID,
                    planKey: _billingplankeyenum.BillingPlanKey.PRO,
                    interval: _billingsubscriptionintervalenum.SubscriptionInterval.Year,
                    isMetered: true,
                    tiers: (0, _mockbuildersutil.buildDefaultMeteredTiers)()
                })
            });
            const currentPhase = (0, _mockbuildersutil.buildSchedulePhase)({
                licensedPriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                seats: 2
            });
            const nextPhase = (0, _mockbuildersutil.buildSchedulePhase)({
                licensedPriceId: _priceconstants.LICENSE_PRICE_PRO_YEAR_ID,
                resourceCreditPriceId: _priceconstants.METER_PRICE_PRO_YEAR_ID,
                seats: 2
            });
            jest.spyOn(stripeSubscriptionScheduleService, 'loadSubscriptionSchedule').mockResolvedValueOnce({
                schedule: {
                    id: 'schedule_1'
                },
                currentPhase,
                nextPhase
            }).mockResolvedValueOnce({
                schedule: {
                    id: 'schedule_1'
                },
                currentPhase: (0, _mockbuildersutil.buildSchedulePhase)({
                    licensedPriceId: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                    resourceCreditPriceId: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                    seats: 1
                }),
                nextPhase
            });
            (0, _mockbuildersutil.arrangeBillingSubscriptionPhaseServiceToPhaseUpdateParams)(billingSubscriptionPhaseService, {
                items: currentPhase.items
            });
            await service.updateSubscription('ws_1', 'sub_db_1', {
                type: _billingsubscriptionupdatetype.SubscriptionUpdateType.SEATS,
                newSeats: 1
            });
            expect(stripeSubscriptionService.updateSubscription).toHaveBeenCalledWith('sub_1', {
                items: [
                    {
                        id: 'si_licensed',
                        price: _priceconstants.LICENSE_PRICE_PRO_MONTH_ID,
                        quantity: 1
                    },
                    {
                        id: 'si_resource_credit',
                        price: _priceconstants.METER_PRICE_PRO_MONTH_ID,
                        quantity: 1
                    }
                ],
                proration_behavior: 'create_prorations'
            });
            expect(stripeSubscriptionScheduleService.updateSchedule).toHaveBeenCalledWith('schedule_1', {
                phases: [
                    expect.objectContaining({
                        items: currentPhase.items
                    }),
                    expect.objectContaining({
                        items: [
                            {
                                price: _priceconstants.LICENSE_PRICE_PRO_YEAR_ID,
                                quantity: 1
                            },
                            {
                                price: _priceconstants.METER_PRICE_PRO_YEAR_ID,
                                quantity: 1
                            }
                        ]
                    })
                ]
            });
            expect(billingSubscriptionService.syncSubscriptionToDatabase).toHaveBeenCalled();
        });
    });
});

//# sourceMappingURL=billing-subscription-update.service.spec.js.map