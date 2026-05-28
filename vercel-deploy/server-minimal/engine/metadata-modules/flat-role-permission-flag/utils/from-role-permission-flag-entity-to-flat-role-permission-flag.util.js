"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromRolePermissionFlagEntityToFlatRolePermissionFlag", {
    enumerable: true,
    get: function() {
        return fromRolePermissionFlagEntityToFlatRolePermissionFlag;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _getmetadataentityrelationpropertiesutil = require("../../flat-entity/utils/get-metadata-entity-relation-properties.util");
const fromRolePermissionFlagEntityToFlatRolePermissionFlag = ({ entity: rolePermissionFlagEntity, applicationIdToUniversalIdentifierMap, permissionFlagIdToUniversalIdentifierMap, roleIdToUniversalIdentifierMap })=>{
    const rolePermissionFlagEntityWithoutRelations = (0, _utils.removePropertiesFromRecord)(rolePermissionFlagEntity, (0, _getmetadataentityrelationpropertiesutil.getMetadataEntityRelationProperties)('rolePermissionFlag'));
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(rolePermissionFlagEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${rolePermissionFlagEntity.applicationId} not found for rolePermissionFlag ${rolePermissionFlagEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const roleUniversalIdentifier = roleIdToUniversalIdentifierMap.get(rolePermissionFlagEntity.roleId);
    if (!(0, _utils.isDefined)(roleUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Role with id ${rolePermissionFlagEntity.roleId} not found for rolePermissionFlag ${rolePermissionFlagEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const permissionFlagUniversalIdentifier = permissionFlagIdToUniversalIdentifierMap.get(rolePermissionFlagEntity.permissionFlagId);
    if (!(0, _utils.isDefined)(permissionFlagUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`PermissionFlag with id ${rolePermissionFlagEntity.permissionFlagId} not found for rolePermissionFlag ${rolePermissionFlagEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return {
        ...rolePermissionFlagEntityWithoutRelations,
        createdAt: rolePermissionFlagEntity.createdAt.toISOString(),
        updatedAt: rolePermissionFlagEntity.updatedAt.toISOString(),
        universalIdentifier: rolePermissionFlagEntityWithoutRelations.universalIdentifier,
        applicationUniversalIdentifier,
        permissionFlagUniversalIdentifier,
        roleUniversalIdentifier
    };
};

//# sourceMappingURL=from-role-permission-flag-entity-to-flat-role-permission-flag.util.js.map