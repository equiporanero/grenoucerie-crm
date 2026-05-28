"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromViewFilterEntityToFlatViewFilter", {
    enumerable: true,
    get: function() {
        return fromViewFilterEntityToFlatViewFilter;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _getmetadataentityrelationpropertiesutil = require("../../flat-entity/utils/get-metadata-entity-relation-properties.util");
const fromViewFilterEntityToFlatViewFilter = ({ entity: viewFilterEntity, applicationIdToUniversalIdentifierMap, fieldMetadataIdToUniversalIdentifierMap, viewFilterGroupIdToUniversalIdentifierMap, viewIdToUniversalIdentifierMap })=>{
    const viewFilterEntityWithoutRelations = (0, _utils.removePropertiesFromRecord)(viewFilterEntity, (0, _getmetadataentityrelationpropertiesutil.getMetadataEntityRelationProperties)('viewFilter'));
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(viewFilterEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${viewFilterEntity.applicationId} not found for viewFilter ${viewFilterEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const fieldMetadataUniversalIdentifier = fieldMetadataIdToUniversalIdentifierMap.get(viewFilterEntity.fieldMetadataId);
    if (!(0, _utils.isDefined)(fieldMetadataUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`FieldMetadata with id ${viewFilterEntity.fieldMetadataId} not found for viewFilter ${viewFilterEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    let viewFilterGroupUniversalIdentifier = null;
    if ((0, _utils.isDefined)(viewFilterEntity.viewFilterGroupId)) {
        viewFilterGroupUniversalIdentifier = viewFilterGroupIdToUniversalIdentifierMap.get(viewFilterEntity.viewFilterGroupId) ?? null;
        if (!(0, _utils.isDefined)(viewFilterGroupUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`ViewFilterGroup with id ${viewFilterEntity.viewFilterGroupId} not found for viewFilter ${viewFilterEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    const viewUniversalIdentifier = viewIdToUniversalIdentifierMap.get(viewFilterEntity.viewId);
    if (!(0, _utils.isDefined)(viewUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`View with id ${viewFilterEntity.viewId} not found for viewFilter ${viewFilterEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    let relationTargetFieldMetadataUniversalIdentifier = null;
    if ((0, _utils.isDefined)(viewFilterEntity.relationTargetFieldMetadataId)) {
        relationTargetFieldMetadataUniversalIdentifier = fieldMetadataIdToUniversalIdentifierMap.get(viewFilterEntity.relationTargetFieldMetadataId) ?? null;
        if (!(0, _utils.isDefined)(relationTargetFieldMetadataUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`FieldMetadata with id ${viewFilterEntity.relationTargetFieldMetadataId} not found for viewFilter ${viewFilterEntity.id} (relation target)`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    return {
        ...viewFilterEntityWithoutRelations,
        createdAt: viewFilterEntity.createdAt.toISOString(),
        updatedAt: viewFilterEntity.updatedAt.toISOString(),
        deletedAt: viewFilterEntity.deletedAt?.toISOString() ?? null,
        universalIdentifier: viewFilterEntityWithoutRelations.universalIdentifier,
        applicationUniversalIdentifier,
        fieldMetadataUniversalIdentifier,
        relationTargetFieldMetadataUniversalIdentifier,
        viewFilterGroupUniversalIdentifier,
        viewUniversalIdentifier
    };
};

//# sourceMappingURL=from-view-filter-entity-to-flat-view-filter.util.js.map