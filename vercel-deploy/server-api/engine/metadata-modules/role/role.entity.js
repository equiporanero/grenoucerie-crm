"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RoleEntity", {
    enumerable: true,
    get: function() {
        return RoleEntity;
    }
});
const _typeorm = require("typeorm");
const _fieldpermissionentity = require("../object-permission/field-permission/field-permission.entity");
const _objectpermissionentity = require("../object-permission/object-permission.entity");
const _rolepermissionflagentity = require("../role-permission-flag/role-permission-flag.entity");
const _roletargetentity = require("../role-target/role-target.entity");
const _rowlevelpermissionpredicategroupentity = require("../row-level-permission-predicate/entities/row-level-permission-predicate-group.entity");
const _rowlevelpermissionpredicateentity = require("../row-level-permission-predicate/entities/row-level-permission-predicate.entity");
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
let RoleEntity = class RoleEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], RoleEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], RoleEntity.prototype, "label", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], RoleEntity.prototype, "canUpdateAllSettings", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], RoleEntity.prototype, "canAccessAllTools", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], RoleEntity.prototype, "canReadAllObjectRecords", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], RoleEntity.prototype, "canUpdateAllObjectRecords", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], RoleEntity.prototype, "canSoftDeleteAllObjectRecords", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], RoleEntity.prototype, "canDestroyAllObjectRecords", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], RoleEntity.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'varchar'
    }),
    _ts_metadata("design:type", Object)
], RoleEntity.prototype, "icon", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], RoleEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], RoleEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], RoleEntity.prototype, "isEditable", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], RoleEntity.prototype, "canBeAssignedToUsers", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], RoleEntity.prototype, "canBeAssignedToAgents", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], RoleEntity.prototype, "canBeAssignedToApiKeys", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_roletargetentity.RoleTargetEntity, (roleTargets)=>roleTargets.role),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], RoleEntity.prototype, "roleTargets", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_objectpermissionentity.ObjectPermissionEntity, (objectPermission)=>objectPermission.role),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], RoleEntity.prototype, "objectPermissions", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_rolepermissionflagentity.RolePermissionFlagEntity, (rolePermissionFlag)=>rolePermissionFlag.role),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], RoleEntity.prototype, "rolePermissionFlags", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_fieldpermissionentity.FieldPermissionEntity, (fieldPermission)=>fieldPermission.role),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], RoleEntity.prototype, "fieldPermissions", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_rowlevelpermissionpredicateentity.RowLevelPermissionPredicateEntity, (rowLevelPermissionPredicate)=>rowLevelPermissionPredicate.role),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], RoleEntity.prototype, "rowLevelPermissionPredicates", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_rowlevelpermissionpredicategroupentity.RowLevelPermissionPredicateGroupEntity, (rowLevelPermissionPredicateGroup)=>rowLevelPermissionPredicateGroup.role),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], RoleEntity.prototype, "rowLevelPermissionPredicateGroups", void 0);
RoleEntity = _ts_decorate([
    (0, _typeorm.Entity)('role'),
    (0, _typeorm.Unique)('IDX_ROLE_LABEL_WORKSPACE_ID_UNIQUE', [
        'label',
        'workspaceId'
    ])
], RoleEntity);

//# sourceMappingURL=role.entity.js.map