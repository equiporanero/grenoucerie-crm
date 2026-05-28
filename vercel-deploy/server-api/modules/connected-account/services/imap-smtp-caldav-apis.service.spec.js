"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _createcalendarchannelservice = require("../../../engine/core-modules/auth/services/create-calendar-channel.service");
const _createmessagechannelservice = require("../../../engine/core-modules/auth/services/create-message-channel.service");
const _messagequeueconstants = require("../../../engine/core-modules/message-queue/message-queue.constants");
const _getqueuetokenutil = require("../../../engine/core-modules/message-queue/utils/get-queue-token.util");
const _userworkspaceentity = require("../../../engine/core-modules/user-workspace/user-workspace.entity");
const _calendarchannelentity = require("../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _connectedaccountentity = require("../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _messagechannelentity = require("../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _globalworkspaceormmanager = require("../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _calendarchannelsyncstatusservice = require("../../calendar/common/services/calendar-channel-sync-status.service");
const _calendareventlistfetchjob = require("../../calendar/calendar-event-import-manager/jobs/calendar-event-list-fetch.job");
const _connectedaccounttokenencryptionservice = require("../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.service");
const _accountstoreconnectservice = require("./accounts-to-reconnect.service");
const _imapsmtpcaldavapisservice = require("./imap-smtp-caldav-apis.service");
const _messagechannelsyncstatusservice = require("../../messaging/common/services/message-channel-sync-status.service");
const _messagingmessagelistfetchjob = require("../../messaging/message-import-manager/jobs/messaging-message-list-fetch.job");
const _syncmessagefoldersservice = require("../../messaging/message-folder-manager/services/sync-message-folders.service");
jest.mock('uuid', ()=>({
        v4: jest.fn(()=>'mocked-uuid')
    }));
jest.mock('src/engine/twenty-orm/storage/orm-workspace-context.storage', ()=>({
        getWorkspaceContext: jest.fn(()=>({
                authContext: {
                    type: 'user',
                    workspace: {
                        id: 'workspace-id'
                    }
                },
                userWorkspaceRoleMap: {},
                apiKeyRoleMap: {}
            }))
    }));
jest.mock('src/engine/twenty-orm/utils/resolve-role-permission-config.util', ()=>({
        resolveRolePermissionConfig: jest.fn(()=>({
                intersectionOf: [
                    'role-id'
                ]
            }))
    }));
describe('ImapSmtpCalDavAPIService', ()=>{
    let service;
    const mockTransactionManagerSave = jest.fn();
    const mockTransactionManager = {
        getRepository: jest.fn().mockReturnValue({
            save: mockTransactionManagerSave
        })
    };
    const mockConnectedAccountRepository = {
        findOne: jest.fn(),
        save: jest.fn(),
        manager: {
            transaction: jest.fn((callback)=>callback(mockTransactionManager))
        }
    };
    const mockMessageChannelRepository = {
        findOne: jest.fn()
    };
    const mockCalendarChannelRepository = {
        findOne: jest.fn()
    };
    const mockUserWorkspaceRepository = {
        findOne: jest.fn().mockResolvedValue({
            id: 'user-workspace-id',
            userId: 'user-id'
        })
    };
    const mockWorkspaceMemberRepository = {
        findOne: jest.fn().mockResolvedValue({
            id: 'workspace-member-id',
            userId: 'user-id'
        })
    };
    const mockCreateMessageChannelService = {
        createMessageChannel: jest.fn().mockResolvedValue('mocked-uuid')
    };
    const mockCreateCalendarChannelService = {
        createCalendarChannel: jest.fn().mockResolvedValue('mocked-uuid')
    };
    const mockMessageQueueService = {
        add: jest.fn()
    };
    const mockCalendarQueueService = {
        add: jest.fn()
    };
    const mockAccountsToReconnectService = {
        removeAccountToReconnect: jest.fn()
    };
    const mockMessagingChannelSyncStatusService = {
        resetAndMarkAsMessagesListFetchPending: jest.fn()
    };
    const mockCalendarChannelSyncStatusService = {
        resetAndMarkAsCalendarEventListFetchPending: jest.fn()
    };
    const encryptPassword = (password)=>`enc:v2:${password}`;
    const withEncryptedPasswords = (params)=>{
        const result = {};
        for (const protocol of [
            'IMAP',
            'SMTP',
            'CALDAV'
        ]){
            if (params[protocol]) {
                result[protocol] = {
                    ...params[protocol],
                    password: encryptPassword(params[protocol].password)
                };
            }
        }
        return result;
    };
    const mockConnectedAccountTokenEncryptionService = {
        encryptConnectionParameters: jest.fn(({ connectionParameters })=>withEncryptedPasswords(connectionParameters))
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _imapsmtpcaldavapisservice.ImapSmtpCalDavAPIService,
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
                    provide: _createmessagechannelservice.CreateMessageChannelService,
                    useValue: mockCreateMessageChannelService
                },
                {
                    provide: _createcalendarchannelservice.CreateCalendarChannelService,
                    useValue: mockCreateCalendarChannelService
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_connectedaccountentity.ConnectedAccountEntity),
                    useValue: mockConnectedAccountRepository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_messagechannelentity.MessageChannelEntity),
                    useValue: mockMessageChannelRepository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_calendarchannelentity.CalendarChannelEntity),
                    useValue: mockCalendarChannelRepository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userworkspaceentity.UserWorkspaceEntity),
                    useValue: mockUserWorkspaceRepository
                },
                {
                    provide: _syncmessagefoldersservice.SyncMessageFoldersService,
                    useValue: {
                        syncMessageFolders: jest.fn().mockResolvedValue([])
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
                    provide: _accountstoreconnectservice.AccountsToReconnectService,
                    useValue: mockAccountsToReconnectService
                },
                {
                    provide: _messagechannelsyncstatusservice.MessageChannelSyncStatusService,
                    useValue: mockMessagingChannelSyncStatusService
                },
                {
                    provide: _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService,
                    useValue: mockCalendarChannelSyncStatusService
                },
                {
                    provide: _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService,
                    useValue: mockConnectedAccountTokenEncryptionService
                }
            ]
        }).compile();
        service = module.get(_imapsmtpcaldavapisservice.ImapSmtpCalDavAPIService);
        jest.clearAllMocks();
    });
    describe('upsertConnectedAccount', ()=>{
        const baseInput = {
            handle: 'test@example.com',
            userWorkspaceId: 'user-workspace-id',
            workspaceId: 'workspace-id',
            connectionParameters: {
                IMAP: {
                    host: 'imap.example.com',
                    port: 993,
                    secure: true,
                    password: 'password'
                },
                SMTP: {
                    host: 'smtp.example.com',
                    port: 587,
                    secure: true,
                    username: 'test@example.com',
                    password: 'password'
                }
            }
        };
        it('should create new account with message channel when account does not exist and IMAP is configured', async ()=>{
            mockConnectedAccountRepository.findOne.mockResolvedValue(null);
            mockMessageChannelRepository.findOne.mockResolvedValue(null);
            mockCalendarChannelRepository.findOne.mockResolvedValue(null);
            mockWorkspaceMemberRepository.findOne.mockResolvedValue({
                id: 'workspace-member-id',
                userId: 'user-id'
            });
            mockUserWorkspaceRepository.findOne.mockResolvedValue({
                id: 'user-workspace-id',
                userId: 'user-id'
            });
            await service.upsertConnectedAccount(baseInput);
            expect(mockTransactionManagerSave).toHaveBeenCalledWith({
                id: 'mocked-uuid',
                handle: 'test@example.com',
                provider: _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV,
                connectionParameters: withEncryptedPasswords(baseInput.connectionParameters),
                userWorkspaceId: 'user-workspace-id',
                workspaceId: 'workspace-id',
                authFailedAt: null
            });
            expect(mockCreateMessageChannelService.createMessageChannel).toHaveBeenCalledWith({
                workspaceId: 'workspace-id',
                connectedAccountId: 'mocked-uuid',
                handle: 'test@example.com',
                transactionManager: mockTransactionManager
            });
            expect(mockCreateCalendarChannelService.createCalendarChannel).not.toHaveBeenCalled();
        });
        it('should preserve existing channels when updating account credentials', async ()=>{
            const existingAccount = {
                id: 'existing-account-id',
                handle: 'test@example.com',
                userWorkspaceId: 'user-workspace-id',
                provider: _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV
            };
            const existingMessageChannel = {
                id: 'existing-message-channel-id',
                connectedAccountId: 'existing-account-id',
                syncStage: _types.MessageChannelSyncStage.MESSAGE_LIST_FETCH_PENDING
            };
            const existingCalendarChannel = {
                id: 'existing-calendar-channel-id',
                connectedAccountId: 'existing-account-id',
                syncStage: _types.CalendarChannelSyncStage.CALENDAR_EVENT_LIST_FETCH_PENDING
            };
            mockConnectedAccountRepository.findOne.mockResolvedValue(existingAccount);
            mockMessageChannelRepository.findOne.mockResolvedValue(existingMessageChannel);
            mockCalendarChannelRepository.findOne.mockResolvedValue(existingCalendarChannel);
            mockWorkspaceMemberRepository.findOne.mockResolvedValue({
                id: 'workspace-member-id',
                userId: 'user-id'
            });
            mockUserWorkspaceRepository.findOne.mockResolvedValue({
                id: 'user-workspace-id',
                userId: 'user-id'
            });
            const inputWithConnectedAccountId = {
                ...baseInput,
                connectionParameters: {
                    ...baseInput.connectionParameters,
                    CALDAV: {
                        host: 'caldav.example.com',
                        port: 443,
                        secure: true,
                        username: 'test@example.com',
                        password: 'password'
                    }
                },
                connectedAccountId: 'existing-account-id'
            };
            await service.upsertConnectedAccount(inputWithConnectedAccountId);
            expect(mockTransactionManagerSave).toHaveBeenCalledWith({
                id: 'existing-account-id',
                handle: 'test@example.com',
                provider: _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV,
                connectionParameters: withEncryptedPasswords(inputWithConnectedAccountId.connectionParameters),
                userWorkspaceId: 'user-workspace-id',
                workspaceId: 'workspace-id',
                authFailedAt: null
            });
            expect(mockCreateMessageChannelService.createMessageChannel).not.toHaveBeenCalled();
            expect(mockCreateCalendarChannelService.createCalendarChannel).not.toHaveBeenCalled();
            expect(mockAccountsToReconnectService.removeAccountToReconnect).toHaveBeenCalledWith('user-id', 'workspace-id', 'existing-account-id');
            expect(mockMessagingChannelSyncStatusService.resetAndMarkAsMessagesListFetchPending).toHaveBeenCalledWith([
                'existing-message-channel-id'
            ], 'workspace-id');
            expect(mockMessageQueueService.add).toHaveBeenCalledWith(_messagingmessagelistfetchjob.MessagingMessageListFetchJob.name, {
                workspaceId: 'workspace-id',
                messageChannelId: 'existing-message-channel-id'
            });
            expect(mockCalendarChannelSyncStatusService.resetAndMarkAsCalendarEventListFetchPending).toHaveBeenCalledWith([
                'existing-calendar-channel-id'
            ], 'workspace-id');
            expect(mockCalendarQueueService.add).toHaveBeenCalledWith(_calendareventlistfetchjob.CalendarEventListFetchJob.name, {
                workspaceId: 'workspace-id',
                calendarChannelId: 'existing-calendar-channel-id'
            });
        });
        it('should leave channels in PENDING_CONFIGURATION untouched', async ()=>{
            const existingAccount = {
                id: 'existing-account-id',
                handle: 'test@example.com',
                userWorkspaceId: 'user-workspace-id',
                provider: _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV
            };
            const existingMessageChannel = {
                id: 'existing-message-channel-id',
                connectedAccountId: 'existing-account-id',
                syncStage: _types.MessageChannelSyncStage.PENDING_CONFIGURATION
            };
            mockConnectedAccountRepository.findOne.mockResolvedValue(existingAccount);
            mockMessageChannelRepository.findOne.mockResolvedValue(existingMessageChannel);
            mockCalendarChannelRepository.findOne.mockResolvedValue(null);
            mockWorkspaceMemberRepository.findOne.mockResolvedValue({
                id: 'workspace-member-id',
                userId: 'user-id'
            });
            mockUserWorkspaceRepository.findOne.mockResolvedValue({
                id: 'user-workspace-id',
                userId: 'user-id'
            });
            await service.upsertConnectedAccount({
                ...baseInput,
                existingAccount
            });
            expect(mockMessagingChannelSyncStatusService.resetAndMarkAsMessagesListFetchPending).not.toHaveBeenCalled();
            expect(mockMessageQueueService.add).not.toHaveBeenCalled();
        });
        it('should not run reconnect logic when creating a brand new account', async ()=>{
            mockConnectedAccountRepository.findOne.mockResolvedValue(null);
            mockMessageChannelRepository.findOne.mockResolvedValue(null);
            mockCalendarChannelRepository.findOne.mockResolvedValue(null);
            mockWorkspaceMemberRepository.findOne.mockResolvedValue({
                id: 'workspace-member-id',
                userId: 'user-id'
            });
            mockUserWorkspaceRepository.findOne.mockResolvedValue({
                id: 'user-workspace-id',
                userId: 'user-id'
            });
            await service.upsertConnectedAccount(baseInput);
            expect(mockAccountsToReconnectService.removeAccountToReconnect).not.toHaveBeenCalled();
            expect(mockMessagingChannelSyncStatusService.resetAndMarkAsMessagesListFetchPending).not.toHaveBeenCalled();
            expect(mockCalendarChannelSyncStatusService.resetAndMarkAsCalendarEventListFetchPending).not.toHaveBeenCalled();
            expect(mockMessageQueueService.add).not.toHaveBeenCalled();
            expect(mockCalendarQueueService.add).not.toHaveBeenCalled();
        });
        it('should only create message channel when only IMAP is configured', async ()=>{
            const imapOnlyInput = {
                ...baseInput,
                connectionParameters: {
                    IMAP: {
                        host: 'imap.example.com',
                        port: 993,
                        secure: true,
                        password: 'password'
                    }
                }
            };
            mockConnectedAccountRepository.findOne.mockResolvedValue(null);
            mockMessageChannelRepository.findOne.mockResolvedValue(null);
            mockCalendarChannelRepository.findOne.mockResolvedValue(null);
            mockWorkspaceMemberRepository.findOne.mockResolvedValue({
                id: 'workspace-member-id',
                userId: 'user-id'
            });
            mockUserWorkspaceRepository.findOne.mockResolvedValue({
                id: 'user-workspace-id',
                userId: 'user-id'
            });
            await service.upsertConnectedAccount(imapOnlyInput);
            expect(mockCreateMessageChannelService.createMessageChannel).toHaveBeenCalled();
            expect(mockCreateCalendarChannelService.createCalendarChannel).not.toHaveBeenCalled();
        });
        it('should only create calendar channel when only CALDAV is configured', async ()=>{
            const caldavOnlyInput = {
                ...baseInput,
                connectionParameters: {
                    CALDAV: {
                        host: 'caldav.example.com',
                        port: 443,
                        secure: true,
                        username: 'test@example.com',
                        password: 'password'
                    }
                }
            };
            mockConnectedAccountRepository.findOne.mockResolvedValue(null);
            mockMessageChannelRepository.findOne.mockResolvedValue(null);
            mockCalendarChannelRepository.findOne.mockResolvedValue(null);
            mockWorkspaceMemberRepository.findOne.mockResolvedValue({
                id: 'workspace-member-id',
                userId: 'user-id'
            });
            mockUserWorkspaceRepository.findOne.mockResolvedValue({
                id: 'user-workspace-id',
                userId: 'user-id'
            });
            await service.upsertConnectedAccount(caldavOnlyInput);
            expect(mockCreateMessageChannelService.createMessageChannel).not.toHaveBeenCalled();
            expect(mockCreateCalendarChannelService.createCalendarChannel).toHaveBeenCalled();
        });
        it('should handle IMAP + SMTP configuration without CALDAV', async ()=>{
            const imapSmtpInput = {
                ...baseInput,
                connectionParameters: {
                    IMAP: {
                        host: 'imap.example.com',
                        port: 993,
                        secure: true,
                        password: 'password'
                    },
                    SMTP: {
                        host: 'smtp.example.com',
                        port: 587,
                        secure: true,
                        username: 'test@example.com',
                        password: 'password'
                    }
                }
            };
            mockConnectedAccountRepository.findOne.mockResolvedValue(null);
            mockMessageChannelRepository.findOne.mockResolvedValue(null);
            mockCalendarChannelRepository.findOne.mockResolvedValue(null);
            mockWorkspaceMemberRepository.findOne.mockResolvedValue({
                id: 'workspace-member-id',
                userId: 'user-id'
            });
            mockUserWorkspaceRepository.findOne.mockResolvedValue({
                id: 'user-workspace-id',
                userId: 'user-id'
            });
            await service.upsertConnectedAccount(imapSmtpInput);
            expect(mockCreateMessageChannelService.createMessageChannel).toHaveBeenCalled();
            expect(mockCreateCalendarChannelService.createCalendarChannel).not.toHaveBeenCalled();
        });
        it('should handle full IMAP + SMTP + CALDAV configuration', async ()=>{
            const fullConfigInput = {
                ...baseInput,
                connectionParameters: {
                    IMAP: {
                        host: 'imap.example.com',
                        port: 993,
                        secure: true,
                        password: 'password'
                    },
                    SMTP: {
                        host: 'smtp.example.com',
                        port: 587,
                        secure: true,
                        username: 'test@example.com',
                        password: 'password'
                    },
                    CALDAV: {
                        host: 'caldav.example.com',
                        port: 443,
                        secure: true,
                        username: 'test@example.com',
                        password: 'password'
                    }
                }
            };
            mockConnectedAccountRepository.findOne.mockResolvedValue(null);
            mockMessageChannelRepository.findOne.mockResolvedValue(null);
            mockCalendarChannelRepository.findOne.mockResolvedValue(null);
            mockWorkspaceMemberRepository.findOne.mockResolvedValue({
                id: 'workspace-member-id',
                userId: 'user-id'
            });
            mockUserWorkspaceRepository.findOne.mockResolvedValue({
                id: 'user-workspace-id',
                userId: 'user-id'
            });
            await service.upsertConnectedAccount(fullConfigInput);
            expect(mockCreateMessageChannelService.createMessageChannel).toHaveBeenCalled();
            expect(mockCreateCalendarChannelService.createCalendarChannel).toHaveBeenCalled();
        });
        it('should handle account found by handle when connectedAccountId is not provided', async ()=>{
            const existingAccount = {
                id: 'existing-account-id',
                handle: 'test@example.com',
                userWorkspaceId: 'user-workspace-id',
                provider: _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV
            };
            mockConnectedAccountRepository.findOne.mockResolvedValueOnce(existingAccount);
            mockMessageChannelRepository.findOne.mockResolvedValue(null);
            mockCalendarChannelRepository.findOne.mockResolvedValue(null);
            mockWorkspaceMemberRepository.findOne.mockResolvedValue({
                id: 'workspace-member-id',
                userId: 'user-id'
            });
            mockUserWorkspaceRepository.findOne.mockResolvedValue({
                id: 'user-workspace-id',
                userId: 'user-id'
            });
            await service.upsertConnectedAccount(baseInput);
            expect(mockConnectedAccountRepository.findOne).toHaveBeenCalledWith({
                where: {
                    handle: 'test@example.com',
                    userWorkspaceId: 'user-workspace-id',
                    workspaceId: 'workspace-id'
                }
            });
            expect(mockTransactionManagerSave).toHaveBeenCalledWith({
                id: 'existing-account-id',
                handle: 'test@example.com',
                provider: _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV,
                connectionParameters: withEncryptedPasswords(baseInput.connectionParameters),
                userWorkspaceId: 'user-workspace-id',
                workspaceId: 'workspace-id',
                authFailedAt: null
            });
        });
        it('should not create channels when neither IMAP nor CALDAV is configured', async ()=>{
            const smtpOnlyInput = {
                ...baseInput,
                connectionParameters: {
                    SMTP: {
                        host: 'smtp.example.com',
                        port: 587,
                        secure: true,
                        username: 'test@example.com',
                        password: 'password'
                    }
                }
            };
            mockConnectedAccountRepository.findOne.mockResolvedValue(null);
            mockMessageChannelRepository.findOne.mockResolvedValue(null);
            mockCalendarChannelRepository.findOne.mockResolvedValue(null);
            mockWorkspaceMemberRepository.findOne.mockResolvedValue({
                id: 'workspace-member-id',
                userId: 'user-id'
            });
            mockUserWorkspaceRepository.findOne.mockResolvedValue({
                id: 'user-workspace-id',
                userId: 'user-id'
            });
            await service.upsertConnectedAccount(smtpOnlyInput);
            expect(mockCreateMessageChannelService.createMessageChannel).not.toHaveBeenCalled();
            expect(mockCreateCalendarChannelService.createCalendarChannel).not.toHaveBeenCalled();
        });
        it('should handle transaction correctly', async ()=>{
            mockConnectedAccountRepository.findOne.mockResolvedValue(null);
            mockMessageChannelRepository.findOne.mockResolvedValue(null);
            mockCalendarChannelRepository.findOne.mockResolvedValue(null);
            mockWorkspaceMemberRepository.findOne.mockResolvedValue({
                id: 'workspace-member-id',
                userId: 'user-id'
            });
            mockUserWorkspaceRepository.findOne.mockResolvedValue({
                id: 'user-workspace-id',
                userId: 'user-id'
            });
            await service.upsertConnectedAccount(baseInput);
            expect(mockConnectedAccountRepository.manager.transaction).toHaveBeenCalledWith(expect.any(Function));
        });
    });
});

//# sourceMappingURL=imap-smtp-caldav-apis.service.spec.js.map