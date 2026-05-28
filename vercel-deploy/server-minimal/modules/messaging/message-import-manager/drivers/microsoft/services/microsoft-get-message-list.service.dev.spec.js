"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _config = require("@nestjs/config");
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _twentyconfigmodule = require("../../../../../../engine/core-modules/twenty-config/twenty-config.module");
const _connectedaccounttokenencryptionservice = require("../../../../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.service");
const _messagechannelentity = require("../../../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _messagefolderentity = require("../../../../../../engine/metadata-modules/message-folder/entities/message-folder.entity");
const _microsoftoauth2clientprovider = require("../../../../../connected-account/oauth2-client-manager/drivers/microsoft/microsoft-oauth2-client.provider");
const _microsoftapiexamples = require("../mocks/microsoft-api-examples");
const _folders = require("../types/folders");
const _microsoftgetmessagelistservice = require("./microsoft-get-message-list.service");
const _microsoftmessagelistfetcherrorhandlerservice = require("./microsoft-message-list-fetch-error-handler.service");
const syncCursor = `replace-with-your-sync-cursor`;
const mockConnectedAccount = {
    id: 'connected-account-id',
    provider: _types.ConnectedAccountProvider.MICROSOFT,
    handle: 'test@outlook.com'
};
const mockMessageChannel = {
    id: 'message-channel-id',
    syncCursor: '',
    messageFolderImportPolicy: _types.MessageFolderImportPolicy.SELECTED_FOLDERS
};
xdescribe('Microsoft dev tests : get message list service', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            imports: [
                _twentyconfigmodule.TwentyConfigModule.forRoot()
            ],
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
                },
                _config.ConfigService,
                {
                    provide: _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService,
                    useValue: {}
                }
            ]
        }).compile();
        service = module.get(_microsoftgetmessagelistservice.MicrosoftGetMessageListService);
    });
    it('Should fetch and return message list successfully', async ()=>{
        const result = await service.getMessageLists({
            connectedAccount: mockConnectedAccount,
            messageChannel: mockMessageChannel,
            messageFolders: [
                {
                    id: 'inbox-folder-id',
                    name: _folders.MessageFolderName.INBOX,
                    syncCursor: 'inbox-sync-cursor',
                    isSynced: false,
                    isSentFolder: false,
                    externalId: null,
                    parentFolderId: null,
                    pendingSyncAction: _types.MessageFolderPendingSyncAction.NONE
                }
            ]
        });
        expect(result[0].messageExternalIds.length).toBeGreaterThan(0);
    });
    // if you need to run this test, you need to manually update the syncCursor to a valid one
    xit('Should fetch and return partial message list successfully', async ()=>{
        const result = await service.getMessageLists({
            connectedAccount: mockConnectedAccount,
            messageChannel: mockMessageChannel,
            messageFolders: [
                {
                    id: 'inbox-folder-id',
                    name: _folders.MessageFolderName.INBOX,
                    syncCursor: syncCursor,
                    isSynced: false,
                    isSentFolder: false,
                    externalId: null,
                    parentFolderId: null,
                    pendingSyncAction: _types.MessageFolderPendingSyncAction.NONE
                }
            ]
        });
        expect(result[0].nextSyncCursor).toBeTruthy();
    });
    it('Should fail partial message if syncCursor is invalid', async ()=>{
        await expect(service.getMessageLists({
            messageChannel: {
                id: 'message-channel-id',
                syncCursor: '',
                messageFolderImportPolicy: _types.MessageFolderImportPolicy.SELECTED_FOLDERS
            },
            connectedAccount: mockConnectedAccount,
            messageFolders: [
                {
                    id: 'inbox-folder-id',
                    name: _folders.MessageFolderName.INBOX,
                    syncCursor: 'invalid-syncCursor',
                    isSynced: false,
                    isSentFolder: false,
                    externalId: null,
                    parentFolderId: null,
                    pendingSyncAction: _types.MessageFolderPendingSyncAction.NONE
                }
            ]
        })).rejects.toThrowError(/Resource not found for the segment|Badly formed content/g);
    });
});
xdescribe('Microsoft dev tests : get message list service for folders', ()=>{
    let service;
    const inboxFolder = new _messagefolderentity.MessageFolderEntity();
    inboxFolder.id = 'inbox-folder-id';
    inboxFolder.name = _folders.MessageFolderName.INBOX;
    inboxFolder.syncCursor = 'inbox-sync-cursor';
    inboxFolder.messageChannelId = 'message-channel-1';
    inboxFolder.parentFolderId = null;
    const sentFolder = new _messagefolderentity.MessageFolderEntity();
    sentFolder.id = 'sent-folder-id';
    sentFolder.name = _folders.MessageFolderName.SENT_ITEMS;
    sentFolder.syncCursor = 'sent-sync-cursor';
    sentFolder.messageChannelId = 'message-channel-1';
    sentFolder.parentFolderId = null;
    const otherFolder = new _messagefolderentity.MessageFolderEntity();
    otherFolder.id = 'other-folder-id';
    otherFolder.name = 'other';
    otherFolder.syncCursor = 'other-sync-cursor';
    otherFolder.messageChannelId = 'message-channel-2';
    otherFolder.parentFolderId = null;
    const messageChannelNoFolders = new _messagechannelentity.MessageChannelEntity();
    messageChannelNoFolders.id = 'message-channel-0';
    messageChannelNoFolders.messageFolders = [];
    messageChannelNoFolders.syncCursor = '';
    messageChannelNoFolders.messageFolderImportPolicy = _types.MessageFolderImportPolicy.SELECTED_FOLDERS;
    const messageChannelMicrosoftOneFolder = new _messagechannelentity.MessageChannelEntity();
    messageChannelMicrosoftOneFolder.id = 'message-channel-1';
    messageChannelMicrosoftOneFolder.messageFolders = [
        inboxFolder
    ];
    messageChannelMicrosoftOneFolder.syncCursor = '';
    messageChannelMicrosoftOneFolder.messageFolderImportPolicy = _types.MessageFolderImportPolicy.SELECTED_FOLDERS;
    const messageChannelMicrosoft = new _messagechannelentity.MessageChannelEntity();
    messageChannelMicrosoft.id = 'message-channel-2';
    messageChannelMicrosoft.messageFolders = [
        inboxFolder,
        sentFolder
    ];
    messageChannelMicrosoft.syncCursor = '';
    messageChannelMicrosoft.messageFolderImportPolicy = _types.MessageFolderImportPolicy.SELECTED_FOLDERS;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            imports: [
                _twentyconfigmodule.TwentyConfigModule.forRoot()
            ],
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
                },
                _config.ConfigService,
                {
                    provide: _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService,
                    useValue: {}
                }
            ]
        }).compile();
        service = module.get(_microsoftgetmessagelistservice.MicrosoftGetMessageListService);
        const mockMicrosoftClient = {
            api: jest.fn().mockReturnThis(),
            version: jest.fn().mockReturnThis(),
            headers: jest.fn().mockReturnThis(),
            get: jest.fn().mockResolvedValue(_microsoftapiexamples.microsoftGraphWithMessagesDeltaLink)
        };
        jest.spyOn(_microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider.prototype, 'getClient').mockResolvedValue(mockMicrosoftClient);
    });
    it('Should return empty array', async ()=>{
        const result = await service.getMessageLists({
            messageChannel: messageChannelNoFolders,
            connectedAccount: mockConnectedAccount,
            messageFolders: []
        });
        expect(result.length).toBe(0);
    });
    it('Should return an array of one items', async ()=>{
        const result = await service.getMessageLists({
            messageChannel: messageChannelMicrosoftOneFolder,
            connectedAccount: mockConnectedAccount,
            messageFolders: [
                inboxFolder
            ]
        });
        expect(result.length).toBe(1);
        expect(result[0].folderId).toBe(inboxFolder.id);
        expect(result[0].messageExternalIds.length).toBeGreaterThan(0);
    });
    it('Should return an array of two items', async ()=>{
        const result = await service.getMessageLists({
            messageChannel: messageChannelMicrosoft,
            connectedAccount: mockConnectedAccount,
            messageFolders: [
                inboxFolder,
                sentFolder
            ]
        });
        expect(result.length).toBe(2);
    });
});

//# sourceMappingURL=microsoft-get-message-list.service.dev.spec.js.map