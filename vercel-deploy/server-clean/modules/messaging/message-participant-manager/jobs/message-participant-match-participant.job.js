"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageParticipantMatchParticipantJob", {
    enumerable: true,
    get: function() {
        return MessageParticipantMatchParticipantJob;
    }
});
const _common = require("@nestjs/common");
const _processdecorator = require("../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
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
let MessageParticipantMatchParticipantJob = class MessageParticipantMatchParticipantJob {
    async handle(data) {
        const { participantMatching, workspaceId } = data;
        if (participantMatching.personIds.length > 0 || participantMatching.personEmails.length > 0) {
            await this.matchParticipantService.matchParticipantsForPeople({
                participantMatching,
                objectMetadataName: 'messageParticipant',
                workspaceId
            });
        }
        if (participantMatching.workspaceMemberIds.length > 0) {
            await this.matchParticipantService.matchParticipantsForWorkspaceMembers({
                participantMatching,
                objectMetadataName: 'messageParticipant',
                workspaceId
            });
        }
    }
    constructor(matchParticipantService){
        this.matchParticipantService = matchParticipantService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(MessageParticipantMatchParticipantJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof MessageParticipantMatchParticipantJobData === "undefined" ? Object : MessageParticipantMatchParticipantJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], MessageParticipantMatchParticipantJob.prototype, "handle", null);
MessageParticipantMatchParticipantJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.messagingQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _matchparticipantservice.MatchParticipantService === "undefined" ? Object : _matchparticipantservice.MatchParticipantService
    ])
], MessageParticipantMatchParticipantJob);

//# sourceMappingURL=message-participant-match-participant.job.js.map