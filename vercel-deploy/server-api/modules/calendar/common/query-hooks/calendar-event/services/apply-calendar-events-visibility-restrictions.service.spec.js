"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _userworkspaceentity = require("../../../../../../engine/core-modules/user-workspace/user-workspace.entity");
const _calendarchannelentity = require("../../../../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _connectedaccountentity = require("../../../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _globalworkspaceormmanager = require("../../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _applycalendareventsvisibilityrestrictionsservice = require("./apply-calendar-events-visibility-restrictions.service");
const createMockCalendarEvent = (id, title, description)=>({
        id,
        title,
        description,
        isCanceled: false,
        isFullDay: false,
        startsAt: '2024-03-20T10:00:00Z',
        endsAt: '2024-03-20T11:00:00Z',
        location: '',
        conferenceLink: {
            primaryLinkLabel: '',
            primaryLinkUrl: '',
            secondaryLinks: null
        },
        externalCreatedAt: '2024-03-20T09:00:00Z',
        externalUpdatedAt: '2024-03-20T09:00:00Z',
        deletedAt: null,
        createdAt: '2024-03-20T09:00:00Z',
        updatedAt: '2024-03-20T09:00:00Z',
        iCalUid: '',
        conferenceSolution: '',
        calendarChannelEventAssociations: [],
        calendarEventParticipants: []
    });
describe('ApplyCalendarEventsVisibilityRestrictionsService', ()=>{
    let service;
    const mockCalendarEventAssociationRepository = {
        find: jest.fn()
    };
    const mockWorkspaceMemberRepository = {
        findOneByOrFail: jest.fn()
    };
    const mockConnectedAccountRepository = {
        find: jest.fn()
    };
    const mockUserWorkspaceRepository = {
        findOne: jest.fn()
    };
    const mockCalendarChannelRepository = {
        find: jest.fn()
    };
    const mockGlobalWorkspaceOrmManager = {
        getRepository: jest.fn().mockImplementation((workspaceId, name)=>{
            if (name === 'calendarChannelEventAssociation') {
                return mockCalendarEventAssociationRepository;
            }
            if (name === 'workspaceMember') {
                return mockWorkspaceMemberRepository;
            }
        }),
        executeInWorkspaceContext: jest.fn().mockImplementation((fn, _authContext)=>fn())
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _applycalendareventsvisibilityrestrictionsservice.ApplyCalendarEventsVisibilityRestrictionsService,
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: mockGlobalWorkspaceOrmManager
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_connectedaccountentity.ConnectedAccountEntity),
                    useValue: mockConnectedAccountRepository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userworkspaceentity.UserWorkspaceEntity),
                    useValue: mockUserWorkspaceRepository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_calendarchannelentity.CalendarChannelEntity),
                    useValue: mockCalendarChannelRepository
                }
            ]
        }).compile();
        service = module.get(_applycalendareventsvisibilityrestrictionsservice.ApplyCalendarEventsVisibilityRestrictionsService);
        // Clear all mocks before each test
        jest.clearAllMocks();
    });
    it('should return calendar event without obfuscated title and description if the visibility is SHARE_EVERYTHING', async ()=>{
        const calendarEvents = [
            createMockCalendarEvent('1', 'Test Event', 'Test Description')
        ];
        mockCalendarEventAssociationRepository.find.mockResolvedValue([
            {
                calendarEventId: '1',
                calendarChannelId: '1'
            }
        ]);
        mockCalendarChannelRepository.find.mockResolvedValue([
            {
                id: '1',
                visibility: _types.CalendarChannelVisibility.SHARE_EVERYTHING
            }
        ]);
        const result = await service.applyCalendarEventsVisibilityRestrictions(calendarEvents, 'test-workspace-id', 'user-id');
        expect(result).toEqual(calendarEvents);
        expect(result.every((item)=>item.title !== _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED && item.description !== _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED)).toBe(true);
        expect(mockConnectedAccountRepository.find).not.toHaveBeenCalled();
    });
    it('should return calendar event with obfuscated title and description if the visibility is METADATA', async ()=>{
        const calendarEvents = [
            createMockCalendarEvent('1', 'Test Event', 'Test Description')
        ];
        mockCalendarEventAssociationRepository.find.mockResolvedValue([
            {
                calendarEventId: '1',
                calendarChannelId: '1'
            }
        ]);
        mockCalendarChannelRepository.find.mockResolvedValue([
            {
                id: '1',
                visibility: _types.CalendarChannelVisibility.METADATA
            }
        ]);
        mockUserWorkspaceRepository.findOne.mockResolvedValue({
            id: 'user-workspace-id'
        });
        mockConnectedAccountRepository.find.mockResolvedValue([]);
        const result = await service.applyCalendarEventsVisibilityRestrictions(calendarEvents, 'test-workspace-id', 'user-id');
        expect(result).toEqual([
            {
                ...calendarEvents[0],
                title: _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED,
                description: _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED
            }
        ]);
    });
    it('should return calendar event without obfuscated title and description if the workspace member is the owner of the calendar event', async ()=>{
        const calendarEvents = [
            createMockCalendarEvent('1', 'Test Event', 'Test Description')
        ];
        mockCalendarEventAssociationRepository.find.mockResolvedValue([
            {
                calendarEventId: '1',
                calendarChannelId: '1'
            }
        ]);
        mockCalendarChannelRepository.find.mockResolvedValue([
            {
                id: '1',
                visibility: _types.CalendarChannelVisibility.METADATA
            }
        ]);
        mockUserWorkspaceRepository.findOne.mockResolvedValue({
            id: 'user-workspace-id'
        });
        mockConnectedAccountRepository.find.mockResolvedValue([
            {
                id: '1'
            }
        ]);
        const result = await service.applyCalendarEventsVisibilityRestrictions(calendarEvents, 'test-workspace-id', 'user-id');
        expect(result).toEqual(calendarEvents);
        expect(result.every((item)=>item.title !== _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED && item.description !== _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED)).toBe(true);
    });
    it('should not return calendar event if visibility is not SHARE_EVERYTHING or METADATA and the workspace member is not the owner of the calendar event', async ()=>{
        const calendarEvents = [
            createMockCalendarEvent('1', 'Test Event', 'Test Description')
        ];
        mockCalendarEventAssociationRepository.find.mockResolvedValue([
            {
                calendarEventId: '1',
                calendarChannelId: '1'
            }
        ]);
        mockCalendarChannelRepository.find.mockResolvedValue([
            {
                id: '1'
            }
        ]);
        mockUserWorkspaceRepository.findOne.mockResolvedValue({
            id: 'user-workspace-id'
        });
        mockConnectedAccountRepository.find.mockResolvedValue([]);
        const result = await service.applyCalendarEventsVisibilityRestrictions(calendarEvents, 'test-workspace-id', 'user-id');
        expect(result).toEqual([]);
    });
    it('should return all calendar events with the right visibility', async ()=>{
        const calendarEvents = [
            createMockCalendarEvent('1', 'Event 1', 'Description 1'),
            createMockCalendarEvent('2', 'Event 2', 'Description 2'),
            createMockCalendarEvent('3', 'Event 3', 'Description 3')
        ];
        mockUserWorkspaceRepository.findOne.mockResolvedValue({
            id: 'user-workspace-id'
        });
        mockCalendarEventAssociationRepository.find.mockResolvedValue([
            {
                calendarEventId: '1',
                calendarChannelId: '1'
            },
            {
                calendarEventId: '2',
                calendarChannelId: '2'
            },
            {
                calendarEventId: '3',
                calendarChannelId: '3'
            }
        ]);
        mockCalendarChannelRepository.find.mockResolvedValue([
            {
                id: '1',
                visibility: _types.CalendarChannelVisibility.SHARE_EVERYTHING
            },
            {
                id: '2',
                visibility: _types.CalendarChannelVisibility.METADATA
            },
            {
                id: '3',
                visibility: _types.CalendarChannelVisibility.METADATA
            }
        ]);
        mockConnectedAccountRepository.find.mockResolvedValueOnce([]) // request for calendar event 3
        .mockResolvedValueOnce([
            {
                id: '1'
            }
        ]); // request for calendar event 2
        const result = await service.applyCalendarEventsVisibilityRestrictions(calendarEvents, 'test-workspace-id', 'user-id');
        expect(result).toEqual([
            calendarEvents[0],
            calendarEvents[1],
            {
                ...calendarEvents[2],
                title: _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED,
                description: _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED
            }
        ]);
    });
    it('should return all calendar events with the right visibility when userId is undefined (api key request)', async ()=>{
        const calendarEvents = [
            createMockCalendarEvent('1', 'Event 1', 'Description 1'),
            createMockCalendarEvent('2', 'Event 2', 'Description 2'),
            createMockCalendarEvent('3', 'Event 3', 'Description 3')
        ];
        mockCalendarEventAssociationRepository.find.mockResolvedValue([
            {
                calendarEventId: '1',
                calendarChannelId: '1'
            },
            {
                calendarEventId: '2',
                calendarChannelId: '2'
            },
            {
                calendarEventId: '3',
                calendarChannelId: '3'
            }
        ]);
        mockCalendarChannelRepository.find.mockResolvedValue([
            {
                id: '1',
                visibility: _types.CalendarChannelVisibility.SHARE_EVERYTHING
            },
            {
                id: '2',
                visibility: _types.CalendarChannelVisibility.METADATA
            },
            {
                id: '3',
                visibility: _types.CalendarChannelVisibility.METADATA
            }
        ]);
        // userId is undefined (api key request), so connected account check is skipped
        // METADATA events should be obfuscated
        const result = await service.applyCalendarEventsVisibilityRestrictions(calendarEvents, 'test-workspace-id', undefined);
        expect(result).toEqual([
            calendarEvents[0],
            {
                ...calendarEvents[1],
                title: _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED,
                description: _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED
            },
            {
                ...calendarEvents[2],
                title: _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED,
                description: _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED
            }
        ]);
        expect(mockConnectedAccountRepository.find).not.toHaveBeenCalled();
    });
});

//# sourceMappingURL=apply-calendar-events-visibility-restrictions.service.spec.js.map