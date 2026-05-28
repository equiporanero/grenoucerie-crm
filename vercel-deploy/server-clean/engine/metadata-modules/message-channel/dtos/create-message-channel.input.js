"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateMessageChannelInput", {
    enumerable: true,
    get: function() {
        return CreateMessageChannelInput;
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
let CreateMessageChannelInput = class CreateMessageChannelInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateMessageChannelInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], CreateMessageChannelInput.prototype, "handle", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.MessageChannelVisibility),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.MessageChannelVisibility),
    _ts_metadata("design:type", typeof _types.MessageChannelVisibility === "undefined" ? Object : _types.MessageChannelVisibility)
], CreateMessageChannelInput.prototype, "visibility", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.MessageChannelType),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.MessageChannelType),
    _ts_metadata("design:type", typeof _types.MessageChannelType === "undefined" ? Object : _types.MessageChannelType)
], CreateMessageChannelInput.prototype, "type", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.MessageChannelSyncStage),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.MessageChannelSyncStage),
    _ts_metadata("design:type", typeof _types.MessageChannelSyncStage === "undefined" ? Object : _types.MessageChannelSyncStage)
], CreateMessageChannelInput.prototype, "syncStage", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], CreateMessageChannelInput.prototype, "connectedAccountId", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], CreateMessageChannelInput.prototype, "isContactAutoCreationEnabled", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.MessageChannelContactAutoCreationPolicy),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.MessageChannelContactAutoCreationPolicy),
    _ts_metadata("design:type", typeof _types.MessageChannelContactAutoCreationPolicy === "undefined" ? Object : _types.MessageChannelContactAutoCreationPolicy)
], CreateMessageChannelInput.prototype, "contactAutoCreationPolicy", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.MessageFolderImportPolicy),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.MessageFolderImportPolicy),
    _ts_metadata("design:type", typeof _types.MessageFolderImportPolicy === "undefined" ? Object : _types.MessageFolderImportPolicy)
], CreateMessageChannelInput.prototype, "messageFolderImportPolicy", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], CreateMessageChannelInput.prototype, "excludeNonProfessionalEmails", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], CreateMessageChannelInput.prototype, "excludeGroupEmails", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(_types.MessageChannelPendingGroupEmailsAction),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_types.MessageChannelPendingGroupEmailsAction),
    _ts_metadata("design:type", typeof _types.MessageChannelPendingGroupEmailsAction === "undefined" ? Object : _types.MessageChannelPendingGroupEmailsAction)
], CreateMessageChannelInput.prototype, "pendingGroupEmailsAction", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], CreateMessageChannelInput.prototype, "isSyncEnabled", void 0);
CreateMessageChannelInput = _ts_decorate([
    (0, _graphql.InputType)()
], CreateMessageChannelInput);

//# sourceMappingURL=create-message-channel.input.js.map