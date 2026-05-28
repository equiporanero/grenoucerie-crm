"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromPermissionFlagEntityToFlatPermissionFlag", {
    enumerable: true,
    get: function() {
        return fromPermissionFlagEntityToFlatPermissionFlag;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _getmetadataentityrelationpropertiesutil = require("../../flat-entity/utils/get-metadata-entity-relation-properties.util");
const fromPermissionFlagEntityToFlatPermissionFlag = ({ entity: permissionFlagEntity, applicationIdToUniversalIdentifierMap })=>{
    const entityWithoutRelations = (0, _utils.removePropertiesFromRecord)(permissionFlagEntity, (0, _getmetadataentityrelationpropertiesutil.getMetadataEntityRelationProperties)('permissionFlag'));
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(permissionFlagEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${permissionFlagEntity.applicationId} not found for permissionFlag ${permissionFlagEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return {
        ...entityWithoutRelations,
        createdAt: permissionFlagEntity.createdAt.toISOString(),
        updatedAt: permissionFlagEntity.updatedAt.toISOString(),
        universalIdentifier: entityWithoutRelations.universalIdentifier,
        applicationUniversalIdentifier,
        rolePermissionFlagIds: permissionFlagEntity.rolePermissionFlags.map(({ id })=>id),
        rolePermissionFlagUniversalIdentifiers: permissionFlagEntity.rolePermissionFlags.map(({ universalIdentifier })=>universalIdentifier)
    };
};

//# sourceMappingURL=from-permission-flag-entity-to-flat-permission-flag.util.js.map