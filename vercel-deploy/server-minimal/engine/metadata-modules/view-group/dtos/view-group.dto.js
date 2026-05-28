"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewGroupDTO", {
    enumerable: true,
    get: function() {
        return ViewGroupDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
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
let ViewGroupDTO = class ViewGroupDTO {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], ViewGroupDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false,
        defaultValue: true
    }),
    _ts_metadata("design:type", Boolean)
], ViewGroupDTO.prototype, "isVisible", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ViewGroupDTO.prototype, "fieldValue", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false,
        defaultValue: 0
    }),
    _ts_metadata("design:type", Number)
], ViewGroupDTO.prototype, "position", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ViewGroupDTO.prototype, "viewId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ViewGroupDTO.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewGroupDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewGroupDTO.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewGroupDTO.prototype, "deletedAt", void 0);
ViewGroupDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ViewGroup')
], ViewGroupDTO);

//# sourceMappingURL=view-group.dto.js.map