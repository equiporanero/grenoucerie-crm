"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutTabEntity", {
    enumerable: true,
    get: function() {
        return PageLayoutTabEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
const _typeorm = require("typeorm");
const _pagelayoutwidgetentity = require("../../page-layout-widget/entities/page-layout-widget.entity");
const _pagelayoutentity = require("../../page-layout/entities/page-layout.entity");
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
let PageLayoutTabEntity = class PageLayoutTabEntity extends _overridableentity.OverridableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], PageLayoutTabEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], PageLayoutTabEntity.prototype, "title", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'float',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], PageLayoutTabEntity.prototype, "position", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    _ts_metadata("design:type", String)
], PageLayoutTabEntity.prototype, "pageLayoutId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_pagelayoutentity.PageLayoutEntity, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'pageLayoutId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], PageLayoutTabEntity.prototype, "pageLayout", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_pagelayoutwidgetentity.PageLayoutWidgetEntity, (widget)=>widget.pageLayoutTab, {
        cascade: true
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], PageLayoutTabEntity.prototype, "widgets", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'varchar'
    }),
    _ts_metadata("design:type", Object)
], PageLayoutTabEntity.prototype, "icon", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_types.PageLayoutTabLayoutMode),
        nullable: false,
        default: _types.PageLayoutTabLayoutMode.GRID
    }),
    _ts_metadata("design:type", typeof _types.PageLayoutTabLayoutMode === "undefined" ? Object : _types.PageLayoutTabLayoutMode)
], PageLayoutTabEntity.prototype, "layoutMode", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PageLayoutTabEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PageLayoutTabEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], PageLayoutTabEntity.prototype, "deletedAt", void 0);
PageLayoutTabEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'pageLayoutTab',
        schema: 'core'
    }),
    (0, _graphql.ObjectType)('PageLayoutTab'),
    (0, _typeorm.Index)('IDX_PAGE_LAYOUT_TAB_WORKSPACE_ID_PAGE_LAYOUT_ID', [
        'workspaceId',
        'pageLayoutId'
    ], {
        where: '"deletedAt" IS NULL'
    })
], PageLayoutTabEntity);

//# sourceMappingURL=page-layout-tab.entity.js.map