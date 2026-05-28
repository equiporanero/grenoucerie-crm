"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplyCalendarEventsVisibilityRestrictionsService", {
    enumerable: true,
    get: function() {
        return ApplyCalendarEventsVisibilityRestrictionsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _lodashgroupby = /*#__PURE__*/ _interop_require_default(require("lodash.groupby"));
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _userworkspaceentity = require("../../../../../../engine/core-modules/user-workspace/user-workspace.entity");
const _calendarchannelentity = require("../../../../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _connectedaccountentity = require("../../../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _globalworkspaceormmanager = require("../../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../../../engine/twenty-orm/utils/build-system-auth-context.util");
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
let ApplyCalendarEventsVisibilityRestrictionsService = class ApplyCalendarEventsVisibilityRestrictionsService {
    async applyCalendarEventsVisibilityRestrictions(calendarEvents, workspaceId, userId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const calendarChannelEventAssociationRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'calendarChannelEventAssociation');
            const calendarChannelCalendarEventsAssociations = await calendarChannelEventAssociationRepository.find({
                where: {
                    calendarEventId: (0, _typeorm1.In)(calendarEvents.map((event)=>event.id))
                }
            });
            const calendarChannelIds = [
                ...new Set(calendarChannelCalendarEventsAssociations.map((association)=>association.calendarChannelId))
            ];
            const calendarChannelsFromCore = calendarChannelIds.length > 0 ? await this.calendarChannelRepository.find({
                where: {
                    id: (0, _typeorm1.In)(calendarChannelIds),
                    workspaceId
                }
            }) : [];
            const calendarChannelMap = new Map(calendarChannelsFromCore.map((channel)=>[
                    channel.id,
                    channel
                ]));
            for(let i = calendarEvents.length - 1; i >= 0; i--){
                const associations = calendarChannelCalendarEventsAssociations.filter((association)=>association.calendarEventId === calendarEvents[i].id);
                const calendarChannels = associations.map((association)=>calendarChannelMap.get(association.calendarChannelId)).filter(_utils.isDefined);
                const calendarChannelsGroupByVisibility = (0, _lodashgroupby.default)(calendarChannels, (channel)=>channel.visibility);
                if (calendarChannelsGroupByVisibility[_types.CalendarChannelVisibility.SHARE_EVERYTHING]) {
                    continue;
                }
                if ((0, _utils.isDefined)(userId)) {
                    const userWorkspace = await this.userWorkspaceRepository.findOne({
                        where: {
                            userId,
                            workspaceId
                        },
                        select: [
                            'id'
                        ]
                    });
                    if (userWorkspace) {
                        const connectedAccounts = await this.connectedAccountRepository.find({
                            where: {
                                calendarChannels: {
                                    id: (0, _typeorm1.In)(calendarChannels.map((channel)=>channel.id))
                                },
                                userWorkspaceId: userWorkspace.id,
                                workspaceId
                            }
                        });
                        if (connectedAccounts.length > 0) {
                            continue;
                        }
                    }
                }
                if (calendarChannelsGroupByVisibility[_types.CalendarChannelVisibility.METADATA]) {
                    calendarEvents[i].title = _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED;
                    calendarEvents[i].description = _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED;
                    continue;
                }
                calendarEvents.splice(i, 1);
            }
            return calendarEvents;
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager, connectedAccountRepository, userWorkspaceRepository, calendarChannelRepository){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.connectedAccountRepository = connectedAccountRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.calendarChannelRepository = calendarChannelRepository;
    }
};
ApplyCalendarEventsVisibilityRestrictionsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_calendarchannelentity.CalendarChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ApplyCalendarEventsVisibilityRestrictionsService);

//# sourceMappingURL=apply-calendar-events-visibility-restrictions.service.js.map