"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MatchParticipantService", {
    enumerable: true,
    get: function() {
        return MatchParticipantService;
    }
});
const _common = require("@nestjs/common");
const _lodashchunk = /*#__PURE__*/ _interop_require_default(require("lodash.chunk"));
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _globalworkspaceormmanager = require("../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workspaceeventemitter = require("../../engine/workspace-event-emitter/workspace-event-emitter");
const _addpersonemailfilterstoquerybuilder = require("./utils/add-person-email-filters-to-query-builder");
const _findpersonbyprimaryoradditionalemail = require("./utils/find-person-by-primary-or-additional-email");
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
let MatchParticipantService = class MatchParticipantService {
    async getParticipantRepository(workspaceId, objectMetadataName) {
        if (objectMetadataName === 'messageParticipant') {
            return await this.globalWorkspaceOrmManager.getRepository(workspaceId, objectMetadataName);
        }
        return await this.globalWorkspaceOrmManager.getRepository(workspaceId, objectMetadataName);
    }
    async matchParticipants({ participants, objectMetadataName, transactionManager, matchWith = 'workspaceMemberAndPerson', workspaceId }) {
        if (participants.length === 0) {
            return;
        }
        const personRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'person', {
            shouldBypassPermissionChecks: true
        });
        const participantRepository = await this.getParticipantRepository(workspaceId, objectMetadataName);
        const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
            shouldBypassPermissionChecks: true
        });
        const chunkSize = 200;
        const chunkedParticipants = (0, _lodashchunk.default)(participants, chunkSize);
        for (const participants of chunkedParticipants){
            const uniqueParticipantsHandles = [
                ...new Set(participants.map((participant)=>participant.handle))
            ].filter(_utils.isDefined);
            const queryBuilder = (0, _addpersonemailfilterstoquerybuilder.addPersonEmailFiltersToQueryBuilder)({
                queryBuilder: personRepository.createQueryBuilder('person'),
                emails: uniqueParticipantsHandles
            });
            const people = await queryBuilder.orderBy('person.createdAt', 'ASC').getMany();
            const workspaceMembers = await workspaceMemberRepository.find({
                where: {
                    userEmail: (0, _typeorm.Any)(uniqueParticipantsHandles)
                }
            }, transactionManager);
            const partipantsToBeUpdated = participants.map((participant)=>({
                    ...participant,
                    handle: participant.handle ?? ''
                })).map((participant)=>{
                const person = (0, _findpersonbyprimaryoradditionalemail.findPersonByPrimaryOrAdditionalEmail)({
                    people,
                    email: participant.handle
                });
                const workspaceMember = workspaceMembers.find((workspaceMember)=>workspaceMember.userEmail === participant.handle);
                const shouldMatchWithPerson = matchWith === 'workspaceMemberAndPerson' || matchWith === 'personOnly';
                const shouldMatchWithWorkspaceMember = matchWith === 'workspaceMemberAndPerson' || matchWith === 'workspaceMemberOnly';
                const newParticipant = {
                    ...participant,
                    ...shouldMatchWithPerson && {
                        personId: (0, _utils.isDefined)(person) ? person.id : null
                    },
                    ...shouldMatchWithWorkspaceMember && {
                        workspaceMemberId: (0, _utils.isDefined)(workspaceMember) ? workspaceMember.id : null
                    }
                };
                if (newParticipant.personId === participant.personId && newParticipant.workspaceMemberId === participant.workspaceMemberId) {
                    return null;
                }
                return newParticipant;
            }).filter(_utils.isDefined);
            await participantRepository.updateMany(partipantsToBeUpdated.map((participant)=>({
                    criteria: participant.id,
                    partialEntity: {
                        personId: participant.personId,
                        workspaceMemberId: participant.workspaceMemberId
                    }
                })));
            this.workspaceEventEmitter.emitCustomBatchEvent(`${objectMetadataName}_matched`, [
                {
                    workspaceMemberId: null,
                    participants: partipantsToBeUpdated
                }
            ], workspaceId);
        }
    }
    async matchParticipantsForWorkspaceMembers({ participantMatching, objectMetadataName, workspaceId }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const participantRepository = await this.getParticipantRepository(workspaceId, objectMetadataName);
            const participants = await participantRepository.find({
                where: {
                    workspaceMemberId: (0, _typeorm.In)(participantMatching.workspaceMemberIds)
                }
            });
            const tobeRematchedParticipants = participants.map((participant)=>{
                return {
                    ...participant,
                    workspaceMemberId: null
                };
            });
            await this.matchParticipants({
                matchWith: 'workspaceMemberOnly',
                participants: tobeRematchedParticipants,
                objectMetadataName,
                workspaceId
            });
        }, authContext);
    }
    async matchParticipantsForPeople({ participantMatching, objectMetadataName, workspaceId }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const participantRepository = await this.getParticipantRepository(workspaceId, objectMetadataName);
            let participantsMatchingPersonEmails = [];
            let participantsMatchingPersonId = [];
            if (participantMatching.personIds.length > 0) {
                participantsMatchingPersonId = await participantRepository.find({
                    where: {
                        personId: (0, _typeorm.In)(participantMatching.personIds)
                    }
                });
            }
            if (participantMatching.personEmails.length > 0) {
                participantsMatchingPersonEmails = await participantRepository.find({
                    where: {
                        handle: (0, _typeorm.In)(participantMatching.personEmails)
                    }
                });
            }
            const uniqueParticipants = [
                ...new Set([
                    ...participantsMatchingPersonId,
                    ...participantsMatchingPersonEmails
                ])
            ];
            const tobeRematchedParticipants = uniqueParticipants.map((participant)=>{
                return {
                    ...participant,
                    personId: null
                };
            });
            await this.matchParticipants({
                matchWith: 'personOnly',
                participants: tobeRematchedParticipants,
                objectMetadataName,
                workspaceId
            });
        }, authContext);
    }
    constructor(workspaceEventEmitter, globalWorkspaceOrmManager){
        this.workspaceEventEmitter = workspaceEventEmitter;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
    }
};
MatchParticipantService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventemitter.WorkspaceEventEmitter === "undefined" ? Object : _workspaceeventemitter.WorkspaceEventEmitter,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], MatchParticipantService);

//# sourceMappingURL=match-participant.service.js.map