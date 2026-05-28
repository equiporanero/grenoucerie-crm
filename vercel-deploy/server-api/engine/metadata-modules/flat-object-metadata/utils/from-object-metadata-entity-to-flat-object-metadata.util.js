"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromObjectMetadataEntityToFlatObjectMetadata", {
    enumerable: true,
    get: function() {
        return fromObjectMetadataEntityToFlatObjectMetadata;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _getmetadataentityrelationpropertiesutil = require("../../flat-entity/utils/get-metadata-entity-relation-properties.util");
const fromObjectMetadataEntityToFlatObjectMetadata = ({ entity: objectMetadataEntity, applicationIdToUniversalIdentifierMap, fieldMetadataIdToUniversalIdentifierMap })=>{
    const objectMetadataEntityWithoutRelations = (0, _utils.removePropertiesFromRecord)(objectMetadataEntity, (0, _getmetadataentityrelationpropertiesutil.getMetadataEntityRelationProperties)('objectMetadata'));
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(objectMetadataEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${objectMetadataEntity.applicationId} not found when building flat object metadata for object ${objectMetadataEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    let labelIdentifierFieldMetadataUniversalIdentifier = null;
    if ((0, _utils.isDefined)(objectMetadataEntity.labelIdentifierFieldMetadataId)) {
        labelIdentifierFieldMetadataUniversalIdentifier = fieldMetadataIdToUniversalIdentifierMap.get(objectMetadataEntity.labelIdentifierFieldMetadataId) ?? null;
    // TODO uncomment once https://github.com/twentyhq/core-team-issues/issues/2172 has been resolved
    // if (!isDefined(labelIdentifierFieldMetadataUniversalIdentifier)) {
    //   throw new FlatEntityMapsException(
    //     `Label identifier field metadata with id ${objectMetadataEntity.labelIdentifierFieldMetadataId} not found when building flat object metadata for object ${objectMetadataEntity.id}`,
    //     FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND,
    //   );
    // }
    }
    let imageIdentifierFieldMetadataUniversalIdentifier = null;
    if ((0, _utils.isDefined)(objectMetadataEntity.imageIdentifierFieldMetadataId)) {
        imageIdentifierFieldMetadataUniversalIdentifier = fieldMetadataIdToUniversalIdentifierMap.get(objectMetadataEntity.imageIdentifierFieldMetadataId) ?? null;
    // TODO uncomment once https://github.com/twentyhq/core-team-issues/issues/2172 has been resolved
    // if (!isDefined(imageIdentifierFieldMetadataUniversalIdentifier)) {
    //   throw new FlatEntityMapsException(
    //     `Image identifier field metadata with id ${objectMetadataEntity.imageIdentifierFieldMetadataId} not found when building flat object metadata for object ${objectMetadataEntity.id}`,
    //     FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND,
    //   );
    // }
    }
    return {
        ...objectMetadataEntityWithoutRelations,
        universalIdentifier: objectMetadataEntityWithoutRelations.universalIdentifier,
        createdAt: objectMetadataEntity.createdAt.toISOString(),
        updatedAt: objectMetadataEntity.updatedAt.toISOString(),
        viewIds: objectMetadataEntity.views.map(({ id })=>id),
        indexMetadataIds: objectMetadataEntity.indexMetadatas.map(({ id })=>id),
        fieldIds: objectMetadataEntity.fields.map(({ id })=>id),
        objectPermissionIds: objectMetadataEntity.objectPermissions.map(({ id })=>id),
        fieldPermissionIds: objectMetadataEntity.fieldPermissions?.map(({ id })=>id) ?? [],
        applicationUniversalIdentifier,
        labelIdentifierFieldMetadataUniversalIdentifier,
        imageIdentifierFieldMetadataUniversalIdentifier,
        fieldUniversalIdentifiers: objectMetadataEntity.fields.map(({ universalIdentifier })=>universalIdentifier),
        indexMetadataUniversalIdentifiers: objectMetadataEntity.indexMetadatas.map(({ universalIdentifier })=>universalIdentifier),
        viewUniversalIdentifiers: objectMetadataEntity.views.map(({ universalIdentifier })=>universalIdentifier),
        objectPermissionUniversalIdentifiers: objectMetadataEntity.objectPermissions.map(({ universalIdentifier })=>universalIdentifier),
        fieldPermissionUniversalIdentifiers: objectMetadataEntity.fieldPermissions?.map(({ universalIdentifier })=>universalIdentifier) ?? []
    };
};

//# sourceMappingURL=from-object-metadata-entity-to-flat-object-metadata.util.js.map