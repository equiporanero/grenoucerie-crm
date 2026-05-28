"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _imapclientprovider = require("../providers/imap-client.provider");
const _imapgetmessagelistservice = require("./imap-get-message-list.service");
const _imapmessagelistfetcherrorhandlerservice = require("./imap-message-list-fetch-error-handler.service");
const _imapsyncservice = require("./imap-sync.service");
const createMockFolder = (overrides)=>({
        id: `folder-${overrides.externalId}`,
        syncCursor: null,
        isSentFolder: false,
        parentFolderId: null,
        pendingSyncAction: _types.MessageFolderPendingSyncAction.NONE,
        ...overrides
    });
describe('ImapGetMessageListService', ()=>{
    let service;
    let imapClientProvider;
    const mockConnectedAccount = {
        id: 'connected-account-id',
        provider: _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV,
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        handle: 'test@example.com',
        connectionParameters: {},
        workspaceId: 'workspace-id'
    };
    const mockImapClient = {
        getMailboxLock: jest.fn().mockResolvedValue({
            release: jest.fn()
        }),
        mailbox: {
            uidValidity: 12345,
            uidNext: 100,
            highestModseq: '1000'
        },
        capabilities: new Set([
            'CONDSTORE'
        ]),
        status: jest.fn().mockResolvedValue({
            uidValidity: 12345,
            uidNext: 100,
            highestModseq: '1000'
        })
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _imapgetmessagelistservice.ImapGetMessageListService,
                {
                    provide: _imapclientprovider.ImapClientProvider,
                    useValue: {
                        getClient: jest.fn().mockResolvedValue(mockImapClient),
                        closeClient: jest.fn().mockResolvedValue(undefined)
                    }
                },
                {
                    provide: _imapsyncservice.ImapSyncService,
                    useValue: {
                        syncFolder: jest.fn().mockResolvedValue({
                            messageUids: [
                                1,
                                2,
                                3
                            ]
                        })
                    }
                },
                {
                    provide: _imapmessagelistfetcherrorhandlerservice.ImapMessageListFetchErrorHandler,
                    useValue: {
                        handleError: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_imapgetmessagelistservice.ImapGetMessageListService);
        imapClientProvider = module.get(_imapclientprovider.ImapClientProvider);
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    describe('folder filtering based on import policy', ()=>{
        it('should only process synced folders when SELECTED_FOLDERS policy is set', async ()=>{
            const syncedFolder = createMockFolder({
                name: 'INBOX',
                externalId: 'INBOX:1',
                isSynced: true
            });
            const nonSyncedFolder = createMockFolder({
                name: 'Personal',
                externalId: 'Personal:1',
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
        });
        it('should process all folders when ALL_FOLDERS policy is set', async ()=>{
            const syncedFolder = createMockFolder({
                name: 'INBOX',
                externalId: 'INBOX:1',
                isSynced: true
            });
            const nonSyncedFolder = createMockFolder({
                name: 'Personal',
                externalId: 'Personal:1',
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
                externalId: 'Personal:1',
                isSynced: false
            });
            const nonSyncedFolder2 = createMockFolder({
                name: 'Work',
                externalId: 'Work:1',
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
            expect(result).toHaveLength(0);
        });
        it('should process all non-synced folders when ALL_FOLDERS policy is set', async ()=>{
            const nonSyncedFolder1 = createMockFolder({
                name: 'Personal',
                externalId: 'Personal:1',
                isSynced: false
            });
            const nonSyncedFolder2 = createMockFolder({
                name: 'Work',
                externalId: 'Work:1',
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
        it('should always close the IMAP client regardless of policy', async ()=>{
            const folder = createMockFolder({
                name: 'INBOX',
                externalId: 'INBOX:1',
                isSynced: true
            });
            await service.getMessageLists({
                connectedAccount: mockConnectedAccount,
                messageChannel: {
                    syncCursor: '',
                    id: 'channel-1',
                    messageFolderImportPolicy: _types.MessageFolderImportPolicy.ALL_FOLDERS
                },
                messageFolders: [
                    folder
                ]
            });
            expect(imapClientProvider.closeClient).toHaveBeenCalledTimes(1);
        });
    });
});

//# sourceMappingURL=imap-get-message-list.service.spec.js.map