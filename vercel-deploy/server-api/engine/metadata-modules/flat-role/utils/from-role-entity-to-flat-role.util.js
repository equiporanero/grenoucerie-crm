"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromRoleEntityToFlatRole", {
    enumerable: true,
    get: function() {
        return fromRoleEntityToFlatRole;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const fromRoleEntityToFlatRole = ({ entity: roleEntity, applicationIdToUniversalIdentifierMap })=>{
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(roleEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${roleEntity.applicationId} not found for role ${roleEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return {
        id: roleEntity.id,
        label: roleEntity.label,
        description: roleEntity.description,
        icon: roleEntity.icon,
        isEditable: roleEntity.isEditable,
        canUpdateAllSettings: roleEntity.canUpdateAllSettings,
        canAccessAllTools: roleEntity.canAccessAllTools,
        canReadAllObjectRecords: roleEntity.canReadAllObjectRecords,
        canUpdateAllObjectRecords: roleEntity.canUpdateAllObjectRecords,
        canSoftDeleteAllObjectRecords: roleEntity.canSoftDeleteAllObjectRecords,
        canDestroyAllObjectRecords: roleEntity.canDestroyAllObjectRecords,
        canBeAssignedToUsers: roleEntity.canBeAssignedToUsers,
        canBeAssignedToAgents: roleEntity.canBeAssignedToAgents,
        canBeAssignedToApiKeys: roleEntity.canBeAssignedToApiKeys,
        workspaceId: roleEntity.workspaceId,
        createdAt: roleEntity.createdAt.toISOString(),
        updatedAt: roleEntity.updatedAt.toISOString(),
        universalIdentifier: roleEntity.universalIdentifier,
        applicationId: roleEntity.applicationId,
        roleTargetIds: roleEntity.roleTargets.map(({ id })=>id),
        objectPermissionIds: roleEntity.objectPermissions.map(({ id })=>id),
        rolePermissionFlagIds: roleEntity.rolePermissionFlags.map(({ id })=>id),
        fieldPermissionIds: roleEntity.fieldPermissions.map(({ id })=>id),
        rowLevelPermissionPredicateIds: roleEntity.rowLevelPermissionPredicates.map(({ id })=>id),
        rowLevelPermissionPredicateGroupIds: roleEntity.rowLevelPermissionPredicateGroups.map(({ id })=>id),
        applicationUniversalIdentifier,
        roleTargetUniversalIdentifiers: roleEntity.roleTargets.map(({ universalIdentifier })=>universalIdentifier),
        objectPermissionUniversalIdentifiers: roleEntity.objectPermissions.map(({ universalIdentifier })=>universalIdentifier),
        rolePermissionFlagUniversalIdentifiers: roleEntity.rolePermissionFlags.map(({ universalIdentifier })=>universalIdentifier),
        fieldPermissionUniversalIdentifiers: roleEntity.fieldPermissions.map(({ universalIdentifier })=>universalIdentifier),
        rowLevelPermissionPredicateUniversalIdentifiers: roleEntity.rowLevelPermissionPredicates.map(({ universalIdentifier })=>universalIdentifier),
        rowLevelPermissionPredicateGroupUniversalIdentifiers: roleEntity.rowLevelPermissionPredicateGroups.map(({ universalIdentifier })=>universalIdentifier)
    };
};

//# sourceMappingURL=from-role-entity-to-flat-role.util.js.map