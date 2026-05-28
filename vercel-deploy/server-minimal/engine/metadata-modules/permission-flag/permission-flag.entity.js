"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PermissionFlagEntity", {
    enumerable: true,
    get: function() {
        return PermissionFlagEntity;
    }
});
const _typeorm = require("typeorm");
const _wasintroducedinupgradedecorator = require("../../core-modules/upgrade/decorators/was-introduced-in-upgrade.decorator");
const _rolepermissionflagentity = require("../role-permission-flag/role-permission-flag.entity");
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
let PermissionFlagEntity = class PermissionFlagEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], PermissionFlagEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'varchar'
    }),
    _ts_metadata("design:type", String)
], PermissionFlagEntity.prototype, "key", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'varchar'
    }),
    _ts_metadata("design:type", String)
], PermissionFlagEntity.prototype, "label", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], PermissionFlagEntity.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'varchar'
    }),
    _ts_metadata("design:type", Object)
], PermissionFlagEntity.prototype, "icon", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'varchar'
    }),
    _ts_metadata("design:type", typeof PermissionFlagPermissionType === "undefined" ? Object : PermissionFlagPermissionType)
], PermissionFlagEntity.prototype, "permissionType", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_rolepermissionflagentity.RolePermissionFlagEntity, (rolePermissionFlag)=>rolePermissionFlag.permissionFlag),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], PermissionFlagEntity.prototype, "rolePermissionFlags", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PermissionFlagEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PermissionFlagEntity.prototype, "updatedAt", void 0);
PermissionFlagEntity = _ts_decorate([
    (0, _typeorm.Entity)('permissionFlag'),
    (0, _wasintroducedinupgradedecorator.WasIntroducedInUpgrade)({
        upgradeCommandName: '2.6.0_PermissionFlagSyncableEntityFastInstanceCommand_1778235340021'
    }),
    (0, _typeorm.Unique)('IDX_PERMISSION_FLAG_KEY_WORKSPACE_ID_UNIQUE', [
        'key',
        'workspaceId'
    ]),
    (0, _typeorm.Index)('IDX_PERMISSION_FLAG_APPLICATION_ID', [
        'applicationId'
    ])
], PermissionFlagEntity);

//# sourceMappingURL=permission-flag.entity.js.map