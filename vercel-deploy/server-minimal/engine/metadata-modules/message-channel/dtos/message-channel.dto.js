"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageChannelDTO", {
    enumerable: true,
    get: function() {
        return MessageChannelDTO;
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
let MessageChannelDTO = class MessageChannelDTO {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], MessageChannelDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.MessageChannelVisibility),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.MessageChannelVisibility),
    _ts_metadata("design:type", typeof _types.MessageChannelVisibility === "undefined" ? Object : _types.MessageChannelVisibility)
], MessageChannelDTO.prototype, "visibility", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], MessageChannelDTO.prototype, "handle", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.MessageChannelType),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.MessageChannelType),
    _ts_metadata("design:type", typeof _types.MessageChannelType === "undefined" ? Object : _types.MessageChannelType)
], MessageChannelDTO.prototype, "type", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], MessageChannelDTO.prototype, "isContactAutoCreationEnabled", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.MessageChannelContactAutoCreationPolicy),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.MessageChannelContactAutoCreationPolicy),
    _ts_metadata("design:type", typeof _types.MessageChannelContactAutoCreationPolicy === "undefined" ? Object : _types.MessageChannelContactAutoCreationPolicy)
], MessageChannelDTO.prototype, "contactAutoCreationPolicy", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.MessageFolderImportPolicy),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.MessageFolderImportPolicy),
    _ts_metadata("design:type", typeof _types.MessageFolderImportPolicy === "undefined" ? Object : _types.MessageFolderImportPolicy)
], MessageChannelDTO.prototype, "messageFolderImportPolicy", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], MessageChannelDTO.prototype, "excludeNonProfessionalEmails", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], MessageChannelDTO.prototype, "excludeGroupEmails", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.MessageChannelPendingGroupEmailsAction),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.MessageChannelPendingGroupEmailsAction),
    _ts_metadata("design:type", typeof _types.MessageChannelPendingGroupEmailsAction === "undefined" ? Object : _types.MessageChannelPendingGroupEmailsAction)
], MessageChannelDTO.prototype, "pendingGroupEmailsAction", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], MessageChannelDTO.prototype, "isSyncEnabled", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", Object)
], MessageChannelDTO.prototype, "syncCursor", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], MessageChannelDTO.prototype, "syncedAt", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.MessageChannelSyncStatus),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.MessageChannelSyncStatus),
    _ts_metadata("design:type", typeof _types.MessageChannelSyncStatus === "undefined" ? Object : _types.MessageChannelSyncStatus)
], MessageChannelDTO.prototype, "syncStatus", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.MessageChannelSyncStage),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.MessageChannelSyncStage),
    _ts_metadata("design:type", typeof _types.MessageChannelSyncStage === "undefined" ? Object : _types.MessageChannelSyncStage)
], MessageChannelDTO.prototype, "syncStage", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], MessageChannelDTO.prototype, "syncStageStartedAt", void 0);
_ts_decorate([
    (0, _classvalidator.IsInt)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Number)
], MessageChannelDTO.prototype, "throttleFailureCount", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], MessageChannelDTO.prototype, "throttleRetryAfter", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], MessageChannelDTO.prototype, "connectedAccountId", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], MessageChannelDTO.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], MessageChannelDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], MessageChannelDTO.prototype, "updatedAt", void 0);
MessageChannelDTO = _ts_decorate([
    (0, _graphql.ObjectType)('MessageChannel')
], MessageChannelDTO);

//# sourceMappingURL=message-channel.dto.js.map