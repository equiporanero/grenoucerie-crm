/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "StripeModule", {
    enumerable: true,
    get: function() {
        return StripeModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _stripebillingmetereventservice = require("./services/stripe-billing-meter-event.service");
const _stripebillingmeterservice = require("./services/stripe-billing-meter.service");
const _stripebillingportalservice = require("./services/stripe-billing-portal.service");
const _stripecheckoutservice = require("./services/stripe-checkout.service");
const _stripecustomerservice = require("./services/stripe-customer.service");
const _stripepriceservice = require("./services/stripe-price.service");
const _stripeproductservice = require("./services/stripe-product.service");
const _stripesubscriptionitemservice = require("./services/stripe-subscription-item.service");
const _stripesubscriptionscheduleservice = require("./services/stripe-subscription-schedule.service");
const _stripesubscriptionservice = require("./services/stripe-subscription.service");
const _stripewebhookservice = require("./services/stripe-webhook.service");
const _stripecreditgrantservice = require("./services/stripe-credit-grant.service");
const _stripeinvoiceservice = require("./services/stripe-invoice.service");
const _stripesdkmodule = require("./stripe-sdk/stripe-sdk.module");
const _billingcustomerentity = require("../entities/billing-customer.entity");
const _domainserverconfigmodule = require("../../domain/domain-server-config/domain-server-config.module");
const _provideworkspacescopedrepository = require("../../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let StripeModule = class StripeModule {
};
StripeModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _domainserverconfigmodule.DomainServerConfigModule,
            _stripesdkmodule.StripeSDKModule,
            _typeorm.TypeOrmModule.forFeature([
                _billingcustomerentity.BillingCustomerEntity
            ])
        ],
        providers: [
            _stripesubscriptionitemservice.StripeSubscriptionItemService,
            _stripewebhookservice.StripeWebhookService,
            _stripecheckoutservice.StripeCheckoutService,
            _stripesubscriptionservice.StripeSubscriptionService,
            _stripesubscriptionscheduleservice.StripeSubscriptionScheduleService,
            _stripebillingportalservice.StripeBillingPortalService,
            _stripebillingmeterservice.StripeBillingMeterService,
            _stripecustomerservice.StripeCustomerService,
            _stripepriceservice.StripePriceService,
            _stripeproductservice.StripeProductService,
            _stripebillingmetereventservice.StripeBillingMeterEventService,
            _stripecreditgrantservice.StripeCreditGrantService,
            _stripeinvoiceservice.StripeInvoiceService,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_billingcustomerentity.BillingCustomerEntity)
        ],
        exports: [
            _stripewebhookservice.StripeWebhookService,
            _stripebillingportalservice.StripeBillingPortalService,
            _stripebillingmeterservice.StripeBillingMeterService,
            _stripecustomerservice.StripeCustomerService,
            _stripepriceservice.StripePriceService,
            _stripecheckoutservice.StripeCheckoutService,
            _stripesubscriptionitemservice.StripeSubscriptionItemService,
            _stripesubscriptionservice.StripeSubscriptionService,
            _stripeproductservice.StripeProductService,
            _stripebillingmetereventservice.StripeBillingMeterEventService,
            _stripesubscriptionscheduleservice.StripeSubscriptionScheduleService,
            _stripecreditgrantservice.StripeCreditGrantService,
            _stripeinvoiceservice.StripeInvoiceService
        ]
    })
], StripeModule);

//# sourceMappingURL=stripe.module.js.map