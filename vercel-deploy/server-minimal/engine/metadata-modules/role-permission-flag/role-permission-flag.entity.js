"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RolePermissionFlagEntity", {
    enumerable: true,
    get: function() {
        return RolePermissionFlagEntity;
    }
});
const _constants = require("twenty-shared/constants");
const _typeorm = require("typeorm");
const _wasintroducedinupgradedecorator = require("../../core-modules/upgrade/decorators/was-introduced-in-upgrade.decorator");
const _wasremovedinupgradedecorator = require("../../core-modules/upgrade/decorators/was-removed-in-upgrade.decorator");
const _wasrenamedinupgradedecorator = require("../../core-modules/upgrade/decorators/was-renamed-in-upgrade.decorator");
const _permissionflagentity = require("../permission-flag/permission-flag.entity");
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
let RolePermissionFlagEntity = class RolePermissionFlagEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], RolePermissionFlagEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], RolePermissionFlagEntity.prototype, "roleId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_roleentity.RoleEntity, (role)=>role.rolePermissionFlags, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'roleId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], RolePermissionFlagEntity.prototype, "role", void 0);
_ts_decorate([
    (0, _wasremovedinupgradedecorator.WasRemovedInUpgrade)({
        upgradeCommandName: '2.7.0_FinalizeRolePermissionFlagCutoverFastInstanceCommand_1779600000000'
    }),
    (0, _typeorm.Column)({
        nullable: false,
        type: 'varchar'
    }),
    _ts_metadata("design:type", typeof _constants.PermissionFlagType === "undefined" ? Object : _constants.PermissionFlagType)
], RolePermissionFlagEntity.prototype, "flag", void 0);
_ts_decorate([
    (0, _wasintroducedinupgradedecorator.WasIntroducedInUpgrade)({
        upgradeCommandName: '2.6.0_LinkRolePermissionFlagToPermissionFlagFastInstanceCommand_1778235340022'
    }),
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], RolePermissionFlagEntity.prototype, "permissionFlagId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_permissionflagentity.PermissionFlagEntity, (permissionFlag)=>permissionFlag.rolePermissionFlags, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'permissionFlagId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], RolePermissionFlagEntity.prototype, "permissionFlag", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], RolePermissionFlagEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], RolePermissionFlagEntity.prototype, "updatedAt", void 0);
RolePermissionFlagEntity = _ts_decorate([
    (0, _typeorm.Entity)('rolePermissionFlag'),
    (0, _wasrenamedinupgradedecorator.WasRenamedInUpgrade)([
        {
            previousName: 'permissionFlag',
            upgradeCommandName: '2.6.0_RenamePermissionFlagToRolePermissionFlagFastInstanceCommand_1778235340020'
        }
    ]),
    (0, _typeorm.Unique)('IDX_ROLE_PERMISSION_FLAG_PERMISSION_FLAG_ID_ROLE_ID_UNIQUE', [
        'permissionFlagId',
        'roleId'
    ]),
    (0, _typeorm.Index)('IDX_ROLE_PERMISSION_FLAG_ROLE_ID', [
        'roleId'
    ]),
    (0, _typeorm.Index)('IDX_ROLE_PERMISSION_FLAG_PERMISSION_FLAG_ID', [
        'permissionFlagId'
    ])
], RolePermissionFlagEntity);

//# sourceMappingURL=role-permission-flag.entity.js.map