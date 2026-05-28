"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateViewFilterInput", {
    enumerable: true,
    get: function() {
        return UpdateViewFilterInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _types = require("twenty-shared/types");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _viewfiltervaluetype = require("../../types/view-filter-value.type");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateViewFilterInputUpdates = class UpdateViewFilterInputUpdates {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateViewFilterInputUpdates.prototype, "fieldMetadataId", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_types.ViewFilterOperand),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", typeof _types.ViewFilterOperand === "undefined" ? Object : _types.ViewFilterOperand)
], UpdateViewFilterInputUpdates.prototype, "operand", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _viewfiltervaluetype.ViewFilterValue === "undefined" ? Object : _viewfiltervaluetype.ViewFilterValue)
], UpdateViewFilterInputUpdates.prototype, "value", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateViewFilterInputUpdates.prototype, "viewFilterGroupId", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsNumber)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], UpdateViewFilterInputUpdates.prototype, "positionInViewFilterGroup", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateViewFilterInputUpdates.prototype, "subFieldName", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpdateViewFilterInputUpdates.prototype, "relationTargetFieldMetadataId", void 0);
UpdateViewFilterInputUpdates = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateViewFilterInputUpdates);
let UpdateViewFilterInput = class UpdateViewFilterInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        description: 'The id of the view filter to update'
    }),
    _ts_metadata("design:type", String)
], UpdateViewFilterInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classtransformer.Type)(()=>UpdateViewFilterInputUpdates),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>UpdateViewFilterInputUpdates, {
        description: 'The view filter to update'
    }),
    _ts_metadata("design:type", typeof UpdateViewFilterInputUpdates === "undefined" ? Object : UpdateViewFilterInputUpdates)
], UpdateViewFilterInput.prototype, "update", void 0);
UpdateViewFilterInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateViewFilterInput);

//# sourceMappingURL=update-view-filter.input.js.map