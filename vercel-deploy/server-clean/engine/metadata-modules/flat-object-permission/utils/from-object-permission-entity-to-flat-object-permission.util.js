"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromObjectPermissionEntityToFlatObjectPermission", {
    enumerable: true,
    get: function() {
        return fromObjectPermissionEntityToFlatObjectPermission;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _getmetadataentityrelationpropertiesutil = require("../../flat-entity/utils/get-metadata-entity-relation-properties.util");
const fromObjectPermissionEntityToFlatObjectPermission = ({ entity: objectPermissionEntity, applicationIdToUniversalIdentifierMap, roleIdToUniversalIdentifierMap, objectMetadataIdToUniversalIdentifierMap })=>{
    const objectPermissionEntityWithoutRelations = (0, _utils.removePropertiesFromRecord)(objectPermissionEntity, (0, _getmetadataentityrelationpropertiesutil.getMetadataEntityRelationProperties)('objectPermission'));
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(objectPermissionEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${objectPermissionEntity.applicationId} not found for objectPermission ${objectPermissionEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const roleUniversalIdentifier = roleIdToUniversalIdentifierMap.get(objectPermissionEntity.roleId);
    if (!(0, _utils.isDefined)(roleUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Role with id ${objectPermissionEntity.roleId} not found for objectPermission ${objectPermissionEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const objectMetadataUniversalIdentifier = objectMetadataIdToUniversalIdentifierMap.get(objectPermissionEntity.objectMetadataId);
    if (!(0, _utils.isDefined)(objectMetadataUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`ObjectMetadata with id ${objectPermissionEntity.objectMetadataId} not found for objectPermission ${objectPermissionEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return {
        ...objectPermissionEntityWithoutRelations,
        createdAt: objectPermissionEntity.createdAt.toISOString(),
        updatedAt: objectPermissionEntity.updatedAt.toISOString(),
        universalIdentifier: objectPermissionEntityWithoutRelations.universalIdentifier,
        applicationUniversalIdentifier,
        roleUniversalIdentifier,
        objectMetadataUniversalIdentifier
    };
};

//# sourceMappingURL=from-object-permission-entity-to-flat-object-permission.util.js.map