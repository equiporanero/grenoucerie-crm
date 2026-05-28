/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RowLevelPermissionPredicateEntity", {
    enumerable: true,
    get: function() {
        return RowLevelPermissionPredicateEntity;
    }
});
const _types = require("twenty-shared/types");
const _typeorm = require("typeorm");
const _fieldmetadataentity = require("../../field-metadata/field-metadata.entity");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _roleentity = require("../../role/role.entity");
const _rowlevelpermissionpredicategroupentity = require("./row-level-permission-predicate-group.entity");
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
let RowLevelPermissionPredicateEntity = class RowLevelPermissionPredicateEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], RowLevelPermissionPredicateEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], RowLevelPermissionPredicateEntity.prototype, "fieldMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_fieldmetadataentity.FieldMetadataEntity, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'fieldMetadataId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], RowLevelPermissionPredicateEntity.prototype, "fieldMetadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], RowLevelPermissionPredicateEntity.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_objectmetadataentity.ObjectMetadataEntity, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'objectMetadataId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], RowLevelPermissionPredicateEntity.prototype, "objectMetadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'enum',
        enum: Object.values(_types.RowLevelPermissionPredicateOperand),
        default: _types.RowLevelPermissionPredicateOperand.CONTAINS
    }),
    _ts_metadata("design:type", typeof _types.RowLevelPermissionPredicateOperand === "undefined" ? Object : _types.RowLevelPermissionPredicateOperand)
], RowLevelPermissionPredicateEntity.prototype, "operand", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateEntity.prototype, "value", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text',
        default: null
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateEntity.prototype, "subFieldName", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateEntity.prototype, "workspaceMemberFieldMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text',
        default: null
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateEntity.prototype, "workspaceMemberSubFieldName", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_fieldmetadataentity.FieldMetadataEntity, {
        onDelete: 'SET NULL'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'workspaceMemberFieldMetadataId'
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateEntity.prototype, "workspaceMemberFieldMetadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateEntity.prototype, "rowLevelPermissionPredicateGroupId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'double precision'
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateEntity.prototype, "positionInRowLevelPermissionPredicateGroup", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], RowLevelPermissionPredicateEntity.prototype, "roleId", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], RowLevelPermissionPredicateEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], RowLevelPermissionPredicateEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_roleentity.RoleEntity, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'roleId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], RowLevelPermissionPredicateEntity.prototype, "role", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_rowlevelpermissionpredicategroupentity.RowLevelPermissionPredicateGroupEntity, (rowLevelPermissionPredicateGroup)=>rowLevelPermissionPredicateGroup.rowLevelPermissionPredicates, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'rowLevelPermissionPredicateGroupId'
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateEntity.prototype, "rowLevelPermissionPredicateGroup", void 0);
RowLevelPermissionPredicateEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'rowLevelPermissionPredicate',
        schema: 'core'
    }),
    (0, _typeorm.Index)('IDX_RLPP_WORKSPACE_ID_ROLE_ID_OBJECT_METADATA_ID', [
        'workspaceId',
        'roleId',
        'objectMetadataId'
    ]),
    (0, _typeorm.Index)('IDX_RLPP_FIELD_METADATA_ID', [
        'fieldMetadataId'
    ]),
    (0, _typeorm.Index)('IDX_RLPP_GROUP_ID', [
        'rowLevelPermissionPredicateGroupId'
    ]),
    (0, _typeorm.Index)('IDX_RLPP_WORKSPACE_MEMBER_FIELD_METADATA_ID', [
        'workspaceMemberFieldMetadataId'
    ])
], RowLevelPermissionPredicateEntity);

//# sourceMappingURL=row-level-permission-predicate.entity.js.map