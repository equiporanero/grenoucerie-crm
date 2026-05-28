"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageFolderEntity", {
    enumerable: true,
    get: function() {
        return MessageFolderEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _typeorm = require("typeorm");
const _types = require("twenty-shared/types");
const _messagechannelentity = require("../../message-channel/entities/message-channel.entity");
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
(0, _graphql.registerEnumType)(_types.MessageFolderPendingSyncAction, {
    name: 'MessageFolderPendingSyncAction'
});
let MessageFolderEntity = class MessageFolderEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], MessageFolderEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], MessageFolderEntity.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], MessageFolderEntity.prototype, "syncCursor", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'boolean',
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], MessageFolderEntity.prototype, "isSentFolder", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'boolean',
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], MessageFolderEntity.prototype, "isSynced", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], MessageFolderEntity.prototype, "parentFolderId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], MessageFolderEntity.prototype, "externalId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: _types.MessageFolderPendingSyncAction,
        nullable: false,
        default: _types.MessageFolderPendingSyncAction.NONE
    }),
    _ts_metadata("design:type", typeof _types.MessageFolderPendingSyncAction === "undefined" ? Object : _types.MessageFolderPendingSyncAction)
], MessageFolderEntity.prototype, "pendingSyncAction", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'uuid',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], MessageFolderEntity.prototype, "messageChannelId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_messagechannelentity.MessageChannelEntity, (messageChannel)=>messageChannel.messageFolders, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'messageChannelId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], MessageFolderEntity.prototype, "messageChannel", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], MessageFolderEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], MessageFolderEntity.prototype, "updatedAt", void 0);
MessageFolderEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'messageFolder',
        schema: 'core'
    })
], MessageFolderEntity);

//# sourceMappingURL=message-folder.entity.js.map