/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "StripeSubscriptionScheduleService", {
    enumerable: true,
    get: function() {
        return StripeSubscriptionScheduleService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _billingexception = require("../../billing.exception");
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
let StripeSubscriptionScheduleService = class StripeSubscriptionScheduleService {
    getPhases(subscriptionSchedule) {
        const now = Math.floor(Date.now() / 1000);
        const currentPhase = (0, _utils.findOrThrow)(subscriptionSchedule.phases, (p)=>{
            const s = p.start_date ?? 0;
            const e = p.end_date ?? Infinity;
            return s <= now && now < e;
        }, new _billingexception.BillingException(`Subscription must have at least 1 current phase`, _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_PHASE_NOT_FOUND));
        const nextPhase = (subscriptionSchedule.phases || []).filter((p)=>(p.start_date ?? 0) > now).sort((a, b)=>(a.start_date ?? 0) - (b.start_date ?? 0))[0];
        return {
            currentPhase,
            nextPhase
        };
    }
    async getSubscriptionWithSchedule(stripeSubscriptionId) {
        return await this.stripe.subscriptions.retrieve(stripeSubscriptionId, {
            expand: [
                'schedule'
            ]
        });
    }
    async updateSchedule(scheduleId, params) {
        if (!this.stripe) throw new Error('Billing is disabled');
        return await this.stripe.subscriptionSchedules.update(scheduleId, {
            ...params,
            proration_behavior: 'none'
        });
    }
    async createSubscriptionSchedule(stripeSubscriptionId) {
        if (!this.stripe) throw new Error('Billing is disabled');
        const schedule = await this.stripe.subscriptionSchedules.create({
            from_subscription: stripeSubscriptionId
        });
        const currentPhase = this.getPhases(schedule).currentPhase;
        return {
            schedule,
            currentPhase
        };
    }
    async loadSubscriptionSchedule(stripeSubscriptionId) {
        const subscriptionWithSchedule = await this.getSubscriptionWithSchedule(stripeSubscriptionId);
        if (!(0, _utils.isDefined)(subscriptionWithSchedule.schedule)) {
            return {};
        }
        const { currentPhase, nextPhase } = this.getPhases(subscriptionWithSchedule.schedule);
        if (!(0, _utils.isDefined)(nextPhase)) {
            await this.releaseSubscriptionSchedule(subscriptionWithSchedule.schedule.id);
            return {};
        }
        return {
            schedule: subscriptionWithSchedule.schedule,
            currentPhase,
            nextPhase
        };
    }
    releaseSubscriptionSchedule(scheduleId) {
        if (!this.stripe) throw new Error('Billing is disabled');
        return this.stripe.subscriptionSchedules.release(scheduleId);
    }
    constructor(twentyConfigService, stripeSDKService){
        this.twentyConfigService = twentyConfigService;
        this.stripeSDKService = stripeSDKService;
        this.logger = new _common.Logger(StripeSubscriptionScheduleService.name);
        if (!this.twentyConfigService.get('IS_BILLING_ENABLED')) {
            return;
        }
        this.stripe = this.stripeSDKService.getStripe(this.twentyConfigService.get('BILLING_STRIPE_API_KEY'));
    }
};
StripeSubscriptionScheduleService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _stripesdkservice.StripeSDKService === "undefined" ? Object : _stripesdkservice.StripeSDKService
    ])
], StripeSubscriptionScheduleService);

//# sourceMappingURL=stripe-subscription-schedule.service.js.map