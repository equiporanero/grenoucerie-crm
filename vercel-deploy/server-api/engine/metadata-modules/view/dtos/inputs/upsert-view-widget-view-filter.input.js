"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpsertViewWidgetViewFilterInput", {
    enumerable: true,
    get: function() {
        return UpsertViewWidgetViewFilterInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _types = require("twenty-shared/types");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
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
let UpsertViewWidgetViewFilterInput = class UpsertViewWidgetViewFilterInput {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpsertViewWidgetViewFilterInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], UpsertViewWidgetViewFilterInput.prototype, "fieldMetadataId", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_types.ViewFilterOperand),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", typeof _types.ViewFilterOperand === "undefined" ? Object : _types.ViewFilterOperand)
], UpsertViewWidgetViewFilterInput.prototype, "operand", void 0);
_ts_decorate([
    (0, _classvalidator.IsDefined)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: false
    }),
    _ts_metadata("design:type", typeof ViewFilterValue === "undefined" ? Object : ViewFilterValue)
], UpsertViewWidgetViewFilterInput.prototype, "value", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpsertViewWidgetViewFilterInput.prototype, "viewFilterGroupId", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsNumber)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], UpsertViewWidgetViewFilterInput.prototype, "positionInViewFilterGroup", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpsertViewWidgetViewFilterInput.prototype, "subFieldName", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpsertViewWidgetViewFilterInput.prototype, "relationTargetFieldMetadataId", void 0);
UpsertViewWidgetViewFilterInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpsertViewWidgetViewFilterInput);

//# sourceMappingURL=upsert-view-widget-view-filter.input.js.map