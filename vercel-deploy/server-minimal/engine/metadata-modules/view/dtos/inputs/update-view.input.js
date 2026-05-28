"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateViewInput", {
    enumerable: true,
    get: function() {
        return UpdateViewInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _types = require("twenty-shared/types");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _isvalidmetadatanamedecorator = require("../../../../decorators/metadata/is-valid-metadata-name.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateViewInput = class UpdateViewInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateViewInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _isvalidmetadatanamedecorator.IsValidMetadataName)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateViewInput.prototype, "name", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_types.ViewType),
    (0, _graphql.Field)(()=>_types.ViewType, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _types.ViewType === "undefined" ? Object : _types.ViewType)
], UpdateViewInput.prototype, "type", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateViewInput.prototype, "icon", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], UpdateViewInput.prototype, "position", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], UpdateViewInput.prototype, "isCompact", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_types.ViewOpenRecordIn),
    (0, _graphql.Field)(()=>_types.ViewOpenRecordIn, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _types.ViewOpenRecordIn === "undefined" ? Object : _types.ViewOpenRecordIn)
], UpdateViewInput.prototype, "openRecordIn", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_types.AggregateOperations),
    (0, _graphql.Field)(()=>_types.AggregateOperations, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _types.AggregateOperations === "undefined" ? Object : _types.AggregateOperations)
], UpdateViewInput.prototype, "kanbanAggregateOperation", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateViewInput.prototype, "kanbanAggregateOperationFieldMetadataId", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateViewInput.prototype, "anyFieldFilterValue", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_types.ViewCalendarLayout),
    (0, _graphql.Field)(()=>_types.ViewCalendarLayout, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _types.ViewCalendarLayout === "undefined" ? Object : _types.ViewCalendarLayout)
], UpdateViewInput.prototype, "calendarLayout", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateViewInput.prototype, "calendarFieldMetadataId", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_types.ViewVisibility),
    (0, _graphql.Field)(()=>_types.ViewVisibility, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _types.ViewVisibility === "undefined" ? Object : _types.ViewVisibility)
], UpdateViewInput.prototype, "visibility", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], UpdateViewInput.prototype, "mainGroupByFieldMetadataId", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], UpdateViewInput.prototype, "shouldHideEmptyGroups", void 0);
UpdateViewInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateViewInput);

//# sourceMappingURL=update-view.input.js.map