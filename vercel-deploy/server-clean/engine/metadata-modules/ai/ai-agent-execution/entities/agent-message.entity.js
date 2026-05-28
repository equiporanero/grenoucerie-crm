"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get AgentMessageEntity () {
        return AgentMessageEntity;
    },
    get AgentMessageRole () {
        return AgentMessageRole;
    },
    get AgentMessageStatus () {
        return AgentMessageStatus;
    }
});
const _typeorm = require("typeorm");
const _agentmessagepartentity = require("./agent-message-part.entity");
const _agentturnentity = require("./agent-turn.entity");
const _agentchatthreadentity = require("../../ai-chat/entities/agent-chat-thread.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
var AgentMessageRole = /*#__PURE__*/ function(AgentMessageRole) {
    AgentMessageRole["SYSTEM"] = "system";
    AgentMessageRole["USER"] = "user";
    AgentMessageRole["ASSISTANT"] = "assistant";
    return AgentMessageRole;
}({});
var AgentMessageStatus = /*#__PURE__*/ function(AgentMessageStatus) {
    AgentMessageStatus["QUEUED"] = "queued";
    AgentMessageStatus["SENT"] = "sent";
    return AgentMessageStatus;
}({});
let AgentMessageEntity = class AgentMessageEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], AgentMessageEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    (0, _typeorm.Index)(),
    _ts_metadata("design:type", String)
], AgentMessageEntity.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)('WorkspaceEntity', {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'workspaceId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], AgentMessageEntity.prototype, "workspace", void 0);
_ts_decorate([
    (0, _typeorm.Column)('uuid'),
    (0, _typeorm.Index)(),
    _ts_metadata("design:type", String)
], AgentMessageEntity.prototype, "threadId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_agentchatthreadentity.AgentChatThreadEntity, (thread)=>thread.messages, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'threadId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], AgentMessageEntity.prototype, "thread", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'uuid',
        nullable: true
    }),
    (0, _typeorm.Index)(),
    _ts_metadata("design:type", Object)
], AgentMessageEntity.prototype, "turnId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_agentturnentity.AgentTurnEntity, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'turnId'
    }),
    _ts_metadata("design:type", Object)
], AgentMessageEntity.prototype, "turn", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'uuid',
        nullable: true
    }),
    (0, _typeorm.Index)(),
    _ts_metadata("design:type", Object)
], AgentMessageEntity.prototype, "agentId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: AgentMessageRole
    }),
    _ts_metadata("design:type", String)
], AgentMessageEntity.prototype, "role", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: AgentMessageStatus,
        default: "sent"
    }),
    _ts_metadata("design:type", String)
], AgentMessageEntity.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_agentmessagepartentity.AgentMessagePartEntity, (part)=>part.message),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], AgentMessageEntity.prototype, "parts", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'timestamptz',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentMessageEntity.prototype, "processedAt", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AgentMessageEntity.prototype, "createdAt", void 0);
AgentMessageEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'agentMessage',
        schema: 'core'
    })
], AgentMessageEntity);

//# sourceMappingURL=agent-message.entity.js.map