"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _formatmicrosoftcalendareventutil = require("../format-microsoft-calendar-event.util");
const _calendareventparticipantworkspaceentity = require("../../../../../common/standard-objects/calendar-event-participant.workspace-entity");
describe('formatMicrosoftCalendarEvents', ()=>{
    const mockMicrosoftEvent = {
        id: 'event123',
        subject: 'Team Meeting',
        body: {
            content: 'Weekly team sync',
            contentType: 'text'
        },
        location: {
            displayName: 'Conference Room A'
        },
        isCancelled: false,
        isAllDay: false,
        createdDateTime: '2023-01-01T10:00:00Z',
        lastModifiedDateTime: '2023-01-02T10:00:00Z',
        iCalUId: 'event123@microsoft.com',
        start: {
            dateTime: '2023-01-15T14:00:00Z',
            timeZone: 'UTC'
        },
        end: {
            dateTime: '2023-01-15T15:00:00Z',
            timeZone: 'UTC'
        },
        attendees: [
            {
                emailAddress: {
                    address: 'organizer@example.com',
                    name: 'Meeting Organizer'
                },
                status: {
                    response: 'organizer'
                }
            },
            {
                emailAddress: {
                    address: 'attendee@example.com',
                    name: 'Test Attendee'
                },
                status: {
                    response: 'tentativelyAccepted'
                }
            }
        ],
        onlineMeetingProvider: 'teamsForBusiness',
        onlineMeeting: {
            joinUrl: 'https://teams.microsoft.com/l/meetup-join/abc123'
        }
    };
    it('should correctly format a normal Microsoft Calendar event', ()=>{
        const result = (0, _formatmicrosoftcalendareventutil.formatMicrosoftCalendarEvents)([
            mockMicrosoftEvent
        ]);
        expect(result).toHaveLength(1);
        const formattedEvent = result[0];
        expect(formattedEvent.title).toBe('Team Meeting');
        expect(formattedEvent.description).toBe('Weekly team sync');
        expect(formattedEvent.location).toBe('Conference Room A');
        expect(formattedEvent.isCanceled).toBe(false);
        expect(formattedEvent.isFullDay).toBe(false);
        expect(formattedEvent.startsAt).toBe('2023-01-15T14:00:00Z');
        expect(formattedEvent.endsAt).toBe('2023-01-15T15:00:00Z');
        expect(formattedEvent.id).toBe('event123');
        expect(formattedEvent.conferenceSolution).toBe('teamsForBusiness');
        expect(formattedEvent.conferenceLinkUrl).toBe('https://teams.microsoft.com/l/meetup-join/abc123');
        expect(formattedEvent.participants).toHaveLength(2);
        expect(formattedEvent.participants[0].handle).toBe('organizer@example.com');
        expect(formattedEvent.participants[0].isOrganizer).toBe(true);
        expect(formattedEvent.participants[0].responseStatus).toBe(_calendareventparticipantworkspaceentity.CalendarEventParticipantResponseStatus.ACCEPTED);
        expect(formattedEvent.participants[1].handle).toBe('attendee@example.com');
        expect(formattedEvent.participants[1].responseStatus).toBe(_calendareventparticipantworkspaceentity.CalendarEventParticipantResponseStatus.TENTATIVE);
    });
    it('should sanitize a Microsoft Calendar event with improper exit char 0x00', ()=>{
        const mockMicrosoftEventWithImproperData = {
            ...mockMicrosoftEvent,
            iCalUId: '\u0000eventStrange@microsoft.com'
        };
        const mockMicrosoftEventWithImproperData2 = {
            ...mockMicrosoftEvent,
            iCalUId: '>\u0000\u0015-;_�^�W&�p\u001f�'
        };
        const result = (0, _formatmicrosoftcalendareventutil.formatMicrosoftCalendarEvents)([
            mockMicrosoftEventWithImproperData,
            mockMicrosoftEventWithImproperData2
        ]);
        expect(result[0].iCalUid).toBe('eventStrange@microsoft.com');
        expect(result[1].iCalUid).toBe('>\u0015-;_�^�W&�p\u001f�');
    });
});

//# sourceMappingURL=format-microsoft-calendar-event.util.spec.js.map