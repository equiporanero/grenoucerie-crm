"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectPermissionEntity", {
    enumerable: true,
    get: function() {
        return ObjectPermissionEntity;
    }
});
const _typeorm = require("typeorm");
const _objectmetadataentity = require("../object-metadata/object-metadata.entity");
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
let ObjectPermissionEntity = class ObjectPermissionEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], ObjectPermissionEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], ObjectPermissionEntity.prototype, "roleId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_roleentity.RoleEntity, (role)=>role.objectPermissions, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'roleId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ObjectPermissionEntity.prototype, "role", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], ObjectPermissionEntity.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_objectmetadataentity.ObjectMetadataEntity, (objectMetadata)=>objectMetadata.objectPermissions, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'objectMetadataId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ObjectPermissionEntity.prototype, "objectMetadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'boolean'
    }),
    _ts_metadata("design:type", Boolean)
], ObjectPermissionEntity.prototype, "canReadObjectRecords", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'boolean'
    }),
    _ts_metadata("design:type", Boolean)
], ObjectPermissionEntity.prototype, "canUpdateObjectRecords", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'boolean'
    }),
    _ts_metadata("design:type", Boolean)
], ObjectPermissionEntity.prototype, "canSoftDeleteObjectRecords", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'boolean'
    }),
    _ts_metadata("design:type", Boolean)
], ObjectPermissionEntity.prototype, "canDestroyObjectRecords", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ObjectPermissionEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ObjectPermissionEntity.prototype, "updatedAt", void 0);
ObjectPermissionEntity = _ts_decorate([
    (0, _typeorm.Entity)('objectPermission'),
    (0, _typeorm.Unique)('IDX_OBJECT_PERMISSION_OBJECT_METADATA_ID_ROLE_ID_UNIQUE', [
        'objectMetadataId',
        'roleId'
    ]),
    (0, _typeorm.Index)('IDX_OBJECT_PERMISSION_WORKSPACE_ID_ROLE_ID', [
        'workspaceId',
        'roleId'
    ])
], ObjectPermissionEntity);

//# sourceMappingURL=object-permission.entity.js.map