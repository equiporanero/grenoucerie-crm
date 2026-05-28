/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingWebhookCustomerService", {
    enumerable: true,
    get: function() {
        return BillingWebhookCustomerService;
    }
});
const _common = require("@nestjs/common");
const _billingexception = require("../../billing/billing.exception");
const _billingcustomerentity = require("../../billing/entities/billing-customer.entity");
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
let BillingWebhookCustomerService = class BillingWebhookCustomerService {
    async processStripeEvent(data) {
        const { id: stripeCustomerId, metadata } = data.object;
        const workspaceId = metadata?.workspaceId;
        if (!workspaceId) {
            throw new _billingexception.BillingException('Workspace ID is required for customer events', _billingexception.BillingExceptionCode.BILLING_CUSTOMER_EVENT_WORKSPACE_NOT_FOUND);
        }
        await this.billingCustomerRepository.upsert(workspaceId, {
            stripeCustomerId
        }, {
            conflictPaths: [
                'workspaceId'
            ],
            skipUpdateIfNoValuesChanged: true
        });
    }
    constructor(billingCustomerRepository){
        this.billingCustomerRepository = billingCustomerRepository;
        this.logger = new _common.Logger(BillingWebhookCustomerService.name);
    }
};
BillingWebhookCustomerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_billingcustomerentity.BillingCustomerEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository
    ])
], BillingWebhookCustomerService);

//# sourceMappingURL=billing-webhook-customer.service.js.map