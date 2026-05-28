/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformStripeSubscriptionScheduleEventToDatabaseSubscriptionPhase", {
    enumerable: true,
    get: function() {
        return transformStripeSubscriptionScheduleEventToDatabaseSubscriptionPhase;
    }
});
const _utils = require("twenty-shared/utils");
function transformStripeSubscriptionScheduleEventToDatabaseSubscriptionPhase(schedule) {
    return schedule.phases.slice(-2).map((phase)=>({
            start_date: phase.start_date,
            end_date: phase.end_date,
            items: phase.items.map((item)=>({
                    price: typeof item.price === 'string' ? item.price : item.price.id,
                    ...(0, _utils.isDefined)(item.quantity) ? {
                        quantity: item.quantity
                    } : {}
                }))
        }));
}

//# sourceMappingURL=transform-stripe-subscription-schedule-event-to-database-subscription-phase.util.js.map