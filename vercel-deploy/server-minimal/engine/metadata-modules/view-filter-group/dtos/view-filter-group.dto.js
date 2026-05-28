"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFilterGroupDTO", {
    enumerable: true,
    get: function() {
        return ViewFilterGroupDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
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
(0, _graphql.registerEnumType)(_types.ViewFilterGroupLogicalOperator, {
    name: 'ViewFilterGroupLogicalOperator'
});
let ViewFilterGroupDTO = class ViewFilterGroupDTO {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], ViewFilterGroupDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewFilterGroupDTO.prototype, "parentViewFilterGroupId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.ViewFilterGroupLogicalOperator, {
        nullable: false,
        defaultValue: _types.ViewFilterGroupLogicalOperator.NOT
    }),
    _ts_metadata("design:type", typeof _types.ViewFilterGroupLogicalOperator === "undefined" ? Object : _types.ViewFilterGroupLogicalOperator)
], ViewFilterGroupDTO.prototype, "logicalOperator", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewFilterGroupDTO.prototype, "positionInViewFilterGroup", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ViewFilterGroupDTO.prototype, "viewId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ViewFilterGroupDTO.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewFilterGroupDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewFilterGroupDTO.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewFilterGroupDTO.prototype, "deletedAt", void 0);
ViewFilterGroupDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ViewFilterGroup')
], ViewFilterGroupDTO);

//# sourceMappingURL=view-filter-group.dto.js.map