"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get ApiKeyForRoleDTO () {
        return ApiKeyForRoleDTO;
    },
    get RoleDTO () {
        return RoleDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _typeorm = require("typeorm");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _workspacememberdto = require("../../../core-modules/user/dtos/workspace-member.dto");
const _agentdto = require("../../ai/ai-agent/dtos/agent.dto");
const _fieldpermissiondto = require("../../object-permission/dtos/field-permission.dto");
const _objectpermissiondto = require("../../object-permission/dtos/object-permission.dto");
const _rolepermissionflagdto = require("../../role-permission-flag/dtos/role-permission-flag.dto");
const _rowlevelpermissionpredicategroupdto = require("../../row-level-permission-predicate/dtos/row-level-permission-predicate-group.dto");
const _rowlevelpermissionpredicatedto = require("../../row-level-permission-predicate/dtos/row-level-permission-predicate.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ApiKeyForRoleDTO = class ApiKeyForRoleDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ApiKeyForRoleDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ApiKeyForRoleDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: false
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ApiKeyForRoleDTO.prototype, "expiresAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ApiKeyForRoleDTO.prototype, "revokedAt", void 0);
ApiKeyForRoleDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ApiKeyForRole')
], ApiKeyForRoleDTO);
let RoleDTO = class RoleDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], RoleDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], RoleDTO.prototype, "universalIdentifier", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], RoleDTO.prototype, "label", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], RoleDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], RoleDTO.prototype, "icon", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], RoleDTO.prototype, "isEditable", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], RoleDTO.prototype, "canBeAssignedToUsers", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], RoleDTO.prototype, "canBeAssignedToAgents", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], RoleDTO.prototype, "canBeAssignedToApiKeys", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], RoleDTO.prototype, "roleTargets", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _workspacememberdto.WorkspaceMemberDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], RoleDTO.prototype, "workspaceMembers", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _agentdto.AgentDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], RoleDTO.prototype, "agents", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            ApiKeyForRoleDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], RoleDTO.prototype, "apiKeys", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], RoleDTO.prototype, "canUpdateAllSettings", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], RoleDTO.prototype, "canAccessAllTools", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], RoleDTO.prototype, "canReadAllObjectRecords", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], RoleDTO.prototype, "canUpdateAllObjectRecords", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], RoleDTO.prototype, "canSoftDeleteAllObjectRecords", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], RoleDTO.prototype, "canDestroyAllObjectRecords", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _rolepermissionflagdto.RolePermissionFlagDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], RoleDTO.prototype, "permissionFlags", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _objectpermissiondto.ObjectPermissionDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], RoleDTO.prototype, "objectPermissions", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _fieldpermissiondto.FieldPermissionDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], RoleDTO.prototype, "fieldPermissions", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _rowlevelpermissionpredicatedto.RowLevelPermissionPredicateDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], RoleDTO.prototype, "rowLevelPermissionPredicates", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _rowlevelpermissionpredicategroupdto.RowLevelPermissionPredicateGroupDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], RoleDTO.prototype, "rowLevelPermissionPredicateGroups", void 0);
RoleDTO = _ts_decorate([
    (0, _graphql.ObjectType)('Role')
], RoleDTO);

//# sourceMappingURL=role.dto.js.map