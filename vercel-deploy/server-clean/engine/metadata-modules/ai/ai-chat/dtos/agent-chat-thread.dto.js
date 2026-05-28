"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentChatThreadDTO", {
    enumerable: true,
    get: function() {
        return AgentChatThreadDTO;
    }
});
const _graphql = require("@nestjs/graphql");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AgentChatThreadDTO = class AgentChatThreadDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.ID),
    _ts_metadata("design:type", String)
], AgentChatThreadDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], AgentChatThreadDTO.prototype, "title", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], AgentChatThreadDTO.prototype, "totalInputTokens", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], AgentChatThreadDTO.prototype, "totalOutputTokens", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentChatThreadDTO.prototype, "contextWindowTokens", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int),
    _ts_metadata("design:type", Number)
], AgentChatThreadDTO.prototype, "conversationSize", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Float),
    _ts_metadata("design:type", Number)
], AgentChatThreadDTO.prototype, "totalInputCredits", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Float),
    _ts_metadata("design:type", Number)
], AgentChatThreadDTO.prototype, "totalOutputCredits", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AgentChatThreadDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AgentChatThreadDTO.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentChatThreadDTO.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AgentChatThreadDTO.prototype, "lastMessageAt", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], AgentChatThreadDTO.prototype, "userWorkspaceId", void 0);
AgentChatThreadDTO = _ts_decorate([
    (0, _graphql.ObjectType)('AgentChatThread')
], AgentChatThreadDTO);

//# sourceMappingURL=agent-chat-thread.dto.js.map