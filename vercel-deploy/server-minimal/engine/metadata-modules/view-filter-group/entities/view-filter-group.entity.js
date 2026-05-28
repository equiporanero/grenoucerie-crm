"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFilterGroupEntity", {
    enumerable: true,
    get: function() {
        return ViewFilterGroupEntity;
    }
});
const _typeorm = require("typeorm");
const _types = require("twenty-shared/types");
const _viewfilterentity = require("../../view-filter/entities/view-filter.entity");
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
let ViewFilterGroupEntity = class ViewFilterGroupEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], ViewFilterGroupEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], ViewFilterGroupEntity.prototype, "parentViewFilterGroupId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_types.ViewFilterGroupLogicalOperator),
        nullable: false,
        default: _types.ViewFilterGroupLogicalOperator.AND
    }),
    _ts_metadata("design:type", typeof _types.ViewFilterGroupLogicalOperator === "undefined" ? Object : _types.ViewFilterGroupLogicalOperator)
], ViewFilterGroupEntity.prototype, "logicalOperator", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'double precision'
    }),
    _ts_metadata("design:type", Object)
], ViewFilterGroupEntity.prototype, "positionInViewFilterGroup", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], ViewFilterGroupEntity.prototype, "viewId", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewFilterGroupEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewFilterGroupEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], ViewFilterGroupEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_viewentity.ViewEntity, (view)=>view.viewFilterGroups, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'viewId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewFilterGroupEntity.prototype, "view", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_viewfilterentity.ViewFilterEntity, (viewFilter)=>viewFilter.viewFilterGroup),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewFilterGroupEntity.prototype, "viewFilters", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>ViewFilterGroupEntity, (viewFilterGroup)=>viewFilterGroup.childViewFilterGroups, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'parentViewFilterGroupId'
    }),
    _ts_metadata("design:type", Object)
], ViewFilterGroupEntity.prototype, "parentViewFilterGroup", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>ViewFilterGroupEntity, (viewFilterGroup)=>viewFilterGroup.parentViewFilterGroup),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewFilterGroupEntity.prototype, "childViewFilterGroups", void 0);
ViewFilterGroupEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'viewFilterGroup',
        schema: 'core'
    }),
    (0, _typeorm.Index)('IDX_VIEW_FILTER_GROUP_WORKSPACE_ID_VIEW_ID', [
        'workspaceId',
        'viewId'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_FILTER_GROUP_VIEW_ID', [
        'viewId'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_FILTER_GROUP_PARENT_ID', [
        'parentViewFilterGroupId'
    ])
], ViewFilterGroupEntity);

//# sourceMappingURL=view-filter-group.entity.js.map