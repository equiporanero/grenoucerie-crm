"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewEntity", {
    enumerable: true,
    get: function() {
        return ViewEntity;
    }
});
const _typeorm = require("typeorm");
const _types = require("twenty-shared/types");
const _userworkspaceentity = require("../../../core-modules/user-workspace/user-workspace.entity");
const _fieldmetadataentity = require("../../field-metadata/field-metadata.entity");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _viewfieldgroupentity = require("../../view-field-group/entities/view-field-group.entity");
const _viewfieldentity = require("../../view-field/entities/view-field.entity");
const _viewfiltergroupentity = require("../../view-filter-group/entities/view-filter-group.entity");
const _viewfilterentity = require("../../view-filter/entities/view-filter.entity");
const _viewgroupentity = require("../../view-group/entities/view-group.entity");
const _viewsortentity = require("../../view-sort/entities/view-sort.entity");
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
let ViewEntity = class ViewEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], ViewEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text',
        default: ''
    }),
    _ts_metadata("design:type", String)
], ViewEntity.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], ViewEntity.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_objectmetadataentity.ObjectMetadataEntity, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'objectMetadataId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewEntity.prototype, "objectMetadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_types.ViewType),
        nullable: false,
        default: _types.ViewType.TABLE
    }),
    _ts_metadata("design:type", typeof _types.ViewType === "undefined" ? Object : _types.ViewType)
], ViewEntity.prototype, "type", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_types.ViewKey),
        nullable: true,
        default: null
    }),
    _ts_metadata("design:type", Object)
], ViewEntity.prototype, "key", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text'
    }),
    _ts_metadata("design:type", String)
], ViewEntity.prototype, "icon", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'double precision',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], ViewEntity.prototype, "position", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: false,
        type: 'boolean'
    }),
    _ts_metadata("design:type", Boolean)
], ViewEntity.prototype, "isCompact", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: false,
        type: 'boolean'
    }),
    _ts_metadata("design:type", Boolean)
], ViewEntity.prototype, "isCustom", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_types.ViewOpenRecordIn),
        nullable: false,
        default: _types.ViewOpenRecordIn.SIDE_PANEL
    }),
    _ts_metadata("design:type", typeof _types.ViewOpenRecordIn === "undefined" ? Object : _types.ViewOpenRecordIn)
], ViewEntity.prototype, "openRecordIn", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_types.AggregateOperations),
        nullable: true,
        default: null
    }),
    _ts_metadata("design:type", Object)
], ViewEntity.prototype, "kanbanAggregateOperation", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], ViewEntity.prototype, "kanbanAggregateOperationFieldMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_fieldmetadataentity.FieldMetadataEntity, (FieldMetadataEntity)=>FieldMetadataEntity.kanbanAggregateOperationViews, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'kanbanAggregateOperationFieldMetadataId'
    }),
    _ts_metadata("design:type", Object)
], ViewEntity.prototype, "kanbanAggregateOperationFieldMetadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_types.ViewCalendarLayout),
        nullable: true,
        default: null
    }),
    _ts_metadata("design:type", Object)
], ViewEntity.prototype, "calendarLayout", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], ViewEntity.prototype, "calendarFieldMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_fieldmetadataentity.FieldMetadataEntity, (fieldMetadata)=>fieldMetadata.calendarViews, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'calendarFieldMetadataId'
    }),
    _ts_metadata("design:type", Object)
], ViewEntity.prototype, "calendarFieldMetadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], ViewEntity.prototype, "mainGroupByFieldMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_fieldmetadataentity.FieldMetadataEntity, (fieldMetadata)=>fieldMetadata.mainGroupByFieldMetadataViews, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'mainGroupByFieldMetadataId'
    }),
    _ts_metadata("design:type", Object)
], ViewEntity.prototype, "mainGroupByFieldMetadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: false,
        type: 'boolean'
    }),
    _ts_metadata("design:type", Boolean)
], ViewEntity.prototype, "shouldHideEmptyGroups", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], ViewEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text',
        default: null
    }),
    _ts_metadata("design:type", Object)
], ViewEntity.prototype, "anyFieldFilterValue", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_types.ViewVisibility),
        nullable: false,
        default: _types.ViewVisibility.WORKSPACE
    }),
    _ts_metadata("design:type", typeof _types.ViewVisibility === "undefined" ? Object : _types.ViewVisibility)
], ViewEntity.prototype, "visibility", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], ViewEntity.prototype, "createdByUserWorkspaceId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userworkspaceentity.UserWorkspaceEntity, {
        onDelete: 'SET NULL'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'createdByUserWorkspaceId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewEntity.prototype, "createdBy", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_viewfieldentity.ViewFieldEntity, (viewField)=>viewField.view),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewEntity.prototype, "viewFields", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_viewfieldgroupentity.ViewFieldGroupEntity, (viewFieldGroup)=>viewFieldGroup.view),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewEntity.prototype, "viewFieldGroups", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_viewfilterentity.ViewFilterEntity, (viewFilter)=>viewFilter.view),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewEntity.prototype, "viewFilters", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_viewsortentity.ViewSortEntity, (viewSort)=>viewSort.view),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewEntity.prototype, "viewSorts", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_viewgroupentity.ViewGroupEntity, (viewGroup)=>viewGroup.view),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewEntity.prototype, "viewGroups", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_viewfiltergroupentity.ViewFilterGroupEntity, (viewFilterGroup)=>viewFilterGroup.view),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewEntity.prototype, "viewFilterGroups", void 0);
ViewEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'view',
        schema: 'core'
    }),
    (0, _typeorm.Index)('IDX_VIEW_WORKSPACE_ID_OBJECT_METADATA_ID', [
        'workspaceId',
        'objectMetadataId'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_VISIBILITY', [
        'visibility'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_CALENDAR_FIELD_METADATA', [
        'calendarFieldMetadataId'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_KANBAN_FIELD_METADATA', [
        'kanbanAggregateOperationFieldMetadataId'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_MAIN_GROUP_BY_FIELD_METADATA', [
        'mainGroupByFieldMetadataId'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_CREATED_BY_USER_WORKSPACE', [
        'createdByUserWorkspaceId'
    ]),
    (0, _typeorm.Check)('CHK_VIEW_CALENDAR_INTEGRITY', `("type" != 'CALENDAR' OR ("calendarLayout" IS NOT NULL AND "calendarFieldMetadataId" IS NOT NULL))`)
], ViewEntity);

//# sourceMappingURL=view.entity.js.map