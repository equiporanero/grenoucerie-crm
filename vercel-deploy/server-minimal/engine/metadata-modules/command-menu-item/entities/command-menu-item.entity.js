"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommandMenuItemEntity", {
    enumerable: true,
    get: function() {
        return CommandMenuItemEntity;
    }
});
const _typeorm = require("typeorm");
const _commandmenuitemavailabilitytypeenum = require("../enums/command-menu-item-availability-type.enum");
const _enginecomponentkeyenum = require("../enums/engine-component-key.enum");
const _frontcomponententity = require("../../front-component/entities/front-component.entity");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _pagelayoutentity = require("../../page-layout/entities/page-layout.entity");
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
let CommandMenuItemEntity = class CommandMenuItemEntity extends _syncableentityinterface.SyncableEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], CommandMenuItemEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], CommandMenuItemEntity.prototype, "workflowVersionId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], CommandMenuItemEntity.prototype, "frontComponentId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_frontcomponententity.FrontComponentEntity, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'frontComponentId'
    }),
    _ts_metadata("design:type", Object)
], CommandMenuItemEntity.prototype, "frontComponent", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: false
    }),
    _ts_metadata("design:type", typeof _enginecomponentkeyenum.EngineComponentKey === "undefined" ? Object : _enginecomponentkeyenum.EngineComponentKey)
], CommandMenuItemEntity.prototype, "engineComponentKey", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], CommandMenuItemEntity.prototype, "label", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'varchar'
    }),
    _ts_metadata("design:type", Object)
], CommandMenuItemEntity.prototype, "icon", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'varchar'
    }),
    _ts_metadata("design:type", Object)
], CommandMenuItemEntity.prototype, "shortLabel", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'double precision',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], CommandMenuItemEntity.prototype, "position", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], CommandMenuItemEntity.prototype, "isPinned", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType),
        nullable: false,
        default: _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType.GLOBAL
    }),
    _ts_metadata("design:type", typeof _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType === "undefined" ? Object : _commandmenuitemavailabilitytypeenum.CommandMenuItemAvailabilityType)
], CommandMenuItemEntity.prototype, "availabilityType", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], CommandMenuItemEntity.prototype, "payload", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        array: true,
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], CommandMenuItemEntity.prototype, "hotKeys", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'varchar'
    }),
    _ts_metadata("design:type", Object)
], CommandMenuItemEntity.prototype, "conditionalAvailabilityExpression", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], CommandMenuItemEntity.prototype, "availabilityObjectMetadataId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_objectmetadataentity.ObjectMetadataEntity, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'availabilityObjectMetadataId'
    }),
    _ts_metadata("design:type", Object)
], CommandMenuItemEntity.prototype, "availabilityObjectMetadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'uuid'
    }),
    _ts_metadata("design:type", Object)
], CommandMenuItemEntity.prototype, "pageLayoutId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_pagelayoutentity.PageLayoutEntity, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'pageLayoutId'
    }),
    _ts_metadata("design:type", Object)
], CommandMenuItemEntity.prototype, "pageLayout", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CommandMenuItemEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CommandMenuItemEntity.prototype, "updatedAt", void 0);
CommandMenuItemEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'commandMenuItem',
        schema: 'core'
    }),
    (0, _typeorm.Index)('IDX_COMMAND_MENU_ITEM_WORKFLOW_VERSION_ID_WORKSPACE_ID', [
        'workflowVersionId',
        'workspaceId'
    ]),
    (0, _typeorm.Index)('IDX_COMMAND_MENU_ITEM_FRONT_COMPONENT_ID_WORKSPACE_ID', [
        'frontComponentId',
        'workspaceId'
    ]),
    (0, _typeorm.Index)('IDX_COMMAND_MENU_ITEM_AVAILABILITY_OBJECT_METADATA_ID', [
        'availabilityObjectMetadataId'
    ]),
    (0, _typeorm.Index)('IDX_COMMAND_MENU_ITEM_PAGE_LAYOUT_ID_WORKSPACE_ID', [
        'pageLayoutId',
        'workspaceId'
    ]),
    (0, _typeorm.Check)('CHK_CMD_MENU_ITEM_ENGINE_KEY_COHERENCE', `("engineComponentKey" = 'TRIGGER_WORKFLOW_VERSION' AND "workflowVersionId" IS NOT NULL AND "frontComponentId" IS NULL AND "payload" IS NULL) OR ("engineComponentKey" = 'FRONT_COMPONENT_RENDERER' AND "frontComponentId" IS NOT NULL AND "workflowVersionId" IS NULL AND "payload" IS NULL) OR ("engineComponentKey" = 'NAVIGATION' AND "payload" IS NOT NULL AND "workflowVersionId" IS NULL AND "frontComponentId" IS NULL) OR ("engineComponentKey" NOT IN ('TRIGGER_WORKFLOW_VERSION', 'FRONT_COMPONENT_RENDERER', 'NAVIGATION') AND "workflowVersionId" IS NULL AND "frontComponentId" IS NULL AND "payload" IS NULL)`)
], CommandMenuItemEntity);

//# sourceMappingURL=command-menu-item.entity.js.map