"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateViewFieldInput", {
    enumerable: true,
    get: function() {
        return UpdateViewFieldInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _types = require("twenty-shared/types");
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
let UpdateViewFieldInputUpdates = class UpdateViewFieldInputUpdates {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], UpdateViewFieldInputUpdates.prototype, "isVisible", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsNumber)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], UpdateViewFieldInputUpdates.prototype, "size", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsNumber)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], UpdateViewFieldInputUpdates.prototype, "position", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_types.AggregateOperations),
    (0, _graphql.Field)(()=>_types.AggregateOperations, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _types.AggregateOperations === "undefined" ? Object : _types.AggregateOperations)
], UpdateViewFieldInputUpdates.prototype, "aggregateOperation", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], UpdateViewFieldInputUpdates.prototype, "viewFieldGroupId", void 0);
UpdateViewFieldInputUpdates = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateViewFieldInputUpdates);
let UpdateViewFieldInput = class UpdateViewFieldInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        description: 'The id of the view field to update'
    }),
    _ts_metadata("design:type", String)
], UpdateViewFieldInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classtransformer.Type)(()=>UpdateViewFieldInputUpdates),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>UpdateViewFieldInputUpdates, {
        description: 'The view field to update'
    }),
    _ts_metadata("design:type", typeof UpdateViewFieldInputUpdates === "undefined" ? Object : UpdateViewFieldInputUpdates)
], UpdateViewFieldInput.prototype, "update", void 0);
UpdateViewFieldInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateViewFieldInput);

//# sourceMappingURL=update-view-field.input.js.map