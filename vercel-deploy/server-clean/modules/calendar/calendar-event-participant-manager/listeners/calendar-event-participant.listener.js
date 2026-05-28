"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarEventParticipantListener", {
    enumerable: true,
    get: function() {
        return CalendarEventParticipantListener;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _oncustombatcheventdecorator = require("../../../../engine/api/graphql/graphql-query-runner/decorators/on-custom-batch-event.decorator");
const _featureflagservice = require("../../../../engine/core-modules/feature-flag/services/feature-flag.service");
const _objectmetadataentity = require("../../../../engine/metadata-modules/object-metadata/object-metadata.entity");
const _objectmetadatarepositorydecorator = require("../../../../engine/object-metadata-repository/object-metadata-repository.decorator");
const _customworkspacebatcheventtype = require("../../../../engine/workspace-event-emitter/types/custom-workspace-batch-event.type");
const _timelineactivityrepository = require("../../../timeline/repositories/timeline-activity.repository");
const _timelineactivityworkspaceentity = require("../../../timeline/standard-objects/timeline-activity.workspace-entity");
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
let CalendarEventParticipantListener = class CalendarEventParticipantListener {
    async handleCalendarEventParticipantMatchedEvent(batchEvent) {
        if (!(0, _utils.isDefined)(batchEvent.workspaceId)) {
            return;
        }
        const calendarEventObjectMetadata = await this.objectMetadataRepository.findOneOrFail({
            where: {
                nameSingular: 'calendarEvent',
                workspaceId: batchEvent.workspaceId
            }
        });
        const timelineActivityPayloads = batchEvent.events.flatMap((event)=>{
            const calendarEventParticipants = event.participants ?? [];
            const calendarEventParticipantsWithPersonId = calendarEventParticipants.filter((participant)=>(0, _utils.isDefined)(participant.personId));
            if (calendarEventParticipantsWithPersonId.length === 0) {
                return;
            }
            return calendarEventParticipantsWithPersonId.map((participant)=>{
                if (!(0, _utils.isDefined)(participant.personId)) {
                    return;
                }
                return {
                    name: 'message.linked',
                    properties: {},
                    objectSingularName: 'person',
                    recordId: participant.personId,
                    workspaceMemberId: event.workspaceMemberId,
                    linkedObjectMetadataId: calendarEventObjectMetadata.id,
                    linkedRecordId: participant.calendarEventId,
                    linkedRecordCachedName: ''
                };
            }).filter(_utils.isDefined);
        });
        await this.timelineActivityRepository.upsertTimelineActivities({
            objectSingularName: 'person',
            workspaceId: batchEvent.workspaceId,
            payloads: timelineActivityPayloads.filter(_utils.isDefined)
        });
    }
    constructor(timelineActivityRepository, objectMetadataRepository, featureFlagService){
        this.timelineActivityRepository = timelineActivityRepository;
        this.objectMetadataRepository = objectMetadataRepository;
        this.featureFlagService = featureFlagService;
    }
};
_ts_decorate([
    (0, _oncustombatcheventdecorator.OnCustomBatchEvent)('calendarEventParticipant_matched'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _customworkspacebatcheventtype.CustomWorkspaceEventBatch === "undefined" ? Object : _customworkspacebatcheventtype.CustomWorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], CalendarEventParticipantListener.prototype, "handleCalendarEventParticipantMatchedEvent", null);
CalendarEventParticipantListener = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _objectmetadatarepositorydecorator.InjectObjectMetadataRepository)(_timelineactivityworkspaceentity.TimelineActivityWorkspaceEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_objectmetadataentity.ObjectMetadataEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _timelineactivityrepository.TimelineActivityRepository === "undefined" ? Object : _timelineactivityrepository.TimelineActivityRepository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _featureflagservice.FeatureFlagService === "undefined" ? Object : _featureflagservice.FeatureFlagService
    ])
], CalendarEventParticipantListener);

//# sourceMappingURL=calendar-event-participant.listener.js.map