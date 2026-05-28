"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _exceptionhandlerservice = require("../../../../../engine/core-modules/exception-handler/exception-handler.service");
const _connectedaccountrefreshtokensexception = require("../../../../../engine/metadata-modules/connected-account/exceptions/connected-account-refresh-tokens.exception");
const _messagechannelsyncstatusservice = require("../../../common/services/message-channel-sync-status.service");
const _messagingimportexceptionhandlerservice = require("../messaging-import-exception-handler.service");
const _messagingmonitoringservice = require("../../../monitoring/services/messaging-monitoring.service");
const _messagechannelentity = require("../../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
describe('MessageImportExceptionHandlerService — refresh code dispatch', ()=>{
    let service;
    let messageChannelSyncStatusService;
    let messageChannelRepository;
    let messagingMonitoringService;
    let exceptionHandlerService;
    const workspaceId = 'workspace-1';
    const messageChannel = {
        id: 'channel-1',
        throttleFailureCount: 0,
        connectedAccountId: 'connected-account-1'
    };
    beforeEach(async ()=>{
        messageChannelSyncStatusService = {
            markAsFailed: jest.fn(),
            markAsMessagesListFetchPending: jest.fn(),
            markAsMessagesImportPending: jest.fn(),
            resetAndMarkAsMessagesListFetchPending: jest.fn()
        };
        messageChannelRepository = {
            increment: jest.fn(),
            update: jest.fn()
        };
        messagingMonitoringService = {
            track: jest.fn()
        };
        exceptionHandlerService = {
            captureExceptions: jest.fn()
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _messagingimportexceptionhandlerservice.MessageImportExceptionHandlerService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_messagechannelentity.MessageChannelEntity),
                    useValue: messageChannelRepository
                },
                {
                    provide: _messagechannelsyncstatusservice.MessageChannelSyncStatusService,
                    useValue: messageChannelSyncStatusService
                },
                {
                    provide: _exceptionhandlerservice.ExceptionHandlerService,
                    useValue: exceptionHandlerService
                },
                {
                    provide: _messagingmonitoringservice.MessagingMonitoringService,
                    useValue: messagingMonitoringService
                }
            ]
        }).compile();
        service = module.get(_messagingimportexceptionhandlerservice.MessageImportExceptionHandlerService);
    });
    it('should mark channel FAILED_INSUFFICIENT_PERMISSIONS and fire monitoring on REFRESH_TOKEN_NOT_FOUND', async ()=>{
        await service.handleDriverException(new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException('refresh token missing', _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.REFRESH_TOKEN_NOT_FOUND), _messagingimportexceptionhandlerservice.MessageImportSyncStep.MESSAGE_LIST_FETCH, messageChannel, workspaceId);
        expect(messageChannelSyncStatusService.markAsFailed).toHaveBeenCalledWith([
            messageChannel.id
        ], workspaceId, _types.MessageChannelSyncStatus.FAILED_INSUFFICIENT_PERMISSIONS);
        expect(messagingMonitoringService.track).toHaveBeenCalledWith(expect.objectContaining({
            eventName: 'refresh_token.error.insufficient_permissions',
            workspaceId,
            connectedAccountId: messageChannel.connectedAccountId,
            messageChannelId: messageChannel.id,
            message: expect.stringContaining('REFRESH_TOKEN_NOT_FOUND')
        }));
    });
    it('should fire monitoring on INVALID_REFRESH_TOKEN', async ()=>{
        await service.handleDriverException(new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException('refresh rejected', _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.INVALID_REFRESH_TOKEN), _messagingimportexceptionhandlerservice.MessageImportSyncStep.MESSAGES_IMPORT_ONGOING, messageChannel, workspaceId);
        expect(messagingMonitoringService.track).toHaveBeenCalledTimes(1);
        expect(messageChannelSyncStatusService.markAsFailed).toHaveBeenCalledWith([
            messageChannel.id
        ], workspaceId, _types.MessageChannelSyncStatus.FAILED_INSUFFICIENT_PERMISSIONS);
    });
    it('should NOT fire monitoring on TEMPORARY_NETWORK_ERROR and should throttle instead', async ()=>{
        await service.handleDriverException(new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException('temp', _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.TEMPORARY_NETWORK_ERROR), _messagingimportexceptionhandlerservice.MessageImportSyncStep.MESSAGE_LIST_FETCH, messageChannel, workspaceId);
        expect(messagingMonitoringService.track).not.toHaveBeenCalled();
        expect(messageChannelRepository.increment).toHaveBeenCalled();
        expect(messageChannelSyncStatusService.markAsMessagesListFetchPending).toHaveBeenCalled();
    });
    it('should mark FAILED_UNKNOWN on ACCESS_TOKEN_NOT_FOUND (matches pre-refactor fall-through)', async ()=>{
        await service.handleDriverException(new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException('no access token', _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.ACCESS_TOKEN_NOT_FOUND), _messagingimportexceptionhandlerservice.MessageImportSyncStep.MESSAGE_LIST_FETCH, messageChannel, workspaceId);
        expect(messageChannelSyncStatusService.markAsFailed).toHaveBeenCalledWith([
            messageChannel.id
        ], workspaceId, _types.MessageChannelSyncStatus.FAILED_UNKNOWN);
        expect(exceptionHandlerService.captureExceptions).toHaveBeenCalledWith(expect.any(Array), expect.objectContaining({
            additionalData: expect.objectContaining({
                messageChannelId: messageChannel.id,
                syncStep: _messagingimportexceptionhandlerservice.MessageImportSyncStep.MESSAGE_LIST_FETCH
            })
        }));
        expect(messagingMonitoringService.track).not.toHaveBeenCalled();
    });
    it('should mark FAILED_UNKNOWN on PROVIDER_NOT_SUPPORTED', async ()=>{
        await service.handleDriverException(new _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenException('provider down', _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.PROVIDER_NOT_SUPPORTED), _messagingimportexceptionhandlerservice.MessageImportSyncStep.MESSAGE_LIST_FETCH, messageChannel, workspaceId);
        expect(messageChannelSyncStatusService.markAsFailed).toHaveBeenCalledWith([
            messageChannel.id
        ], workspaceId, _types.MessageChannelSyncStatus.FAILED_UNKNOWN);
        expect(messagingMonitoringService.track).not.toHaveBeenCalled();
    });
});

//# sourceMappingURL=messaging-import-exception-handler.service.spec.js.map