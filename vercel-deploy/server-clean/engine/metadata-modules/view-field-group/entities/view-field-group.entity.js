"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFieldGroupEntity", {
    enumerable: true,
    get: function() {
        return ViewFieldGroupEntity;
    }
});
const _typeorm = require("typeorm");
const _viewfieldentity = require("../../view-field/entities/view-field.entity");
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
let ViewFieldGroupEntity = class ViewFieldGroupEntity extends _overridableentity.OverridableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], ViewFieldGroupEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text'
    }),
    _ts_metadata("design:type", String)
], ViewFieldGroupEntity.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'double precision',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], ViewFieldGroupEntity.prototype, "position", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], ViewFieldGroupEntity.prototype, "isVisible", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], ViewFieldGroupEntity.prototype, "viewId", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewFieldGroupEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ViewFieldGroupEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], ViewFieldGroupEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_viewentity.ViewEntity, (view)=>view.viewFieldGroups, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'viewId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewFieldGroupEntity.prototype, "view", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_viewfieldentity.ViewFieldEntity, (viewField)=>viewField.viewFieldGroup),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], ViewFieldGroupEntity.prototype, "viewFields", void 0);
ViewFieldGroupEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'viewFieldGroup',
        schema: 'core'
    }),
    (0, _typeorm.Index)('IDX_VIEW_FIELD_GROUP_WORKSPACE_ID_VIEW_ID', [
        'workspaceId',
        'viewId'
    ]),
    (0, _typeorm.Index)('IDX_VIEW_FIELD_GROUP_VIEW_ID', [
        'viewId'
    ])
], ViewFieldGroupEntity);

//# sourceMappingURL=view-field-group.entity.js.map