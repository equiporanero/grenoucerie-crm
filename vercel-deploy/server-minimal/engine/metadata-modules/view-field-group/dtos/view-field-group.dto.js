"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFieldGroupDTO", {
    enumerable: true,
    get: function() {
        return ViewFieldGroupDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _viewfielddto = require("../../view-field/dtos/view-field.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ViewFieldGroupDTO = class ViewFieldGroupDTO {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], ViewFieldGroupDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ViewFieldGroupDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false,
        defaultValue: 0
    }),
    _ts_metadata("design:type", Number)
], ViewFieldGroupDTO.prototype, "position", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false,
        defaultValue: true
    }),
    _ts_metadata("design:type", Boolean)
], ViewFieldGroupDTO.prototype, "isVisible", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ViewFieldGroupDTO.prototype, "viewId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ViewFieldGroupDTO.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], ViewFieldGroupDTO.prototype, "applicationId", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewFieldGroupDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewFieldGroupDTO.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], ViewFieldGroupDTO.prototype, "isActive", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ViewFieldGroupDTO.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _viewfielddto.ViewFieldDTO
        ]),
    _ts_metadata("design:type", Array)
], ViewFieldGroupDTO.prototype, "viewFields", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: false,
        deprecationReason: 'isOverridden is deprecated'
    }),
    _ts_metadata("design:type", Boolean)
], ViewFieldGroupDTO.prototype, "isOverridden", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", Object)
], ViewFieldGroupDTO.prototype, "overrides", void 0);
ViewFieldGroupDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ViewFieldGroup')
], ViewFieldGroupDTO);

//# sourceMappingURL=view-field-group.dto.js.map