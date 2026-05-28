"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarEventParticipantMatchParticipantJob", {
    enumerable: true,
    get: function() {
        return CalendarEventParticipantMatchParticipantJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _processdecorator = require("../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _workspaceentity = require("../../../../engine/core-modules/workspace/workspace.entity");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let CalendarEventParticipantMatchParticipantJob = class CalendarEventParticipantMatchParticipantJob {
    async handle(data) {
        const { workspaceId, participantMatching } = data;
        const workspace = await this.workspaceRepository.findOne({
            where: {
                id: workspaceId
            }
        });
        if (workspace?.activationStatus !== 'ACTIVE') {
            return;
        }
        if (participantMatching.personIds.length > 0 || participantMatching.personEmails.length > 0) {
            await this.matchParticipantService.matchParticipantsForPeople({
                objectMetadataName: 'calendarEventParticipant',
                participantMatching,
                workspaceId
            });
        }
        if (participantMatching.workspaceMemberIds.length > 0) {
            await this.matchParticipantService.matchParticipantsForWorkspaceMembers({
                objectMetadataName: 'calendarEventParticipant',
                participantMatching,
                workspaceId
            });
        }
    }
    constructor(workspaceRepository, matchParticipantService){
        this.workspaceRepository = workspaceRepository;
        this.matchParticipantService = matchParticipantService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CalendarEventParticipantMatchParticipantJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CalendarEventParticipantMatchParticipantJobData === "undefined" ? Object : CalendarEventParticipantMatchParticipantJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], CalendarEventParticipantMatchParticipantJob.prototype, "handle", null);
CalendarEventParticipantMatchParticipantJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.calendarQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _matchparticipantservice.MatchParticipantService === "undefined" ? Object : _matchparticipantservice.MatchParticipantService
    ])
], CalendarEventParticipantMatchParticipantJob);

//# sourceMappingURL=calendar-event-participant-match-participant.job.js.map