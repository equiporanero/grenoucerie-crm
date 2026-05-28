"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "filterEventsAndReturnCancelledEvents", {
    enumerable: true,
    get: function() {
        return filterEventsAndReturnCancelledEvents;
    }
});
const _filteroutblocklistedeventsutil = require("./filter-out-blocklisted-events.util");
const filterEventsAndReturnCancelledEvents = (calendarChannelHandles, events, blocklist)=>{
    const filteredEvents = (0, _filteroutblocklistedeventsutil.filterOutBlocklistedEvents)(calendarChannelHandles, events, blocklist);
    return filteredEvents.reduce((acc, event)=>{
        if (event.isCanceled) {
            acc.cancelledEvents.push(event);
        } else {
            acc.filteredEvents.push(event);
        }
        return acc;
    }, {
        filteredEvents: [],
        cancelledEvents: []
    });
};

//# sourceMappingURL=filter-events.util.js.map