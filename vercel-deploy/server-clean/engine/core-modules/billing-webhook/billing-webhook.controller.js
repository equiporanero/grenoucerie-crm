/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingWebhookController", {
    enumerable: true,
    get: function() {
        return BillingWebhookController;
    }
});
const _common = require("@nestjs/common");
const _stripe = /*#__PURE__*/ _interop_require_default(require("stripe"));
const _billingwebhookcustomerservice = require("./services/billing-webhook-customer.service");
const _billingwebhookentitlementservice = require("./services/billing-webhook-entitlement.service");
const _billingwebhookinvoiceservice = require("./services/billing-webhook-invoice.service");
const _billingwebhookpriceservice = require("./services/billing-webhook-price.service");
const _billingwebhookproductservice = require("./services/billing-webhook-product.service");
const _billingwebhooksubscriptionscheduleservice = require("./services/billing-webhook-subscription-schedule.service");
const _billingwebhooksubscriptionservice = require("./services/billing-webhook-subscription.service");
const _billingexception = require("../billing/billing.exception");
const _billingwebhookeventsenum = require("../billing/enums/billing-webhook-events.enum");
const _billingapiexceptionfilter = require("../billing/filters/billing-api-exception.filter");
const _billingsubscriptionservice = require("../billing/services/billing-subscription.service");
const _stripewebhookservice = require("../billing/stripe/services/stripe-webhook.service");
const _nopermissionguard = require("../../guards/no-permission.guard");
const _publicendpointguard = require("../../guards/public-endpoint.guard");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
let BillingWebhookController = class BillingWebhookController {
    async handleWebhooks(signature, req, res) {
        if (!req.rawBody) {
            throw new _billingexception.BillingException('Missing request body', _billingexception.BillingExceptionCode.BILLING_MISSING_REQUEST_BODY);
        }
        try {
            const event = this.stripeWebhookService.constructEventFromPayload(signature, req.rawBody);
            const result = await this.handleStripeEvent(event);
            res.status(200).send(result).end();
        } catch (error) {
            if (error instanceof _billingexception.BillingException || error instanceof _stripe.default.errors.StripeError) {
                throw error;
            }
            const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
            throw new _billingexception.BillingException(errorMessage, _billingexception.BillingExceptionCode.BILLING_UNHANDLED_ERROR);
        }
    }
    async handleStripeEvent(event) {
        switch(event.type){
            case _billingwebhookeventsenum.BillingWebhookEvent.SETUP_INTENT_SUCCEEDED:
                return await this.billingSubscriptionService.handleUnpaidInvoices(event.data);
            case _billingwebhookeventsenum.BillingWebhookEvent.PRICE_UPDATED:
            case _billingwebhookeventsenum.BillingWebhookEvent.PRICE_CREATED:
                return await this.billingWebhookPriceService.processStripeEvent(event.data);
            case _billingwebhookeventsenum.BillingWebhookEvent.SUBSCRIPTION_SCHEDULE_UPDATED:
                return await this.billingWebhookSubscriptionScheduleService.processStripeEvent(event.data);
            case _billingwebhookeventsenum.BillingWebhookEvent.PRODUCT_UPDATED:
            case _billingwebhookeventsenum.BillingWebhookEvent.PRODUCT_CREATED:
                return await this.billingWebhookProductService.processStripeEvent(event.data);
            case _billingwebhookeventsenum.BillingWebhookEvent.CUSTOMER_ACTIVE_ENTITLEMENT_SUMMARY_UPDATED:
                return await this.billingWebhookEntitlementService.processStripeEvent(event.data);
            case _billingwebhookeventsenum.BillingWebhookEvent.INVOICE_FINALIZED:
            case _billingwebhookeventsenum.BillingWebhookEvent.INVOICE_PAID:
                return await this.billingWebhookInvoiceService.processStripeEvent(event);
            case _billingwebhookeventsenum.BillingWebhookEvent.CUSTOMER_CREATED:
                return await this.billingWebhookCustomerService.processStripeEvent(event.data);
            case _billingwebhookeventsenum.BillingWebhookEvent.CUSTOMER_SUBSCRIPTION_CREATED:
            case _billingwebhookeventsenum.BillingWebhookEvent.CUSTOMER_SUBSCRIPTION_UPDATED:
            case _billingwebhookeventsenum.BillingWebhookEvent.CUSTOMER_SUBSCRIPTION_DELETED:
                {
                    const workspaceId = event.data.object.metadata?.workspaceId;
                    if (!workspaceId) {
                        throw new _billingexception.BillingException('Workspace ID is required for subscription events', _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_EVENT_WORKSPACE_NOT_FOUND);
                    }
                    return await this.billingWebhookSubscriptionService.processStripeEvent(workspaceId, event);
                }
            default:
                return {};
        }
    }
    constructor(stripeWebhookService, billingWebhookSubscriptionService, billingWebhookEntitlementService, billingSubscriptionService, billingWebhookProductService, billingWebhookPriceService, billingWebhookInvoiceService, billingWebhookCustomerService, billingWebhookSubscriptionScheduleService){
        this.stripeWebhookService = stripeWebhookService;
        this.billingWebhookSubscriptionService = billingWebhookSubscriptionService;
        this.billingWebhookEntitlementService = billingWebhookEntitlementService;
        this.billingSubscriptionService = billingSubscriptionService;
        this.billingWebhookProductService = billingWebhookProductService;
        this.billingWebhookPriceService = billingWebhookPriceService;
        this.billingWebhookInvoiceService = billingWebhookInvoiceService;
        this.billingWebhookCustomerService = billingWebhookCustomerService;
        this.billingWebhookSubscriptionScheduleService = billingWebhookSubscriptionScheduleService;
        this.logger = new _common.Logger(BillingWebhookController.name);
    }
};
_ts_decorate([
    (0, _common.Post)([
        'webhooks/stripe'
    ]),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Headers)('stripe-signature')),
    _ts_param(1, (0, _common.Req)()),
    _ts_param(2, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof RawBodyRequest === "undefined" ? Object : RawBodyRequest,
        typeof Response === "undefined" ? Object : Response
    ]),
    _ts_metadata("design:returntype", Promise)
], BillingWebhookController.prototype, "handleWebhooks", null);
BillingWebhookController = _ts_decorate([
    (0, _common.Controller)(),
    (0, _common.UseFilters)(_billingapiexceptionfilter.BillingRestApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _stripewebhookservice.StripeWebhookService === "undefined" ? Object : _stripewebhookservice.StripeWebhookService,
        typeof _billingwebhooksubscriptionservice.BillingWebhookSubscriptionService === "undefined" ? Object : _billingwebhooksubscriptionservice.BillingWebhookSubscriptionService,
        typeof _billingwebhookentitlementservice.BillingWebhookEntitlementService === "undefined" ? Object : _billingwebhookentitlementservice.BillingWebhookEntitlementService,
        typeof _billingsubscriptionservice.BillingSubscriptionService === "undefined" ? Object : _billingsubscriptionservice.BillingSubscriptionService,
        typeof _billingwebhookproductservice.BillingWebhookProductService === "undefined" ? Object : _billingwebhookproductservice.BillingWebhookProductService,
        typeof _billingwebhookpriceservice.BillingWebhookPriceService === "undefined" ? Object : _billingwebhookpriceservice.BillingWebhookPriceService,
        typeof _billingwebhookinvoiceservice.BillingWebhookInvoiceService === "undefined" ? Object : _billingwebhookinvoiceservice.BillingWebhookInvoiceService,
        typeof _billingwebhookcustomerservice.BillingWebhookCustomerService === "undefined" ? Object : _billingwebhookcustomerservice.BillingWebhookCustomerService,
        typeof _billingwebhooksubscriptionscheduleservice.BillingWebhookSubscriptionScheduleService === "undefined" ? Object : _billingwebhooksubscriptionscheduleservice.BillingWebhookSubscriptionScheduleService
    ])
], BillingWebhookController);

//# sourceMappingURL=billing-webhook.controller.js.map