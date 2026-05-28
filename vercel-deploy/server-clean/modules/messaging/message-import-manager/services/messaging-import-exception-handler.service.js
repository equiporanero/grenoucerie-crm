"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get MessageImportExceptionHandlerService () {
        return MessageImportExceptionHandlerService;
    },
    get MessageImportSyncStep () {
        return MessageImportSyncStep;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _types = require("twenty-shared/types");
const _exceptionhandlerservice = require("../../../../engine/core-modules/exception-handler/exception-handler.service");
const _twentyormexception = require("../../../../engine/twenty-orm/exceptions/twenty-orm.exception");
const _connectedaccountrefreshtokensexception = require("../../../../engine/metadata-modules/connected-account/exceptions/connected-account-refresh-tokens.exception");
const _messagechannelsyncstatusservice = require("../../common/services/message-channel-sync-status.service");
const _messagingthrottlemaxattempts = require("../constants/messaging-throttle-max-attempts");
const _messageimportdriverexception = require("../drivers/exceptions/message-import-driver.exception");
const _messagenetworkexception = require("../drivers/exceptions/message-network.exception");
const _messagingmonitoringservice = require("../../monitoring/services/messaging-monitoring.service");
const _messagechannelentity = require("../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
var MessageImportSyncStep = /*#__PURE__*/ function(MessageImportSyncStep) {
    MessageImportSyncStep["MESSAGE_LIST_FETCH"] = "MESSAGE_LIST_FETCH";
    MessageImportSyncStep["MESSAGES_IMPORT_PENDING"] = "MESSAGES_IMPORT_PENDING";
    MessageImportSyncStep["MESSAGES_IMPORT_ONGOING"] = "MESSAGES_IMPORT_ONGOING";
    return MessageImportSyncStep;
}({});
let MessageImportExceptionHandlerService = class MessageImportExceptionHandlerService {
    async handleDriverException(exception, syncStep, messageChannel, workspaceId) {
        if (exception instanceof _messageimportdriverexception.MessageImportDriverException) {
            exception.context = {
                ...exception.context,
                messageChannelId: messageChannel.id,
                workspaceId,
                syncStep
            };
        }
        if ('code' in exception) {
            switch(exception.code){
                case _messageimportdriverexception.MessageImportDriverExceptionCode.NOT_FOUND:
                    await this.handleNotFoundException(syncStep, messageChannel, workspaceId);
                    break;
                case _twentyormexception.TwentyORMExceptionCode.QUERY_READ_TIMEOUT:
                case _messageimportdriverexception.MessageImportDriverExceptionCode.TEMPORARY_ERROR:
                case _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.TEMPORARY_NETWORK_ERROR:
                case _messagenetworkexception.MessageNetworkExceptionCode.ECONNABORTED:
                case _messagenetworkexception.MessageNetworkExceptionCode.ENOTFOUND:
                case _messagenetworkexception.MessageNetworkExceptionCode.ECONNRESET:
                case _messagenetworkexception.MessageNetworkExceptionCode.ETIMEDOUT:
                case _messagenetworkexception.MessageNetworkExceptionCode.ERR_NETWORK:
                    await this.handleTemporaryException(syncStep, messageChannel, workspaceId, exception);
                    break;
                case _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.REFRESH_TOKEN_NOT_FOUND:
                case _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.INVALID_REFRESH_TOKEN:
                    await this.messagingMonitoringService.track({
                        eventName: `refresh_token.error.insufficient_permissions`,
                        workspaceId,
                        connectedAccountId: messageChannel.connectedAccountId,
                        messageChannelId: messageChannel.id,
                        message: `${exception.code}: ${exception.message ?? ''}`
                    });
                    await this.handleInsufficientPermissionsException(messageChannel, workspaceId);
                    break;
                case _messageimportdriverexception.MessageImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS:
                    await this.handleInsufficientPermissionsException(messageChannel, workspaceId);
                    break;
                case _messageimportdriverexception.MessageImportDriverExceptionCode.SYNC_CURSOR_ERROR:
                    await this.handleSyncCursorErrorException(messageChannel, workspaceId);
                    break;
                case _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.ACCESS_TOKEN_NOT_FOUND:
                case _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.PROVIDER_NOT_SUPPORTED:
                case _messageimportdriverexception.MessageImportDriverExceptionCode.CHANNEL_MISCONFIGURED:
                case _messageimportdriverexception.MessageImportDriverExceptionCode.ACCESS_TOKEN_MISSING:
                case _messageimportdriverexception.MessageImportDriverExceptionCode.PROVIDER_NOT_SUPPORTED:
                case _messageimportdriverexception.MessageImportDriverExceptionCode.UNKNOWN:
                case _messageimportdriverexception.MessageImportDriverExceptionCode.UNKNOWN_NETWORK_ERROR:
                default:
                    await this.handleUnknownException(exception, messageChannel, workspaceId, syncStep);
                    break;
            }
        } else {
            await this.handleUnknownException(exception, messageChannel, workspaceId, syncStep);
        }
    }
    async handleSyncCursorErrorException(messageChannel, workspaceId) {
        await this.messageChannelSyncStatusService.resetAndMarkAsMessagesListFetchPending([
            messageChannel.id
        ], workspaceId);
    }
    async handleTemporaryException(syncStep, messageChannel, workspaceId, exception) {
        if (messageChannel.throttleFailureCount >= _messagingthrottlemaxattempts.MESSAGING_THROTTLE_MAX_ATTEMPTS) {
            await this.messageChannelSyncStatusService.markAsFailed([
                messageChannel.id
            ], workspaceId, _types.MessageChannelSyncStatus.FAILED_UNKNOWN);
            this.exceptionHandlerService.captureExceptions([
                new Error(`Temporary error occurred ${_messagingthrottlemaxattempts.MESSAGING_THROTTLE_MAX_ATTEMPTS} times while importing messages for message channel ${messageChannel.id} in workspace ${workspaceId}: ${exception?.message}`)
            ], {
                additionalData: {
                    messageChannelId: messageChannel.id,
                    syncStep,
                    throttleFailureCount: messageChannel.throttleFailureCount
                },
                workspace: {
                    id: workspaceId
                }
            });
            return;
        }
        await this.messageChannelRepository.increment({
            id: messageChannel.id,
            workspaceId
        }, 'throttleFailureCount', 1);
        const throttleRetryAfter = exception instanceof _messageimportdriverexception.MessageImportDriverException ? exception.throttleRetryAfter : undefined;
        await this.messageChannelRepository.update({
            id: messageChannel.id,
            workspaceId
        }, {
            throttleRetryAfter: (0, _utils.isDefined)(throttleRetryAfter) ? throttleRetryAfter.toISOString() : null
        });
        switch(syncStep){
            case "MESSAGE_LIST_FETCH":
                await this.messageChannelSyncStatusService.markAsMessagesListFetchPending([
                    messageChannel.id
                ], workspaceId, true);
                break;
            case "MESSAGES_IMPORT_PENDING":
            case "MESSAGES_IMPORT_ONGOING":
                await this.messageChannelSyncStatusService.markAsMessagesImportPending([
                    messageChannel.id
                ], workspaceId, true);
                break;
            default:
                break;
        }
    }
    async handleInsufficientPermissionsException(messageChannel, workspaceId) {
        await this.messageChannelSyncStatusService.markAsFailed([
            messageChannel.id
        ], workspaceId, _types.MessageChannelSyncStatus.FAILED_INSUFFICIENT_PERMISSIONS);
    }
    async handleUnknownException(exception, messageChannel, workspaceId, syncStep) {
        this.exceptionHandlerService.captureExceptions([
            exception
        ], {
            additionalData: {
                messageChannelId: messageChannel.id,
                syncStep
            },
            workspace: {
                id: workspaceId
            }
        });
        await this.messageChannelSyncStatusService.markAsFailed([
            messageChannel.id
        ], workspaceId, _types.MessageChannelSyncStatus.FAILED_UNKNOWN);
    }
    async handleNotFoundException(syncStep, messageChannel, workspaceId) {
        if (syncStep === "MESSAGE_LIST_FETCH") {
            await this.messageChannelSyncStatusService.markAsFailed([
                messageChannel.id
            ], workspaceId, _types.MessageChannelSyncStatus.FAILED_UNKNOWN);
            this.exceptionHandlerService.captureExceptions([
                new Error('Not Found exception occurred while fetching message list, which should never happen')
            ], {
                additionalData: {
                    messageChannelId: messageChannel.id,
                    syncStep
                },
                workspace: {
                    id: workspaceId
                }
            });
            return;
        }
        await this.messageChannelSyncStatusService.resetAndMarkAsMessagesListFetchPending([
            messageChannel.id
        ], workspaceId);
    }
    constructor(messageChannelRepository, messageChannelSyncStatusService, exceptionHandlerService, messagingMonitoringService){
        this.messageChannelRepository = messageChannelRepository;
        this.messageChannelSyncStatusService = messageChannelSyncStatusService;
        this.exceptionHandlerService = exceptionHandlerService;
        this.messagingMonitoringService = messagingMonitoringService;
    }
};
MessageImportExceptionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagechannelsyncstatusservice.MessageChannelSyncStatusService === "undefined" ? Object : _messagechannelsyncstatusservice.MessageChannelSyncStatusService,
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService,
        typeof _messagingmonitoringservice.MessagingMonitoringService === "undefined" ? Object : _messagingmonitoringservice.MessagingMonitoringService
    ])
], MessageImportExceptionHandlerService);

//# sourceMappingURL=messaging-import-exception-handler.service.js.map