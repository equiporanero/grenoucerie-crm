"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateCalendarChannelService", {
    enumerable: true,
    get: function() {
        return CreateCalendarChannelService;
    }
});
const _common = require("@nestjs/common");
const _uuid = require("uuid");
const _types = require("twenty-shared/types");
const _calendarchannelentity = require("../../../metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../twenty-orm/utils/build-system-auth-context.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreateCalendarChannelService = class CreateCalendarChannelService {
    async createCalendarChannel(input) {
        const { workspaceId, connectedAccountId, handle, calendarVisibility, skipMessageChannelConfiguration, transactionManager } = input;
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const newCalendarChannelId = (0, _uuid.v4)();
            await transactionManager.getRepository(_calendarchannelentity.CalendarChannelEntity).save({
                id: newCalendarChannelId,
                connectedAccountId,
                handle,
                visibility: calendarVisibility || _types.CalendarChannelVisibility.SHARE_EVERYTHING,
                syncStatus: skipMessageChannelConfiguration ? _types.CalendarChannelSyncStatus.ONGOING : _types.CalendarChannelSyncStatus.NOT_SYNCED,
                syncStage: skipMessageChannelConfiguration ? _types.CalendarChannelSyncStage.CALENDAR_EVENT_LIST_FETCH_PENDING : _types.CalendarChannelSyncStage.PENDING_CONFIGURATION,
                workspaceId
            });
            return newCalendarChannelId;
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
    }
};
CreateCalendarChannelService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], CreateCalendarChannelService);

//# sourceMappingURL=create-calendar-channel.service.js.map