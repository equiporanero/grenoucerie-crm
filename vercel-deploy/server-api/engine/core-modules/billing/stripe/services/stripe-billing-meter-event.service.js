/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "StripeBillingMeterEventService", {
    enumerable: true,
    get: function() {
        return StripeBillingMeterEventService;
    }
});
const _common = require("@nestjs/common");
const _stripebillingmetereventnameconstant = require("../constants/stripe-billing-meter-event-name.constant");
const _stripesdkservice = require("../stripe-sdk/services/stripe-sdk.service");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let StripeBillingMeterEventService = class StripeBillingMeterEventService {
    async sendBillingMeterEvent({ usageEvent, stripeCustomerId }) {
        const payload = {
            value: usageEvent.creditsUsedMicro.toString(),
            stripe_customer_id: stripeCustomerId,
            execution_type: usageEvent.operationType.toLowerCase()
        };
        if (usageEvent.resourceId) {
            payload.resource_id = usageEvent.resourceId;
        }
        if (usageEvent.resourceContext) {
            payload.execution_context_1 = usageEvent.resourceContext;
        }
        await this.stripe.billing.meterEvents.create({
            event_name: _stripebillingmetereventnameconstant.STRIPE_BILLING_METER_EVENT_NAME,
            payload
        });
    }
    async sumMeterEvents(stripeMeterId, stripeCustomerId, startTime, endTime) {
        const eventSummaries = await this.stripe.billing.meters.listEventSummaries(stripeMeterId, {
            customer: stripeCustomerId,
            start_time: Math.floor(startTime.getTime() / (1000 * 60)) * 60,
            end_time: Math.ceil(endTime.getTime() / (1000 * 60)) * 60
        });
        return eventSummaries.data.reduce((acc, eventSummary)=>{
            return acc + eventSummary.aggregated_value;
        }, 0);
    }
    async getTotalCumulativeUsage(stripeMeterId, stripeCustomerId) {
        const startTime = this.getMinimumMeterStartTime();
        const endTime = new Date();
        return this.sumMeterEvents(stripeMeterId, stripeCustomerId, startTime, endTime);
    }
    async getCumulativeUsageAtTime(stripeMeterId, stripeCustomerId, atTime) {
        const startTime = this.getMinimumMeterStartTime();
        return this.sumMeterEvents(stripeMeterId, stripeCustomerId, startTime, atTime);
    }
    /**
   * Returns a reasonable minimum start time for meter queries.
   * Stripe's billing meters API doesn't accept timestamps from 1970 (epoch).
   * Using 2020-01-01 as a safe minimum since Stripe Billing Meters is a recent feature.
   */ getMinimumMeterStartTime() {
        return new Date('2020-01-01T00:00:00Z');
    }
    constructor(twentyConfigService, stripeSDKService){
        this.twentyConfigService = twentyConfigService;
        this.stripeSDKService = stripeSDKService;
        this.logger = new _common.Logger(StripeBillingMeterEventService.name);
        if (!this.twentyConfigService.get('IS_BILLING_ENABLED')) {
            return;
        }
        this.stripe = this.stripeSDKService.getStripe(this.twentyConfigService.get('BILLING_STRIPE_API_KEY'));
    }
};
StripeBillingMeterEventService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _stripesdkservice.StripeSDKService === "undefined" ? Object : _stripesdkservice.StripeSDKService
    ])
], StripeBillingMeterEventService);

//# sourceMappingURL=stripe-billing-meter-event.service.js.map