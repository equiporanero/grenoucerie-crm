"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SearchFieldMetadataEntity", {
    enumerable: true,
    get: function() {
        return SearchFieldMetadataEntity;
    }
});
const _typeorm = require("typeorm");
const _fieldmetadataentity = require("../field-metadata/field-metadata.entity");
const _objectmetadataentity = require("../object-metadata/object-metadata.entity");
const _workspacerelatedentity = require("../../workspace-manager/types/workspace-related-entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SearchFieldMetadataEntity = class SearchFieldMetadataEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], SearchFieldMetadataEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], SearchFieldMetadataEntity.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_objectmetadataentity.ObjectMetadataEntity, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'objectMetadataId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], SearchFieldMetadataEntity.prototype, "objectMetadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], SearchFieldMetadataEntity.prototype, "fieldMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_fieldmetadataentity.FieldMetadataEntity, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'fieldMetadataId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], SearchFieldMetadataEntity.prototype, "fieldMetadata", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], SearchFieldMetadataEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], SearchFieldMetadataEntity.prototype, "updatedAt", void 0);
SearchFieldMetadataEntity = _ts_decorate([
    (0, _typeorm.Entity)('searchFieldMetadata'),
    (0, _typeorm.Unique)('IDX_SEARCH_FIELD_METADATA_OBJECT_FIELD_UNIQUE', [
        'objectMetadataId',
        'fieldMetadataId'
    ]),
    (0, _typeorm.Index)('IDX_SEARCH_FIELD_METADATA_WORKSPACE_ID', [
        'workspaceId'
    ]),
    (0, _typeorm.Index)('IDX_SEARCH_FIELD_METADATA_OBJECT_METADATA_ID', [
        'objectMetadataId'
    ])
], SearchFieldMetadataEntity);

//# sourceMappingURL=search-field-metadata.entity.js.map