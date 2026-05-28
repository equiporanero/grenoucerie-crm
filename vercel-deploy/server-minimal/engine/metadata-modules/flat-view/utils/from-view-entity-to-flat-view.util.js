"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromViewEntityToFlatView", {
    enumerable: true,
    get: function() {
        return fromViewEntityToFlatView;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _getmetadataentityrelationpropertiesutil = require("../../flat-entity/utils/get-metadata-entity-relation-properties.util");
const fromViewEntityToFlatView = ({ entity: viewEntity, applicationIdToUniversalIdentifierMap, objectMetadataIdToUniversalIdentifierMap, fieldMetadataIdToUniversalIdentifierMap })=>{
    const viewEntityWithoutRelations = (0, _utils.removePropertiesFromRecord)(viewEntity, (0, _getmetadataentityrelationpropertiesutil.getMetadataEntityRelationProperties)('view'));
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(viewEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${viewEntity.applicationId} not found for view ${viewEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const objectMetadataUniversalIdentifier = objectMetadataIdToUniversalIdentifierMap.get(viewEntity.objectMetadataId);
    if (!(0, _utils.isDefined)(objectMetadataUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`ObjectMetadata with id ${viewEntity.objectMetadataId} not found for view ${viewEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    let kanbanAggregateOperationFieldMetadataUniversalIdentifier = null;
    if ((0, _utils.isDefined)(viewEntity.kanbanAggregateOperationFieldMetadataId)) {
        kanbanAggregateOperationFieldMetadataUniversalIdentifier = fieldMetadataIdToUniversalIdentifierMap.get(viewEntity.kanbanAggregateOperationFieldMetadataId) ?? null;
        if (!(0, _utils.isDefined)(kanbanAggregateOperationFieldMetadataUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`FieldMetadata with id ${viewEntity.kanbanAggregateOperationFieldMetadataId} not found for view ${viewEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    let calendarFieldMetadataUniversalIdentifier = null;
    if ((0, _utils.isDefined)(viewEntity.calendarFieldMetadataId)) {
        calendarFieldMetadataUniversalIdentifier = fieldMetadataIdToUniversalIdentifierMap.get(viewEntity.calendarFieldMetadataId) ?? null;
        if (!(0, _utils.isDefined)(calendarFieldMetadataUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`FieldMetadata with id ${viewEntity.calendarFieldMetadataId} not found for view ${viewEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    let mainGroupByFieldMetadataUniversalIdentifier = null;
    if ((0, _utils.isDefined)(viewEntity.mainGroupByFieldMetadataId)) {
        mainGroupByFieldMetadataUniversalIdentifier = fieldMetadataIdToUniversalIdentifierMap.get(viewEntity.mainGroupByFieldMetadataId) ?? null;
        if (!(0, _utils.isDefined)(mainGroupByFieldMetadataUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`FieldMetadata with id ${viewEntity.mainGroupByFieldMetadataId} not found for view ${viewEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    return {
        ...viewEntityWithoutRelations,
        createdAt: viewEntity.createdAt.toISOString(),
        updatedAt: viewEntity.updatedAt.toISOString(),
        deletedAt: viewEntity.deletedAt?.toISOString() ?? null,
        universalIdentifier: viewEntityWithoutRelations.universalIdentifier,
        viewFieldIds: viewEntity.viewFields.map(({ id })=>id),
        viewFieldGroupIds: viewEntity.viewFieldGroups?.map(({ id })=>id) ?? [],
        viewFilterIds: viewEntity.viewFilters.map(({ id })=>id),
        viewGroupIds: viewEntity.viewGroups.map(({ id })=>id),
        viewFilterGroupIds: viewEntity.viewFilterGroups?.map(({ id })=>id) ?? [],
        applicationUniversalIdentifier,
        objectMetadataUniversalIdentifier,
        kanbanAggregateOperationFieldMetadataUniversalIdentifier,
        calendarFieldMetadataUniversalIdentifier,
        mainGroupByFieldMetadataUniversalIdentifier,
        viewFieldUniversalIdentifiers: viewEntity.viewFields.map(({ universalIdentifier })=>universalIdentifier),
        viewFieldGroupUniversalIdentifiers: viewEntity.viewFieldGroups?.map(({ universalIdentifier })=>universalIdentifier) ?? [],
        viewFilterUniversalIdentifiers: viewEntity.viewFilters.map(({ universalIdentifier })=>universalIdentifier),
        viewGroupUniversalIdentifiers: viewEntity.viewGroups.map(({ universalIdentifier })=>universalIdentifier),
        viewFilterGroupUniversalIdentifiers: viewEntity.viewFilterGroups?.map(({ universalIdentifier })=>universalIdentifier) ?? [],
        viewSortIds: viewEntity.viewSorts?.map(({ id })=>id) ?? [],
        viewSortUniversalIdentifiers: viewEntity.viewSorts?.map(({ universalIdentifier })=>universalIdentifier) ?? []
    };
};

//# sourceMappingURL=from-view-entity-to-flat-view.util.js.map