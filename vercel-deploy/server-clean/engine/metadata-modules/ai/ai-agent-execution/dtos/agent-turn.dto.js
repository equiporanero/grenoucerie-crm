"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentTurnDTO", {
    enumerable: true,
    get: function() {
        return AgentTurnDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _agentmessagedto = require("./agent-message.dto");
const _agentturnevaluationdto = require("../../ai-agent-monitor/dtos/agent-turn-evaluation.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AgentTurnDTO = class AgentTurnDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], AgentTurnDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], AgentTurnDTO.prototype, "threadId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentTurnDTO.prototype, "agentId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _agentturnevaluationdto.AgentTurnEvaluationDTO
        ]),
    _ts_metadata("design:type", Array)
], AgentTurnDTO.prototype, "evaluations", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _agentmessagedto.AgentMessageDTO
        ]),
    _ts_metadata("design:type", Array)
], AgentTurnDTO.prototype, "messages", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AgentTurnDTO.prototype, "createdAt", void 0);
AgentTurnDTO = _ts_decorate([
    (0, _graphql.ObjectType)('AgentTurn')
], AgentTurnDTO);

//# sourceMappingURL=agent-turn.dto.js.map