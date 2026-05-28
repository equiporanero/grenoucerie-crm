"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "mapCalendarEventsByICalUID", {
    enumerable: true,
    get: function() {
        return mapCalendarEventsByICalUID;
    }
});
const mapCalendarEventsByICalUID = (existingCalendarEvents)=>{
    return new Map(existingCalendarEvents.map((calendarEvent)=>[
            calendarEvent.iCalUid ?? '',
            calendarEvent.id
        ]));
};

//# sourceMappingURL=calendar-event-mapper.util.js.map