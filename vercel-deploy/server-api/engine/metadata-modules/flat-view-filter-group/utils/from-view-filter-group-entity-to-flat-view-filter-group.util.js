"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromViewFilterGroupEntityToFlatViewFilterGroup", {
    enumerable: true,
    get: function() {
        return fromViewFilterGroupEntityToFlatViewFilterGroup;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _getmetadataentityrelationpropertiesutil = require("../../flat-entity/utils/get-metadata-entity-relation-properties.util");
const fromViewFilterGroupEntityToFlatViewFilterGroup = ({ entity: viewFilterGroupEntity, applicationIdToUniversalIdentifierMap, viewFilterGroupIdToUniversalIdentifierMap, viewIdToUniversalIdentifierMap })=>{
    const viewFilterGroupEntityWithoutRelations = (0, _utils.removePropertiesFromRecord)(viewFilterGroupEntity, (0, _getmetadataentityrelationpropertiesutil.getMetadataEntityRelationProperties)('viewFilterGroup'));
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(viewFilterGroupEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${viewFilterGroupEntity.applicationId} not found for viewFilterGroup ${viewFilterGroupEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    let parentViewFilterGroupUniversalIdentifier = null;
    if ((0, _utils.isDefined)(viewFilterGroupEntity.parentViewFilterGroupId)) {
        parentViewFilterGroupUniversalIdentifier = viewFilterGroupIdToUniversalIdentifierMap.get(viewFilterGroupEntity.parentViewFilterGroupId) ?? null;
        if (!(0, _utils.isDefined)(parentViewFilterGroupUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`ViewFilterGroup with id ${viewFilterGroupEntity.parentViewFilterGroupId} not found for viewFilterGroup ${viewFilterGroupEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    const viewUniversalIdentifier = viewIdToUniversalIdentifierMap.get(viewFilterGroupEntity.viewId);
    if (!(0, _utils.isDefined)(viewUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`View with id ${viewFilterGroupEntity.viewId} not found for viewFilterGroup ${viewFilterGroupEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return {
        ...viewFilterGroupEntityWithoutRelations,
        createdAt: viewFilterGroupEntity.createdAt.toISOString(),
        updatedAt: viewFilterGroupEntity.updatedAt.toISOString(),
        deletedAt: viewFilterGroupEntity.deletedAt?.toISOString() ?? null,
        universalIdentifier: viewFilterGroupEntityWithoutRelations.universalIdentifier,
        viewFilterIds: viewFilterGroupEntity.viewFilters?.map(({ id })=>id) ?? [],
        childViewFilterGroupIds: viewFilterGroupEntity.childViewFilterGroups?.map(({ id })=>id) ?? [],
        applicationUniversalIdentifier,
        parentViewFilterGroupUniversalIdentifier,
        viewUniversalIdentifier,
        viewFilterUniversalIdentifiers: viewFilterGroupEntity.viewFilters?.map(({ universalIdentifier })=>universalIdentifier) ?? [],
        childViewFilterGroupUniversalIdentifiers: viewFilterGroupEntity.childViewFilterGroups?.map(({ universalIdentifier })=>universalIdentifier) ?? []
    };
};

//# sourceMappingURL=from-view-filter-group-entity-to-flat-view-filter-group.util.js.map