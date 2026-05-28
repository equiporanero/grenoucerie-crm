"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _calendarfetcheventsservice = require("../calendar-fetch-events.service");
const mockCalendarChannelSyncStatusService = {
    markAsCalendarEventListFetchOngoing: jest.fn(),
    markAsCalendarEventListFetchPending: jest.fn(),
    markAsCalendarEventsImportPending: jest.fn()
};
const mockGetCalendarEventsService = {
    getCalendarEvents: jest.fn()
};
const mockCalendarChannelRepository = {
    update: jest.fn()
};
const mockCalendarEventsImportService = {
    processCalendarEventsImport: jest.fn()
};
const mockCalendarEventImportErrorHandlerService = {
    handleDriverException: jest.fn()
};
const mockCacheStorage = {
    setAdd: jest.fn()
};
const mockGlobalWorkspaceOrmManager = {
    executeInWorkspaceContext: jest.fn(async (callback)=>{
        await callback();
    })
};
const workspaceId = 'workspace-123';
const baseConnectedAccount = {
    id: 'account-123',
    provider: 'google',
    refreshToken: 'refresh-token',
    accessToken: 'access-token',
    handle: 'test@example.com'
};
const createCalendarChannel = (syncCursor)=>({
        id: 'channel-123',
        syncCursor,
        connectedAccountId: 'account-123'
    });
describe('CalendarFetchEventsService', ()=>{
    let service;
    beforeEach(()=>{
        jest.clearAllMocks();
        mockGetCalendarEventsService.getCalendarEvents.mockResolvedValue({
            fullEvents: true,
            calendarEvents: [
                {
                    id: 'event-1'
                }
            ],
            nextSyncCursor: 'new-cursor-abc'
        });
        service = new _calendarfetcheventsservice.CalendarFetchEventsService(mockCacheStorage, mockGlobalWorkspaceOrmManager, mockCalendarChannelRepository, mockCalendarChannelSyncStatusService, mockGetCalendarEventsService, mockCalendarEventImportErrorHandlerService, mockCalendarEventsImportService);
    });
    describe('syncCursor handling (backwards compatibility)', ()=>{
        it('should perform full sync when syncCursor is null (core schema)', async ()=>{
            const calendarChannel = createCalendarChannel(null);
            await service.fetchCalendarEvents(calendarChannel, baseConnectedAccount, workspaceId);
            expect(mockGetCalendarEventsService.getCalendarEvents).toHaveBeenCalledWith(expect.objectContaining({
                handle: 'test@example.com'
            }), undefined);
        });
        it('should perform full sync when syncCursor is empty string (workspace schema)', async ()=>{
            const calendarChannel = createCalendarChannel('');
            await service.fetchCalendarEvents(calendarChannel, baseConnectedAccount, workspaceId);
            expect(mockGetCalendarEventsService.getCalendarEvents).toHaveBeenCalledWith(expect.objectContaining({
                handle: 'test@example.com'
            }), undefined);
        });
        it('should use existing syncCursor for incremental sync', async ()=>{
            const calendarChannel = createCalendarChannel('cursor-xyz');
            await service.fetchCalendarEvents(calendarChannel, baseConnectedAccount, workspaceId);
            expect(mockGetCalendarEventsService.getCalendarEvents).toHaveBeenCalledWith(expect.objectContaining({
                handle: 'test@example.com'
            }), 'cursor-xyz');
        });
        it('should update syncCursor after successful fetch regardless of initial cursor state', async ()=>{
            const calendarChannel = createCalendarChannel(null);
            await service.fetchCalendarEvents(calendarChannel, baseConnectedAccount, workspaceId);
            expect(mockCalendarChannelRepository.update).toHaveBeenCalledWith({
                id: 'channel-123',
                workspaceId
            }, {
                syncCursor: 'new-cursor-abc'
            });
        });
        it('should not throw when feature flag switches from off (workspace empty string) to on (core null)', async ()=>{
            // Simulate flag OFF: workspace returns empty string
            const workspaceChannel = createCalendarChannel('');
            await expect(service.fetchCalendarEvents(workspaceChannel, baseConnectedAccount, workspaceId)).resolves.not.toThrow();
            jest.clearAllMocks();
            mockGetCalendarEventsService.getCalendarEvents.mockResolvedValue({
                fullEvents: true,
                calendarEvents: [
                    {
                        id: 'event-2'
                    }
                ],
                nextSyncCursor: 'new-cursor-def'
            });
            // Simulate flag ON: core returns null
            const coreChannel = createCalendarChannel(null);
            await expect(service.fetchCalendarEvents(coreChannel, baseConnectedAccount, workspaceId)).resolves.not.toThrow();
            expect(mockGetCalendarEventsService.getCalendarEvents).toHaveBeenCalledWith(expect.anything(), undefined);
        });
        it('should preserve incremental sync behavior when toggling feature flag with existing cursor', async ()=>{
            // Flag OFF: workspace has cursor
            const workspaceChannel = createCalendarChannel('cursor-from-workspace');
            await service.fetchCalendarEvents(workspaceChannel, baseConnectedAccount, workspaceId);
            expect(mockGetCalendarEventsService.getCalendarEvents).toHaveBeenCalledWith(expect.anything(), 'cursor-from-workspace');
            jest.clearAllMocks();
            mockGetCalendarEventsService.getCalendarEvents.mockResolvedValue({
                fullEvents: true,
                calendarEvents: [
                    {
                        id: 'event-3'
                    }
                ],
                nextSyncCursor: 'newer-cursor'
            });
            // Flag ON: core has same cursor (dual-written)
            const coreChannel = createCalendarChannel('cursor-from-workspace');
            await service.fetchCalendarEvents(coreChannel, baseConnectedAccount, workspaceId);
            expect(mockGetCalendarEventsService.getCalendarEvents).toHaveBeenCalledWith(expect.anything(), 'cursor-from-workspace');
        });
    });
});

//# sourceMappingURL=calendar-fetch-events.service.spec.js.map