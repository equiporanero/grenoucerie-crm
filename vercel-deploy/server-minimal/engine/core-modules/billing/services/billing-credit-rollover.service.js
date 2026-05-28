/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingCreditRolloverService", {
    enumerable: true,
    get: function() {
        return BillingCreditRolloverService;
    }
});
const _common = require("@nestjs/common");
const _billingcustomerentity = require("../entities/billing-customer.entity");
const _billingusageservice = require("./billing-usage.service");
const _injectworkspacescopedrepositorydecorator = require("../../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let BillingCreditRolloverService = class BillingCreditRolloverService {
    async processRolloverOnPeriodTransition({ workspaceId, stripeCustomerId, tierQuantity, previousPeriodStart }) {
        const usedCredits = await this.billingUsageService.getCurrentPeriodCreditsUsed(workspaceId, previousPeriodStart);
        const unusedCredits = Math.max(0, tierQuantity - usedCredits);
        const rolloverAmount = Math.min(unusedCredits, tierQuantity);
        await this.billingCustomerRepository.update(workspaceId, {
            stripeCustomerId
        }, {
            creditBalanceMicro: rolloverAmount
        });
    }
    constructor(billingUsageService, billingCustomerRepository){
        this.billingUsageService = billingUsageService;
        this.billingCustomerRepository = billingCustomerRepository;
    }
};
BillingCreditRolloverService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_billingcustomerentity.BillingCustomerEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _billingusageservice.BillingUsageService === "undefined" ? Object : _billingusageservice.BillingUsageService,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository
    ])
], BillingCreditRolloverService);

//# sourceMappingURL=billing-credit-rollover.service.js.map