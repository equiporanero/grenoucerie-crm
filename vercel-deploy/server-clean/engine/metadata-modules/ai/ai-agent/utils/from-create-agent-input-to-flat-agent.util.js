"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateAgentInputToFlatAgent", {
    enumerable: true,
    get: function() {
        return fromCreateAgentInputToFlatAgent;
    }
});
const _guards = require("@sniptt/guards");
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _resolveentityrelationuniversalidentifiersutil = require("../../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const fromCreateAgentInputToFlatAgent = ({ createAgentInput: rawCreateAgentInput, workspaceId, flatApplication, flatRoleMaps })=>{
    const { roleId, ...createAgentInput } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawCreateAgentInput, [
        'name',
        'label',
        'icon',
        'description',
        'prompt',
        'modelId',
        'roleId'
    ]);
    const createdAt = new Date().toISOString();
    const agentId = (0, _uuid.v4)();
    const flatAgentToCreate = {
        id: agentId,
        name: (0, _guards.isNonEmptyString)(createAgentInput.name) ? createAgentInput.name : (0, _metadata.computeMetadataNameFromLabel)({
            label: createAgentInput.label
        }),
        label: createAgentInput.label,
        icon: createAgentInput.icon ?? null,
        description: createAgentInput.description ?? null,
        prompt: createAgentInput.prompt,
        modelId: createAgentInput.modelId,
        responseFormat: createAgentInput.responseFormat ?? {
            type: 'text'
        },
        workspaceId,
        isCustom: true,
        universalIdentifier: (0, _uuid.v4)(),
        applicationId: flatApplication.id,
        applicationUniversalIdentifier: flatApplication.universalIdentifier,
        modelConfiguration: createAgentInput.modelConfiguration ?? null,
        evaluationInputs: createAgentInput.evaluationInputs ?? [],
        createdAt,
        updatedAt: createdAt,
        deletedAt: null
    };
    let flatRoleTargetToCreate = null;
    if ((0, _utils.isDefined)(roleId)) {
        const { roleUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
            metadataName: 'roleTarget',
            foreignKeyValues: {
                roleId
            },
            flatEntityMaps: {
                flatRoleMaps
            }
        });
        flatRoleTargetToCreate = {
            id: (0, _uuid.v4)(),
            roleId,
            roleUniversalIdentifier,
            userWorkspaceId: null,
            agentId,
            apiKeyId: null,
            createdAt,
            updatedAt: createdAt,
            universalIdentifier: (0, _uuid.v4)(),
            workspaceId,
            applicationId: flatApplication.id,
            applicationUniversalIdentifier: flatApplication.universalIdentifier
        };
    }
    return {
        flatAgentToCreate,
        flatRoleTargetToCreate
    };
};

//# sourceMappingURL=from-create-agent-input-to-flat-agent.util.js.map