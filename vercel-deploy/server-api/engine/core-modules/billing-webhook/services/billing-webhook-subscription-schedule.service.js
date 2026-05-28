/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingWebhookSubscriptionScheduleService", {
    enumerable: true,
    get: function() {
        return BillingWebhookSubscriptionScheduleService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _transformstripesubscriptionscheduleeventtodatabasesubscriptionphaseutil = require("../utils/transform-stripe-subscription-schedule-event-to-database-subscription-phase.util");
const _billingsubscriptionentity = require("../../billing/entities/billing-subscription.entity");
const _stripesubscriptionscheduleservice = require("../../billing/stripe/services/stripe-subscription-schedule.service");
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
let BillingWebhookSubscriptionScheduleService = class BillingWebhookSubscriptionScheduleService {
    async processStripeEvent(data) {
        const schedule = data.object;
        if ((0, _utils.isDefined)(schedule.released_subscription) && schedule.status === 'released') {
            await this.billingSubscriptionRepository.update({
                stripeSubscriptionId: schedule.released_subscription
            }, {
                phases: []
            });
            return {
                stripeSubscriptionId: schedule.released_subscription,
                phasesCount: 0,
                scheduleId: schedule.id
            };
        }
        if (!(0, _utils.isDefined)(schedule.subscription)) {
            throw new Error('Subscription is not defined');
        }
        const subscriptionId = typeof schedule.subscription === 'string' ? schedule.subscription : schedule.subscription.id;
        const subscriptionWithSchedule = await this.stripeSubscriptionScheduleService.getSubscriptionWithSchedule(subscriptionId);
        await this.billingSubscriptionRepository.update({
            stripeSubscriptionId: subscriptionWithSchedule.id
        }, {
            phases: (0, _transformstripesubscriptionscheduleeventtodatabasesubscriptionphaseutil.transformStripeSubscriptionScheduleEventToDatabaseSubscriptionPhase)(schedule)
        });
        return {
            stripeSubscriptionId: subscriptionWithSchedule.id,
            phasesCount: subscriptionWithSchedule.schedule?.phases?.length ?? 0,
            scheduleId: subscriptionWithSchedule.schedule?.id
        };
    }
    constructor(// Stripe webhook: subscription lookup by stripeSubscriptionId.
    // eslint-disable-next-line twenty/prefer-workspace-scoped-repository
    billingSubscriptionRepository, stripeSubscriptionScheduleService){
        this.billingSubscriptionRepository = billingSubscriptionRepository;
        this.stripeSubscriptionScheduleService = stripeSubscriptionScheduleService;
        this.logger = new _common.Logger(BillingWebhookSubscriptionScheduleService.name);
    }
};
BillingWebhookSubscriptionScheduleService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_billingsubscriptionentity.BillingSubscriptionEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _stripesubscriptionscheduleservice.StripeSubscriptionScheduleService === "undefined" ? Object : _stripesubscriptionscheduleservice.StripeSubscriptionScheduleService
    ])
], BillingWebhookSubscriptionScheduleService);

//# sourceMappingURL=billing-webhook-subscription-schedule.service.js.map