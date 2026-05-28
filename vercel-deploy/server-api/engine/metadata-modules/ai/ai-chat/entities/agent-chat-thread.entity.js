"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentChatThreadEntity", {
    enumerable: true,
    get: function() {
        return AgentChatThreadEntity;
    }
});
const _typeorm = require("typeorm");
const _userworkspaceentity = require("../../../../core-modules/user-workspace/user-workspace.entity");
const _agentmessageentity = require("../../ai-agent-execution/entities/agent-message.entity");
const _agentturnentity = require("../../ai-agent-execution/entities/agent-turn.entity");
const _entityrelationinterface = require("../../../../workspace-manager/workspace-migration/types/entity-relation.interface");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AgentChatThreadEntity = class AgentChatThreadEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], AgentChatThreadEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    (0, _typeorm.Index)(),
    _ts_metadata("design:type", String)
], AgentChatThreadEntity.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)('WorkspaceEntity', {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'workspaceId'
    }),
    _ts_metadata("design:type", typeof _entityrelationinterface.EntityRelation === "undefined" ? Object : _entityrelationinterface.EntityRelation)
], AgentChatThreadEntity.prototype, "workspace", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    (0, _typeorm.Index)(),
    _ts_metadata("design:type", String)
], AgentChatThreadEntity.prototype, "userWorkspaceId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_userworkspaceentity.UserWorkspaceEntity, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'userWorkspaceId'
    }),
    _ts_metadata("design:type", typeof _entityrelationinterface.EntityRelation === "undefined" ? Object : _entityrelationinterface.EntityRelation)
], AgentChatThreadEntity.prototype, "userWorkspace", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'varchar'
    }),
    _ts_metadata("design:type", String)
], AgentChatThreadEntity.prototype, "title", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], AgentChatThreadEntity.prototype, "totalInputTokens", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], AgentChatThreadEntity.prototype, "totalOutputTokens", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentChatThreadEntity.prototype, "contextWindowTokens", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], AgentChatThreadEntity.prototype, "conversationSize", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'bigint',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], AgentChatThreadEntity.prototype, "totalInputCredits", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'bigint',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], AgentChatThreadEntity.prototype, "totalOutputCredits", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'bigint',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], AgentChatThreadEntity.prototype, "totalCacheReadTokens", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'bigint',
        default: 0
    }),
    _ts_metadata("design:type", Number)
], AgentChatThreadEntity.prototype, "totalCacheCreationTokens", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentChatThreadEntity.prototype, "activeStreamId", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_agentturnentity.AgentTurnEntity, (turn)=>turn.thread),
    _ts_metadata("design:type", typeof _entityrelationinterface.EntityRelation === "undefined" ? Object : _entityrelationinterface.EntityRelation)
], AgentChatThreadEntity.prototype, "turns", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_agentmessageentity.AgentMessageEntity, (message)=>message.thread),
    _ts_metadata("design:type", typeof _entityrelationinterface.EntityRelation === "undefined" ? Object : _entityrelationinterface.EntityRelation)
], AgentChatThreadEntity.prototype, "messages", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'timestamptz',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentChatThreadEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AgentChatThreadEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AgentChatThreadEntity.prototype, "updatedAt", void 0);
AgentChatThreadEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'agentChatThread',
        schema: 'core'
    }),
    (0, _typeorm.Index)('IDX_AGENT_CHAT_THREAD_ID_DELETED_AT', [
        'id',
        'deletedAt'
    ])
], AgentChatThreadEntity);

//# sourceMappingURL=agent-chat-thread.entity.js.map