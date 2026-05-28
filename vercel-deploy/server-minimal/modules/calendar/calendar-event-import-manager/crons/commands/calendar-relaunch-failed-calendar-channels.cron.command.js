"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarRelaunchFailedCalendarChannelsCronCommand", {
    enumerable: true,
    get: function() {
        return CalendarRelaunchFailedCalendarChannelsCronCommand;
    }
});
const _nestcommander = require("nest-commander");
const _messagequeuedecorator = require("../../../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../../engine/core-modules/message-queue/services/message-queue.service");
const _calendarrelaunchfailedcalendarchannelscronjob = require("../jobs/calendar-relaunch-failed-calendar-channels.cron.job");
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
let CalendarRelaunchFailedCalendarChannelsCronCommand = class CalendarRelaunchFailedCalendarChannelsCronCommand extends _nestcommander.CommandRunner {
    async run() {
        await this.messageQueueService.addCron({
            jobName: _calendarrelaunchfailedcalendarchannelscronjob.CalendarRelaunchFailedCalendarChannelsCronJob.name,
            data: undefined,
            options: {
                repeat: {
                    pattern: _calendarrelaunchfailedcalendarchannelscronjob.CALENDAR_RELAUNCH_FAILED_CALENDAR_CHANNELS_CRON_PATTERN
                }
            }
        });
    }
    constructor(messageQueueService){
        super(), this.messageQueueService = messageQueueService;
    }
};
CalendarRelaunchFailedCalendarChannelsCronCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'cron:calendar:relaunch-failed-calendar-channels',
        description: 'Starts a cron job to relaunch failed calendar channels every 30 minutes'
    }),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.cronQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], CalendarRelaunchFailedCalendarChannelsCronCommand);

//# sourceMappingURL=calendar-relaunch-failed-calendar-channels.cron.command.js.map