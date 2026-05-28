"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromViewGroupEntityToFlatViewGroup", {
    enumerable: true,
    get: function() {
        return fromViewGroupEntityToFlatViewGroup;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _getmetadataentityrelationpropertiesutil = require("../../flat-entity/utils/get-metadata-entity-relation-properties.util");
const fromViewGroupEntityToFlatViewGroup = ({ entity: viewGroupEntity, applicationIdToUniversalIdentifierMap, viewIdToUniversalIdentifierMap })=>{
    const viewGroupEntityWithoutRelations = (0, _utils.removePropertiesFromRecord)(viewGroupEntity, (0, _getmetadataentityrelationpropertiesutil.getMetadataEntityRelationProperties)('viewGroup'));
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(viewGroupEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${viewGroupEntity.applicationId} not found for viewGroup ${viewGroupEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const viewUniversalIdentifier = viewIdToUniversalIdentifierMap.get(viewGroupEntity.viewId);
    if (!(0, _utils.isDefined)(viewUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`View with id ${viewGroupEntity.viewId} not found for viewGroup ${viewGroupEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return {
        ...viewGroupEntityWithoutRelations,
        createdAt: viewGroupEntity.createdAt.toISOString(),
        updatedAt: viewGroupEntity.updatedAt.toISOString(),
        deletedAt: viewGroupEntity.deletedAt?.toISOString() ?? null,
        universalIdentifier: viewGroupEntityWithoutRelations.universalIdentifier,
        applicationUniversalIdentifier,
        viewUniversalIdentifier
    };
};

//# sourceMappingURL=from-view-group-entity-to-flat-view-group.util.js.map