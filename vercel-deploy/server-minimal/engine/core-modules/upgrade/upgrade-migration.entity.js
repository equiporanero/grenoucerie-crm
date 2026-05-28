"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpgradeMigrationEntity", {
    enumerable: true,
    get: function() {
        return UpgradeMigrationEntity;
    }
});
const _typeorm = require("typeorm");
const _workspaceentity = require("../workspace/workspace.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpgradeMigrationEntity = class UpgradeMigrationEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], UpgradeMigrationEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], UpgradeMigrationEntity.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: false
    }),
    _ts_metadata("design:type", typeof UpgradeMigrationStatus === "undefined" ? Object : UpgradeMigrationStatus)
], UpgradeMigrationEntity.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'integer',
        nullable: false,
        default: 1
    }),
    _ts_metadata("design:type", Number)
], UpgradeMigrationEntity.prototype, "attempt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], UpgradeMigrationEntity.prototype, "executedByVersion", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], UpgradeMigrationEntity.prototype, "errorMessage", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'boolean',
        nullable: false,
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], UpgradeMigrationEntity.prototype, "isInitial", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_workspaceentity.WorkspaceEntity, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'workspaceId'
    }),
    _ts_metadata("design:type", Object)
], UpgradeMigrationEntity.prototype, "workspace", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'uuid',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], UpgradeMigrationEntity.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UpgradeMigrationEntity.prototype, "createdAt", void 0);
UpgradeMigrationEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'upgradeMigration',
        schema: 'core'
    }),
    (0, _typeorm.Index)('UQ_upgrade_migration_instance', [
        'name',
        'attempt'
    ], {
        unique: true,
        where: '"workspaceId" IS NULL'
    }),
    (0, _typeorm.Index)('UQ_upgrade_migration_workspace', [
        'name',
        'attempt',
        'workspaceId'
    ], {
        unique: true,
        where: '"workspaceId" IS NOT NULL'
    }),
    (0, _typeorm.Index)('IDX_UPGRADE_MIGRATION_WORKSPACE_ID_NAME_ATTEMPT', [
        'workspaceId',
        'name',
        'attempt'
    ], {
        where: '"workspaceId" IS NOT NULL'
    })
], UpgradeMigrationEntity);

//# sourceMappingURL=upgrade-migration.entity.js.map