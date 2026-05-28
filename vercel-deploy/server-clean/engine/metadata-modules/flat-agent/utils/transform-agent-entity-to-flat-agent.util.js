"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformAgentEntityToFlatAgent", {
    enumerable: true,
    get: function() {
        return transformAgentEntityToFlatAgent;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const transformAgentEntityToFlatAgent = ({ entity: agentEntity, applicationIdToUniversalIdentifierMap })=>{
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(agentEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${agentEntity.applicationId} not found for agent ${agentEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return {
        createdAt: agentEntity.createdAt.toISOString(),
        deletedAt: agentEntity.deletedAt?.toISOString() ?? null,
        updatedAt: agentEntity.updatedAt.toISOString(),
        id: agentEntity.id,
        name: agentEntity.name,
        label: agentEntity.label,
        icon: agentEntity.icon,
        description: agentEntity.description,
        prompt: agentEntity.prompt,
        modelId: agentEntity.modelId,
        responseFormat: agentEntity.responseFormat,
        workspaceId: agentEntity.workspaceId,
        isCustom: agentEntity.isCustom,
        universalIdentifier: agentEntity.universalIdentifier,
        applicationId: agentEntity.applicationId,
        modelConfiguration: agentEntity.modelConfiguration,
        evaluationInputs: agentEntity.evaluationInputs,
        applicationUniversalIdentifier
    };
};

//# sourceMappingURL=transform-agent-entity-to-flat-agent.util.js.map