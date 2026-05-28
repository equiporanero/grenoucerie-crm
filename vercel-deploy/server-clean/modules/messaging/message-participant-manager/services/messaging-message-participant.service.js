"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingMessageParticipantService", {
    enumerable: true,
    get: function() {
        return MessagingMessageParticipantService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("typeorm");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _matchparticipantservice = require("../../../match-participant/match-participant.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MessagingMessageParticipantService = class MessagingMessageParticipantService {
    async saveMessageParticipants(participants, workspaceId, transactionManager) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const messageParticipantRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'messageParticipant');
            const existingParticipantsBasedOnMessageIds = await messageParticipantRepository.find({
                where: {
                    messageId: (0, _typeorm.In)(participants.map((participant)=>participant.messageId))
                }
            });
            const participantsToCreate = participants.filter((participant)=>!existingParticipantsBasedOnMessageIds.find((existingParticipant)=>existingParticipant.messageId === participant.messageId && existingParticipant.handle === participant.handle && existingParticipant.displayName === participant.displayName && existingParticipant.role === participant.role)).map((participant)=>{
                return {
                    messageId: participant.messageId,
                    handle: participant.handle,
                    displayName: participant.displayName,
                    role: participant.role
                };
            });
            const createdParticipants = await messageParticipantRepository.insert(participantsToCreate, transactionManager);
            await this.matchParticipantService.matchParticipants({
                participants: createdParticipants.raw ?? [],
                objectMetadataName: 'messageParticipant',
                transactionManager,
                matchWith: 'workspaceMemberAndPerson',
                workspaceId
            });
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager, matchParticipantService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.matchParticipantService = matchParticipantService;
    }
};
MessagingMessageParticipantService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _matchparticipantservice.MatchParticipantService === "undefined" ? Object : _matchparticipantservice.MatchParticipantService
    ])
], MessagingMessageParticipantService);

//# sourceMappingURL=messaging-message-participant.service.js.map