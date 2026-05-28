"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GetMessagesService", {
    enumerable: true,
    get: function() {
        return GetMessagesService;
    }
});
const _common = require("@nestjs/common");
const _messagingconstants = require("../constants/messaging.constants");
const _timelinemessagingservice = require("./timeline-messaging.service");
const _formatthreadsutil = require("../utils/format-threads.util");
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
let GetMessagesService = class GetMessagesService {
    async getMessagesFromPersonIds(workspaceMemberId, personIds, workspaceId, page = 1, pageSize = _messagingconstants.TIMELINE_THREADS_DEFAULT_PAGE_SIZE) {
        const offset = (page - 1) * pageSize;
        const { messageThreads, totalNumberOfThreads } = await this.timelineMessagingService.getAndCountMessageThreads(personIds, workspaceId, offset, pageSize);
        if (!messageThreads) {
            return {
                totalNumberOfThreads: 0,
                timelineThreads: []
            };
        }
        const messageThreadIds = messageThreads.map((messageThread)=>messageThread.id);
        const threadParticipantsByThreadId = await this.timelineMessagingService.getThreadParticipantsByThreadId(messageThreadIds, workspaceId);
        const threadVisibilityByThreadId = await this.timelineMessagingService.getThreadVisibilityByThreadId(messageThreadIds, workspaceMemberId, workspaceId);
        return {
            totalNumberOfThreads,
            timelineThreads: (0, _formatthreadsutil.formatThreads)(messageThreads, threadParticipantsByThreadId, threadVisibilityByThreadId)
        };
    }
    async getMessagesFromCompanyId(workspaceMemberId, companyId, workspaceId, page = 1, pageSize = _messagingconstants.TIMELINE_THREADS_DEFAULT_PAGE_SIZE) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const personRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'person', {
                shouldBypassPermissionChecks: true
            });
            const personIds = (await personRepository.find({
                where: {
                    companyId
                },
                select: {
                    id: true
                }
            })).map((person)=>person.id);
            if (personIds.length === 0) {
                return {
                    totalNumberOfThreads: 0,
                    timelineThreads: []
                };
            }
            const messageThreads = await this.getMessagesFromPersonIds(workspaceMemberId, personIds, workspaceId, page, pageSize);
            return messageThreads;
        }, authContext);
    }
    async getMessagesFromOpportunityId(workspaceMemberId, opportunityId, workspaceId, page = 1, pageSize = _messagingconstants.TIMELINE_THREADS_DEFAULT_PAGE_SIZE) {
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
                    totalNumberOfThreads: 0,
                    timelineThreads: []
                };
            }
            const messageThreads = await this.getMessagesFromCompanyId(workspaceMemberId, opportunity.companyId, workspaceId, page, pageSize);
            return messageThreads;
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager, timelineMessagingService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.timelineMessagingService = timelineMessagingService;
    }
};
GetMessagesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _timelinemessagingservice.TimelineMessagingService === "undefined" ? Object : _timelinemessagingservice.TimelineMessagingService
    ])
], GetMessagesService);

//# sourceMappingURL=get-messages.service.js.map