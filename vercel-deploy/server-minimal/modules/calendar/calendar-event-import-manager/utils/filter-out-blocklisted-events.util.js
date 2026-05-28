"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "filterOutBlocklistedEvents", {
    enumerable: true,
    get: function() {
        return filterOutBlocklistedEvents;
    }
});
const _isemailblocklistedutil = require("../../../blocklist/utils/is-email-blocklisted.util");
const filterOutBlocklistedEvents = (calendarChannelHandles, events, blocklist)=>{
    return events.filter((event)=>{
        if (!event.participants) {
            return true;
        }
        return event.participants.every((attendee)=>!(0, _isemailblocklistedutil.isEmailBlocklisted)(calendarChannelHandles, attendee.handle, blocklist));
    });
};

//# sourceMappingURL=filter-out-blocklisted-events.util.js.map