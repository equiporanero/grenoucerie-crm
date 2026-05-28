"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingWebhookInvoiceService", {
    enumerable: true,
    get: function() {
        return BillingWebhookInvoiceService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _workspace = require("twenty-shared/workspace");
const _auditservice = require("../../audit/services/audit.service");
const _paymentreceived = require("../../audit/utils/events/workspace-event/billing/payment-received");
const _getsubscriptionidfrominvoiceutil = require("../utils/get-subscription-id-from-invoice.util");
const _billingexception = require("../../billing/billing.exception");
const _billingcustomerentity = require("../../billing/entities/billing-customer.entity");
const _billingsubscriptionitementity = require("../../billing/entities/billing-subscription-item.entity");
const _billingwebhookeventsenum = require("../../billing/enums/billing-webhook-events.enum");
const _billingcreditrolloverservice = require("../../billing/services/billing-credit-rollover.service");
const _billingsubscriptionservice = require("../../billing/services/billing-subscription.service");
const _resourcecreditservice = require("../../billing/services/resource-credit.service");
const _stripeinvoiceservice = require("../../billing/stripe/services/stripe-invoice.service");
const _workspaceentity = require("../../workspace/workspace.entity");
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
const SUBSCRIPTION_CYCLE_BILLING_REASON = 'subscription_cycle';
let BillingWebhookInvoiceService = class BillingWebhookInvoiceService {
    async processStripeEvent(event) {
        if (event.type === _billingwebhookeventsenum.BillingWebhookEvent.INVOICE_PAID) {
            return this.processInvoicePaid(event.data);
        }
        if (event.type === _billingwebhookeventsenum.BillingWebhookEvent.INVOICE_FINALIZED) {
            return this.processInvoiceFinalized(event.data);
        }
    }
    async processInvoiceFinalized(data) {
        const { billing_reason: billingReason, customer, period_start: periodStart, period_end: periodEnd } = data.object;
        const stripeSubscriptionId = (0, _getsubscriptionidfrominvoiceutil.getSubscriptionIdFromInvoice)(data.object);
        const stripeCustomerId = customer;
        if (!(0, _utils.isDefined)(stripeSubscriptionId) || billingReason !== SUBSCRIPTION_CYCLE_BILLING_REASON) {
            return;
        }
        await this.billingSubscriptionItemRepository.update({
            stripeSubscriptionId
        }, {
            hasReachedCurrentPeriodCap: false
        });
        if (!(0, _utils.isDefined)(stripeCustomerId) || !periodEnd) {
            return;
        }
        const subscription = await this.billingSubscriptionService.getCurrentBillingSubscription({
            stripeCustomerId
        });
        if (!(0, _utils.isDefined)(subscription)) {
            return;
        }
        const trialEnd = (0, _utils.isDefined)(subscription.trialEnd) ? Math.floor(subscription.trialEnd.getTime() / 1000) : undefined;
        const TRIAL_END_TOLERANCE_SECONDS = 60;
        const isFirstPeriodAfterTrial = (0, _utils.isDefined)(trialEnd) && (0, _utils.isDefined)(periodStart) && Math.abs(periodStart - trialEnd) <= TRIAL_END_TOLERANCE_SECONDS;
        if (periodStart && !isFirstPeriodAfterTrial) {
            await this.processRollover(subscription, new Date(periodStart * 1000));
        }
    }
    async processRollover(subscription, invoicedPeriodStart) {
        const params = await this.resourceCreditService.getResourceCreditRolloverParameters(subscription.workspaceId, subscription.id);
        if (!(0, _utils.isDefined)(params)) {
            return;
        }
        await this.billingCreditRolloverService.processRolloverOnPeriodTransition({
            workspaceId: subscription.workspaceId,
            stripeCustomerId: subscription.stripeCustomerId,
            tierQuantity: params.tierQuantity,
            previousPeriodStart: invoicedPeriodStart
        });
    }
    async processInvoicePaid(data) {
        const stripeSubscriptionId = (0, _getsubscriptionidfrominvoiceutil.getSubscriptionIdFromInvoice)(data.object);
        const stripeCustomerId = data.object.customer;
        const paidInvoicePeriodEnd = data.object.period_end;
        if (!(0, _utils.isDefined)(stripeSubscriptionId) || !(0, _utils.isDefined)(stripeCustomerId) || !(0, _utils.isDefined)(paidInvoicePeriodEnd)) {
            throw new _billingexception.BillingException('Invalid invoice paid event data', _billingexception.BillingExceptionCode.BILLING_STRIPE_ERROR);
        }
        // Paying a past-due invoice won't reactivate the subscription if Stripe
        // already generated a draft for the next period. Finalize it so Stripe
        // can collect payment and resume the subscription.
        await this.finalizePastDueDraftInvoicesAfterPaidInvoice(stripeSubscriptionId, paidInvoicePeriodEnd);
        const billingCustomer = await this.billingCustomerRepository.findOne({
            where: {
                stripeCustomerId
            }
        });
        if ((0, _utils.isDefined)(billingCustomer)) {
            await this.delaySuspendedWorkspaceCleanup(billingCustomer);
            await this.auditService.createContext({
                workspaceId: billingCustomer.workspaceId
            }).insertWorkspaceEvent(_paymentreceived.PAYMENT_RECEIVED_EVENT, {
                amountPaid: data.object.amount_paid
            });
        }
        return {
            stripeSubscriptionId
        };
    }
    async finalizePastDueDraftInvoicesAfterPaidInvoice(stripeSubscriptionId, paidInvoicePeriodEnd) {
        const draftInvoices = await this.stripeInvoiceService.listDraftInvoices(stripeSubscriptionId);
        const nowInSeconds = Date.now() / 1000;
        const pastDueDraftInvoices = draftInvoices.filter((invoice)=>(0, _utils.isDefined)(invoice.period_end) && invoice.period_end > paidInvoicePeriodEnd && invoice.period_end < nowInSeconds);
        for (const invoice of pastDueDraftInvoices){
            try {
                await this.stripeInvoiceService.finalizeInvoice(invoice.id);
            } catch (error) {
                throw new _billingexception.BillingException(`Failed to finalize draft invoice ${invoice.id}: ${error.message}`, _billingexception.BillingExceptionCode.BILLING_STRIPE_ERROR);
            }
        }
    }
    async delaySuspendedWorkspaceCleanup(billingCustomer) {
        const workspace = await this.workspaceRepository.findOne({
            where: {
                id: billingCustomer.workspaceId,
                activationStatus: _workspace.WorkspaceActivationStatus.SUSPENDED
            }
        });
        if (!(0, _utils.isDefined)(workspace)) {
            return;
        }
        await this.workspaceRepository.update(workspace.id, {
            suspendedAt: new Date()
        });
    }
    constructor(billingSubscriptionItemRepository, // Stripe webhook: workspace discovered from BillingCustomer by stripeCustomerId.
    // eslint-disable-next-line twenty/prefer-workspace-scoped-repository
    billingCustomerRepository, workspaceRepository, billingSubscriptionService, billingCreditRolloverService, resourceCreditService, stripeInvoiceService, auditService){
        this.billingSubscriptionItemRepository = billingSubscriptionItemRepository;
        this.billingCustomerRepository = billingCustomerRepository;
        this.workspaceRepository = workspaceRepository;
        this.billingSubscriptionService = billingSubscriptionService;
        this.billingCreditRolloverService = billingCreditRolloverService;
        this.resourceCreditService = resourceCreditService;
        this.stripeInvoiceService = stripeInvoiceService;
        this.auditService = auditService;
        this.logger = new _common.Logger(BillingWebhookInvoiceService.name);
    }
};
BillingWebhookInvoiceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_billingsubscriptionitementity.BillingSubscriptionItemEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_billingcustomerentity.BillingCustomerEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof _billingsubscriptionservice.BillingSubscriptionService === "undefined" ? Object : _billingsubscriptionservice.BillingSubscriptionService,
        typeof _billingcreditrolloverservice.BillingCreditRolloverService === "undefined" ? Object : _billingcreditrolloverservice.BillingCreditRolloverService,
        typeof _resourcecreditservice.ResourceCreditService === "undefined" ? Object : _resourcecreditservice.ResourceCreditService,
        typeof _stripeinvoiceservice.StripeInvoiceService === "undefined" ? Object : _stripeinvoiceservice.StripeInvoiceService,
        typeof _auditservice.AuditService === "undefined" ? Object : _auditservice.AuditService
    ])
], BillingWebhookInvoiceService);

//# sourceMappingURL=billing-webhook-invoice.service.js.map