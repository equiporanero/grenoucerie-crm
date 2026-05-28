"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _microsoftoauth2clientprovider = require("../../../../../connected-account/oauth2-client-manager/drivers/microsoft/microsoft-oauth2-client.provider");
const _microsoftgetmessagelistservice = require("./microsoft-get-message-list.service");
const _microsoftmessagelistfetcherrorhandlerservice = require("./microsoft-message-list-fetch-error-handler.service");
const createMockFolder = (overrides)=>({
        id: `folder-${overrides.externalId}`,
        syncCursor: null,
        isSentFolder: false,
        parentFolderId: null,
        pendingSyncAction: _types.MessageFolderPendingSyncAction.NONE,
        ...overrides
    });
describe('MicrosoftGetMessageListService', ()=>{
    let service;
    let microsoftOAuth2ClientProvider;
    const mockConnectedAccount = {
        id: 'connected-account-id',
        provider: _types.ConnectedAccountProvider.MICROSOFT,
        handle: 'test@outlook.com'
    };
    const createMockMicrosoftClient = ()=>({
            api: jest.fn().mockReturnThis(),
            version: jest.fn().mockReturnThis(),
            headers: jest.fn().mockReturnThis(),
            get: jest.fn().mockResolvedValue({
                value: [
                    {
                        id: 'msg-1'
                    },
                    {
                        id: 'msg-2'
                    }
                ],
                '@odata.deltaLink': 'https://graph.microsoft.com/delta?token=abc'
            })
        });
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _microsoftgetmessagelistservice.MicrosoftGetMessageListService,
                {
                    provide: _microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider,
                    useValue: {
                        getClient: jest.fn()
                    }
                },
                {
                    provide: _microsoftmessagelistfetcherrorhandlerservice.MicrosoftMessageListFetchErrorHandler,
                    useValue: {
                        handleError: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_microsoftgetmessagelistservice.MicrosoftGetMessageListService);
        microsoftOAuth2ClientProvider = module.get(_microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider);
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    describe('folder filtering based on import policy', ()=>{
        it('should only process synced folders when SELECTED_FOLDERS policy is set', async ()=>{
            const mockClient = createMockMicrosoftClient();
            microsoftOAuth2ClientProvider.getClient.mockResolvedValue(mockClient);
            const syncedFolder = createMockFolder({
                name: 'Inbox',
                externalId: 'inbox-id',
                isSynced: true
            });
            const nonSyncedFolder = createMockFolder({
                name: 'Personal',
                externalId: 'personal-id',
                isSynced: false
            });
            const result = await service.getMessageLists({
                connectedAccount: mockConnectedAccount,
                messageChannel: {
                    syncCursor: '',
                    id: 'channel-1',
                    messageFolderImportPolicy: _types.MessageFolderImportPolicy.SELECTED_FOLDERS
                },
                messageFolders: [
                    syncedFolder,
                    nonSyncedFolder
                ]
            });
            expect(result).toHaveLength(1);
            expect(result[0].folderId).toBe(syncedFolder.id);
            expect(microsoftOAuth2ClientProvider.getClient).toHaveBeenCalledTimes(1);
        });
        it('should process all folders when ALL_FOLDERS policy is set', async ()=>{
            const mockClient = createMockMicrosoftClient();
            microsoftOAuth2ClientProvider.getClient.mockResolvedValue(mockClient);
            const syncedFolder = createMockFolder({
                name: 'Inbox',
                externalId: 'inbox-id',
                isSynced: true
            });
            const nonSyncedFolder = createMockFolder({
                name: 'Personal',
                externalId: 'personal-id',
                isSynced: false
            });
            const result = await service.getMessageLists({
                connectedAccount: mockConnectedAccount,
                messageChannel: {
                    syncCursor: '',
                    id: 'channel-1',
                    messageFolderImportPolicy: _types.MessageFolderImportPolicy.ALL_FOLDERS
                },
                messageFolders: [
                    syncedFolder,
                    nonSyncedFolder
                ]
            });
            expect(result).toHaveLength(2);
            expect(result.map((r)=>r.folderId)).toEqual([
                syncedFolder.id,
                nonSyncedFolder.id
            ]);
        });
        it('should return empty array when SELECTED_FOLDERS policy and no folders are synced', async ()=>{
            const nonSyncedFolder1 = createMockFolder({
                name: 'Personal',
                externalId: 'personal-id',
                isSynced: false
            });
            const nonSyncedFolder2 = createMockFolder({
                name: 'Work',
                externalId: 'work-id',
                isSynced: false
            });
            const result = await service.getMessageLists({
                connectedAccount: mockConnectedAccount,
                messageChannel: {
                    syncCursor: '',
                    id: 'channel-1',
                    messageFolderImportPolicy: _types.MessageFolderImportPolicy.SELECTED_FOLDERS
                },
                messageFolders: [
                    nonSyncedFolder1,
                    nonSyncedFolder2
                ]
            });
            expect(result).toEqual([]);
        });
        it('should process all non-synced folders when ALL_FOLDERS policy is set', async ()=>{
            const mockClient = createMockMicrosoftClient();
            microsoftOAuth2ClientProvider.getClient.mockResolvedValue(mockClient);
            const nonSyncedFolder1 = createMockFolder({
                name: 'Personal',
                externalId: 'personal-id',
                isSynced: false
            });
            const nonSyncedFolder2 = createMockFolder({
                name: 'Work',
                externalId: 'work-id',
                isSynced: false
            });
            const result = await service.getMessageLists({
                connectedAccount: mockConnectedAccount,
                messageChannel: {
                    syncCursor: '',
                    id: 'channel-1',
                    messageFolderImportPolicy: _types.MessageFolderImportPolicy.ALL_FOLDERS
                },
                messageFolders: [
                    nonSyncedFolder1,
                    nonSyncedFolder2
                ]
            });
            expect(result).toHaveLength(2);
        });
        it('should return empty array when ALL_FOLDERS policy but messageFolders array is empty', async ()=>{
            const result = await service.getMessageLists({
                connectedAccount: mockConnectedAccount,
                messageChannel: {
                    syncCursor: '',
                    id: 'channel-1',
                    messageFolderImportPolicy: _types.MessageFolderImportPolicy.ALL_FOLDERS
                },
                messageFolders: []
            });
            expect(result).toEqual([]);
        });
    });
});

//# sourceMappingURL=microsoft-get-message-list.service.spec.js.map