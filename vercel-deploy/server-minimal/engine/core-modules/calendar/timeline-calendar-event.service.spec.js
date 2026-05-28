"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _calendarchannelentity = require("../../metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _connectedaccountentity = require("../../metadata-modules/connected-account/entities/connected-account.entity");
const _globalworkspaceormmanager = require("../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _timelinecalendareventservice = require("./timeline-calendar-event.service");
describe('TimelineCalendarEventService', ()=>{
    let service;
    let mockCalendarEventRepository;
    let mockCalendarChannelCoreRepository;
    let mockConnectedAccountRepository;
    let mockUserWorkspaceRepository;
    let mockWorkspaceMemberRepository;
    const mockCalendarEvent = {
        id: '1',
        title: 'Test Event',
        description: 'Test Description',
        startsAt: '2024-01-01T00:00:00.000Z',
        endsAt: '2024-01-01T01:00:00.000Z',
        calendarEventParticipants: [],
        calendarChannelEventAssociations: []
    };
    beforeEach(async ()=>{
        mockCalendarEventRepository = {
            count: jest.fn().mockResolvedValue(1),
            find: jest.fn(),
            findAndCount: jest.fn()
        };
        mockConnectedAccountRepository = {
            find: jest.fn().mockResolvedValue([])
        };
        mockCalendarChannelCoreRepository = {
            find: jest.fn().mockResolvedValue([])
        };
        mockUserWorkspaceRepository = {
            findOne: jest.fn().mockResolvedValue(null)
        };
        mockWorkspaceMemberRepository = {
            findOne: jest.fn().mockResolvedValue(null)
        };
        const mockGlobalWorkspaceOrmManager = {
            getRepository: jest.fn().mockImplementation((_workspaceId, entityName)=>{
                if (entityName === 'workspaceMember') {
                    return Promise.resolve(mockWorkspaceMemberRepository);
                }
                return Promise.resolve(mockCalendarEventRepository);
            }),
            executeInWorkspaceContext: jest.fn().mockImplementation((fn, _authContext)=>fn())
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _timelinecalendareventservice.TimelineCalendarEventService,
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: mockGlobalWorkspaceOrmManager
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_calendarchannelentity.CalendarChannelEntity),
                    useValue: mockCalendarChannelCoreRepository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_connectedaccountentity.ConnectedAccountEntity),
                    useValue: mockConnectedAccountRepository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userworkspaceentity.UserWorkspaceEntity),
                    useValue: mockUserWorkspaceRepository
                }
            ]
        }).compile();
        service = module.get(_timelinecalendareventservice.TimelineCalendarEventService);
    });
    it('should return non-obfuscated calendar events if visibility is SHARE_EVERYTHING', async ()=>{
        const currentWorkspaceMemberId = 'current-workspace-member-id';
        const personIds = [
            'person-1'
        ];
        mockCalendarEventRepository.find.mockResolvedValue([
            {
                id: '1',
                startsAt: new Date()
            }
        ]);
        mockCalendarEventRepository.findAndCount.mockResolvedValue([
            [
                {
                    ...mockCalendarEvent,
                    calendarChannelEventAssociations: [
                        {
                            calendarChannelId: 'channel-1'
                        }
                    ]
                }
            ],
            1
        ]);
        mockCalendarChannelCoreRepository.find.mockResolvedValue([
            {
                id: 'channel-1',
                visibility: _types.CalendarChannelVisibility.SHARE_EVERYTHING,
                connectedAccountId: 'connected-account-1'
            }
        ]);
        // Ownership doesn't matter for SHARE_EVERYTHING
        mockWorkspaceMemberRepository.findOne.mockResolvedValue(null);
        const result = await service.getCalendarEventsFromPersonIds({
            currentWorkspaceMemberId,
            personIds,
            workspaceId: 'test-workspace-id',
            page: 1,
            pageSize: 10
        });
        expect(result.timelineCalendarEvents[0].title).toBe('Test Event');
        expect(result.timelineCalendarEvents[0].description).toBe('Test Description');
    });
    it('should return obfuscated calendar events if visibility is METADATA', async ()=>{
        const currentWorkspaceMemberId = 'current-workspace-member-id';
        const personIds = [
            'person-1'
        ];
        mockCalendarEventRepository.find.mockResolvedValue([
            {
                id: '1',
                startsAt: new Date()
            }
        ]);
        mockCalendarEventRepository.findAndCount.mockResolvedValue([
            [
                {
                    ...mockCalendarEvent,
                    calendarChannelEventAssociations: [
                        {
                            calendarChannelId: 'channel-1'
                        }
                    ]
                }
            ],
            1
        ]);
        mockCalendarChannelCoreRepository.find.mockResolvedValue([
            {
                id: 'channel-1',
                visibility: _types.CalendarChannelVisibility.METADATA,
                connectedAccountId: 'connected-account-1'
            }
        ]);
        // Current user resolves but doesn't own the account
        mockWorkspaceMemberRepository.findOne.mockResolvedValue({
            userId: 'current-user-id'
        });
        mockUserWorkspaceRepository.findOne.mockResolvedValue({
            id: 'current-uw-id'
        });
        mockConnectedAccountRepository.find.mockResolvedValue([]);
        const result = await service.getCalendarEventsFromPersonIds({
            currentWorkspaceMemberId,
            personIds,
            workspaceId: 'test-workspace-id',
            page: 1,
            pageSize: 10
        });
        expect(result.timelineCalendarEvents[0].title).toBe(_constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED);
        expect(result.timelineCalendarEvents[0].description).toBe(_constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED);
    });
    it('should return non-obfuscated calendar events if visibility is METADATA and user is calendar events owner', async ()=>{
        const currentWorkspaceMemberId = 'current-workspace-member-id';
        const personIds = [
            'person-1'
        ];
        mockCalendarEventRepository.find.mockResolvedValue([
            {
                id: '1',
                startsAt: new Date()
            }
        ]);
        mockCalendarEventRepository.findAndCount.mockResolvedValue([
            [
                {
                    ...mockCalendarEvent,
                    calendarChannelEventAssociations: [
                        {
                            calendarChannelId: 'channel-1'
                        }
                    ]
                }
            ],
            1
        ]);
        mockCalendarChannelCoreRepository.find.mockResolvedValue([
            {
                id: 'channel-1',
                visibility: _types.CalendarChannelVisibility.METADATA,
                connectedAccountId: 'connected-account-1'
            }
        ]);
        // Current user resolves and owns the account
        mockWorkspaceMemberRepository.findOne.mockResolvedValue({
            userId: 'current-user-id'
        });
        mockUserWorkspaceRepository.findOne.mockResolvedValue({
            id: 'current-uw-id'
        });
        mockConnectedAccountRepository.find.mockResolvedValue([
            {
                id: 'connected-account-1'
            }
        ]);
        const result = await service.getCalendarEventsFromPersonIds({
            currentWorkspaceMemberId,
            personIds,
            workspaceId: 'test-workspace-id',
            page: 1,
            pageSize: 10
        });
        expect(result.timelineCalendarEvents[0].title).toBe('Test Event');
        expect(result.timelineCalendarEvents[0].description).toBe('Test Description');
    });
});

//# sourceMappingURL=timeline-calendar-event.service.spec.js.map