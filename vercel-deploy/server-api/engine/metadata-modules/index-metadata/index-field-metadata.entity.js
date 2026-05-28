"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IndexFieldMetadataEntity", {
    enumerable: true,
    get: function() {
        return IndexFieldMetadataEntity;
    }
});
const _typeorm = require("typeorm");
const _wasintroducedinupgradedecorator = require("../../core-modules/upgrade/decorators/was-introduced-in-upgrade.decorator");
const _fieldmetadataentity = require("../field-metadata/field-metadata.entity");
const _indexmetadataentity = require("./index-metadata.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let IndexFieldMetadataEntity = class IndexFieldMetadataEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], IndexFieldMetadataEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    (0, _typeorm.Index)(),
    _ts_metadata("design:type", String)
], IndexFieldMetadataEntity.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)('WorkspaceEntity', {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'workspaceId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], IndexFieldMetadataEntity.prototype, "workspace", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], IndexFieldMetadataEntity.prototype, "indexMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_indexmetadataentity.IndexMetadataEntity, (indexMetadata)=>indexMetadata.indexFieldMetadatas, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)(),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], IndexFieldMetadataEntity.prototype, "indexMetadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    (0, _typeorm.Index)('IDX_INDEX_FIELD_METADATA_FIELD_METADATA_ID', [
        'fieldMetadataId'
    ]),
    _ts_metadata("design:type", String)
], IndexFieldMetadataEntity.prototype, "fieldMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_fieldmetadataentity.FieldMetadataEntity, (fieldMetadata)=>fieldMetadata.indexFieldMetadatas, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)(),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], IndexFieldMetadataEntity.prototype, "fieldMetadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", Number)
], IndexFieldMetadataEntity.prototype, "order", void 0);
_ts_decorate([
    (0, _wasintroducedinupgradedecorator.WasIntroducedInUpgrade)({
        upgradeCommandName: '2.8.0_AddSubFieldNameToIndexFieldMetadataFastInstanceCommand_1798200000000'
    }),
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], IndexFieldMetadataEntity.prototype, "subFieldName", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], IndexFieldMetadataEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], IndexFieldMetadataEntity.prototype, "updatedAt", void 0);
IndexFieldMetadataEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'indexFieldMetadata',
        schema: 'core'
    })
], IndexFieldMetadataEntity);

//# sourceMappingURL=index-field-metadata.entity.js.map