"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromViewSortEntityToFlatViewSort", {
    enumerable: true,
    get: function() {
        return fromViewSortEntityToFlatViewSort;
    }
});
const _utils = require("twenty-shared/utils");
const _getmetadataentityrelationpropertiesutil = require("../../flat-entity/utils/get-metadata-entity-relation-properties.util");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const fromViewSortEntityToFlatViewSort = ({ entity: viewSortEntity, applicationIdToUniversalIdentifierMap, viewIdToUniversalIdentifierMap, fieldMetadataIdToUniversalIdentifierMap })=>{
    const viewSortEntityWithoutRelations = (0, _utils.removePropertiesFromRecord)(viewSortEntity, (0, _getmetadataentityrelationpropertiesutil.getMetadataEntityRelationProperties)('viewSort'));
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(viewSortEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${viewSortEntity.applicationId} not found for viewSort ${viewSortEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const viewUniversalIdentifier = viewIdToUniversalIdentifierMap.get(viewSortEntity.viewId);
    if (!(0, _utils.isDefined)(viewUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`View with id ${viewSortEntity.viewId} not found for viewSort ${viewSortEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const fieldMetadataUniversalIdentifier = fieldMetadataIdToUniversalIdentifierMap.get(viewSortEntity.fieldMetadataId);
    if (!(0, _utils.isDefined)(fieldMetadataUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Field metadata with id ${viewSortEntity.fieldMetadataId} not found for viewSort ${viewSortEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return {
        ...viewSortEntityWithoutRelations,
        createdAt: viewSortEntity.createdAt.toISOString(),
        updatedAt: viewSortEntity.updatedAt.toISOString(),
        deletedAt: viewSortEntity.deletedAt?.toISOString() ?? null,
        universalIdentifier: viewSortEntityWithoutRelations.universalIdentifier,
        applicationUniversalIdentifier,
        viewUniversalIdentifier,
        fieldMetadataUniversalIdentifier
    };
};

//# sourceMappingURL=from-view-sort-entity-to-flat-view-sort.util.js.map