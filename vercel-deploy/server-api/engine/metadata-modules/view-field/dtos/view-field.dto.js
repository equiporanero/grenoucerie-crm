"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFieldDTO", {
    enumerable: true,
    get: function() {
        return ViewFieldDTO;
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
(0, _graphql.registerEnumType)(_types.AggregateOperations, {
    name: 'AggregateOperations'
});
let ViewFieldDTO = class ViewFieldDTO {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], ViewFieldDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ViewFieldDTO.prototype, "fieldMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false,
        defaultValue: true
    }),
    _ts_metadata("design:type", Boolean)
], ViewFieldDTO.prototype, "isVisible", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false,
        defaultValue: 0
    }),
    _ts_metadata("design:type", Number)
], ViewFieldDTO.prototype, "size", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false,
        defaultValue: 0
    }),
    _ts_metadata("design:type", Number)
], ViewFieldDTO.prototype, "position", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.AggregateOperations, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewFieldDTO.prototype, "aggregateOperation", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ViewFieldDTO.prototype, "viewId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewFieldDTO.prototype, "viewFieldGroupId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ViewFieldDTO.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewFieldDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewFieldDTO.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], ViewFieldDTO.prototype, "isActive", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewFieldDTO.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true,
        deprecationReason: 'isOverridden is deprecated'
    }),
    _ts_metadata("design:type", Boolean)
], ViewFieldDTO.prototype, "isOverridden", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", Object)
], ViewFieldDTO.prototype, "overrides", void 0);
ViewFieldDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ViewField')
], ViewFieldDTO);

//# sourceMappingURL=view-field.dto.js.map