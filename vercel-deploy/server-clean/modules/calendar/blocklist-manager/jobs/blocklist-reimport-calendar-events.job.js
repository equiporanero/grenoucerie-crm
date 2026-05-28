"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlocklistReimportCalendarEventsJob", {
    enumerable: true,
    get: function() {
        return BlocklistReimportCalendarEventsJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _processdecorator = require("../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _userworkspaceentity = require("../../../../engine/core-modules/user-workspace/user-workspace.entity");
const _calendarchannelentity = require("../../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _calendarchannelsyncstatusservice = require("../../common/services/calendar-channel-sync-status.service");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
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
let BlocklistReimportCalendarEventsJob = class BlocklistReimportCalendarEventsJob {
    async handle(data) {
        const workspaceId = data.workspaceId;
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            for (const eventPayload of data.events){
                const workspaceMemberId = eventPayload.properties.before.workspaceMemberId;
                const workspaceMember = await workspaceMemberRepository.findOne({
                    where: {
                        id: workspaceMemberId
                    }
                });
                if (!(0, _utils.isDefined)(workspaceMember)) {
                    continue;
                }
                const userWorkspace = await this.userWorkspaceRepository.findOne({
                    where: {
                        userId: workspaceMember.userId,
                        workspaceId
                    },
                    select: [
                        'id'
                    ]
                });
                if (!(0, _utils.isDefined)(userWorkspace)) {
                    continue;
                }
                const calendarChannels = await this.calendarChannelRepository.find({
                    select: [
                        'id'
                    ],
                    where: {
                        connectedAccount: {
                            userWorkspaceId: userWorkspace.id
                        },
                        syncStage: (0, _typeorm1.Not)(_types.CalendarChannelSyncStage.CALENDAR_EVENT_LIST_FETCH_PENDING),
                        workspaceId
                    }
                });
                await this.calendarChannelSyncStatusService.resetAndMarkAsCalendarEventListFetchPending(calendarChannels.map((calendarChannel)=>calendarChannel.id), workspaceId);
            }
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager, calendarChannelRepository, userWorkspaceRepository, calendarChannelSyncStatusService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.calendarChannelRepository = calendarChannelRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.calendarChannelSyncStatusService = calendarChannelSyncStatusService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(BlocklistReimportCalendarEventsJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof BlocklistReimportCalendarEventsJobData === "undefined" ? Object : BlocklistReimportCalendarEventsJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], BlocklistReimportCalendarEventsJob.prototype, "handle", null);
BlocklistReimportCalendarEventsJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.calendarQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_param(1, (0, _typeorm.InjectRepository)(_calendarchannelentity.CalendarChannelEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService === "undefined" ? Object : _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService
    ])
], BlocklistReimportCalendarEventsJob);

//# sourceMappingURL=blocklist-reimport-calendar-events.job.js.map