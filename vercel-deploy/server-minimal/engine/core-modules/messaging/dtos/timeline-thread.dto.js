"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TimelineThreadDTO", {
    enumerable: true,
    get: function() {
        return TimelineThreadDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _timelinethreadparticipantdto = require("./timeline-thread-participant.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TimelineThreadDTO = class TimelineThreadDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], TimelineThreadDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], TimelineThreadDTO.prototype, "read", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.MessageChannelVisibility),
    _ts_metadata("design:type", typeof _types.MessageChannelVisibility === "undefined" ? Object : _types.MessageChannelVisibility)
], TimelineThreadDTO.prototype, "visibility", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof _timelinethreadparticipantdto.TimelineThreadParticipantDTO === "undefined" ? Object : _timelinethreadparticipantdto.TimelineThreadParticipantDTO)
], TimelineThreadDTO.prototype, "firstParticipant", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _timelinethreadparticipantdto.TimelineThreadParticipantDTO
        ]),
    _ts_metadata("design:type", Array)
], TimelineThreadDTO.prototype, "lastTwoParticipants", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], TimelineThreadDTO.prototype, "lastMessageReceivedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], TimelineThreadDTO.prototype, "lastMessageBody", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], TimelineThreadDTO.prototype, "subject", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Number)
], TimelineThreadDTO.prototype, "numberOfMessagesInThread", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Number)
], TimelineThreadDTO.prototype, "participantCount", void 0);
TimelineThreadDTO = _ts_decorate([
    (0, _graphql.ObjectType)('TimelineThread')
], TimelineThreadDTO);

//# sourceMappingURL=timeline-thread.dto.js.map