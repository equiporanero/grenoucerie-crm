"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateAgentNameUniqueness", {
    enumerable: true,
    get: function() {
        return validateAgentNameUniqueness;
    }
});
const _core = require("@lingui/core");
const _aiexception = require("../../../../../metadata-modules/ai/ai.exception");
const validateAgentNameUniqueness = ({ name, existingFlatAgents })=>{
    const errors = [];
    if (existingFlatAgents.some((agent)=>agent.name === name)) {
        errors.push({
            code: _aiexception.AiExceptionCode.AGENT_ALREADY_EXISTS,
            message: _core.i18n._(/*i18n*/ {
                id: "EisfDV",
                message: 'Agent with name "{name}" already exists',
                values: {
                    name: name
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "pZEIPj",
                message: "An agent with this name already exists"
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-agent-name-uniqueness.util.js.map