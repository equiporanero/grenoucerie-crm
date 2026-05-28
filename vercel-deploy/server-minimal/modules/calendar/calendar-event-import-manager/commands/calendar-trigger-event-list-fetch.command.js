"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarTriggerEventListFetchCommand", {
    enumerable: true,
    get: function() {
        return CalendarTriggerEventListFetchCommand;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _nestcommander = require("nest-commander");
const _typeorm1 = require("typeorm");
const _types = require("twenty-shared/types");
const _messagequeuedecorator = require("../../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../engine/core-modules/message-queue/services/message-queue.service");
const _calendarchannelentity = require("../../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _calendareventlistfetchjob = require("../jobs/calendar-event-list-fetch.job");
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
let CalendarTriggerEventListFetchCommand = class CalendarTriggerEventListFetchCommand extends _nestcommander.CommandRunner {
    async run(_passedParam, options) {
        const { workspaceId, calendarChannelId } = options;
        this.logger.log(`Triggering calendar event list fetch for workspace ${workspaceId}${calendarChannelId ? ` and channel ${calendarChannelId}` : ' (all pending channels)'}`);
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const calendarChannels = await this.calendarChannelRepository.find({
                where: {
                    isSyncEnabled: true,
                    syncStage: _types.CalendarChannelSyncStage.CALENDAR_EVENT_LIST_FETCH_PENDING,
                    ...calendarChannelId ? {
                        id: calendarChannelId
                    } : {},
                    workspaceId
                }
            });
            if (calendarChannels.length === 0) {
                this.logger.warn('No calendar channels found with CALENDAR_EVENT_LIST_FETCH_PENDING status');
                return;
            }
            this.logger.log(`Found ${calendarChannels.length} calendar channel(s) to process`);
            for (const calendarChannel of calendarChannels){
                await this.calendarChannelRepository.update({
                    id: calendarChannel.id,
                    workspaceId
                }, {
                    syncStage: _types.CalendarChannelSyncStage.CALENDAR_EVENT_LIST_FETCH_SCHEDULED,
                    syncStageStartedAt: new Date().toISOString()
                });
                await this.messageQueueService.add(_calendareventlistfetchjob.CalendarEventListFetchJob.name, {
                    calendarChannelId: calendarChannel.id,
                    workspaceId
                });
                this.logger.log(`Triggered fetch for calendar channel ${calendarChannel.id}`);
            }
            this.logger.log(`Successfully triggered ${calendarChannels.length} calendar event list fetch job(s)`);
        }, authContext, {
            lite: true
        });
    }
    parseWorkspaceId(value) {
        return value;
    }
    parseCalendarChannelId(value) {
        return value;
    }
    constructor(globalWorkspaceOrmManager, calendarChannelRepository, messageQueueService){
        super(), this.globalWorkspaceOrmManager = globalWorkspaceOrmManager, this.calendarChannelRepository = calendarChannelRepository, this.messageQueueService = messageQueueService, this.logger = new _common.Logger(CalendarTriggerEventListFetchCommand.name);
    }
};
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-w, --workspace-id <workspace_id>',
        description: 'Workspace ID',
        required: true
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], CalendarTriggerEventListFetchCommand.prototype, "parseWorkspaceId", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-c, --calendar-channel-id [calendar_channel_id]',
        description: 'Calendar Channel ID (optional - if not provided, triggers for all pending channels)',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], CalendarTriggerEventListFetchCommand.prototype, "parseCalendarChannelId", null);
CalendarTriggerEventListFetchCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'calendar:trigger-event-list-fetch',
        description: 'Trigger calendar event list fetch immediately without waiting for cron'
    }),
    _ts_param(1, (0, _typeorm.InjectRepository)(_calendarchannelentity.CalendarChannelEntity)),
    _ts_param(2, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.calendarQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], CalendarTriggerEventListFetchCommand);

//# sourceMappingURL=calendar-trigger-event-list-fetch.command.js.map