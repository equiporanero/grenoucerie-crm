"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFieldPermissionEntityToFlatFieldPermission", {
    enumerable: true,
    get: function() {
        return fromFieldPermissionEntityToFlatFieldPermission;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _getmetadataentityrelationpropertiesutil = require("../../flat-entity/utils/get-metadata-entity-relation-properties.util");
const fromFieldPermissionEntityToFlatFieldPermission = ({ entity: fieldPermissionEntity, applicationIdToUniversalIdentifierMap, roleIdToUniversalIdentifierMap, objectMetadataIdToUniversalIdentifierMap, fieldMetadataIdToUniversalIdentifierMap })=>{
    const fieldPermissionEntityWithoutRelations = (0, _utils.removePropertiesFromRecord)(fieldPermissionEntity, (0, _getmetadataentityrelationpropertiesutil.getMetadataEntityRelationProperties)('fieldPermission'));
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(fieldPermissionEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${fieldPermissionEntity.applicationId} not found for fieldPermission ${fieldPermissionEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const roleUniversalIdentifier = roleIdToUniversalIdentifierMap.get(fieldPermissionEntity.roleId);
    if (!(0, _utils.isDefined)(roleUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Role with id ${fieldPermissionEntity.roleId} not found for fieldPermission ${fieldPermissionEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const objectMetadataUniversalIdentifier = objectMetadataIdToUniversalIdentifierMap.get(fieldPermissionEntity.objectMetadataId);
    if (!(0, _utils.isDefined)(objectMetadataUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`ObjectMetadata with id ${fieldPermissionEntity.objectMetadataId} not found for fieldPermission ${fieldPermissionEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const fieldMetadataUniversalIdentifier = fieldMetadataIdToUniversalIdentifierMap.get(fieldPermissionEntity.fieldMetadataId);
    if (!(0, _utils.isDefined)(fieldMetadataUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`FieldMetadata with id ${fieldPermissionEntity.fieldMetadataId} not found for fieldPermission ${fieldPermissionEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return {
        ...fieldPermissionEntityWithoutRelations,
        createdAt: fieldPermissionEntity.createdAt.toISOString(),
        updatedAt: fieldPermissionEntity.updatedAt.toISOString(),
        universalIdentifier: fieldPermissionEntityWithoutRelations.universalIdentifier,
        applicationUniversalIdentifier,
        roleUniversalIdentifier,
        objectMetadataUniversalIdentifier,
        fieldMetadataUniversalIdentifier
    };
};

//# sourceMappingURL=from-field-permission-entity-to-flat-field-permission.util.js.map