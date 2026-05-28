"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _calendarsaveeventsservice = require("../calendar-save-events.service");
const RECURRING_ICAL_UID = 'recurring-ical-uid@google.com';
const RECURRING_MASTER_ID = 'master_abc';
const mockCalendarEventRepository = {
    insert: jest.fn(),
    updateMany: jest.fn()
};
const mockAssociationRepository = {
    find: jest.fn(),
    insert: jest.fn(),
    updateMany: jest.fn()
};
const mockCalendarEventParticipantService = {
    upsertAndDeleteCalendarEventParticipants: jest.fn()
};
const mockGlobalWorkspaceOrmManager = {
    executeInWorkspaceContext: jest.fn(async (callback)=>{
        await callback();
    }),
    getRepository: jest.fn(async (_workspaceId, entityName)=>{
        if (entityName === 'calendarEvent') return mockCalendarEventRepository;
        if (entityName === 'calendarChannelEventAssociation') return mockAssociationRepository;
        return {};
    }),
    getGlobalWorkspaceDataSource: jest.fn(async ()=>({
            transaction: async (callback)=>{
                await callback({});
            }
        }))
};
const calendarChannel = {
    id: 'channel-123'
};
const connectedAccount = {
    id: 'account-123'
};
const createFetchedEvent = (overrides = {})=>({
        id: 'event-1',
        iCalUid: 'single-event-uid@google.com',
        title: 'Team Meeting',
        startsAt: '2026-04-10T16:30:00+03:00',
        endsAt: '2026-04-10T17:00:00+03:00',
        description: '',
        location: '',
        isFullDay: false,
        isCanceled: false,
        conferenceLinkLabel: '',
        conferenceLinkUrl: '',
        externalCreatedAt: '',
        externalUpdatedAt: '',
        conferenceSolution: '',
        participants: [],
        status: 'confirmed',
        ...overrides
    });
describe('CalendarSaveEventsService', ()=>{
    let service;
    const save = (events)=>service.saveCalendarEventsAndEnqueueContactCreationJob(events, calendarChannel, connectedAccount, 'workspace-123');
    beforeEach(()=>{
        jest.clearAllMocks();
        mockAssociationRepository.find.mockResolvedValue([]);
        service = new _calendarsaveeventsservice.CalendarSaveEventsService(mockGlobalWorkspaceOrmManager, mockCalendarEventParticipantService);
    });
    it('should insert each recurring instance as a separate event', async ()=>{
        await save([
            createFetchedEvent({
                id: `${RECURRING_MASTER_ID}_20260403`,
                iCalUid: RECURRING_ICAL_UID,
                recurringEventExternalId: RECURRING_MASTER_ID,
                startsAt: '2026-04-03T16:30:00+03:00'
            }),
            createFetchedEvent({
                id: `${RECURRING_MASTER_ID}_20260410`,
                iCalUid: RECURRING_ICAL_UID,
                recurringEventExternalId: RECURRING_MASTER_ID,
                startsAt: '2026-04-10T16:30:00+03:00'
            }),
            createFetchedEvent({
                id: `${RECURRING_MASTER_ID}_20260417`,
                iCalUid: RECURRING_ICAL_UID,
                recurringEventExternalId: RECURRING_MASTER_ID,
                startsAt: '2026-04-17T16:30:00+03:00'
            })
        ]);
        const insertedEvents = mockCalendarEventRepository.insert.mock.calls[0][0];
        expect(insertedEvents).toHaveLength(3);
        expect(new Set(insertedEvents.map((e)=>e.startsAt))).toEqual(new Set([
            '2026-04-03T16:30:00+03:00',
            '2026-04-10T16:30:00+03:00',
            '2026-04-17T16:30:00+03:00'
        ]));
    });
    it('should update existing events and only insert new ones on incremental sync', async ()=>{
        mockAssociationRepository.find.mockResolvedValueOnce([
            {
                id: 'assoc-403',
                eventExternalId: `${RECURRING_MASTER_ID}_20260403`,
                calendarEventId: 'existing-db-id-403',
                calendarChannelId: calendarChannel.id
            }
        ]);
        await save([
            createFetchedEvent({
                id: `${RECURRING_MASTER_ID}_20260403`,
                iCalUid: RECURRING_ICAL_UID,
                recurringEventExternalId: RECURRING_MASTER_ID,
                title: 'Weekly Sync (Renamed)',
                startsAt: '2026-04-03T16:30:00+03:00'
            }),
            createFetchedEvent({
                id: `${RECURRING_MASTER_ID}_20260410`,
                iCalUid: RECURRING_ICAL_UID,
                startsAt: '2026-04-10T16:30:00+03:00'
            })
        ]);
        const insertedEvents = mockCalendarEventRepository.insert.mock.calls[0][0];
        expect(insertedEvents).toHaveLength(1);
        expect(insertedEvents[0].startsAt).toBe('2026-04-10T16:30:00+03:00');
        const updatedEvents = mockCalendarEventRepository.updateMany.mock.calls[0][0];
        expect(updatedEvents).toHaveLength(1);
        expect(updatedEvents[0].criteria).toBe('existing-db-id-403');
        expect(updatedEvents[0].partialEntity.title).toBe('Weekly Sync (Renamed)');
        const insertedAssociations = mockAssociationRepository.insert.mock.calls[0][0];
        expect(insertedAssociations).toHaveLength(1);
        expect(insertedAssociations[0].eventExternalId).toBe(`${RECURRING_MASTER_ID}_20260410`);
    });
    it('should only update without inserting when all events already exist', async ()=>{
        mockAssociationRepository.find.mockResolvedValueOnce([
            {
                id: 'assoc-1',
                eventExternalId: 'event-1',
                calendarEventId: 'db-id-1',
                calendarChannelId: calendarChannel.id
            },
            {
                id: 'assoc-2',
                eventExternalId: 'event-2',
                calendarEventId: 'db-id-2',
                calendarChannelId: calendarChannel.id
            }
        ]);
        await save([
            createFetchedEvent({
                id: 'event-1'
            }),
            createFetchedEvent({
                id: 'event-2'
            })
        ]);
        expect(mockCalendarEventRepository.insert).not.toHaveBeenCalled();
        expect(mockCalendarEventRepository.updateMany).toHaveBeenCalledTimes(1);
        expect(mockAssociationRepository.insert).not.toHaveBeenCalled();
        expect(mockAssociationRepository.updateMany).toHaveBeenCalledTimes(1);
    });
});

//# sourceMappingURL=calendar-save-events.service.spec.js.map