"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFieldEntity", {
    enumerable: true,
    get: function() {
        return ViewFieldEntity;
    }
});
const _typeorm = require("typeorm");
const _types = require("twenty-shared/types");
const _fieldmetadataentity = require("../../field-metadata/field-metadata.entity");
const _viewfieldgroupentity = require("../../view-field-group/entities/view-field-group.entity");
const _viewentity = require("../../view/entities/view.entity");
const _overridableentity = require("../../../workspace-manager/types/overridable-entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ViewFieldEntity = class ViewFieldEntity extends _overridableentity.OverridableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], ViewFieldEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], ViewFieldEntity.prototype, "fieldMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_fieldmetadataentity.FieldMetadataEntity, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'fieldMetadataId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewFieldEntity.prototype, "fieldMetadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], ViewFieldEntity.prototype, "isVisible", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'int',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], ViewFieldEntity.prototype, "size", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'double precision',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], ViewFieldEntity.prototype, "position", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_types.AggregateOperations),
        nullable: true,
        default: null
    }),
    _ts_metadata("design:type", Object)
], ViewFieldEntity.prototype, "aggregateOperation", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], ViewFieldEntity.prototype, "viewId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], ViewFieldEntity.prototype, "viewFieldGroupId", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewFieldEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewFieldEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], ViewFieldEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_viewentity.ViewEntity, (view)=>view.viewFields, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'viewId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewFieldEntity.prototype, "view", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_viewfieldgroupentity.ViewFieldGroupEntity, (viewFieldGroup)=>viewFieldGroup.viewFields, {
        onDelete: 'SET NULL',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'viewFieldGroupId'
    }),
    _ts_metadata("design:type", Object)
], ViewFieldEntity.prototype, "viewFieldGroup", void 0);
ViewFieldEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'viewField',
        schema: 'core'
    }),
    (0, _typeorm.Index)('IDX_VIEW_FIELD_WORKSPACE_ID_VIEW_ID', [
        'workspaceId',
        'viewId'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_FIELD_VIEW_ID', [
        'viewId'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_FIELD_FIELD_METADATA_ID', [
        'fieldMetadataId'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_FIELD_VIEW_FIELD_GROUP_ID', [
        'viewFieldGroupId'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_FIELD_FIELD_METADATA_ID_VIEW_ID_UNIQUE', [
        'fieldMetadataId',
        'viewId'
    ], {
        unique: true,
        where: '"deletedAt" IS NULL'
    })
], ViewFieldEntity);

//# sourceMappingURL=view-field.entity.js.map