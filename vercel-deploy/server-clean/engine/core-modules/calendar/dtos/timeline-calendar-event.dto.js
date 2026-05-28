"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get LinksMetadataDTO () {
        return LinksMetadataDTO;
    },
    get TimelineCalendarEventDTO () {
        return TimelineCalendarEventDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _timelinecalendareventparticipantdto = require("./timeline-calendar-event-participant.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let LinkMetadataDTO = class LinkMetadataDTO {
};
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], LinkMetadataDTO.prototype, "label", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], LinkMetadataDTO.prototype, "url", void 0);
LinkMetadataDTO = _ts_decorate([
    (0, _graphql.ObjectType)('LinkMetadata')
], LinkMetadataDTO);
let LinksMetadataDTO = class LinksMetadataDTO {
};
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], LinksMetadataDTO.prototype, "primaryLinkLabel", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], LinksMetadataDTO.prototype, "primaryLinkUrl", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            LinkMetadataDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], LinksMetadataDTO.prototype, "secondaryLinks", void 0);
LinksMetadataDTO = _ts_decorate([
    (0, _graphql.ObjectType)('LinksMetadata')
], LinksMetadataDTO);
let TimelineCalendarEventDTO = class TimelineCalendarEventDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], TimelineCalendarEventDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], TimelineCalendarEventDTO.prototype, "title", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], TimelineCalendarEventDTO.prototype, "isCanceled", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], TimelineCalendarEventDTO.prototype, "isFullDay", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], TimelineCalendarEventDTO.prototype, "startsAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], TimelineCalendarEventDTO.prototype, "endsAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], TimelineCalendarEventDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], TimelineCalendarEventDTO.prototype, "location", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], TimelineCalendarEventDTO.prototype, "conferenceSolution", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>LinksMetadataDTO),
    _ts_metadata("design:type", typeof LinksMetadataDTO === "undefined" ? Object : LinksMetadataDTO)
], TimelineCalendarEventDTO.prototype, "conferenceLink", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _timelinecalendareventparticipantdto.TimelineCalendarEventParticipantDTO
        ]),
    _ts_metadata("design:type", Array)
], TimelineCalendarEventDTO.prototype, "participants", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.CalendarChannelVisibility),
    _ts_metadata("design:type", typeof _types.CalendarChannelVisibility === "undefined" ? Object : _types.CalendarChannelVisibility)
], TimelineCalendarEventDTO.prototype, "visibility", void 0);
TimelineCalendarEventDTO = _ts_decorate([
    (0, _graphql.ObjectType)('TimelineCalendarEvent')
], TimelineCalendarEventDTO);

//# sourceMappingURL=timeline-calendar-event.dto.js.map