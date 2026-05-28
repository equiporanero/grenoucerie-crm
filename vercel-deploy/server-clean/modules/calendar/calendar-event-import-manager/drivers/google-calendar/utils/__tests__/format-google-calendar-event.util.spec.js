"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _formatgooglecalendareventutil = require("../format-google-calendar-event.util");
const _calendareventparticipantworkspaceentity = require("../../../../../common/standard-objects/calendar-event-participant.workspace-entity");
describe('formatGoogleCalendarEvents', ()=>{
    const mockGoogleEvent = {
        id: 'event123',
        summary: 'Team Meeting',
        description: 'Weekly team sync',
        location: 'Conference Room A',
        status: 'confirmed',
        created: '2023-01-01T10:00:00Z',
        updated: '2023-01-02T10:00:00Z',
        iCalUID: 'event123@google.com',
        start: {
            dateTime: '2023-01-15T14:00:00Z'
        },
        end: {
            dateTime: '2023-01-15T15:00:00Z'
        },
        attendees: [
            {
                email: 'organizer@example.com',
                displayName: 'Meeting Organizer',
                organizer: true,
                responseStatus: 'accepted'
            },
            {
                email: 'attendee@example.com',
                displayName: 'Test Attendee',
                responseStatus: 'tentative'
            }
        ],
        conferenceData: {
            conferenceSolution: {
                key: {
                    type: 'hangoutsMeet'
                }
            },
            entryPoints: [
                {
                    uri: 'https://meet.google.com/abc-defg-hij'
                }
            ]
        }
    };
    it('should correctly format a normal Google Calendar event', ()=>{
        const result = (0, _formatgooglecalendareventutil.formatGoogleCalendarEvents)([
            mockGoogleEvent
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
        expect(formattedEvent.conferenceSolution).toBe('hangoutsMeet');
        expect(formattedEvent.conferenceLinkUrl).toBe('https://meet.google.com/abc-defg-hij');
        expect(formattedEvent.participants).toHaveLength(2);
        expect(formattedEvent.participants[0].handle).toBe('organizer@example.com');
        expect(formattedEvent.participants[0].isOrganizer).toBe(true);
        expect(formattedEvent.participants[0].responseStatus).toBe(_calendareventparticipantworkspaceentity.CalendarEventParticipantResponseStatus.ACCEPTED);
        expect(formattedEvent.participants[1].handle).toBe('attendee@example.com');
        expect(formattedEvent.participants[1].responseStatus).toBe(_calendareventparticipantworkspaceentity.CalendarEventParticipantResponseStatus.TENTATIVE);
    });
    const testCases = [
        {
            title: 'should sanitize a UCALID with \u0000',
            context: {
                input: '\u0000eventStrange@google.com',
                expected: 'eventStrange@google.com'
            }
        },
        {
            title: 'should sanitize a UCALID with \u0000',
            context: {
                input: '>\u0000\u0015-;_�^�W&�p\u001f�',
                expected: '>\u0015-;_�^�W&�p\u001f�'
            }
        },
        {
            title: 'should sanitize a UCALID with \x00',
            context: {
                input: '�\u0002��y�_΢�\u0013��\x00',
                expected: '�\u0002��y�_΢�\u0013��'
            }
        },
        {
            title: 'should sanitize a UCALID with del',
            context: {
                input: 'del�\u0002��y�_΢�\u0013��',
                expected: 'del�\u0002��y�_΢�\u0013��'
            }
        }
    ];
    it.each(testCases)('$title', ({ context })=>{
        const mockGoogleEventWithImproperUcalid = {
            ...mockGoogleEvent,
            iCalUID: context.input
        };
        const result = (0, _formatgooglecalendareventutil.formatGoogleCalendarEvents)([
            mockGoogleEventWithImproperUcalid
        ]);
        expect(result[0].iCalUid).toBe(context.expected);
    });
});

//# sourceMappingURL=format-google-calendar-event.util.spec.js.map