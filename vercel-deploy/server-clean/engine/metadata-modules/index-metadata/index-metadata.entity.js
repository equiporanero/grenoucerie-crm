"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IndexMetadataEntity", {
    enumerable: true,
    get: function() {
        return IndexMetadataEntity;
    }
});
const _typeorm = require("typeorm");
const _indexfieldmetadataentity = require("./index-field-metadata.entity");
const _indexTypetypes = require("./types/indexType.types");
const _objectmetadataentity = require("../object-metadata/object-metadata.entity");
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
let IndexMetadataEntity = class IndexMetadataEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], IndexMetadataEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], IndexMetadataEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], IndexMetadataEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], IndexMetadataEntity.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], IndexMetadataEntity.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_objectmetadataentity.ObjectMetadataEntity, (object)=>object.indexMetadatas, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)(),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], IndexMetadataEntity.prototype, "objectMetadata", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_indexfieldmetadataentity.IndexFieldMetadataEntity, (indexFieldMetadata)=>indexFieldMetadata.indexMetadata, {
        cascade: true
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], IndexMetadataEntity.prototype, "indexFieldMetadatas", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], IndexMetadataEntity.prototype, "isCustom", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], IndexMetadataEntity.prototype, "isUnique", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], IndexMetadataEntity.prototype, "indexWhereClause", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: _indexTypetypes.IndexType,
        default: _indexTypetypes.IndexType.BTREE,
        nullable: false
    }),
    _ts_metadata("design:type", typeof _indexTypetypes.IndexType === "undefined" ? Object : _indexTypetypes.IndexType)
], IndexMetadataEntity.prototype, "indexType", void 0);
IndexMetadataEntity = _ts_decorate([
    (0, _typeorm.Unique)('IDX_INDEX_METADATA_NAME_WORKSPACE_ID_OBJECT_METADATA_ID_UNIQUE', [
        'name',
        'workspaceId',
        'objectMetadataId'
    ]),
    (0, _typeorm.Index)('IDX_INDEX_METADATA_WORKSPACE_ID_OBJECT_METADATA_ID', [
        'workspaceId',
        'objectMetadataId'
    ]),
    (0, _typeorm.Entity)('indexMetadata')
], IndexMetadataEntity);

//# sourceMappingURL=index-metadata.entity.js.map