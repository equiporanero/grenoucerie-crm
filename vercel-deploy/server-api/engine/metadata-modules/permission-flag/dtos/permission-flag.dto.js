"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PermissionFlagDTO", {
    enumerable: true,
    get: function() {
        return PermissionFlagDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _permissionflagpermissiontypeconstant = require("../constants/permission-flag-permission-type.constant");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PermissionFlagDTO = class PermissionFlagDTO {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], PermissionFlagDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], PermissionFlagDTO.prototype, "universalIdentifier", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], PermissionFlagDTO.prototype, "key", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], PermissionFlagDTO.prototype, "label", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PermissionFlagDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PermissionFlagDTO.prototype, "icon", void 0);
_ts_decorate([
    (0, _classvalidator.IsIn)(_permissionflagpermissiontypeconstant.PERMISSION_FLAG_PERMISSION_TYPES),
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", typeof PermissionFlagPermissionType === "undefined" ? Object : PermissionFlagPermissionType)
], PermissionFlagDTO.prototype, "permissionType", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], PermissionFlagDTO.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], PermissionFlagDTO.prototype, "applicationId", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PermissionFlagDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PermissionFlagDTO.prototype, "updatedAt", void 0);
PermissionFlagDTO = _ts_decorate([
    (0, _graphql.ObjectType)('PermissionFlag')
], PermissionFlagDTO);

//# sourceMappingURL=permission-flag.dto.js.map