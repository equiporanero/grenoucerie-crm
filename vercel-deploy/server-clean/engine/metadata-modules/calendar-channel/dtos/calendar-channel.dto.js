"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarChannelDTO", {
    enumerable: true,
    get: function() {
        return CalendarChannelDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _types = require("twenty-shared/types");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CalendarChannelDTO = class CalendarChannelDTO {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], CalendarChannelDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], CalendarChannelDTO.prototype, "handle", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.CalendarChannelSyncStatus),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.CalendarChannelSyncStatus),
    _ts_metadata("design:type", typeof _types.CalendarChannelSyncStatus === "undefined" ? Object : _types.CalendarChannelSyncStatus)
], CalendarChannelDTO.prototype, "syncStatus", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.CalendarChannelSyncStage),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.CalendarChannelSyncStage),
    _ts_metadata("design:type", typeof _types.CalendarChannelSyncStage === "undefined" ? Object : _types.CalendarChannelSyncStage)
], CalendarChannelDTO.prototype, "syncStage", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.CalendarChannelVisibility),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.CalendarChannelVisibility),
    _ts_metadata("design:type", typeof _types.CalendarChannelVisibility === "undefined" ? Object : _types.CalendarChannelVisibility)
], CalendarChannelDTO.prototype, "visibility", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], CalendarChannelDTO.prototype, "isContactAutoCreationEnabled", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.CalendarChannelContactAutoCreationPolicy),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.CalendarChannelContactAutoCreationPolicy),
    _ts_metadata("design:type", typeof _types.CalendarChannelContactAutoCreationPolicy === "undefined" ? Object : _types.CalendarChannelContactAutoCreationPolicy)
], CalendarChannelDTO.prototype, "contactAutoCreationPolicy", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], CalendarChannelDTO.prototype, "isSyncEnabled", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", Object)
], CalendarChannelDTO.prototype, "syncCursor", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], CalendarChannelDTO.prototype, "syncedAt", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], CalendarChannelDTO.prototype, "syncStageStartedAt", void 0);
_ts_decorate([
    (0, _classvalidator.IsInt)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Number)
], CalendarChannelDTO.prototype, "throttleFailureCount", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], CalendarChannelDTO.prototype, "connectedAccountId", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], CalendarChannelDTO.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CalendarChannelDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CalendarChannelDTO.prototype, "updatedAt", void 0);
CalendarChannelDTO = _ts_decorate([
    (0, _graphql.ObjectType)('CalendarChannel')
], CalendarChannelDTO);

//# sourceMappingURL=calendar-channel.dto.js.map