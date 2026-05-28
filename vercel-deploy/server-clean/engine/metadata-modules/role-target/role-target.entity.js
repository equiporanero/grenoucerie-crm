"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RoleTargetEntity", {
    enumerable: true,
    get: function() {
        return RoleTargetEntity;
    }
});
const _typeorm = require("typeorm");
const _apikeyentity = require("../../core-modules/api-key/api-key.entity");
const _roleentity = require("../role/role.entity");
const _syncableentityinterface = require("../../workspace-manager/types/syncable-entity.interface");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RoleTargetEntity = class RoleTargetEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], RoleTargetEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], RoleTargetEntity.prototype, "roleId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_roleentity.RoleEntity, (role)=>role.roleTargets, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'roleId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], RoleTargetEntity.prototype, "role", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], RoleTargetEntity.prototype, "userWorkspaceId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], RoleTargetEntity.prototype, "agentId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], RoleTargetEntity.prototype, "apiKeyId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_apikeyentity.ApiKeyEntity, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'apiKeyId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], RoleTargetEntity.prototype, "apiKey", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], RoleTargetEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], RoleTargetEntity.prototype, "updatedAt", void 0);
RoleTargetEntity = _ts_decorate([
    (0, _typeorm.Entity)('roleTarget'),
    (0, _typeorm.Unique)('IDX_ROLE_TARGET_UNIQUE_USER_WORKSPACE', [
        'workspaceId',
        'userWorkspaceId'
    ]),
    (0, _typeorm.Unique)('IDX_ROLE_TARGET_UNIQUE_AGENT', [
        'workspaceId',
        'agentId'
    ]),
    (0, _typeorm.Unique)('IDX_ROLE_TARGET_UNIQUE_API_KEY', [
        'workspaceId',
        'apiKeyId'
    ]),
    (0, _typeorm.Index)('IDX_ROLE_TARGET_WORKSPACE_ID', [
        'userWorkspaceId',
        'workspaceId'
    ]),
    (0, _typeorm.Index)('IDX_ROLE_TARGET_AGENT_ID', [
        'agentId'
    ]),
    (0, _typeorm.Index)('IDX_ROLE_TARGET_API_KEY_ID', [
        'apiKeyId'
    ]),
    (0, _typeorm.Index)('IDX_ROLE_TARGET_ROLE_ID', [
        'roleId'
    ]),
    (0, _typeorm.Check)('CHK_role_target_single_entity', '("agentId" IS NOT NULL AND "userWorkspaceId" IS NULL AND "apiKeyId" IS NULL) OR ("agentId" IS NULL AND "userWorkspaceId" IS NOT NULL AND "apiKeyId" IS NULL) OR ("agentId" IS NULL AND "userWorkspaceId" IS NULL AND "apiKeyId" IS NOT NULL)')
], RoleTargetEntity);

//# sourceMappingURL=role-target.entity.js.map