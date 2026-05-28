"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatAgentWithRoleIdToAgentDto", {
    enumerable: true,
    get: function() {
        return fromFlatAgentWithRoleIdToAgentDto;
    }
});
const fromFlatAgentWithRoleIdToAgentDto = ({ applicationId, createdAt, description, evaluationInputs, icon, id, isCustom, label, modelConfiguration, modelId, name, prompt, responseFormat, updatedAt, workspaceId, roleId })=>({
        createdAt: new Date(createdAt),
        description: description ?? undefined,
        evaluationInputs,
        id,
        isCustom,
        label,
        modelConfiguration: modelConfiguration ?? undefined,
        modelId,
        name,
        prompt,
        responseFormat,
        updatedAt: new Date(updatedAt),
        workspaceId,
        applicationId: applicationId ?? undefined,
        icon: icon ?? undefined,
        roleId: roleId ?? undefined
    });

//# sourceMappingURL=from-agent-entity-to-agent-dto.util.js.map