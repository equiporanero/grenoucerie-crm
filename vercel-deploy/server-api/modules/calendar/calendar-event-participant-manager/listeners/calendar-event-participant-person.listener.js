"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarEventParticipantPersonListener", {
    enumerable: true,
    get: function() {
        return CalendarEventParticipantPersonListener;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _ondatabasebatcheventdecorator = require("../../../../engine/api/graphql/graphql-query-runner/decorators/on-database-batch-event.decorator");
const _databaseeventaction = require("../../../../engine/api/graphql/graphql-query-runner/enums/database-event-action");
const _objectrecordchangedpropertiesutil = require("../../../../engine/core-modules/event-emitter/utils/object-record-changed-properties.util");
const _messagequeuedecorator = require("../../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../engine/core-modules/message-queue/services/message-queue.service");
const _workspaceeventbatchtype = require("../../../../engine/workspace-event-emitter/types/workspace-event-batch.type");
const _calendareventparticipantmatchparticipantjob = require("../jobs/calendar-event-participant-match-participant.job");
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
let CalendarEventParticipantPersonListener = class CalendarEventParticipantPersonListener {
    async handleCreatedEvent(payload) {
        const personWithEmails = payload.events.filter((eventPayload)=>(0, _utils.isDefined)(eventPayload.properties.after.emails?.primaryEmail) || (0, _utils.isDefined)(eventPayload.properties.after.emails?.additionalEmails));
        const personIds = personWithEmails.map((eventPayload)=>eventPayload.recordId);
        const personEmails = personWithEmails.flatMap((eventPayload)=>[
                eventPayload.properties.after.emails.primaryEmail,
                ...eventPayload.properties.after.emails?.additionalEmails ?? []
            ]).filter(_utils.isDefined);
        await this.messageQueueService.add(_calendareventparticipantmatchparticipantjob.CalendarEventParticipantMatchParticipantJob.name, {
            workspaceId: payload.workspaceId,
            participantMatching: {
                personIds,
                personEmails,
                workspaceMemberIds: []
            }
        });
    }
    async handleUpdatedEvent(payload) {
        const personWithEmails = payload.events.filter((eventPayload)=>(0, _objectrecordchangedpropertiesutil.objectRecordChangedProperties)(eventPayload.properties.before, eventPayload.properties.after).includes('emails'));
        const personIds = personWithEmails.map((eventPayload)=>eventPayload.recordId);
        const personEmails = personWithEmails.flatMap((eventPayload)=>[
                eventPayload.properties.after.emails.primaryEmail,
                ...eventPayload.properties.after.emails?.additionalEmails ?? []
            ]).filter(_utils.isDefined);
        await this.messageQueueService.add(_calendareventparticipantmatchparticipantjob.CalendarEventParticipantMatchParticipantJob.name, {
            workspaceId: payload.workspaceId,
            participantMatching: {
                personIds,
                personEmails,
                workspaceMemberIds: []
            }
        });
    }
    async handleDestroyedEvent(payload) {
        const peopleHavingEmails = payload.events.filter((eventPayload)=>(0, _utils.isDefined)(eventPayload.properties.before.emails?.primaryEmail) || (0, _utils.isDefined)(eventPayload.properties.before.emails?.additionalEmails));
        const personEmails = peopleHavingEmails.flatMap((eventPayload)=>[
                eventPayload.properties.before.emails.primaryEmail,
                ...eventPayload.properties.before.emails?.additionalEmails ?? []
            ]).filter(_utils.isDefined);
        await this.messageQueueService.add(_calendareventparticipantmatchparticipantjob.CalendarEventParticipantMatchParticipantJob.name, {
            workspaceId: payload.workspaceId,
            participantMatching: {
                personIds: [],
                personEmails,
                workspaceMemberIds: []
            }
        });
    }
    constructor(messageQueueService){
        this.messageQueueService = messageQueueService;
    }
};
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('person', _databaseeventaction.DatabaseEventAction.CREATED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventbatchtype.WorkspaceEventBatch === "undefined" ? Object : _workspaceeventbatchtype.WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], CalendarEventParticipantPersonListener.prototype, "handleCreatedEvent", null);
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('person', _databaseeventaction.DatabaseEventAction.UPDATED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventbatchtype.WorkspaceEventBatch === "undefined" ? Object : _workspaceeventbatchtype.WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], CalendarEventParticipantPersonListener.prototype, "handleUpdatedEvent", null);
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('person', _databaseeventaction.DatabaseEventAction.DESTROYED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventbatchtype.WorkspaceEventBatch === "undefined" ? Object : _workspaceeventbatchtype.WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], CalendarEventParticipantPersonListener.prototype, "handleDestroyedEvent", null);
CalendarEventParticipantPersonListener = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.calendarQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], CalendarEventParticipantPersonListener);

//# sourceMappingURL=calendar-event-participant-person.listener.js.map