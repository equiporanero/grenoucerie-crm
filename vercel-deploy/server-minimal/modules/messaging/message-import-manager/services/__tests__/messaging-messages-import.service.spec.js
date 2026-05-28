"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _cachestorageservice = require("../../../../../engine/core-modules/cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../../../../../engine/core-modules/cache-storage/types/cache-storage-namespace.enum");
const _globalworkspaceormmanager = require("../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _blocklistrepository = require("../../../../blocklist/repositories/blocklist.repository");
const _emailaliasmanagerservice = require("../../../../connected-account/email-alias-manager/services/email-alias-manager.service");
const _messagechannelsyncstatusservice = require("../../../common/services/message-channel-sync-status.service");
const _twentyconfigservice = require("../../../../../engine/core-modules/twenty-config/twenty-config.service");
const _messaginggetmessagesservice = require("../messaging-get-messages.service");
const _messagingimportexceptionhandlerservice = require("../messaging-import-exception-handler.service");
const _messagingmessagesimportservice = require("../messaging-messages-import.service");
const _messagingsavemessagesandenqueuecontactcreationservice = require("../messaging-save-messages-and-enqueue-contact-creation.service");
const _typeorm = require("@nestjs/typeorm");
const _messagingmonitoringservice = require("../../../monitoring/services/messaging-monitoring.service");
const _messagechannelentity = require("../../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _userworkspaceentity = require("../../../../../engine/core-modules/user-workspace/user-workspace.entity");
const _workspaceentity = require("../../../../../engine/core-modules/workspace/workspace.entity");
describe('MessagingMessagesImportService', ()=>{
    let service;
    let messageChannelSyncStatusService;
    let emailAliasManagerService;
    let messagingGetMessagesService;
    let saveMessagesService;
    const workspaceId = 'workspace-id';
    let mockMessageChannel;
    let mockConnectedAccount;
    let providersBase;
    beforeEach(async ()=>{
        mockConnectedAccount = {
            id: 'connected-account-id',
            provider: _types.ConnectedAccountProvider.GOOGLE,
            handle: 'test@gmail.com',
            refreshToken: 'refresh-token',
            accessToken: 'old-access-token',
            userWorkspaceId: 'user-workspace-id',
            handleAliases: [
                'alias1@gmail.com',
                'alias2@gmail.com'
            ]
        };
        mockMessageChannel = {
            id: 'message-channel-id',
            syncStage: _types.MessageChannelSyncStage.MESSAGES_IMPORT_SCHEDULED,
            connectedAccountId: mockConnectedAccount.id,
            handle: 'test@gmail.com',
            messageFolders: [],
            messageFolderImportPolicy: _types.MessageFolderImportPolicy.ALL_FOLDERS
        };
        providersBase = [
            _messagingmessagesimportservice.MessagingMessagesImportService,
            {
                provide: _cachestorageservice.CacheStorageService,
                useValue: {
                    setAdd: jest.fn().mockResolvedValue(undefined)
                }
            },
            {
                provide: _messagechannelsyncstatusservice.MessageChannelSyncStatusService,
                useValue: {
                    markAsMessagesImportOngoing: jest.fn().mockResolvedValue(undefined),
                    markAsCompletedAndMarkAsMessagesListFetchPending: jest.fn().mockResolvedValue(undefined),
                    markAsMessagesImportPending: jest.fn().mockResolvedValue(undefined)
                }
            },
            {
                provide: _messagingmonitoringservice.MessagingMonitoringService,
                useValue: {
                    track: jest.fn().mockResolvedValue(undefined)
                }
            },
            {
                provide: 'BlocklistRepository',
                useValue: {
                    getByWorkspaceMemberId: jest.fn().mockResolvedValue([])
                }
            },
            {
                provide: _blocklistrepository.BlocklistRepository,
                useValue: {
                    getByWorkspaceMemberId: jest.fn().mockResolvedValue([])
                }
            },
            {
                provide: _emailaliasmanagerservice.EmailAliasManagerService,
                useValue: {
                    refreshHandleAliases: jest.fn().mockResolvedValue([
                        'alias1@gmail.com',
                        'alias2@gmail.com'
                    ])
                }
            },
            {
                provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                useValue: {
                    getRepository: jest.fn().mockResolvedValue({
                        update: jest.fn().mockResolvedValue(undefined),
                        findOne: jest.fn().mockResolvedValue({
                            id: 'workspace-member-id',
                            userId: 'user-id'
                        })
                    }),
                    executeInWorkspaceContext: jest.fn().mockImplementation((fn, _authContext)=>fn())
                }
            },
            {
                provide: (0, _typeorm.getRepositoryToken)(_messagechannelentity.MessageChannelEntity),
                useValue: {
                    update: jest.fn().mockResolvedValue(undefined)
                }
            },
            {
                provide: _messaginggetmessagesservice.MessagingGetMessagesService,
                useValue: {
                    getMessages: jest.fn().mockResolvedValue([
                        {
                            id: 'message-1',
                            from: 'sender@example.com',
                            to: 'test@gmail.com'
                        },
                        {
                            id: 'message-2',
                            from: 'test@gmail.com',
                            to: 'recipient@example.com'
                        }
                    ])
                }
            },
            {
                provide: _messagingsavemessagesandenqueuecontactcreationservice.MessagingSaveMessagesAndEnqueueContactCreationService,
                useValue: {
                    saveMessagesAndEnqueueContactCreation: jest.fn().mockResolvedValue(undefined)
                }
            },
            {
                provide: _messagingimportexceptionhandlerservice.MessageImportExceptionHandlerService,
                useValue: {
                    handleDriverException: jest.fn().mockResolvedValue(undefined)
                }
            },
            {
                provide: (0, _typeorm.getRepositoryToken)(_userworkspaceentity.UserWorkspaceEntity),
                useValue: {
                    findOne: jest.fn().mockResolvedValue({
                        userId: 'user-id'
                    })
                }
            },
            {
                provide: (0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity),
                useValue: {
                    findOne: jest.fn().mockResolvedValue({
                        isInternalMessagesImportEnabled: false
                    })
                }
            },
            {
                provide: _twentyconfigservice.TwentyConfigService,
                useValue: {
                    get: jest.fn().mockReturnValue(400)
                }
            }
        ];
        const module = await _testing.Test.createTestingModule({
            providers: [
                ...providersBase,
                {
                    provide: _cachestoragenamespaceenum.CacheStorageNamespace.ModuleMessaging,
                    useValue: {
                        setPop: jest.fn().mockResolvedValue([
                            'message-id-1',
                            'message-id-2'
                        ]),
                        setAdd: jest.fn().mockResolvedValue(undefined)
                    }
                }
            ]
        }).overrideProvider(_common.Logger).useValue({
            log: jest.fn()
        }).compile();
        service = module.get(_messagingmessagesimportservice.MessagingMessagesImportService);
        messageChannelSyncStatusService = module.get(_messagechannelsyncstatusservice.MessageChannelSyncStatusService);
        emailAliasManagerService = module.get(_emailaliasmanagerservice.EmailAliasManagerService);
        messagingGetMessagesService = module.get(_messaginggetmessagesservice.MessagingGetMessagesService);
        saveMessagesService = module.get(_messagingsavemessagesandenqueuecontactcreationservice.MessagingSaveMessagesAndEnqueueContactCreationService);
    });
    it('should fails if SyncStage is not MESSAGES_IMPORT_SCHEDULED', async ()=>{
        mockMessageChannel.syncStage = _types.MessageChannelSyncStage.MESSAGES_IMPORT_PENDING;
        await expect(service.processMessageBatchImport(mockMessageChannel, mockConnectedAccount, workspaceId)).resolves.toBeFalsy();
    });
    it('should process message batch import successfully', async ()=>{
        await service.processMessageBatchImport(mockMessageChannel, mockConnectedAccount, workspaceId);
        expect(messageChannelSyncStatusService.markAsMessagesImportOngoing).toHaveBeenCalledWith([
            mockMessageChannel.id
        ], workspaceId);
        expect(emailAliasManagerService.refreshHandleAliases).not.toHaveBeenCalled();
        expect(messagingGetMessagesService.getMessages).toHaveBeenCalledWith([
            'message-id-1',
            'message-id-2'
        ], mockConnectedAccount, mockMessageChannel);
        expect(saveMessagesService.saveMessagesAndEnqueueContactCreation).toHaveBeenCalled();
        expect(messageChannelSyncStatusService.markAsMessagesImportPending).toHaveBeenCalledTimes(0);
    });
    it('should process message batch import of more than MESSAGING_GMAIL_USERS_MESSAGES_GET_BATCH_SIZE successfully', async ()=>{
        const arrayMessagesBig = Array.from({
            length: 401
        }, (_, index)=>`message-id-${index + 1}`);
        const module = await _testing.Test.createTestingModule({
            providers: [
                ...providersBase,
                {
                    provide: _cachestoragenamespaceenum.CacheStorageNamespace.ModuleMessaging,
                    useValue: {
                        setPop: jest.fn().mockResolvedValue(arrayMessagesBig),
                        setAdd: jest.fn().mockResolvedValue(undefined)
                    }
                }
            ]
        }).overrideProvider(_common.Logger).useValue({
            log: jest.fn()
        }).compile();
        service = module.get(_messagingmessagesimportservice.MessagingMessagesImportService);
        messageChannelSyncStatusService = module.get(_messagechannelsyncstatusservice.MessageChannelSyncStatusService);
        emailAliasManagerService = module.get(_emailaliasmanagerservice.EmailAliasManagerService);
        messagingGetMessagesService = module.get(_messaginggetmessagesservice.MessagingGetMessagesService);
        saveMessagesService = module.get(_messagingsavemessagesandenqueuecontactcreationservice.MessagingSaveMessagesAndEnqueueContactCreationService);
        await service.processMessageBatchImport(mockMessageChannel, mockConnectedAccount, workspaceId);
        expect(messageChannelSyncStatusService.markAsMessagesImportPending).toHaveBeenCalledTimes(1);
    });
});

//# sourceMappingURL=messaging-messages-import.service.spec.js.map