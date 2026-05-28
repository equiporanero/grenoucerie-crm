"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractAttendeesFromEvent", {
    enumerable: true,
    get: function() {
        return extractAttendeesFromEvent;
    }
});
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _mappartstattoresponsestatusutil = require("./map-partstat-to-response-status.util");
const extractAttendeesFromEvent = (event)=>{
    if (!(0, _utils.isDefined)(event.attendee)) return [];
    const attendees = Array.isArray(event.attendee) ? event.attendee : [
        event.attendee
    ];
    return attendees.map((attendee)=>{
        const rawValue = (0, _guards.isString)(attendee) ? attendee : attendee.val;
        const params = (0, _guards.isString)(attendee) ? undefined : attendee.params;
        const handle = rawValue.replace(/^mailto:/i, '');
        const partStat = params?.PARTSTAT ?? 'NEEDS_ACTION';
        return {
            displayName: params?.CN || handle || 'Unknown',
            responseStatus: (0, _mappartstattoresponsestatusutil.mapPartStatToResponseStatus)(partStat),
            handle,
            isOrganizer: false
        };
    });
};

//# sourceMappingURL=extract-attendees-from-event.util.js.map