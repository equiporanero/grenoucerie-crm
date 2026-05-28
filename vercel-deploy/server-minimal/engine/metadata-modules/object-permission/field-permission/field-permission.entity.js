"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FieldPermissionEntity", {
    enumerable: true,
    get: function() {
        return FieldPermissionEntity;
    }
});
const _classvalidator = require("class-validator");
const _typeorm = require("typeorm");
const _fieldmetadataentity = require("../../field-metadata/field-metadata.entity");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _roleentity = require("../../role/role.entity");
const _syncableentityinterface = require("../../../workspace-manager/types/syncable-entity.interface");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FieldPermissionEntity = class FieldPermissionEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], FieldPermissionEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], FieldPermissionEntity.prototype, "roleId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_roleentity.RoleEntity, (role)=>role.fieldPermissions, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'roleId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], FieldPermissionEntity.prototype, "role", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], FieldPermissionEntity.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], FieldPermissionEntity.prototype, "fieldMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_objectmetadataentity.ObjectMetadataEntity, (objectMetadata)=>objectMetadata.fieldPermissions, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'objectMetadataId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], FieldPermissionEntity.prototype, "objectMetadata", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_fieldmetadataentity.FieldMetadataEntity, (fieldMetadata)=>fieldMetadata.fieldPermissions, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'fieldMetadataId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], FieldPermissionEntity.prototype, "fieldMetadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'boolean'
    }),
    _ts_metadata("design:type", Object)
], FieldPermissionEntity.prototype, "canReadFieldValue", void 0);
_ts_decorate([
    (0, _classvalidator.ValidateBy)({
        name: 'isFalseOrNull',
        validator: {
            validate: (value)=>value === false || value === null,
            defaultMessage: ()=>'value must be either false or null'
        }
    }),
    (0, _typeorm.Column)({
        nullable: true,
        type: 'boolean'
    }),
    _ts_metadata("design:type", Object)
], FieldPermissionEntity.prototype, "canUpdateFieldValue", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], FieldPermissionEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], FieldPermissionEntity.prototype, "updatedAt", void 0);
FieldPermissionEntity = _ts_decorate([
    (0, _typeorm.Entity)('fieldPermission'),
    (0, _typeorm.Unique)('IDX_FIELD_PERMISSION_FIELD_METADATA_ID_ROLE_ID_UNIQUE', [
        'fieldMetadataId',
        'roleId'
    ]),
    (0, _typeorm.Index)('IDX_FIELD_PERMISSION_WORKSPACE_ID_ROLE_ID', [
        'workspaceId',
        'roleId'
    ])
], FieldPermissionEntity);

//# sourceMappingURL=field-permission.entity.js.map