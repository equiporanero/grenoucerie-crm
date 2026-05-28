"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFilterEntity", {
    enumerable: true,
    get: function() {
        return ViewFilterEntity;
    }
});
const _types = require("twenty-shared/types");
const _typeorm = require("typeorm");
const _fieldmetadataentity = require("../../field-metadata/field-metadata.entity");
const _viewfiltergroupentity = require("../../view-filter-group/entities/view-filter-group.entity");
const _viewentity = require("../../view/entities/view.entity");
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
let ViewFilterEntity = class ViewFilterEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], ViewFilterEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], ViewFilterEntity.prototype, "fieldMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_fieldmetadataentity.FieldMetadataEntity, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'fieldMetadataId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewFilterEntity.prototype, "fieldMetadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'enum',
        enum: Object.values(_types.ViewFilterOperand),
        default: _types.ViewFilterOperand.CONTAINS
    }),
    _ts_metadata("design:type", typeof _types.ViewFilterOperand === "undefined" ? Object : _types.ViewFilterOperand)
], ViewFilterEntity.prototype, "operand", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", typeof JsonbProperty === "undefined" ? Object : JsonbProperty)
], ViewFilterEntity.prototype, "value", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], ViewFilterEntity.prototype, "viewFilterGroupId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'double precision'
    }),
    _ts_metadata("design:type", Object)
], ViewFilterEntity.prototype, "positionInViewFilterGroup", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text',
        default: null
    }),
    _ts_metadata("design:type", Object)
], ViewFilterEntity.prototype, "subFieldName", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid',
        default: null
    }),
    _ts_metadata("design:type", Object)
], ViewFilterEntity.prototype, "relationTargetFieldMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_fieldmetadataentity.FieldMetadataEntity, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'relationTargetFieldMetadataId'
    }),
    _ts_metadata("design:type", Object)
], ViewFilterEntity.prototype, "relationTargetFieldMetadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], ViewFilterEntity.prototype, "viewId", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewFilterEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewFilterEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], ViewFilterEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_viewentity.ViewEntity, (view)=>view.viewFilters, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'viewId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewFilterEntity.prototype, "view", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_viewfiltergroupentity.ViewFilterGroupEntity, (viewFilterGroup)=>viewFilterGroup.viewFilters, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'viewFilterGroupId'
    }),
    _ts_metadata("design:type", Object)
], ViewFilterEntity.prototype, "viewFilterGroup", void 0);
ViewFilterEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'viewFilter',
        schema: 'core'
    }),
    (0, _typeorm.Index)('IDX_VIEW_FILTER_WORKSPACE_ID_VIEW_ID', [
        'workspaceId',
        'viewId'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_FILTER_VIEW_ID', [
        'viewId'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_FILTER_FIELD_METADATA_ID', [
        'fieldMetadataId'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_FILTER_RELATION_TARGET_FIELD_METADATA_ID', [
        'relationTargetFieldMetadataId'
    ], {
        where: '"relationTargetFieldMetadataId" IS NOT NULL'
    })
], ViewFilterEntity);

//# sourceMappingURL=view-filter.entity.js.map