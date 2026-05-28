"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _cachestorageservice = require("../../../../../engine/core-modules/cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../../../../../engine/core-modules/cache-storage/types/cache-storage-namespace.enum");
const _globalworkspaceormmanager = require("../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _messagechannelsyncstatusservice = require("../../../common/services/message-channel-sync-status.service");
const _messagingmessagecleanerservice = require("../../../message-cleaner/services/messaging-message-cleaner.service");
const _syncmessagefoldersservice = require("../../../message-folder-manager/services/sync-message-folders.service");
const _messagingcursorservice = require("../messaging-cursor.service");
const _messaginggetmessagelistservice = require("../messaging-get-message-list.service");
const _messagingimportexceptionhandlerservice = require("../messaging-import-exception-handler.service");
const _messagingmessagelistfetchservice = require("../messaging-message-list-fetch.service");
const _messagingmessagesimportservice = require("../messaging-messages-import.service");
const _messagingprocessfolderactionsservice = require("../messaging-process-folder-actions.service");
const _messagingprocessgroupemailactionsservice = require("../messaging-process-group-email-actions.service");
const _messagechannelentity = require("../../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _typeorm = require("@nestjs/typeorm");
describe('MessagingMessageListFetchService', ()=>{
    let messagingMessageListFetchService;
    let messagingGetMessageListService;
    let messageChannelSyncStatusService;
    let globalWorkspaceOrmManager;
    let messagingCursorService;
    let mockMicrosoftMessageChannel;
    let mockGoogleMessageChannel;
    const workspaceId = 'workspace-id';
    beforeAll(()=>{
        mockMicrosoftMessageChannel = {
            id: 'microsoft-message-channel-id',
            connectedAccount: {
                id: 'microsoft-connected-account-id',
                provider: _types.ConnectedAccountProvider.MICROSOFT,
                handle: 'test@microsoft.com',
                accessToken: 'old-microsoft-access-token',
                refreshToken: 'microsoft-refresh-token',
                handleAliases: []
            },
            messageFolders: [
                {
                    id: 'inbox-folder-id',
                    name: 'inbox',
                    syncCursor: 'inbox-sync-cursor',
                    messageChannelId: 'microsoft-message-channel-id'
                }
            ],
            messageFolderImportPolicy: _types.MessageFolderImportPolicy.SELECTED_FOLDERS
        };
        mockGoogleMessageChannel = {
            id: 'google-message-channel-id',
            connectedAccount: {
                id: 'google-connected-account-id',
                provider: _types.ConnectedAccountProvider.GOOGLE,
                handle: 'test@gmail.com',
                accessToken: 'old-google-access-token',
                refreshToken: 'google-refresh-token',
                handleAliases: []
            },
            syncCursor: 'google-sync-cursor',
            messageFolders: [],
            messageFolderImportPolicy: _types.MessageFolderImportPolicy.SELECTED_FOLDERS
        };
    });
    beforeEach(async ()=>{
        const mockMessageChannelMessageAssociationRepository = {
            find: jest.fn().mockResolvedValue([
                {
                    messageExternalId: 'external-id-existing-message-1'
                },
                {
                    messageExternalId: 'external-id-existing-message-2'
                }
            ]),
            delete: jest.fn().mockResolvedValue(undefined)
        };
        const mockMessageFolderRepository = {
            find: jest.fn().mockImplementation(({ where })=>{
                if (where?.pendingSyncAction === 'FOLDER_DELETION') {
                    return [];
                }
                return [
                    {
                        id: 'inbox-folder-id',
                        name: 'inbox',
                        syncCursor: 'inbox-sync-cursor',
                        messageChannelId: 'microsoft-message-channel-id',
                        isSynced: true
                    }
                ];
            })
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _messagingmessagelistfetchservice.MessagingMessageListFetchService,
                {
                    provide: _cachestoragenamespaceenum.CacheStorageNamespace.ModuleMessaging,
                    useValue: {
                        setAdd: jest.fn().mockResolvedValue(undefined),
                        del: jest.fn().mockResolvedValue(undefined)
                    }
                },
                {
                    provide: _messaginggetmessagelistservice.MessagingGetMessageListService,
                    useValue: {
                        getMessageLists: jest.fn().mockImplementation((messageChannel)=>{
                            if (messageChannel.connectedAccount.provider === _types.ConnectedAccountProvider.GOOGLE) {
                                return [
                                    {
                                        messageExternalIds: [
                                            'external-id-existing-message-1',
                                            'external-id-google-message-1',
                                            'external-id-google-message-2'
                                        ],
                                        nextSyncCursor: 'new-google-history-id',
                                        folderId: undefined,
                                        messageExternalIdsToDelete: [],
                                        previousSyncCursor: 'google-sync-cursor'
                                    }
                                ];
                            } else {
                                return [
                                    {
                                        messageExternalIds: [
                                            'external-id-existing-message-1',
                                            'external-id-new-message-1',
                                            'external-id-new-message-2'
                                        ],
                                        nextSyncCursor: 'new-sync-cursor',
                                        folderId: 'inbox-folder-id',
                                        messageExternalIdsToDelete: [],
                                        previousSyncCursor: 'inbox-sync-cursor'
                                    }
                                ];
                            }
                        })
                    }
                },
                {
                    provide: _messagingmessagesimportservice.MessagingMessagesImportService,
                    useValue: {
                        processMessageBatchImport: jest.fn().mockResolvedValue(undefined)
                    }
                },
                {
                    provide: _messagechannelsyncstatusservice.MessageChannelSyncStatusService,
                    useValue: {
                        markAsMessagesListFetchOngoing: jest.fn().mockResolvedValue(undefined),
                        markAsMessagesImportPending: jest.fn().mockResolvedValue(undefined),
                        markAsMessagesImportScheduled: jest.fn().mockResolvedValue(undefined)
                    }
                },
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: {
                        getGlobalWorkspaceDataSource: jest.fn().mockResolvedValue({
                            manager: {}
                        }),
                        executeInWorkspaceContext: jest.fn().mockImplementation((fn, _authContext)=>fn()),
                        getRepository: jest.fn().mockImplementation((workspaceId, name)=>{
                            if (name === 'messageChannel') {
                                return {
                                    findOne: jest.fn().mockResolvedValue(undefined)
                                };
                            }
                            if (name === 'messageChannelMessageAssociation') {
                                return mockMessageChannelMessageAssociationRepository;
                            }
                            if (name === 'messageFolder') {
                                return mockMessageFolderRepository;
                            }
                        })
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_messagechannelentity.MessageChannelEntity),
                    useValue: {
                        findOne: jest.fn().mockResolvedValue(undefined)
                    }
                },
                {
                    provide: _messagingcursorservice.MessagingCursorService,
                    useValue: {
                        updateCursor: jest.fn().mockResolvedValue(undefined)
                    }
                },
                {
                    provide: _cachestorageservice.CacheStorageService,
                    useValue: {
                        setAdd: jest.fn().mockResolvedValue(undefined),
                        del: jest.fn().mockResolvedValue(undefined)
                    }
                },
                {
                    provide: _messagingimportexceptionhandlerservice.MessageImportExceptionHandlerService,
                    useValue: {
                        handleDriverException: jest.fn().mockResolvedValue(undefined)
                    }
                },
                {
                    provide: _messagingmessagecleanerservice.MessagingMessageCleanerService,
                    useValue: {
                        cleanWorkspaceThreads: jest.fn().mockResolvedValue(undefined)
                    }
                },
                {
                    provide: _syncmessagefoldersservice.SyncMessageFoldersService,
                    useValue: {
                        syncMessageFolders: jest.fn().mockResolvedValue([
                            {
                                id: 'inbox-folder-id',
                                name: 'inbox',
                                syncCursor: 'inbox-sync-cursor',
                                messageChannelId: 'microsoft-message-channel-id',
                                isSynced: true,
                                pendingSyncAction: _types.MessageFolderPendingSyncAction.NONE
                            }
                        ])
                    }
                },
                {
                    provide: _messagingprocessgroupemailactionsservice.MessagingProcessGroupEmailActionsService,
                    useValue: {
                        processGroupEmailActions: jest.fn().mockResolvedValue(undefined)
                    }
                },
                {
                    provide: _messagingprocessfolderactionsservice.MessagingProcessFolderActionsService,
                    useValue: {
                        processFolderActions: jest.fn().mockResolvedValue(undefined)
                    }
                }
            ]
        }).compile();
        messagingMessageListFetchService = module.get(_messagingmessagelistfetchservice.MessagingMessageListFetchService);
        messagingGetMessageListService = module.get(_messaginggetmessagelistservice.MessagingGetMessageListService);
        messageChannelSyncStatusService = module.get(_messagechannelsyncstatusservice.MessageChannelSyncStatusService);
        globalWorkspaceOrmManager = module.get(_globalworkspaceormmanager.GlobalWorkspaceOrmManager);
        messagingCursorService = module.get(_messagingcursorservice.MessagingCursorService);
    });
    it('should process Microsoft message list fetch correctly', async ()=>{
        await messagingMessageListFetchService.processMessageListFetch(mockMicrosoftMessageChannel, workspaceId);
        expect(messageChannelSyncStatusService.markAsMessagesListFetchOngoing).toHaveBeenCalledWith([
            mockMicrosoftMessageChannel.id
        ], workspaceId);
        expect(messagingGetMessageListService.getMessageLists).toHaveBeenCalledWith(mockMicrosoftMessageChannel, [
            {
                id: 'inbox-folder-id',
                name: 'inbox',
                syncCursor: 'inbox-sync-cursor',
                messageChannelId: 'microsoft-message-channel-id',
                isSynced: true,
                pendingSyncAction: _types.MessageFolderPendingSyncAction.NONE
            }
        ]);
        expect(globalWorkspaceOrmManager.getRepository).toHaveBeenCalledWith(workspaceId, 'messageChannelMessageAssociation');
        expect(messagingCursorService.updateCursor).toHaveBeenCalledWith(mockMicrosoftMessageChannel, 'new-sync-cursor', workspaceId, 'inbox-folder-id');
        expect(messageChannelSyncStatusService.markAsMessagesImportScheduled).toHaveBeenCalledWith([
            mockMicrosoftMessageChannel.id
        ], workspaceId);
    });
    it('should process Google message list fetch correctly', async ()=>{
        await messagingMessageListFetchService.processMessageListFetch(mockGoogleMessageChannel, workspaceId);
        expect(messageChannelSyncStatusService.markAsMessagesListFetchOngoing).toHaveBeenCalledWith([
            mockGoogleMessageChannel.id
        ], workspaceId);
        expect(messagingGetMessageListService.getMessageLists).toHaveBeenCalledWith(mockGoogleMessageChannel, [
            {
                id: 'inbox-folder-id',
                name: 'inbox',
                syncCursor: 'inbox-sync-cursor',
                messageChannelId: 'microsoft-message-channel-id',
                isSynced: true,
                pendingSyncAction: _types.MessageFolderPendingSyncAction.NONE
            }
        ]);
        expect(globalWorkspaceOrmManager.getRepository).toHaveBeenCalledWith(workspaceId, 'messageChannelMessageAssociation');
        expect(messagingCursorService.updateCursor).toHaveBeenCalledWith(mockGoogleMessageChannel, 'new-google-history-id', workspaceId, undefined);
        expect(messageChannelSyncStatusService.markAsMessagesImportScheduled).toHaveBeenCalledWith([
            mockGoogleMessageChannel.id
        ], workspaceId);
    });
});

//# sourceMappingURL=messaging-message-list-fetch.service.spec.js.map