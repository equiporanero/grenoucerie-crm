"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatGoogleCalendarEvents", {
    enumerable: true,
    get: function() {
        return formatGoogleCalendarEvents;
    }
});
const _sanitizeCalendarEvent = require("../../utils/sanitizeCalendarEvent");
const _calendareventparticipantworkspaceentity = require("../../../../common/standard-objects/calendar-event-participant.workspace-entity");
const formatGoogleCalendarEvents = (events)=>{
    return events.map(formatGoogleCalendarEvent);
};
const formatGoogleCalendarEvent = (event)=>{
    const formatResponseStatus = (status)=>{
        switch(status){
            case 'accepted':
                return _calendareventparticipantworkspaceentity.CalendarEventParticipantResponseStatus.ACCEPTED;
            case 'declined':
                return _calendareventparticipantworkspaceentity.CalendarEventParticipantResponseStatus.DECLINED;
            case 'tentative':
                return _calendareventparticipantworkspaceentity.CalendarEventParticipantResponseStatus.TENTATIVE;
            default:
                return _calendareventparticipantworkspaceentity.CalendarEventParticipantResponseStatus.NEEDS_ACTION;
        }
    };
    // Create the event object
    const calendarEvent = {
        title: event.summary ?? '',
        isCanceled: event.status === 'cancelled',
        isFullDay: event.start?.dateTime == null,
        startsAt: event.start?.dateTime ?? event.start?.date ?? '',
        endsAt: event.end?.dateTime ?? event.end?.date ?? '',
        id: event.id ?? '',
        externalCreatedAt: event.created ?? '',
        externalUpdatedAt: event.updated ?? '',
        description: event.description ?? '',
        location: event.location ?? '',
        iCalUid: event.iCalUID ?? '',
        conferenceSolution: event.conferenceData?.conferenceSolution?.key?.type ?? '',
        conferenceLinkLabel: event.conferenceData?.entryPoints?.[0]?.uri ?? '',
        conferenceLinkUrl: event.conferenceData?.entryPoints?.[0]?.uri ?? '',
        recurringEventExternalId: event.recurringEventId ?? '',
        participants: event.attendees?.map((attendee)=>({
                handle: attendee.email ?? '',
                displayName: attendee.displayName ?? '',
                isOrganizer: attendee.organizer === true,
                responseStatus: formatResponseStatus(attendee.responseStatus)
            })) ?? [],
        status: event.status ?? ''
    };
    const propertiesToSanitize = [
        'title',
        'startsAt',
        'endsAt',
        'id',
        'externalCreatedAt',
        'externalUpdatedAt',
        'description',
        'location',
        'iCalUid',
        'conferenceSolution',
        'conferenceLinkLabel',
        'conferenceLinkUrl',
        'recurringEventExternalId',
        'status'
    ];
    return (0, _sanitizeCalendarEvent.sanitizeCalendarEvent)(calendarEvent, propertiesToSanitize);
};

//# sourceMappingURL=format-google-calendar-event.util.js.map