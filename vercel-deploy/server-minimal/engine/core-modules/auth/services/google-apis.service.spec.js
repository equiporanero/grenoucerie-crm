"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _createcalendarchannelservice = require("./create-calendar-channel.service");
const _createconnectedaccountservice = require("./create-connected-account.service");
const _createmessagechannelservice = require("./create-message-channel.service");
const _googleapisscopes = require("./google-apis-scopes");
const _googleapisserviceavailabilityservice = require("./google-apis-service-availability.service");
const _googleapisservice = require("./google-apis.service");
const _updateconnectedaccountonreconnectservice = require("./update-connected-account-on-reconnect.service");
const _featureflagservice = require("../../feature-flag/services/feature-flag.service");
const _messagequeueconstants = require("../../message-queue/message-queue.constants");
const _getqueuetokenutil = require("../../message-queue/utils/get-queue-token.util");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _userworkspaceentity = require("../../user-workspace/user-workspace.entity");
const _calendarchannelentity = require("../../../metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _connectedaccountentity = require("../../../metadata-modules/connected-account/entities/connected-account.entity");
const _messagechannelentity = require("../../../metadata-modules/message-channel/entities/message-channel.entity");
const _objectmetadataentity = require("../../../metadata-modules/object-metadata/object-metadata.entity");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _calendarchannelsyncstatusservice = require("../../../../modules/calendar/common/services/calendar-channel-sync-status.service");
const _emailaliasmanagerservice = require("../../../../modules/connected-account/email-alias-manager/services/email-alias-manager.service");
const _accountstoreconnectservice = require("../../../../modules/connected-account/services/accounts-to-reconnect.service");
const _messagechannelsyncstatusservice = require("../../../../modules/messaging/common/services/message-channel-sync-status.service");
const _syncmessagefoldersservice = require("../../../../modules/messaging/message-folder-manager/services/sync-message-folders.service");
jest.mock('uuid', ()=>({
        v4: jest.fn(()=>'mocked-uuid')
    }));
describe('GoogleAPIsService', ()=>{
    let service;
    let calendarChannelSyncStatusService;
    let messagingChannelSyncStatusService;
    let createMessageChannelService;
    const mockConnectedAccountRepository = {
        findOne: jest.fn()
    };
    const mockTransactionManager = {
        getRepository: jest.fn().mockReturnValue({
            save: jest.fn()
        })
    };
    const mockMessageChannelRepository = {
        find: jest.fn(),
        findOne: jest.fn().mockResolvedValue(null),
        manager: {
            transaction: jest.fn((callback)=>callback(mockTransactionManager))
        }
    };
    const mockCalendarChannelRepository = {
        find: jest.fn()
    };
    const mockUserWorkspaceRepository = {
        findOne: jest.fn().mockResolvedValue({
            id: 'user-workspace-id'
        })
    };
    const mockWorkspaceMemberRepository = {
        findOneOrFail: jest.fn(),
        findOne: jest.fn().mockResolvedValue({
            id: 'workspace-member-id',
            userId: 'user-id'
        })
    };
    const mockTwentyConfigService = {
        get: jest.fn()
    };
    const mockMessageQueueService = {
        add: jest.fn()
    };
    const mockCalendarQueueService = {
        add: jest.fn()
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _googleapisservice.GoogleAPIsService,
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: {
                        getRepository: jest.fn().mockImplementation((_workspaceId, entity)=>{
                            if (entity === 'workspaceMember') return mockWorkspaceMemberRepository;
                            return {};
                        }),
                        executeInWorkspaceContext: jest.fn().mockImplementation((fn, _authContext)=>fn())
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_objectmetadataentity.ObjectMetadataEntity),
                    useValue: {
                        findOneOrFail: jest.fn()
                    }
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: mockTwentyConfigService
                },
                {
                    provide: _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService,
                    useValue: {
                        resetAndMarkAsCalendarEventListFetchPending: jest.fn()
                    }
                },
                {
                    provide: _googleapisscopes.GoogleAPIScopesService,
                    useValue: {
                        getScopesFromGoogleAccessTokenAndCheckIfExpectedScopesArePresent: jest.fn().mockResolvedValue({
                            scopes: [],
                            isValid: true
                        })
                    }
                },
                {
                    provide: _googleapisserviceavailabilityservice.GoogleApisServiceAvailabilityService,
                    useValue: {
                        checkServicesAvailability: jest.fn().mockResolvedValue({
                            isMessagingAvailable: true,
                            isCalendarAvailable: true
                        })
                    }
                },
                {
                    provide: _messagechannelsyncstatusservice.MessageChannelSyncStatusService,
                    useValue: {
                        resetAndMarkAsMessagesListFetchPending: jest.fn()
                    }
                },
                {
                    provide: _createconnectedaccountservice.CreateConnectedAccountService,
                    useValue: {
                        createConnectedAccount: jest.fn()
                    }
                },
                {
                    provide: _createmessagechannelservice.CreateMessageChannelService,
                    useValue: {
                        createMessageChannel: jest.fn()
                    }
                },
                {
                    provide: _createcalendarchannelservice.CreateCalendarChannelService,
                    useValue: {
                        createCalendarChannel: jest.fn()
                    }
                },
                {
                    provide: _updateconnectedaccountonreconnectservice.UpdateConnectedAccountOnReconnectService,
                    useValue: {
                        updateConnectedAccountOnReconnect: jest.fn()
                    }
                },
                {
                    provide: _accountstoreconnectservice.AccountsToReconnectService,
                    useValue: {
                        removeAccountToReconnect: jest.fn()
                    }
                },
                {
                    provide: (0, _getqueuetokenutil.getQueueToken)(_messagequeueconstants.MessageQueue.messagingQueue),
                    useValue: mockMessageQueueService
                },
                {
                    provide: (0, _getqueuetokenutil.getQueueToken)(_messagequeueconstants.MessageQueue.calendarQueue),
                    useValue: mockCalendarQueueService
                },
                {
                    provide: _featureflagservice.FeatureFlagService,
                    useValue: {
                        isFeatureEnabled: jest.fn().mockResolvedValue(false)
                    }
                },
                {
                    provide: _syncmessagefoldersservice.SyncMessageFoldersService,
                    useValue: {
                        syncMessageFolders: jest.fn().mockResolvedValue([])
                    }
                },
                {
                    provide: _emailaliasmanagerservice.EmailAliasManagerService,
                    useValue: {
                        refreshHandleAliases: jest.fn().mockResolvedValue([])
                    }
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
                    provide: (0, _typeorm.getRepositoryToken)(_messagechannelentity.MessageChannelEntity),
                    useValue: mockMessageChannelRepository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_calendarchannelentity.CalendarChannelEntity),
                    useValue: mockCalendarChannelRepository
                }
            ]
        }).compile();
        service = module.get(_googleapisservice.GoogleAPIsService);
        calendarChannelSyncStatusService = module.get(_calendarchannelsyncstatusservice.CalendarChannelSyncStatusService);
        messagingChannelSyncStatusService = module.get(_messagechannelsyncstatusservice.MessageChannelSyncStatusService);
        createMessageChannelService = module.get(_createmessagechannelservice.CreateMessageChannelService);
    });
    describe('refreshGoogleRefreshToken', ()=>{
        it('should reset calendar channels with FAILED_UNKNOWN syncStatus and FAILED syncStage', async ()=>{
            mockTwentyConfigService.get.mockImplementation((key)=>{
                if (key === 'CALENDAR_PROVIDER_GOOGLE_ENABLED') return true;
                if (key === 'MESSAGING_PROVIDER_GMAIL_ENABLED') return true;
                return false;
            });
            const existingConnectedAccount = {
                id: 'existing-account-id',
                handle: 'test@example.com',
                userWorkspaceId: 'user-workspace-id',
                provider: _types.ConnectedAccountProvider.GOOGLE
            };
            mockConnectedAccountRepository.findOne.mockResolvedValue(existingConnectedAccount);
            mockWorkspaceMemberRepository.findOne.mockResolvedValue({
                id: 'workspace-member-id',
                userId: 'user-id'
            });
            const failedCalendarChannel = {
                id: 'calendar-channel-id',
                connectedAccountId: 'existing-account-id',
                syncStatus: 'FAILED_UNKNOWN',
                syncStage: _types.CalendarChannelSyncStage.FAILED
            };
            mockCalendarChannelRepository.find.mockResolvedValue([
                failedCalendarChannel
            ]);
            mockMessageChannelRepository.find.mockResolvedValue([]);
            await service.refreshGoogleRefreshToken({
                handle: 'test@example.com',
                userId: 'user-id',
                workspaceMemberId: 'workspace-member-id',
                workspaceId: 'workspace-id',
                accessToken: 'new-access-token',
                refreshToken: 'new-refresh-token',
                calendarVisibility: _types.CalendarChannelVisibility.SHARE_EVERYTHING,
                messageVisibility: _types.MessageChannelVisibility.SHARE_EVERYTHING
            });
            expect(calendarChannelSyncStatusService.resetAndMarkAsCalendarEventListFetchPending).toHaveBeenCalledWith([
                failedCalendarChannel.id
            ], 'workspace-id');
            expect(messagingChannelSyncStatusService.resetAndMarkAsMessagesListFetchPending).not.toHaveBeenCalled();
            expect(createMessageChannelService.createMessageChannel).toHaveBeenCalled();
        });
    });
});

//# sourceMappingURL=google-apis.service.spec.js.map