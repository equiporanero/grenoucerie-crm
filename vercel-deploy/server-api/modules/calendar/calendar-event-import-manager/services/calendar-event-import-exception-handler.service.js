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
    get CalendarEventImportErrorHandlerService () {
        return CalendarEventImportErrorHandlerService;
    },
    get CalendarEventImportSyncStep () {
        return CalendarEventImportSyncStep;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _exceptionhandlerservice = require("../../../../engine/core-modules/exception-handler/exception-handler.service");
const _twentyormexception = require("../../../../engine/twenty-orm/exceptions/twenty-orm.exception");
const _connectedaccountrefreshtokensexception = require("../../../../engine/metadata-modules/connected-account/exceptions/connected-account-refresh-tokens.exception");
const _calendarthrottlemaxattempts = require("../constants/calendar-throttle-max-attempts");
const _calendareventimportdriverexception = require("../drivers/exceptions/calendar-event-import-driver.exception");
const _calendareventimportexception = require("../exceptions/calendar-event-import.exception");
const _calendarchannelsyncstatusservice = require("../../common/services/calendar-channel-sync-status.service");
const _calendarchannelentity = require("../../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
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
var CalendarEventImportSyncStep = /*#__PURE__*/ function(CalendarEventImportSyncStep) {
    CalendarEventImportSyncStep["CALENDAR_EVENT_LIST_FETCH"] = "CALENDAR_EVENT_LIST_FETCH";
    CalendarEventImportSyncStep["CALENDAR_EVENTS_IMPORT"] = "CALENDAR_EVENTS_IMPORT";
    return CalendarEventImportSyncStep;
}({});
let CalendarEventImportErrorHandlerService = class CalendarEventImportErrorHandlerService {
    async handleDriverException(exception, syncStep, calendarChannel, workspaceId) {
        switch(exception.code){
            case _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.NOT_FOUND:
                await this.handleNotFoundException(syncStep, calendarChannel, workspaceId);
                break;
            case _twentyormexception.TwentyORMExceptionCode.QUERY_READ_TIMEOUT:
            case _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.TEMPORARY_ERROR:
            case _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.TEMPORARY_NETWORK_ERROR:
                await this.handleTemporaryException(syncStep, calendarChannel, workspaceId);
                break;
            case _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS:
            case _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.REFRESH_TOKEN_NOT_FOUND:
            case _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.INVALID_REFRESH_TOKEN:
                await this.handleInsufficientPermissionsException(calendarChannel, workspaceId);
                break;
            case _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.SYNC_CURSOR_ERROR:
                await this.handleSyncCursorErrorException(calendarChannel, workspaceId);
                break;
            case _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.CHANNEL_MISCONFIGURED:
            case _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.UNKNOWN:
            case _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.UNKNOWN_NETWORK_ERROR:
            case _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.ACCESS_TOKEN_NOT_FOUND:
            case _connectedaccountrefreshtokensexception.ConnectedAccountRefreshAccessTokenExceptionCode.PROVIDER_NOT_SUPPORTED:
            default:
                await this.handleUnknownException(exception, calendarChannel, workspaceId);
                break;
        }
    }
    async handleSyncCursorErrorException(calendarChannel, workspaceId) {
        this.logger.debug(`CalendarChannelId: ${calendarChannel.id} - Sync cursor error, resetting and rescheduling`);
        await this.calendarChannelSyncStatusService.resetAndMarkAsCalendarEventListFetchPending([
            calendarChannel.id
        ], workspaceId);
    }
    async handleTemporaryException(syncStep, calendarChannel, workspaceId) {
        if (calendarChannel.throttleFailureCount >= _calendarthrottlemaxattempts.CALENDAR_THROTTLE_MAX_ATTEMPTS) {
            await this.calendarChannelSyncStatusService.markAsFailedUnknownAndFlushCalendarEventsToImport([
                calendarChannel.id
            ], workspaceId);
            const calendarEventImportException = new _calendareventimportexception.CalendarEventImportException(`Temporary error occurred ${_calendarthrottlemaxattempts.CALENDAR_THROTTLE_MAX_ATTEMPTS} times while importing calendar events for calendar channel ${calendarChannel.id} in workspace ${workspaceId} with throttleFailureCount ${calendarChannel.throttleFailureCount}`, _calendareventimportexception.CalendarEventImportExceptionCode.UNKNOWN);
            this.exceptionHandlerService.captureExceptions([
                calendarEventImportException
            ], {
                additionalData: {
                    calendarChannelId: calendarChannel.id,
                    syncStep,
                    throttleFailureCount: calendarChannel.throttleFailureCount
                },
                workspace: {
                    id: workspaceId
                }
            });
            throw calendarEventImportException;
        }
        await this.calendarChannelRepository.increment({
            id: calendarChannel.id,
            workspaceId
        }, 'throttleFailureCount', 1);
        switch(syncStep){
            case "CALENDAR_EVENT_LIST_FETCH":
                await this.calendarChannelSyncStatusService.markAsCalendarEventListFetchPending([
                    calendarChannel.id
                ], workspaceId, true);
                break;
            case "CALENDAR_EVENTS_IMPORT":
                await this.calendarChannelSyncStatusService.markAsCalendarEventsImportPending([
                    calendarChannel.id
                ], workspaceId, true);
                break;
            default:
                break;
        }
    }
    async handleInsufficientPermissionsException(calendarChannel, workspaceId) {
        await this.calendarChannelSyncStatusService.markAsFailedInsufficientPermissionsAndFlushCalendarEventsToImport([
            calendarChannel.id
        ], workspaceId);
    }
    async handleUnknownException(exception, calendarChannel, workspaceId) {
        await this.calendarChannelSyncStatusService.markAsFailedUnknownAndFlushCalendarEventsToImport([
            calendarChannel.id
        ], workspaceId);
        const calendarEventImportException = new _calendareventimportexception.CalendarEventImportException(`Unknown error importing calendar events for calendar channel ${calendarChannel.id} in workspace ${workspaceId}: ${exception.message}`, _calendareventimportexception.CalendarEventImportExceptionCode.UNKNOWN);
        this.logger.error(exception);
        this.exceptionHandlerService.captureExceptions([
            calendarEventImportException
        ], {
            additionalData: {
                calendarChannelId: calendarChannel.id,
                exceptionMessage: exception.message
            },
            workspace: {
                id: workspaceId
            }
        });
        throw calendarEventImportException;
    }
    async handleNotFoundException(syncStep, calendarChannel, workspaceId) {
        if (syncStep === "CALENDAR_EVENT_LIST_FETCH") {
            return;
        }
        await this.calendarChannelSyncStatusService.resetAndMarkAsCalendarEventListFetchPending([
            calendarChannel.id
        ], workspaceId);
    }
    constructor(calendarChannelRepository, calendarChannelSyncStatusService, exceptionHandlerService){
        this.calendarChannelRepository = calendarChannelRepository;
        this.calendarChannelSyncStatusService = calendarChannelSyncStatusService;
        this.exceptionHandlerService = exceptionHandlerService;
        this.logger = new _common.Logger(CalendarEventImportErrorHandlerService.name);
    }
};
CalendarEventImportErrorHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_calendarchannelentity.CalendarChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService === "undefined" ? Object : _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService,
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService
    ])
], CalendarEventImportErrorHandlerService);

//# sourceMappingURL=calendar-event-import-exception-handler.service.js.map