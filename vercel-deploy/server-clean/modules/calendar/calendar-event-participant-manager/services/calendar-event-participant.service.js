"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarEventParticipantService", {
    enumerable: true,
    get: function() {
        return CalendarEventParticipantService;
    }
});
const _common = require("@nestjs/common");
const _classvalidator = require("class-validator");
const _lodashchunk = /*#__PURE__*/ _interop_require_default(require("lodash.chunk"));
const _lodashdifferencewith = /*#__PURE__*/ _interop_require_default(require("lodash.differencewith"));
const _types = require("twenty-shared/types");
const _typeorm = require("typeorm");
const _messagequeuedecorator = require("../../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../engine/core-modules/message-queue/services/message-queue.service");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _createcompanyandcontactjob = require("../../../contact-creation-manager/jobs/create-company-and-contact.job");
const _matchparticipantservice = require("../../../match-participant/match-participant.service");
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
let CalendarEventParticipantService = class CalendarEventParticipantService {
    async upsertAndDeleteCalendarEventParticipants({ participantsToCreate, participantsToUpdate, transactionManager, calendarChannel, connectedAccount, workspaceId }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const chunkedParticipantsToUpdate = (0, _lodashchunk.default)(participantsToUpdate, 200);
            const calendarEventParticipantRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'calendarEventParticipant');
            for (const participantsToUpdateChunk of chunkedParticipantsToUpdate){
                const existingCalendarEventParticipants = await calendarEventParticipantRepository.find({
                    where: {
                        calendarEventId: (0, _typeorm.Any)(participantsToUpdateChunk.map((participant)=>participant.calendarEventId).filter(_classvalidator.isDefined))
                    }
                });
                const { calendarEventParticipantsToUpdate, newCalendarEventParticipants } = participantsToUpdateChunk.reduce((acc, calendarEventParticipant)=>{
                    const existingCalendarEventParticipant = existingCalendarEventParticipants.find((existingCalendarEventParticipant)=>existingCalendarEventParticipant.handle === calendarEventParticipant.handle && existingCalendarEventParticipant.calendarEventId === calendarEventParticipant.calendarEventId);
                    if (existingCalendarEventParticipant) {
                        acc.calendarEventParticipantsToUpdate.push({
                            ...calendarEventParticipant,
                            id: existingCalendarEventParticipant.id
                        });
                    } else {
                        acc.newCalendarEventParticipants.push(calendarEventParticipant);
                    }
                    return acc;
                }, {
                    calendarEventParticipantsToUpdate: [],
                    newCalendarEventParticipants: []
                });
                const calendarEventParticipantsToDelete = (0, _lodashdifferencewith.default)(existingCalendarEventParticipants, participantsToUpdateChunk, (existingCalendarEventParticipant, participantToUpdate)=>existingCalendarEventParticipant.handle === participantToUpdate.handle && existingCalendarEventParticipant.calendarEventId === participantToUpdate.calendarEventId);
                await calendarEventParticipantRepository.delete({
                    id: (0, _typeorm.Any)(calendarEventParticipantsToDelete.map((calendarEventParticipant)=>calendarEventParticipant.id))
                }, transactionManager);
                await calendarEventParticipantRepository.updateMany(calendarEventParticipantsToUpdate.map((participant)=>({
                        criteria: participant.id,
                        partialEntity: participant
                    })), transactionManager);
                participantsToCreate.push(...newCalendarEventParticipants);
            }
            const chunkedParticipantsToCreate = (0, _lodashchunk.default)(participantsToCreate, 200);
            const savedParticipants = [];
            for (const participantsToCreateChunk of chunkedParticipantsToCreate){
                const savedParticipantsChunk = await calendarEventParticipantRepository.insert(participantsToCreateChunk, transactionManager);
                savedParticipants.push(...savedParticipantsChunk.raw);
            }
            if (calendarChannel.isContactAutoCreationEnabled) {
                await this.messageQueueService.add(_createcompanyandcontactjob.CreateCompanyAndContactJob.name, {
                    workspaceId,
                    connectedAccount,
                    contactsToCreate: savedParticipants.map((participant)=>({
                            handle: participant.handle ?? '',
                            displayName: participant.displayName ?? participant.handle ?? ''
                        })),
                    source: _types.FieldActorSource.CALENDAR
                });
            }
            await this.matchParticipantService.matchParticipants({
                participants: savedParticipants,
                objectMetadataName: 'calendarEventParticipant',
                transactionManager,
                matchWith: 'workspaceMemberAndPerson',
                workspaceId
            });
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager, matchParticipantService, messageQueueService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.matchParticipantService = matchParticipantService;
        this.messageQueueService = messageQueueService;
    }
};
CalendarEventParticipantService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.contactCreationQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _matchparticipantservice.MatchParticipantService === "undefined" ? Object : _matchparticipantservice.MatchParticipantService,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], CalendarEventParticipantService);

//# sourceMappingURL=calendar-event-participant.service.js.map