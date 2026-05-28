"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromAgentManifestToUniversalFlatAgent", {
    enumerable: true,
    get: function() {
        return fromAgentManifestToUniversalFlatAgent;
    }
});
const _constants = require("twenty-shared/constants");
const fromAgentManifestToUniversalFlatAgent = ({ agentManifest, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: agentManifest.universalIdentifier,
        applicationUniversalIdentifier,
        name: agentManifest.name,
        label: agentManifest.label,
        icon: agentManifest.icon ?? null,
        description: agentManifest.description ?? null,
        prompt: agentManifest.prompt,
        modelId: agentManifest.modelId ?? _constants.AUTO_SELECT_SMART_MODEL_ID,
        responseFormat: {
            type: 'text'
        },
        modelConfiguration: null,
        evaluationInputs: [],
        isCustom: false,
        createdAt: now,
        updatedAt: now,
        deletedAt: null
    };
};

//# sourceMappingURL=from-agent-manifest-to-universal-flat-agent.util.js.map