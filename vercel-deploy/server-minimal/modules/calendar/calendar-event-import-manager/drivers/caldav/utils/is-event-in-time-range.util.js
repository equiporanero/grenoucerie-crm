"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isEventInTimeRange", {
    enumerable: true,
    get: function() {
        return isEventInTimeRange;
    }
});
const _guards = require("@sniptt/guards");
const isEventInTimeRange = (event, windowStart, windowEnd)=>{
    if (!(0, _guards.isNonEmptyString)(event.startsAt) || !(0, _guards.isNonEmptyString)(event.endsAt)) return false;
    const eventStart = new Date(event.startsAt);
    const eventEnd = new Date(event.endsAt);
    return eventStart < windowEnd && eventEnd > windowStart;
};

//# sourceMappingURL=is-event-in-time-range.util.js.map