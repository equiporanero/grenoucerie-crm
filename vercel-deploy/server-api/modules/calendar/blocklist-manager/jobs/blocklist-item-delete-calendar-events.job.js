"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlocklistItemDeleteCalendarEventsJob", {
    enumerable: true,
    get: function() {
        return BlocklistItemDeleteCalendarEventsJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _processdecorator = require("../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _userworkspaceentity = require("../../../../engine/core-modules/user-workspace/user-workspace.entity");
const _calendarchannelentity = require("../../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _calendareventcleanerservice = require("../../calendar-event-cleaner/services/calendar-event-cleaner.service");
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
let BlocklistItemDeleteCalendarEventsJob = class BlocklistItemDeleteCalendarEventsJob {
    async handle(data) {
        const workspaceId = data.workspaceId;
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const blocklistItemIds = data.events.map((eventPayload)=>eventPayload.recordId);
            const blocklistRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'blocklist');
            const blocklist = await blocklistRepository.find({
                where: {
                    id: (0, _typeorm1.Any)(blocklistItemIds)
                }
            });
            const handlesToDeleteByWorkspaceMemberIdMap = blocklist.reduce((acc, blocklistItem)=>{
                const { handle, workspaceMemberId } = blocklistItem;
                if (!acc.has(workspaceMemberId)) {
                    acc.set(workspaceMemberId, []);
                }
                if (!(0, _utils.isDefined)(handle)) {
                    return acc;
                }
                acc.get(workspaceMemberId)?.push(handle);
                return acc;
            }, new Map());
            const calendarChannelEventAssociationRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'calendarChannelEventAssociation');
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            for (const workspaceMemberId of handlesToDeleteByWorkspaceMemberIdMap.keys()){
                const handles = handlesToDeleteByWorkspaceMemberIdMap.get(workspaceMemberId);
                if (!handles) {
                    continue;
                }
                const workspaceMember = await workspaceMemberRepository.findOne({
                    where: {
                        id: workspaceMemberId
                    }
                });
                if (!workspaceMember) {
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
                if (!userWorkspace) {
                    continue;
                }
                const calendarChannels = await this.calendarChannelRepository.find({
                    select: {
                        id: true,
                        handle: true,
                        connectedAccount: {
                            handleAliases: true
                        }
                    },
                    where: {
                        connectedAccount: {
                            userWorkspaceId: userWorkspace.id
                        },
                        workspaceId
                    },
                    relations: [
                        'connectedAccount'
                    ]
                });
                for (const calendarChannel of calendarChannels){
                    const calendarChannelHandles = [
                        calendarChannel.handle
                    ];
                    if (calendarChannel.connectedAccount.handleAliases) {
                        const rawAliases = calendarChannel.connectedAccount.handleAliases;
                        const aliasList = Array.isArray(rawAliases) ? rawAliases : rawAliases.split(',').map((alias)=>alias.trim());
                        calendarChannelHandles.push(...aliasList);
                    }
                    const handleConditions = handles.map((handle)=>{
                        const isHandleDomain = handle.startsWith('@');
                        return isHandleDomain ? {
                            handle: (0, _typeorm1.And)((0, _typeorm1.Or)((0, _typeorm1.ILike)(`%${handle}`), (0, _typeorm1.ILike)(`%.${handle.slice(1)}`)), (0, _typeorm1.Not)((0, _typeorm1.In)(calendarChannelHandles)))
                        } : {
                            handle
                        };
                    });
                    const calendarEventsAssociationsToDelete = await calendarChannelEventAssociationRepository.find({
                        where: {
                            calendarChannelId: calendarChannel.id,
                            calendarEvent: {
                                calendarEventParticipants: handleConditions
                            }
                        }
                    });
                    if (calendarEventsAssociationsToDelete.length === 0) {
                        continue;
                    }
                    await calendarChannelEventAssociationRepository.delete(calendarEventsAssociationsToDelete.map(({ id })=>id));
                }
            }
            await this.calendarEventCleanerService.cleanWorkspaceCalendarEvents(workspaceId);
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager, calendarChannelRepository, userWorkspaceRepository, calendarEventCleanerService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.calendarChannelRepository = calendarChannelRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.calendarEventCleanerService = calendarEventCleanerService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(BlocklistItemDeleteCalendarEventsJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof BlocklistItemDeleteCalendarEventsJobData === "undefined" ? Object : BlocklistItemDeleteCalendarEventsJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], BlocklistItemDeleteCalendarEventsJob.prototype, "handle", null);
BlocklistItemDeleteCalendarEventsJob = _ts_decorate([
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
        typeof _calendareventcleanerservice.CalendarEventCleanerService === "undefined" ? Object : _calendareventcleanerservice.CalendarEventCleanerService
    ])
], BlocklistItemDeleteCalendarEventsJob);

//# sourceMappingURL=blocklist-item-delete-calendar-events.job.js.map