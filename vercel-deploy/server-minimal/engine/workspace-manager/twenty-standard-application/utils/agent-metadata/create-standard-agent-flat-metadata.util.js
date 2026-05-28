"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createStandardAgentFlatMetadata", {
    enumerable: true,
    get: function() {
        return createStandardAgentFlatMetadata;
    }
});
const _uuid = require("uuid");
const _twentystandardapplications = require("../../constants/twenty-standard-applications");
const _standardagentconstant = require("../../constants/standard-agent.constant");
const createStandardAgentFlatMetadata = ({ context: { agentName, name, label, icon, description, prompt, modelId, responseFormat, isCustom, modelConfiguration, evaluationInputs }, workspaceId, twentyStandardApplicationId, now })=>{
    const universalIdentifier = _standardagentconstant.STANDARD_AGENT[agentName].universalIdentifier;
    return {
        id: (0, _uuid.v4)(),
        universalIdentifier,
        name,
        label,
        icon,
        description,
        prompt,
        modelId,
        responseFormat,
        isCustom,
        modelConfiguration,
        evaluationInputs,
        workspaceId,
        applicationId: twentyStandardApplicationId,
        applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier,
        createdAt: now,
        updatedAt: now,
        deletedAt: null
    };
};

//# sourceMappingURL=create-standard-agent-flat-metadata.util.js.map