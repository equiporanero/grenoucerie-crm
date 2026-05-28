"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarRelaunchFailedCalendarChannelJob", {
    enumerable: true,
    get: function() {
        return CalendarRelaunchFailedCalendarChannelJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _types = require("twenty-shared/types");
const _processdecorator = require("../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _calendarchannelentity = require("../../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
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
let CalendarRelaunchFailedCalendarChannelJob = class CalendarRelaunchFailedCalendarChannelJob {
    async handle(data) {
        const { workspaceId, calendarChannelId } = data;
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const calendarChannel = await this.calendarChannelRepository.findOne({
                where: {
                    id: calendarChannelId,
                    workspaceId
                }
            });
            if (!calendarChannel || calendarChannel.syncStage !== _types.CalendarChannelSyncStage.FAILED || calendarChannel.syncStatus !== _types.CalendarChannelSyncStatus.FAILED_UNKNOWN) {
                return;
            }
            await this.calendarChannelRepository.update({
                id: calendarChannelId,
                workspaceId
            }, {
                syncStage: _types.CalendarChannelSyncStage.CALENDAR_EVENT_LIST_FETCH_PENDING,
                syncStatus: _types.CalendarChannelSyncStatus.ACTIVE,
                throttleFailureCount: 0,
                syncStageStartedAt: null
            });
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager, calendarChannelRepository){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.calendarChannelRepository = calendarChannelRepository;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CalendarRelaunchFailedCalendarChannelJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CalendarRelaunchFailedCalendarChannelJobData === "undefined" ? Object : CalendarRelaunchFailedCalendarChannelJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], CalendarRelaunchFailedCalendarChannelJob.prototype, "handle", null);
CalendarRelaunchFailedCalendarChannelJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.calendarQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_param(1, (0, _typeorm.InjectRepository)(_calendarchannelentity.CalendarChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], CalendarRelaunchFailedCalendarChannelJob);

//# sourceMappingURL=calendar-relaunch-failed-calendar-channel.job.js.map