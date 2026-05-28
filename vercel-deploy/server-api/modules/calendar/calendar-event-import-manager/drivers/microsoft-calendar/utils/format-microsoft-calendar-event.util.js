"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatMicrosoftCalendarEvents", {
    enumerable: true,
    get: function() {
        return formatMicrosoftCalendarEvents;
    }
});
const _sanitizeCalendarEvent = require("../../utils/sanitizeCalendarEvent");
const _calendareventparticipantworkspaceentity = require("../../../../common/standard-objects/calendar-event-participant.workspace-entity");
const formatMicrosoftCalendarEvents = (events)=>{
    return events.map(formatMicrosoftCalendarEvent);
};
const formatMicrosoftCalendarEvent = (event)=>{
    const formatResponseStatus = (status)=>{
        switch(status){
            case 'accepted':
            case 'organizer':
                return _calendareventparticipantworkspaceentity.CalendarEventParticipantResponseStatus.ACCEPTED;
            case 'declined':
                return _calendareventparticipantworkspaceentity.CalendarEventParticipantResponseStatus.DECLINED;
            case 'tentativelyAccepted':
                return _calendareventparticipantworkspaceentity.CalendarEventParticipantResponseStatus.TENTATIVE;
            default:
                return _calendareventparticipantworkspaceentity.CalendarEventParticipantResponseStatus.NEEDS_ACTION;
        }
    };
    const calendarEvent = {
        title: event.subject ?? '',
        isCanceled: !!event.isCancelled,
        isFullDay: !!event.isAllDay,
        startsAt: event.start?.dateTime ?? '',
        endsAt: event.end?.dateTime ?? '',
        id: event.id ?? '',
        externalCreatedAt: event.createdDateTime ?? '',
        externalUpdatedAt: event.lastModifiedDateTime ?? '',
        description: event.body?.content ?? '',
        location: event.location?.displayName ?? '',
        iCalUid: event.iCalUId ?? '',
        conferenceSolution: event.onlineMeetingProvider ?? '',
        conferenceLinkLabel: event.onlineMeeting?.joinUrl ?? '',
        conferenceLinkUrl: event.onlineMeeting?.joinUrl ?? '',
        recurringEventExternalId: event.id ?? '',
        participants: event.attendees?.map((attendee)=>({
                handle: attendee.emailAddress?.address ?? '',
                displayName: attendee.emailAddress?.name ?? '',
                isOrganizer: attendee.status?.response === 'organizer',
                responseStatus: formatResponseStatus(attendee.status?.response)
            })) ?? [],
        status: ''
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

//# sourceMappingURL=format-microsoft-calendar-event.util.js.map