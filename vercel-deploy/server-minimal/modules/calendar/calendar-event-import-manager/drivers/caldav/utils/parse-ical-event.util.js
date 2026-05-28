"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseICalEvents", {
    enumerable: true,
    get: function() {
        return parseICalEvents;
    }
});
const _nodeical = /*#__PURE__*/ _interop_require_wildcard(require("node-ical"));
const _icalDataExtractPropertyValue = require("../lib/utils/icalDataExtractPropertyValue");
const _extractattendeesfromeventutil = require("./extract-attendees-from-event.util");
const _extractorganizerfromeventutil = require("./extract-organizer-from-event.util");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const parseICalEvents = (rawData, objectUrl)=>{
    try {
        const events = Object.values(_nodeical.parseICS(rawData)).filter((calendarComponent)=>calendarComponent.type === 'VEVENT').flatMap((event)=>[
                event,
                ...Object.values(event.recurrences ?? {})
            ]).filter((event)=>event.start instanceof Date && event.end instanceof Date);
        return events.map((event)=>{
            const organizer = (0, _extractorganizerfromeventutil.extractOrganizerFromEvent)(event);
            const attendees = (0, _extractattendeesfromeventutil.extractAttendeesFromEvent)(event);
            const recurrenceIso = event.recurrenceid instanceof Date ? event.recurrenceid.toISOString() : undefined;
            const createdIso = event.created?.toISOString() ?? new Date().toISOString();
            return {
                id: recurrenceIso ? `${objectUrl}#recurrence=${recurrenceIso}` : objectUrl,
                iCalUid: event.uid || '',
                title: (0, _icalDataExtractPropertyValue.icalDataExtractPropertyValue)(event.summary, 'Untitled Event'),
                description: (0, _icalDataExtractPropertyValue.icalDataExtractPropertyValue)(event.description),
                location: (0, _icalDataExtractPropertyValue.icalDataExtractPropertyValue)(event.location),
                startsAt: event.start.toISOString(),
                endsAt: event.end.toISOString(),
                isFullDay: event.datetype === 'date',
                isCanceled: event.status === 'CANCELLED',
                status: event.status || 'CONFIRMED',
                recurringEventExternalId: recurrenceIso,
                conferenceLinkLabel: '',
                conferenceLinkUrl: (0, _icalDataExtractPropertyValue.icalDataExtractPropertyValue)(event.url),
                conferenceSolution: '',
                externalCreatedAt: createdIso,
                externalUpdatedAt: event.lastmodified?.toISOString() ?? createdIso,
                participants: organizer ? [
                    organizer,
                    ...attendees
                ] : attendees
            };
        });
    } catch  {
        return [];
    }
};

//# sourceMappingURL=parse-ical-event.util.js.map