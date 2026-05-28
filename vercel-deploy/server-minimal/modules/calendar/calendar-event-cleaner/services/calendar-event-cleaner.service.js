"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarEventCleanerService", {
    enumerable: true,
    get: function() {
        return CalendarEventCleanerService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("typeorm");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _deleteusingpaginationutil = require("../../../messaging/message-cleaner/utils/delete-using-pagination.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CalendarEventCleanerService = class CalendarEventCleanerService {
    async deleteCalendarChannelEventAssociationsByChannelId({ workspaceId, calendarChannelId }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const calendarChannelEventAssociationRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'calendarChannelEventAssociation');
            const workspaceDataSource = await this.globalWorkspaceOrmManager.getGlobalWorkspaceDataSource();
            await workspaceDataSource.transaction(async (manager)=>{
                const transactionManager = manager;
                await (0, _deleteusingpaginationutil.deleteUsingPagination)(workspaceId, 500, async (limit, offset, _workspaceId, transactionManager)=>{
                    const associations = await calendarChannelEventAssociationRepository.find({
                        where: {
                            calendarChannelId
                        },
                        take: limit,
                        skip: offset
                    }, transactionManager);
                    return associations.map(({ id })=>id);
                }, async (ids, workspaceId, transactionManager)=>{
                    this.logger.log(`WorkspaceId: ${workspaceId} Deleting ${ids.length} calendar channel event associations for channel ${calendarChannelId}`);
                    await calendarChannelEventAssociationRepository.delete(ids, transactionManager);
                }, transactionManager);
            });
        }, authContext, {
            lite: true
        });
    }
    async cleanWorkspaceCalendarEvents(workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const calendarEventRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'calendarEvent');
            await (0, _deleteusingpaginationutil.deleteUsingPagination)(workspaceId, 500, async (limit, offset)=>{
                const nonAssociatedCalendarEvents = await calendarEventRepository.find({
                    where: {
                        calendarChannelEventAssociations: {
                            id: (0, _typeorm.IsNull)()
                        }
                    },
                    take: limit,
                    skip: offset
                });
                return nonAssociatedCalendarEvents.map(({ id })=>id);
            }, async (ids)=>{
                await calendarEventRepository.delete({
                    id: (0, _typeorm.Any)(ids)
                });
            });
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.logger = new _common.Logger(CalendarEventCleanerService.name);
    }
};
CalendarEventCleanerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], CalendarEventCleanerService);

//# sourceMappingURL=calendar-event-cleaner.service.js.map