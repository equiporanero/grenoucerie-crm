"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentTurnEntity", {
    enumerable: true,
    get: function() {
        return AgentTurnEntity;
    }
});
const _typeorm = require("typeorm");
const _agentmessageentity = require("./agent-message.entity");
const _agentturnevaluationentity = require("../../ai-agent-monitor/entities/agent-turn-evaluation.entity");
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
let AgentTurnEntity = class AgentTurnEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], AgentTurnEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    (0, _typeorm.Index)(),
    _ts_metadata("design:type", String)
], AgentTurnEntity.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)('WorkspaceEntity', {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'workspaceId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], AgentTurnEntity.prototype, "workspace", void 0);
_ts_decorate([
    (0, _typeorm.Column)('uuid'),
    (0, _typeorm.Index)(),
    _ts_metadata("design:type", String)
], AgentTurnEntity.prototype, "threadId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_agentchatthreadentity.AgentChatThreadEntity, (thread)=>thread.turns, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'threadId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], AgentTurnEntity.prototype, "thread", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'uuid',
        nullable: true
    }),
    (0, _typeorm.Index)(),
    _ts_metadata("design:type", Object)
], AgentTurnEntity.prototype, "agentId", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_agentmessageentity.AgentMessageEntity, (message)=>message.turn),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], AgentTurnEntity.prototype, "messages", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_agentturnevaluationentity.AgentTurnEvaluationEntity, (evaluation)=>evaluation.turn),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], AgentTurnEntity.prototype, "evaluations", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AgentTurnEntity.prototype, "createdAt", void 0);
AgentTurnEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'agentTurn',
        schema: 'core'
    })
], AgentTurnEntity);

//# sourceMappingURL=agent-turn.entity.js.map