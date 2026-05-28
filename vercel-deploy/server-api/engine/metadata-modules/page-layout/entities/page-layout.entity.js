"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutEntity", {
    enumerable: true,
    get: function() {
        return PageLayoutEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _typeorm = require("typeorm");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _pagelayouttabentity = require("../../page-layout-tab/entities/page-layout-tab.entity");
const _pagelayouttypeenum = require("../enums/page-layout-type.enum");
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
let PageLayoutEntity = class PageLayoutEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], PageLayoutEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], PageLayoutEntity.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_pagelayouttypeenum.PageLayoutType),
        nullable: false,
        default: _pagelayouttypeenum.PageLayoutType.RECORD_PAGE
    }),
    _ts_metadata("design:type", typeof _pagelayouttypeenum.PageLayoutType === "undefined" ? Object : _pagelayouttypeenum.PageLayoutType)
], PageLayoutEntity.prototype, "type", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], PageLayoutEntity.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_objectmetadataentity.ObjectMetadataEntity, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'objectMetadataId'
    }),
    _ts_metadata("design:type", Object)
], PageLayoutEntity.prototype, "objectMetadata", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_pagelayouttabentity.PageLayoutTabEntity, (tab)=>tab.pageLayout, {
        cascade: true
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], PageLayoutEntity.prototype, "tabs", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], PageLayoutEntity.prototype, "defaultTabToFocusOnMobileAndSidePanelId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_pagelayouttabentity.PageLayoutTabEntity, {
        onDelete: 'SET NULL',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'defaultTabToFocusOnMobileAndSidePanelId'
    }),
    _ts_metadata("design:type", Object)
], PageLayoutEntity.prototype, "defaultTabToFocusOnMobileAndSidePanel", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PageLayoutEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PageLayoutEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.DeleteDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], PageLayoutEntity.prototype, "deletedAt", void 0);
PageLayoutEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'pageLayout',
        schema: 'core'
    }),
    (0, _graphql.ObjectType)('PageLayout'),
    (0, _typeorm.Index)('IDX_PAGE_LAYOUT_WORKSPACE_ID_OBJECT_METADATA_ID', [
        'workspaceId',
        'objectMetadataId'
    ], {
        where: '"deletedAt" IS NULL'
    })
], PageLayoutEntity);

//# sourceMappingURL=page-layout.entity.js.map