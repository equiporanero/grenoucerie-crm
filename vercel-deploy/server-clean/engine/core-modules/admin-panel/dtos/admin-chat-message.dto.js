"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminChatMessageDTO", {
    enumerable: true,
    get: function() {
        return AdminChatMessageDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _adminchatmessagepartdto = require("./admin-chat-message-part.dto");
const _agentmessageentity = require("../../../metadata-modules/ai/ai-agent-execution/entities/agent-message.entity");
require("../enums/agent-message-role.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AdminChatMessageDTO = class AdminChatMessageDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], AdminChatMessageDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_agentmessageentity.AgentMessageRole),
    _ts_metadata("design:type", typeof _agentmessageentity.AgentMessageRole === "undefined" ? Object : _agentmessageentity.AgentMessageRole)
], AdminChatMessageDTO.prototype, "role", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _adminchatmessagepartdto.AdminChatMessagePartDTO
        ]),
    _ts_metadata("design:type", Array)
], AdminChatMessageDTO.prototype, "parts", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AdminChatMessageDTO.prototype, "createdAt", void 0);
AdminChatMessageDTO = _ts_decorate([
    (0, _graphql.ObjectType)('AdminChatMessage')
], AdminChatMessageDTO);

//# sourceMappingURL=admin-chat-message.dto.js.map