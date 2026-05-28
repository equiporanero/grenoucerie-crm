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
    get UpdateMessageChannelInput () {
        return UpdateMessageChannelInput;
    },
    get UpdateMessageChannelInputUpdates () {
        return UpdateMessageChannelInputUpdates;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
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
let UpdateMessageChannelInputUpdates = class UpdateMessageChannelInputUpdates {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_types.MessageChannelVisibility),
    (0, _graphql.Field)(()=>_types.MessageChannelVisibility, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _types.MessageChannelVisibility === "undefined" ? Object : _types.MessageChannelVisibility)
], UpdateMessageChannelInputUpdates.prototype, "visibility", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], UpdateMessageChannelInputUpdates.prototype, "isContactAutoCreationEnabled", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_types.MessageChannelContactAutoCreationPolicy),
    (0, _graphql.Field)(()=>_types.MessageChannelContactAutoCreationPolicy, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _types.MessageChannelContactAutoCreationPolicy === "undefined" ? Object : _types.MessageChannelContactAutoCreationPolicy)
], UpdateMessageChannelInputUpdates.prototype, "contactAutoCreationPolicy", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_types.MessageFolderImportPolicy),
    (0, _graphql.Field)(()=>_types.MessageFolderImportPolicy, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _types.MessageFolderImportPolicy === "undefined" ? Object : _types.MessageFolderImportPolicy)
], UpdateMessageChannelInputUpdates.prototype, "messageFolderImportPolicy", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], UpdateMessageChannelInputUpdates.prototype, "isSyncEnabled", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], UpdateMessageChannelInputUpdates.prototype, "excludeNonProfessionalEmails", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], UpdateMessageChannelInputUpdates.prototype, "excludeGroupEmails", void 0);
UpdateMessageChannelInputUpdates = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateMessageChannelInputUpdates);
let UpdateMessageChannelInput = class UpdateMessageChannelInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], UpdateMessageChannelInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classtransformer.Type)(()=>UpdateMessageChannelInputUpdates),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>UpdateMessageChannelInputUpdates),
    _ts_metadata("design:type", typeof UpdateMessageChannelInputUpdates === "undefined" ? Object : UpdateMessageChannelInputUpdates)
], UpdateMessageChannelInput.prototype, "update", void 0);
UpdateMessageChannelInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateMessageChannelInput);

//# sourceMappingURL=update-message-channel.input.js.map