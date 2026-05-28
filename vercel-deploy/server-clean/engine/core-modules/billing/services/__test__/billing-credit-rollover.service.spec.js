/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _billingcustomerentity = require("../../entities/billing-customer.entity");
const _billingcreditrolloverservice = require("../billing-credit-rollover.service");
const _billingusageservice = require("../billing-usage.service");
const _getworkspacescopedrepositorytokenutil = require("../../../../twenty-orm/workspace-scoped-repository/get-workspace-scoped-repository-token.util");
describe('BillingCreditRolloverService', ()=>{
    let service;
    let billingUsageService;
    let billingCustomerRepository;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _billingcreditrolloverservice.BillingCreditRolloverService,
                {
                    provide: _billingusageservice.BillingUsageService,
                    useValue: {
                        getCurrentPeriodCreditsUsed: jest.fn().mockResolvedValue(0)
                    }
                },
                {
                    provide: (0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(_billingcustomerentity.BillingCustomerEntity),
                    useValue: {
                        update: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_billingcreditrolloverservice.BillingCreditRolloverService);
        billingUsageService = module.get(_billingusageservice.BillingUsageService);
        billingCustomerRepository = module.get((0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(_billingcustomerentity.BillingCustomerEntity));
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    describe('processRolloverOnPeriodTransition', ()=>{
        const baseParams = {
            workspaceId: 'ws_123',
            stripeCustomerId: 'cus_123',
            tierQuantity: 1000,
            previousPeriodStart: new Date('2024-01-01')
        };
        it('writes rollover amount to creditBalanceMicro when credits unused', async ()=>{
            billingUsageService.getCurrentPeriodCreditsUsed.mockResolvedValue(300);
            await service.processRolloverOnPeriodTransition(baseParams);
            expect(billingCustomerRepository.update).toHaveBeenCalledWith('ws_123', {
                stripeCustomerId: 'cus_123'
            }, {
                creditBalanceMicro: 700
            });
        });
        it('sets creditBalanceMicro to tierQuantity when no credits used', async ()=>{
            billingUsageService.getCurrentPeriodCreditsUsed.mockResolvedValue(0);
            await service.processRolloverOnPeriodTransition(baseParams);
            expect(billingCustomerRepository.update).toHaveBeenCalledWith('ws_123', {
                stripeCustomerId: 'cus_123'
            }, {
                creditBalanceMicro: 1000
            });
        });
        it('sets creditBalanceMicro to 0 when all credits used', async ()=>{
            billingUsageService.getCurrentPeriodCreditsUsed.mockResolvedValue(1000);
            await service.processRolloverOnPeriodTransition(baseParams);
            expect(billingCustomerRepository.update).toHaveBeenCalledWith('ws_123', {
                stripeCustomerId: 'cus_123'
            }, {
                creditBalanceMicro: 0
            });
        });
        it('sets creditBalanceMicro to 0 when usage exceeds tier', async ()=>{
            billingUsageService.getCurrentPeriodCreditsUsed.mockResolvedValue(1500);
            await service.processRolloverOnPeriodTransition(baseParams);
            expect(billingCustomerRepository.update).toHaveBeenCalledWith('ws_123', {
                stripeCustomerId: 'cus_123'
            }, {
                creditBalanceMicro: 0
            });
        });
        it('caps rollover at tierQuantity', async ()=>{
            billingUsageService.getCurrentPeriodCreditsUsed.mockResolvedValue(0);
            const params = {
                ...baseParams,
                tierQuantity: 500
            };
            await service.processRolloverOnPeriodTransition(params);
            expect(billingCustomerRepository.update).toHaveBeenCalledWith('ws_123', {
                stripeCustomerId: 'cus_123'
            }, {
                creditBalanceMicro: 500
            });
        });
    });
});

//# sourceMappingURL=billing-credit-rollover.service.spec.js.map