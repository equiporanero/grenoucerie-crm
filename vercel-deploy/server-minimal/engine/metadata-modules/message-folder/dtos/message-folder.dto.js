"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageFolderDTO", {
    enumerable: true,
    get: function() {
        return MessageFolderDTO;
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
let MessageFolderDTO = class MessageFolderDTO {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], MessageFolderDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], MessageFolderDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", Object)
], MessageFolderDTO.prototype, "syncCursor", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], MessageFolderDTO.prototype, "isSentFolder", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], MessageFolderDTO.prototype, "isSynced", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], MessageFolderDTO.prototype, "parentFolderId", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], MessageFolderDTO.prototype, "externalId", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.MessageFolderPendingSyncAction),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.MessageFolderPendingSyncAction),
    _ts_metadata("design:type", typeof _types.MessageFolderPendingSyncAction === "undefined" ? Object : _types.MessageFolderPendingSyncAction)
], MessageFolderDTO.prototype, "pendingSyncAction", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], MessageFolderDTO.prototype, "messageChannelId", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], MessageFolderDTO.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], MessageFolderDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], MessageFolderDTO.prototype, "updatedAt", void 0);
MessageFolderDTO = _ts_decorate([
    (0, _graphql.ObjectType)('MessageFolder')
], MessageFolderDTO);

//# sourceMappingURL=message-folder.dto.js.map