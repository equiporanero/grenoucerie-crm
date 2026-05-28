"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateViewFieldGroupInput", {
    enumerable: true,
    get: function() {
        return UpdateViewFieldGroupInput;
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
let UpdateViewFieldGroupInputUpdates = class UpdateViewFieldGroupInputUpdates {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateViewFieldGroupInputUpdates.prototype, "name", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsNumber)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], UpdateViewFieldGroupInputUpdates.prototype, "position", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], UpdateViewFieldGroupInputUpdates.prototype, "isVisible", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateViewFieldGroupInputUpdates.prototype, "deletedAt", void 0);
UpdateViewFieldGroupInputUpdates = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateViewFieldGroupInputUpdates);
let UpdateViewFieldGroupInput = class UpdateViewFieldGroupInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        description: 'The id of the view field group to update'
    }),
    _ts_metadata("design:type", String)
], UpdateViewFieldGroupInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classtransformer.Type)(()=>UpdateViewFieldGroupInputUpdates),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>UpdateViewFieldGroupInputUpdates, {
        description: 'The view field group to update'
    }),
    _ts_metadata("design:type", typeof UpdateViewFieldGroupInputUpdates === "undefined" ? Object : UpdateViewFieldGroupInputUpdates)
], UpdateViewFieldGroupInput.prototype, "update", void 0);
UpdateViewFieldGroupInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateViewFieldGroupInput);

//# sourceMappingURL=update-view-field-group.input.js.map