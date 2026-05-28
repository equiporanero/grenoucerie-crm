/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingPortalWorkspaceService", {
    enumerable: true,
    get: function() {
        return BillingPortalWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _billingexception = require("../billing.exception");
const _billingcustomerentity = require("../entities/billing-customer.entity");
const _billingsubscriptionentity = require("../entities/billing-subscription.entity");
const _billingproductkeyenum = require("../enums/billing-product-key.enum");
const _billingsubscriptionstatusenum = require("../enums/billing-subscription-status.enum");
const _billingsubscriptionservice = require("./billing-subscription.service");
const _stripebillingportalservice = require("../stripe/services/stripe-billing-portal.service");
const _stripecheckoutservice = require("../stripe/services/stripe-checkout.service");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _userworkspaceentity = require("../../user-workspace/user-workspace.entity");
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
let BillingPortalWorkspaceService = class BillingPortalWorkspaceService {
    async computeCheckoutSessionURL({ user, workspace, billingPricesPerPlan, successUrlPath, plan, requirePaymentMethod }) {
        const { successUrl, cancelUrl, customer, stripeSubscriptionLineItems } = await this.prepareSubscriptionParameters({
            workspace,
            billingPricesPerPlan,
            successUrlPath
        });
        const checkoutSession = await this.stripeCheckoutService.createCheckoutSession({
            user,
            workspace,
            stripeSubscriptionLineItems,
            successUrl,
            cancelUrl,
            stripeCustomerId: customer?.stripeCustomerId,
            plan,
            requirePaymentMethod,
            withTrialPeriod: !(0, _utils.isDefined)(customer) || customer.billingSubscriptions.length === 0
        });
        (0, _utils.assertIsDefinedOrThrow)(checkoutSession.url, new _billingexception.BillingException('Error: missing checkout.session.url', _billingexception.BillingExceptionCode.BILLING_STRIPE_ERROR));
        return checkoutSession.url;
    }
    async createDirectSubscription({ user, workspace, billingPricesPerPlan, successUrlPath, plan, requirePaymentMethod }) {
        const { successUrl, customer, stripeSubscriptionLineItems } = await this.prepareSubscriptionParameters({
            workspace,
            billingPricesPerPlan,
            successUrlPath
        });
        if ((0, _utils.isNonEmptyArray)(customer?.billingSubscriptions) && customer.billingSubscriptions.some((subscription)=>subscription.status !== _billingsubscriptionstatusenum.SubscriptionStatus.Canceled)) {
            throw new _billingexception.BillingException('Customer already has a non-canceled billing subscription', _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_INVALID);
        }
        const stripeSubscription = await this.stripeCheckoutService.createDirectSubscription({
            user,
            workspace,
            stripeSubscriptionLineItems,
            stripeCustomerId: customer?.stripeCustomerId,
            plan,
            requirePaymentMethod,
            withTrialPeriod: !(0, _utils.isDefined)(customer) || customer.billingSubscriptions.length === 0
        });
        await this.billingSubscriptionService.syncSubscriptionToDatabase(workspace.id, stripeSubscription.id);
        return successUrl;
    }
    async prepareSubscriptionParameters({ workspace, billingPricesPerPlan, successUrlPath }) {
        const frontBaseUrl = this.workspaceDomainsService.buildWorkspaceURL({
            workspace
        });
        const cancelUrl = frontBaseUrl.toString();
        if (successUrlPath) {
            frontBaseUrl.pathname = successUrlPath;
        }
        const successUrl = frontBaseUrl.toString();
        const quantity = await this.userWorkspaceRepository.countBy({
            workspaceId: workspace.id
        });
        const customer = await this.billingCustomerRepository.findOne(workspace.id, {
            where: {},
            relations: [
                'billingSubscriptions'
            ]
        });
        const stripeSubscriptionLineItems = this.getStripeSubscriptionLineItems({
            quantity,
            billingPricesPerPlan,
            workspaceId: workspace.id
        });
        return {
            successUrl,
            cancelUrl,
            quantity,
            customer,
            stripeSubscriptionLineItems
        };
    }
    async computeBillingPortalSessionURLOrThrow(workspace, returnUrlPath) {
        const lastSubscription = await this.billingSubscriptionRepository.findOne(workspace.id, {
            where: {
                status: (0, _typeorm1.Not)(_billingsubscriptionstatusenum.SubscriptionStatus.Canceled)
            },
            order: {
                createdAt: 'DESC'
            }
        });
        if (!lastSubscription) {
            throw new Error('Error: missing subscription');
        }
        const stripeCustomerId = lastSubscription.stripeCustomerId;
        if (!stripeCustomerId) {
            throw new Error('Error: missing stripeCustomerId');
        }
        const frontBaseUrl = this.workspaceDomainsService.buildWorkspaceURL({
            workspace
        });
        if (returnUrlPath) {
            frontBaseUrl.pathname = returnUrlPath;
        }
        const returnUrl = frontBaseUrl.toString();
        const session = await this.stripeBillingPortalService.createBillingPortalSession(stripeCustomerId, returnUrl);
        (0, _utils.assertIsDefinedOrThrow)(session.url, new _billingexception.BillingException('Error: missing billingPortal.session.url', _billingexception.BillingExceptionCode.BILLING_STRIPE_ERROR));
        return session.url;
    }
    async computeBillingPortalSessionURLForPaymentMethodUpdate(workspace, stripeCustomerId, returnUrlPath) {
        const frontBaseUrl = this.workspaceDomainsService.buildWorkspaceURL({
            workspace
        });
        if (returnUrlPath) {
            frontBaseUrl.pathname = returnUrlPath;
        }
        const returnUrl = frontBaseUrl.toString();
        const session = await this.stripeBillingPortalService.createBillingPortalSessionForPaymentMethodUpdate(stripeCustomerId, returnUrl);
        (0, _utils.assertIsDefinedOrThrow)(session.url, new _billingexception.BillingException('Error: missing billingPortal.session.url', _billingexception.BillingExceptionCode.BILLING_STRIPE_ERROR));
        return session.url;
    }
    getDefaultResourceCreditPrice(billingPricesPerPlan) {
        const resourceCreditPrices = billingPricesPerPlan.resourceCreditProductPrices;
        if (!(0, _utils.isDefined)(resourceCreditPrices) || resourceCreditPrices.length === 0) {
            throw new _billingexception.BillingException('Missing Default RESOURCE_CREDIT price', _billingexception.BillingExceptionCode.BILLING_PRICE_NOT_FOUND);
        }
        return resourceCreditPrices.reduce((lowest, price)=>{
            const amount = Number(price.metadata?.credit_amount ?? 0);
            const lowestAmount = Number(lowest.metadata?.credit_amount ?? 0);
            return amount < lowestAmount ? price : lowest;
        });
    }
    getStripeSubscriptionLineItems({ quantity, billingPricesPerPlan }) {
        const defaultBaseProductPrice = (0, _utils.findOrThrow)(billingPricesPerPlan.baseProductPrices, (baseProductPrice)=>baseProductPrice.billingProduct?.metadata.productKey === _billingproductkeyenum.BillingProductKey.BASE_PRODUCT, new _billingexception.BillingException(`Base product not found`, _billingexception.BillingExceptionCode.BILLING_PRICE_NOT_FOUND));
        const defaultResourceCreditPrice = this.getDefaultResourceCreditPrice(billingPricesPerPlan);
        return [
            {
                price: defaultBaseProductPrice.stripePriceId,
                quantity
            },
            {
                price: defaultResourceCreditPrice.stripePriceId,
                quantity: 1
            }
        ];
    }
    constructor(stripeCheckoutService, stripeBillingPortalService, workspaceDomainsService, billingSubscriptionService, billingSubscriptionRepository, billingCustomerRepository, userWorkspaceRepository){
        this.stripeCheckoutService = stripeCheckoutService;
        this.stripeBillingPortalService = stripeBillingPortalService;
        this.workspaceDomainsService = workspaceDomainsService;
        this.billingSubscriptionService = billingSubscriptionService;
        this.billingSubscriptionRepository = billingSubscriptionRepository;
        this.billingCustomerRepository = billingCustomerRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.logger = new _common.Logger(BillingPortalWorkspaceService.name);
    }
};
BillingPortalWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(4, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_billingsubscriptionentity.BillingSubscriptionEntity)),
    _ts_param(5, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_billingcustomerentity.BillingCustomerEntity)),
    _ts_param(6, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _stripecheckoutservice.StripeCheckoutService === "undefined" ? Object : _stripecheckoutservice.StripeCheckoutService,
        typeof _stripebillingportalservice.StripeBillingPortalService === "undefined" ? Object : _stripebillingportalservice.StripeBillingPortalService,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService,
        typeof _billingsubscriptionservice.BillingSubscriptionService === "undefined" ? Object : _billingsubscriptionservice.BillingSubscriptionService,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], BillingPortalWorkspaceService);

//# sourceMappingURL=billing-portal.workspace-service.js.map