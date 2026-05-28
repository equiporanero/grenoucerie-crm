"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdateAgentInputToFlatAgentToUpdate", {
    enumerable: true,
    get: function() {
        return fromUpdateAgentInputToFlatAgentToUpdate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _aiexception = require("../../ai.exception");
const _flatagenteditablepropertiesconstant = require("../../../flat-agent/constants/flat-agent-editable-properties.constant");
const _findflatentitybyidinflatentitymapsutil = require("../../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _computemetadatanamefromlabelorthrowutil = require("../../../utils/compute-metadata-name-from-label-or-throw.util");
const _mergeupdateinexistingrecordutil = require("../../../../../utils/merge-update-in-existing-record.util");
const computeAgentFlatRoleTargetToUpdate = ({ roleId, flatAgent, flatRoleTargetByAgentIdMaps, flatRoleMaps })=>{
    if (roleId === undefined) {
        return {};
    }
    const existingRoleTarget = flatRoleTargetByAgentIdMaps[flatAgent.id];
    const updatedAt = new Date().toISOString();
    if (roleId === null) {
        if ((0, _utils.isDefined)(existingRoleTarget)) {
            return {
                flatRoleTargetToDelete: existingRoleTarget
            };
        }
        return {};
    }
    const flatRole = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityMaps: flatRoleMaps,
        flatEntityId: roleId
    });
    if ((0, _utils.isDefined)(existingRoleTarget)) {
        return {
            flatRoleTargetToUpdate: {
                ...existingRoleTarget,
                roleId,
                roleUniversalIdentifier: flatRole.universalIdentifier,
                updatedAt
            }
        };
    }
    return {
        flatRoleTargetToCreate: {
            id: (0, _uuid.v4)(),
            roleId,
            roleUniversalIdentifier: flatRole.universalIdentifier,
            userWorkspaceId: null,
            agentId: flatAgent.id,
            apiKeyId: null,
            createdAt: updatedAt,
            updatedAt,
            universalIdentifier: (0, _uuid.v4)(),
            workspaceId: flatAgent.workspaceId,
            applicationId: flatAgent.applicationId,
            applicationUniversalIdentifier: flatAgent.applicationUniversalIdentifier
        }
    };
};
const fromUpdateAgentInputToFlatAgentToUpdate = ({ updateAgentInput: rawUpdateAgentInput, flatAgentMaps, flatRoleTargetByAgentIdMaps, flatRoleMaps })=>{
    const { id: agentIdToUpdate } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawUpdateAgentInput, [
        'id'
    ]);
    const existingFlatAgent = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: agentIdToUpdate,
        flatEntityMaps: flatAgentMaps
    });
    if (!(0, _utils.isDefined)(existingFlatAgent)) {
        throw new _aiexception.AiException('Agent not found', _aiexception.AiExceptionCode.AGENT_NOT_FOUND, {
            userFriendlyMessage: /*i18n*/ {
                id: "GekZDw",
                message: "The agent you are looking for could not be found. It may have been deleted or you may not have access to it."
            }
        });
    }
    const updatedEditableAgentProperties = (0, _utils.extractAndSanitizeObjectStringFields)(rawUpdateAgentInput, _flatagenteditablepropertiesconstant.FLAT_AGENT_EDITABLE_PROPERTIES);
    if ((0, _utils.isDefined)(updatedEditableAgentProperties.label) && !(0, _utils.isDefined)(updatedEditableAgentProperties.name)) {
        updatedEditableAgentProperties.name = (0, _computemetadatanamefromlabelorthrowutil.computeMetadataNameFromLabelOrThrow)(updatedEditableAgentProperties.label);
    }
    const flatAgentToUpdate = (0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
        existing: existingFlatAgent,
        properties: _flatagenteditablepropertiesconstant.FLAT_AGENT_EDITABLE_PROPERTIES,
        update: updatedEditableAgentProperties
    });
    const { flatRoleTargetToUpdate, flatRoleTargetToCreate, flatRoleTargetToDelete } = computeAgentFlatRoleTargetToUpdate({
        roleId: rawUpdateAgentInput.roleId,
        flatAgent: existingFlatAgent,
        flatRoleTargetByAgentIdMaps,
        flatRoleMaps
    });
    return {
        flatAgentToUpdate,
        flatRoleTargetToUpdate,
        flatRoleTargetToCreate,
        flatRoleTargetToDelete
    };
};

//# sourceMappingURL=from-update-agent-input-to-flat-agent-to-update.util.js.map