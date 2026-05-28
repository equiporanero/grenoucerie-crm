"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _graphql = require("@nestjs/graphql");
const _agentmessageentity = require("../../../metadata-modules/ai/ai-agent-execution/entities/agent-message.entity");
(0, _graphql.registerEnumType)(_agentmessageentity.AgentMessageRole, {
    name: 'AgentMessageRole',
    description: 'Role of a message in a chat thread'
});

//# sourceMappingURL=agent-message-role.enum.js.map