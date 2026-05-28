"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromRoleTargetEntityToFlatRoleTarget", {
    enumerable: true,
    get: function() {
        return fromRoleTargetEntityToFlatRoleTarget;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const fromRoleTargetEntityToFlatRoleTarget = ({ entity: roleTargetEntity, applicationIdToUniversalIdentifierMap, roleIdToUniversalIdentifierMap })=>{
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(roleTargetEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${roleTargetEntity.applicationId} not found when building flat role target for role target ${roleTargetEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const roleUniversalIdentifier = roleIdToUniversalIdentifierMap.get(roleTargetEntity.roleId);
    if (!(0, _utils.isDefined)(roleUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Role with id ${roleTargetEntity.roleId} not found when building flat role target for role target ${roleTargetEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return {
        id: roleTargetEntity.id,
        workspaceId: roleTargetEntity.workspaceId,
        roleId: roleTargetEntity.roleId,
        userWorkspaceId: roleTargetEntity.userWorkspaceId,
        agentId: roleTargetEntity.agentId,
        apiKeyId: roleTargetEntity.apiKeyId,
        applicationId: roleTargetEntity.applicationId,
        universalIdentifier: roleTargetEntity.universalIdentifier,
        createdAt: roleTargetEntity.createdAt.toISOString(),
        updatedAt: roleTargetEntity.updatedAt.toISOString(),
        applicationUniversalIdentifier,
        roleUniversalIdentifier
    };
};

//# sourceMappingURL=from-role-target-entity-to-flat-role-target.util.js.map