"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TimelineCalendarEventService", {
    enumerable: true,
    get: function() {
        return TimelineCalendarEventService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _lodashomit = /*#__PURE__*/ _interop_require_default(require("lodash.omit"));
const _constants = require("twenty-shared/constants");
const _typeorm1 = require("typeorm");
const _types = require("twenty-shared/types");
const _calendarconstants = require("./constants/calendar.constants");
const _calendarchannelentity = require("../../metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _connectedaccountentity = require("../../metadata-modules/connected-account/entities/connected-account.entity");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _globalworkspaceormmanager = require("../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../twenty-orm/utils/build-system-auth-context.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
let TimelineCalendarEventService = class TimelineCalendarEventService {
    async getCalendarEventsFromPersonIds({ currentWorkspaceMemberId, personIds, workspaceId, page = 1, pageSize = _calendarconstants.TIMELINE_CALENDAR_EVENTS_DEFAULT_PAGE_SIZE }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const offset = (page - 1) * pageSize;
            const calendarEventRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'calendarEvent');
            const totalNumberOfCalendarEvents = await calendarEventRepository.count({
                where: {
                    calendarEventParticipants: {
                        personId: (0, _typeorm1.Any)(personIds)
                    }
                }
            });
            const calendarEventIds = await calendarEventRepository.find({
                where: {
                    calendarEventParticipants: {
                        personId: (0, _typeorm1.Any)(personIds)
                    }
                },
                select: {
                    id: true,
                    startsAt: true
                },
                skip: offset,
                take: pageSize,
                order: {
                    startsAt: 'DESC'
                }
            });
            const ids = calendarEventIds.map(({ id })=>id);
            if (ids.length <= 0) {
                return {
                    totalNumberOfCalendarEvents,
                    timelineCalendarEvents: []
                };
            }
            const [events] = await calendarEventRepository.findAndCount({
                where: {
                    id: (0, _typeorm1.Any)(ids)
                },
                relations: {
                    calendarEventParticipants: {
                        person: true,
                        workspaceMember: true
                    },
                    calendarChannelEventAssociations: true
                }
            });
            const allCalendarChannelIds = [
                ...new Set(events.flatMap((event)=>event.calendarChannelEventAssociations.map((association)=>association.calendarChannelId)))
            ];
            const calendarChannels = allCalendarChannelIds.length > 0 ? await this.calendarChannelRepository.find({
                where: {
                    id: (0, _typeorm1.In)(allCalendarChannelIds),
                    workspaceId
                }
            }) : [];
            // Resolve current user's userWorkspaceId (workspaceMember → userId → userWorkspace)
            const workspaceMemberRepo = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            const currentMember = await workspaceMemberRepo.findOne({
                where: {
                    id: currentWorkspaceMemberId
                },
                select: {
                    userId: true
                }
            });
            const currentUserWorkspaceId = currentMember ? (await this.userWorkspaceRepository.findOne({
                where: {
                    userId: currentMember.userId,
                    workspaceId
                },
                select: {
                    id: true
                }
            }))?.id ?? null : null;
            // Find which connected accounts the current user owns (1 query)
            const connectedAccountIds = [
                ...new Set(calendarChannels.map((channel)=>channel.connectedAccountId))
            ];
            const ownedAccountIds = connectedAccountIds.length > 0 && currentUserWorkspaceId ? new Set((await this.connectedAccountRepository.find({
                where: {
                    id: (0, _typeorm1.In)(connectedAccountIds),
                    userWorkspaceId: currentUserWorkspaceId
                },
                select: {
                    id: true
                }
            })).map((a)=>a.id)) : new Set();
            const calendarChannelMap = new Map(calendarChannels.map((channel)=>[
                    channel.id,
                    {
                        visibility: channel.visibility,
                        isOwnedByCurrentUser: ownedAccountIds.has(channel.connectedAccountId)
                    }
                ]));
            const orderedEvents = events.sort((a, b)=>ids.indexOf(a.id) - ids.indexOf(b.id));
            const timelineCalendarEvents = orderedEvents.map((event)=>{
                const participants = event.calendarEventParticipants.map((participant)=>({
                        calendarEventId: event.id,
                        personId: participant.personId ?? null,
                        workspaceMemberId: participant.workspaceMemberId ?? null,
                        firstName: participant.person?.name?.firstName || participant.workspaceMember?.name.firstName || '',
                        lastName: participant.person?.name?.lastName || participant.workspaceMember?.name.lastName || '',
                        displayName: participant.person?.name?.firstName || participant.person?.name?.lastName || participant.workspaceMember?.name.firstName || participant.workspaceMember?.name.lastName || participant.displayName || participant.handle || '',
                        avatarUrl: participant.person?.avatarUrl || participant.workspaceMember?.avatarUrl || '',
                        handle: participant.handle ?? ''
                    }));
                const hasFullAccess = event.calendarChannelEventAssociations.some((association)=>{
                    const channel = calendarChannelMap.get(association.calendarChannelId);
                    return channel?.visibility === 'SHARE_EVERYTHING' || channel?.isOwnedByCurrentUser;
                });
                const visibility = hasFullAccess ? _types.CalendarChannelVisibility.SHARE_EVERYTHING : _types.CalendarChannelVisibility.METADATA;
                return {
                    ...(0, _lodashomit.default)(event, [
                        'calendarEventParticipants',
                        'calendarChannelEventAssociations'
                    ]),
                    title: visibility === _types.CalendarChannelVisibility.METADATA ? _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED : event.title ?? '',
                    description: visibility === _types.CalendarChannelVisibility.METADATA ? _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED : event.description ?? '',
                    startsAt: event.startsAt,
                    endsAt: event.endsAt,
                    participants,
                    visibility,
                    location: event.location ?? '',
                    conferenceSolution: event.conferenceSolution ?? ''
                };
            });
            return {
                totalNumberOfCalendarEvents,
                timelineCalendarEvents
            };
        }, authContext);
    }
    async getCalendarEventsFromCompanyId({ currentWorkspaceMemberId, companyId, workspaceId, page = 1, pageSize = _calendarconstants.TIMELINE_CALENDAR_EVENTS_DEFAULT_PAGE_SIZE }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const personRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'person', {
                shouldBypassPermissionChecks: true
            });
            const personIds = await personRepository.find({
                where: {
                    companyId
                },
                select: {
                    id: true
                }
            });
            if (personIds.length <= 0) {
                return {
                    totalNumberOfCalendarEvents: 0,
                    timelineCalendarEvents: []
                };
            }
            const formattedPersonIds = personIds.map(({ id })=>id);
            const calendarEvents = await this.getCalendarEventsFromPersonIds({
                currentWorkspaceMemberId,
                personIds: formattedPersonIds,
                workspaceId,
                page,
                pageSize
            });
            return calendarEvents;
        }, authContext);
    }
    async getCalendarEventsFromOpportunityId({ currentWorkspaceMemberId, opportunityId, workspaceId, page = 1, pageSize = _calendarconstants.TIMELINE_CALENDAR_EVENTS_DEFAULT_PAGE_SIZE }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const opportunityRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'opportunity', {
                shouldBypassPermissionChecks: true
            });
            const opportunity = await opportunityRepository.findOne({
                where: {
                    id: opportunityId
                },
                select: {
                    companyId: true
                }
            });
            if (!opportunity?.companyId) {
                return {
                    totalNumberOfCalendarEvents: 0,
                    timelineCalendarEvents: []
                };
            }
            const calendarEvents = await this.getCalendarEventsFromCompanyId({
                currentWorkspaceMemberId,
                companyId: opportunity.companyId,
                workspaceId,
                page,
                pageSize
            });
            return calendarEvents;
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager, calendarChannelRepository, connectedAccountRepository, userWorkspaceRepository){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.calendarChannelRepository = calendarChannelRepository;
        this.connectedAccountRepository = connectedAccountRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
    }
};
TimelineCalendarEventService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_calendarchannelentity.CalendarChannelEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository
    ])
], TimelineCalendarEventService);

//# sourceMappingURL=timeline-calendar-event.service.js.map