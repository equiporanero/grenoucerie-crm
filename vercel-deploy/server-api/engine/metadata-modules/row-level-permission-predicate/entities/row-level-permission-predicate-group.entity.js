/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RowLevelPermissionPredicateGroupEntity", {
    enumerable: true,
    get: function() {
        return RowLevelPermissionPredicateGroupEntity;
    }
});
const _types = require("twenty-shared/types");
const _typeorm = require("typeorm");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _roleentity = require("../../role/role.entity");
const _rowlevelpermissionpredicateentity = require("./row-level-permission-predicate.entity");
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
let RowLevelPermissionPredicateGroupEntity = class RowLevelPermissionPredicateGroupEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], RowLevelPermissionPredicateGroupEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateGroupEntity.prototype, "parentRowLevelPermissionPredicateGroupId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_types.RowLevelPermissionPredicateGroupLogicalOperator),
        nullable: false,
        default: _types.RowLevelPermissionPredicateGroupLogicalOperator.AND
    }),
    _ts_metadata("design:type", typeof _types.RowLevelPermissionPredicateGroupLogicalOperator === "undefined" ? Object : _types.RowLevelPermissionPredicateGroupLogicalOperator)
], RowLevelPermissionPredicateGroupEntity.prototype, "logicalOperator", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'double precision'
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateGroupEntity.prototype, "positionInRowLevelPermissionPredicateGroup", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], RowLevelPermissionPredicateGroupEntity.prototype, "roleId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], RowLevelPermissionPredicateGroupEntity.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], RowLevelPermissionPredicateGroupEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], RowLevelPermissionPredicateGroupEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateGroupEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_roleentity.RoleEntity, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'roleId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], RowLevelPermissionPredicateGroupEntity.prototype, "role", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_objectmetadataentity.ObjectMetadataEntity, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'objectMetadataId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], RowLevelPermissionPredicateGroupEntity.prototype, "objectMetadata", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>RowLevelPermissionPredicateGroupEntity, (rowLevelPermissionPredicateGroup)=>rowLevelPermissionPredicateGroup.childRowLevelPermissionPredicateGroups, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'parentRowLevelPermissionPredicateGroupId'
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateGroupEntity.prototype, "parentRowLevelPermissionPredicateGroup", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>RowLevelPermissionPredicateGroupEntity, (rowLevelPermissionPredicateGroup)=>rowLevelPermissionPredicateGroup.parentRowLevelPermissionPredicateGroup),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], RowLevelPermissionPredicateGroupEntity.prototype, "childRowLevelPermissionPredicateGroups", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_rowlevelpermissionpredicateentity.RowLevelPermissionPredicateEntity, (predicate)=>predicate.rowLevelPermissionPredicateGroup),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], RowLevelPermissionPredicateGroupEntity.prototype, "rowLevelPermissionPredicates", void 0);
RowLevelPermissionPredicateGroupEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'rowLevelPermissionPredicateGroup',
        schema: 'core'
    }),
    (0, _typeorm.Index)('IDX_RLPPG_WORKSPACE_ID_ROLE_ID_OBJECT_METADATA_ID', [
        'workspaceId',
        'roleId',
        'objectMetadataId'
    ]),
    (0, _typeorm.Index)('IDX_RLPPG_PARENT_GROUP_ID', [
        'parentRowLevelPermissionPredicateGroupId'
    ])
], RowLevelPermissionPredicateGroupEntity);

//# sourceMappingURL=row-level-permission-predicate-group.entity.js.map