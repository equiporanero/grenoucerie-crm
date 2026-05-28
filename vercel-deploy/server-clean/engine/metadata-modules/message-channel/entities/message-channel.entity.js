"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageChannelEntity", {
    enumerable: true,
    get: function() {
        return MessageChannelEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _typeorm = require("typeorm");
const _types = require("twenty-shared/types");
const _connectedaccountentity = require("../../connected-account/entities/connected-account.entity");
const _workspacerelatedentity = require("../../../workspace-manager/types/workspace-related-entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
(0, _graphql.registerEnumType)(_types.MessageChannelVisibility, {
    name: 'MessageChannelVisibility'
});
(0, _graphql.registerEnumType)(_types.MessageChannelSyncStatus, {
    name: 'MessageChannelSyncStatus'
});
(0, _graphql.registerEnumType)(_types.MessageChannelSyncStage, {
    name: 'MessageChannelSyncStage'
});
(0, _graphql.registerEnumType)(_types.MessageChannelType, {
    name: 'MessageChannelType'
});
(0, _graphql.registerEnumType)(_types.MessageChannelContactAutoCreationPolicy, {
    name: 'MessageChannelContactAutoCreationPolicy'
});
(0, _graphql.registerEnumType)(_types.MessageFolderImportPolicy, {
    name: 'MessageFolderImportPolicy'
});
(0, _graphql.registerEnumType)(_types.MessageChannelPendingGroupEmailsAction, {
    name: 'MessageChannelPendingGroupEmailsAction'
});
let MessageChannelEntity = class MessageChannelEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], MessageChannelEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: _types.MessageChannelVisibility,
        nullable: false
    }),
    _ts_metadata("design:type", typeof _types.MessageChannelVisibility === "undefined" ? Object : _types.MessageChannelVisibility)
], MessageChannelEntity.prototype, "visibility", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], MessageChannelEntity.prototype, "handle", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: _types.MessageChannelType,
        nullable: false
    }),
    _ts_metadata("design:type", typeof _types.MessageChannelType === "undefined" ? Object : _types.MessageChannelType)
], MessageChannelEntity.prototype, "type", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'boolean',
        nullable: false,
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], MessageChannelEntity.prototype, "isContactAutoCreationEnabled", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: _types.MessageChannelContactAutoCreationPolicy,
        nullable: false,
        default: _types.MessageChannelContactAutoCreationPolicy.SENT
    }),
    _ts_metadata("design:type", typeof _types.MessageChannelContactAutoCreationPolicy === "undefined" ? Object : _types.MessageChannelContactAutoCreationPolicy)
], MessageChannelEntity.prototype, "contactAutoCreationPolicy", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: _types.MessageFolderImportPolicy,
        nullable: false,
        default: _types.MessageFolderImportPolicy.ALL_FOLDERS
    }),
    _ts_metadata("design:type", typeof _types.MessageFolderImportPolicy === "undefined" ? Object : _types.MessageFolderImportPolicy)
], MessageChannelEntity.prototype, "messageFolderImportPolicy", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'boolean',
        nullable: false,
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], MessageChannelEntity.prototype, "excludeNonProfessionalEmails", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'boolean',
        nullable: false,
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], MessageChannelEntity.prototype, "excludeGroupEmails", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: _types.MessageChannelPendingGroupEmailsAction,
        nullable: false
    }),
    _ts_metadata("design:type", typeof _types.MessageChannelPendingGroupEmailsAction === "undefined" ? Object : _types.MessageChannelPendingGroupEmailsAction)
], MessageChannelEntity.prototype, "pendingGroupEmailsAction", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'boolean',
        nullable: false,
        default: true
    }),
    _ts_metadata("design:type", Boolean)
], MessageChannelEntity.prototype, "isSyncEnabled", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], MessageChannelEntity.prototype, "syncCursor", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'timestamptz',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], MessageChannelEntity.prototype, "syncedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: _types.MessageChannelSyncStatus,
        nullable: false,
        default: _types.MessageChannelSyncStatus.NOT_SYNCED
    }),
    _ts_metadata("design:type", typeof _types.MessageChannelSyncStatus === "undefined" ? Object : _types.MessageChannelSyncStatus)
], MessageChannelEntity.prototype, "syncStatus", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: _types.MessageChannelSyncStage,
        nullable: false
    }),
    _ts_metadata("design:type", typeof _types.MessageChannelSyncStage === "undefined" ? Object : _types.MessageChannelSyncStage)
], MessageChannelEntity.prototype, "syncStage", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'timestamptz',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], MessageChannelEntity.prototype, "syncStageStartedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'integer',
        nullable: false,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], MessageChannelEntity.prototype, "throttleFailureCount", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'timestamptz',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], MessageChannelEntity.prototype, "throttleRetryAfter", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'uuid',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], MessageChannelEntity.prototype, "connectedAccountId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_connectedaccountentity.ConnectedAccountEntity, (connectedAccount)=>connectedAccount.messageChannels, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'connectedAccountId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], MessageChannelEntity.prototype, "connectedAccount", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)('MessageFolderEntity', (messageFolder)=>messageFolder.messageChannel),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], MessageChannelEntity.prototype, "messageFolders", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], MessageChannelEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], MessageChannelEntity.prototype, "updatedAt", void 0);
MessageChannelEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'messageChannel',
        schema: 'core'
    }),
    (0, _typeorm.Index)('IDX_MESSAGE_CHANNEL_WORKSPACE_ID_SYNC_ENABLED_SYNC_STAGE', [
        'workspaceId',
        'isSyncEnabled',
        'syncStage'
    ])
], MessageChannelEntity);

//# sourceMappingURL=message-channel.entity.js.map