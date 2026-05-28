"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentMessagePartEntity", {
    enumerable: true,
    get: function() {
        return AgentMessagePartEntity;
    }
});
const _typeorm = require("typeorm");
const _fileentity = require("../../../../core-modules/file/entities/file.entity");
const _agentmessageentity = require("./agent-message.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AgentMessagePartEntity = class AgentMessagePartEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], AgentMessagePartEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    (0, _typeorm.Index)(),
    _ts_metadata("design:type", String)
], AgentMessagePartEntity.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)('WorkspaceEntity', {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'workspaceId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], AgentMessagePartEntity.prototype, "workspace", void 0);
_ts_decorate([
    (0, _typeorm.Column)('uuid'),
    (0, _typeorm.Index)(),
    _ts_metadata("design:type", String)
], AgentMessagePartEntity.prototype, "messageId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_agentmessageentity.AgentMessageEntity, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'messageId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], AgentMessagePartEntity.prototype, "message", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int'
    }),
    _ts_metadata("design:type", Number)
], AgentMessagePartEntity.prototype, "orderIndex", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar'
    }),
    _ts_metadata("design:type", String)
], AgentMessagePartEntity.prototype, "type", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "textContent", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "reasoningContent", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "toolName", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "toolCallId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "toolInput", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "toolOutput", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "state", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'boolean',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "providerExecuted", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "errorMessage", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "errorDetails", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "sourceUrlSourceId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "sourceUrlUrl", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "sourceUrlTitle", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "sourceDocumentSourceId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "sourceDocumentMediaType", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "sourceDocumentTitle", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "sourceDocumentFilename", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "fileFilename", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'uuid',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "fileId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_fileentity.FileEntity, {
        onDelete: 'RESTRICT',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'fileId'
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "file", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessagePartEntity.prototype, "providerMetadata", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AgentMessagePartEntity.prototype, "createdAt", void 0);
AgentMessagePartEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'agentMessagePart',
        schema: 'core'
    })
], AgentMessagePartEntity);

//# sourceMappingURL=agent-message-part.entity.js.map