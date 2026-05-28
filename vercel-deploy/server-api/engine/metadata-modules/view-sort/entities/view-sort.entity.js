"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewSortEntity", {
    enumerable: true,
    get: function() {
        return ViewSortEntity;
    }
});
const _typeorm = require("typeorm");
const _fieldmetadataentity = require("../../field-metadata/field-metadata.entity");
const _types = require("twenty-shared/types");
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
let ViewSortEntity = class ViewSortEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], ViewSortEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], ViewSortEntity.prototype, "fieldMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_fieldmetadataentity.FieldMetadataEntity, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'fieldMetadataId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewSortEntity.prototype, "fieldMetadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'enum',
        enum: Object.values(_types.ViewSortDirection),
        default: _types.ViewSortDirection.ASC
    }),
    _ts_metadata("design:type", typeof _types.ViewSortDirection === "undefined" ? Object : _types.ViewSortDirection)
], ViewSortEntity.prototype, "direction", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'varchar'
    }),
    _ts_metadata("design:type", Object)
], ViewSortEntity.prototype, "subFieldName", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], ViewSortEntity.prototype, "viewId", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewSortEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewSortEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], ViewSortEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_viewentity.ViewEntity, (view)=>view.viewSorts, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'viewId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewSortEntity.prototype, "view", void 0);
ViewSortEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'viewSort',
        schema: 'core'
    }),
    (0, _typeorm.Index)('IDX_VIEW_SORT_WORKSPACE_ID_VIEW_ID', [
        'workspaceId',
        'viewId'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_SORT_VIEW_ID', [
        'viewId'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_SORT_FIELD_METADATA_ID', [
        'fieldMetadataId'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_SORT_FIELD_METADATA_ID_VIEW_ID_UNIQUE', [
        'fieldMetadataId',
        'viewId'
    ], {
        unique: true,
        where: '"deletedAt" IS NULL'
    })
], ViewSortEntity);

//# sourceMappingURL=view-sort.entity.js.map