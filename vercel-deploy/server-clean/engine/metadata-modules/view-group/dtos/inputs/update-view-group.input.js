"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateViewGroupInput", {
    enumerable: true,
    get: function() {
        return UpdateViewGroupInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateViewGroupInputUpdates = class UpdateViewGroupInputUpdates {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateViewGroupInputUpdates.prototype, "fieldMetadataId", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], UpdateViewGroupInputUpdates.prototype, "isVisible", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateViewGroupInputUpdates.prototype, "fieldValue", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsNumber)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], UpdateViewGroupInputUpdates.prototype, "position", void 0);
UpdateViewGroupInputUpdates = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateViewGroupInputUpdates);
let UpdateViewGroupInput = class UpdateViewGroupInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        description: 'The id of the view group to update'
    }),
    _ts_metadata("design:type", String)
], UpdateViewGroupInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classtransformer.Type)(()=>UpdateViewGroupInputUpdates),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>UpdateViewGroupInputUpdates, {
        description: 'The view group to update'
    }),
    _ts_metadata("design:type", typeof UpdateViewGroupInputUpdates === "undefined" ? Object : UpdateViewGroupInputUpdates)
], UpdateViewGroupInput.prototype, "update", void 0);
UpdateViewGroupInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateViewGroupInput);

//# sourceMappingURL=update-view-group.input.js.map