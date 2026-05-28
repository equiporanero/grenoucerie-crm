"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewGroupEntity", {
    enumerable: true,
    get: function() {
        return ViewGroupEntity;
    }
});
const _typeorm = require("typeorm");
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
let ViewGroupEntity = class ViewGroupEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], ViewGroupEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], ViewGroupEntity.prototype, "isVisible", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text'
    }),
    _ts_metadata("design:type", String)
], ViewGroupEntity.prototype, "fieldValue", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'double precision',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], ViewGroupEntity.prototype, "position", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], ViewGroupEntity.prototype, "viewId", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewGroupEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewGroupEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], ViewGroupEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_viewentity.ViewEntity, (view)=>view.viewGroups, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'viewId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewGroupEntity.prototype, "view", void 0);
ViewGroupEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'viewGroup',
        schema: 'core'
    }),
    (0, _typeorm.Index)('IDX_VIEW_GROUP_WORKSPACE_ID_VIEW_ID', [
        'workspaceId',
        'viewId'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_GROUP_VIEW_ID', [
        'viewId'
    ])
], ViewGroupEntity);

//# sourceMappingURL=view-group.entity.js.map