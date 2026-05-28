"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentTurnEvaluationEntity", {
    enumerable: true,
    get: function() {
        return AgentTurnEvaluationEntity;
    }
});
const _typeorm = require("typeorm");
const _agentturnentity = require("../../ai-agent-execution/entities/agent-turn.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AgentTurnEvaluationEntity = class AgentTurnEvaluationEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], AgentTurnEvaluationEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'uuid'
    }),
    (0, _typeorm.Index)(),
    _ts_metadata("design:type", String)
], AgentTurnEvaluationEntity.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)('WorkspaceEntity', {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'workspaceId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], AgentTurnEvaluationEntity.prototype, "workspace", void 0);
_ts_decorate([
    (0, _typeorm.Column)('uuid'),
    (0, _typeorm.Index)(),
    _ts_metadata("design:type", String)
], AgentTurnEvaluationEntity.prototype, "turnId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_agentturnentity.AgentTurnEntity, {
        onDelete: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        name: 'turnId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], AgentTurnEvaluationEntity.prototype, "turn", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'int'
    }),
    _ts_metadata("design:type", Number)
], AgentTurnEvaluationEntity.prototype, "score", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'text',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentTurnEvaluationEntity.prototype, "comment", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AgentTurnEvaluationEntity.prototype, "createdAt", void 0);
AgentTurnEvaluationEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'agentTurnEvaluation',
        schema: 'core'
    })
], AgentTurnEvaluationEntity);

//# sourceMappingURL=agent-turn-evaluation.entity.js.map