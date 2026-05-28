"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFilterDTO", {
    enumerable: true,
    get: function() {
        return ViewFilterDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _types = require("twenty-shared/types");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _viewfiltervaluetype = require("../types/view-filter-value.type");
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
(0, _graphql.registerEnumType)(_types.ViewFilterOperand, {
    name: 'ViewFilterOperand'
});
let ViewFilterDTO = class ViewFilterDTO {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], ViewFilterDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ViewFilterDTO.prototype, "fieldMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false,
        defaultValue: _types.ViewFilterOperand.CONTAINS
    }),
    _ts_metadata("design:type", typeof _types.ViewFilterOperand === "undefined" ? Object : _types.ViewFilterOperand)
], ViewFilterDTO.prototype, "operand", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: false
    }),
    _ts_metadata("design:type", typeof _viewfiltervaluetype.ViewFilterValue === "undefined" ? Object : _viewfiltervaluetype.ViewFilterValue)
], ViewFilterDTO.prototype, "value", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewFilterDTO.prototype, "viewFilterGroupId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewFilterDTO.prototype, "positionInViewFilterGroup", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewFilterDTO.prototype, "subFieldName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewFilterDTO.prototype, "relationTargetFieldMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ViewFilterDTO.prototype, "viewId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ViewFilterDTO.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewFilterDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewFilterDTO.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewFilterDTO.prototype, "deletedAt", void 0);
ViewFilterDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ViewFilter')
], ViewFilterDTO);

//# sourceMappingURL=view-filter.dto.js.map