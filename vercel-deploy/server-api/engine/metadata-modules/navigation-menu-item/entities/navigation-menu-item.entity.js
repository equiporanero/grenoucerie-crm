"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NavigationMenuItemEntity", {
    enumerable: true,
    get: function() {
        return NavigationMenuItemEntity;
    }
});
const _typeorm = require("typeorm");
const _userworkspaceentity = require("../../../core-modules/user-workspace/user-workspace.entity");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _pagelayoutentity = require("../../page-layout/entities/page-layout.entity");
const _viewentity = require("../../view/entities/view.entity");
const _navigationmenuitemtypeenum = require("../enums/navigation-menu-item-type.enum");
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
let NavigationMenuItemEntity = class NavigationMenuItemEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], NavigationMenuItemEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userworkspaceentity.UserWorkspaceEntity, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'userWorkspaceId'
    }),
    _ts_metadata("design:type", Object)
], NavigationMenuItemEntity.prototype, "userWorkspace", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], NavigationMenuItemEntity.prototype, "userWorkspaceId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], NavigationMenuItemEntity.prototype, "targetRecordId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], NavigationMenuItemEntity.prototype, "targetObjectMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], NavigationMenuItemEntity.prototype, "viewId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_viewentity.ViewEntity, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'viewId'
    }),
    _ts_metadata("design:type", Object)
], NavigationMenuItemEntity.prototype, "view", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_objectmetadataentity.ObjectMetadataEntity, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'targetObjectMetadataId'
    }),
    _ts_metadata("design:type", Object)
], NavigationMenuItemEntity.prototype, "targetObjectMetadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'enum',
        enum: _navigationmenuitemtypeenum.NavigationMenuItemType
    }),
    _ts_metadata("design:type", typeof _navigationmenuitemtypeenum.NavigationMenuItemType === "undefined" ? Object : _navigationmenuitemtypeenum.NavigationMenuItemType)
], NavigationMenuItemEntity.prototype, "type", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], NavigationMenuItemEntity.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], NavigationMenuItemEntity.prototype, "link", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], NavigationMenuItemEntity.prototype, "icon", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], NavigationMenuItemEntity.prototype, "color", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>NavigationMenuItemEntity, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'folderId'
    }),
    _ts_metadata("design:type", Object)
], NavigationMenuItemEntity.prototype, "folder", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], NavigationMenuItemEntity.prototype, "folderId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_pagelayoutentity.PageLayoutEntity, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'pageLayoutId'
    }),
    _ts_metadata("design:type", Object)
], NavigationMenuItemEntity.prototype, "pageLayout", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], NavigationMenuItemEntity.prototype, "pageLayoutId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'double precision'
    }),
    _ts_metadata("design:type", Number)
], NavigationMenuItemEntity.prototype, "position", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], NavigationMenuItemEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], NavigationMenuItemEntity.prototype, "updatedAt", void 0);
NavigationMenuItemEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'navigationMenuItem',
        schema: 'core'
    }),
    (0, _typeorm.Index)('IDX_NAVIGATION_MENU_ITEM_USER_WORKSPACE_ID_WORKSPACE_ID', [
        'userWorkspaceId',
        'workspaceId'
    ]),
    (0, _typeorm.Index)('IDX_NAVIGATION_MENU_ITEM_TARGET_RECORD_OBJ_METADATA_WS_ID', [
        'targetRecordId',
        'targetObjectMetadataId',
        'workspaceId'
    ]),
    (0, _typeorm.Index)('IDX_NAVIGATION_MENU_ITEM_FOLDER_ID_WORKSPACE_ID', [
        'folderId',
        'workspaceId'
    ]),
    (0, _typeorm.Index)('IDX_NAVIGATION_MENU_ITEM_VIEW_ID_WORKSPACE_ID', [
        'viewId',
        'workspaceId'
    ]),
    (0, _typeorm.Index)('IDX_NAVIGATION_MENU_ITEM_PAGE_LAYOUT_ID_WORKSPACE_ID', [
        'pageLayoutId',
        'workspaceId'
    ]),
    (0, _typeorm.Check)('CHK_navigation_menu_item_type_fields', `("type" = 'FOLDER')
  OR ("type" = 'OBJECT' AND "targetObjectMetadataId" IS NOT NULL)
  OR ("type" = 'VIEW' AND "viewId" IS NOT NULL)
  OR ("type" = 'RECORD' AND "targetRecordId" IS NOT NULL AND "targetObjectMetadataId" IS NOT NULL)
  OR ("type" = 'LINK' AND "link" IS NOT NULL)
  OR ("type" = 'PAGE_LAYOUT' AND "pageLayoutId" IS NOT NULL)`)
], NavigationMenuItemEntity);

//# sourceMappingURL=navigation-menu-item.entity.js.map