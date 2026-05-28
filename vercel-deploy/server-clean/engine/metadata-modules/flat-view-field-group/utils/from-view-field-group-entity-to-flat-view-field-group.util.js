"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromViewFieldGroupEntityToFlatViewFieldGroup", {
    enumerable: true,
    get: function() {
        return fromViewFieldGroupEntityToFlatViewFieldGroup;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _getmetadataentityrelationpropertiesutil = require("../../flat-entity/utils/get-metadata-entity-relation-properties.util");
const fromViewFieldGroupEntityToFlatViewFieldGroup = ({ entity: viewFieldGroupEntity, applicationIdToUniversalIdentifierMap, viewIdToUniversalIdentifierMap })=>{
    const viewFieldGroupEntityWithoutRelations = (0, _utils.removePropertiesFromRecord)(viewFieldGroupEntity, (0, _getmetadataentityrelationpropertiesutil.getMetadataEntityRelationProperties)('viewFieldGroup'));
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(viewFieldGroupEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${viewFieldGroupEntity.applicationId} not found for viewFieldGroup ${viewFieldGroupEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const viewUniversalIdentifier = viewIdToUniversalIdentifierMap.get(viewFieldGroupEntity.viewId);
    if (!(0, _utils.isDefined)(viewUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`View with id ${viewFieldGroupEntity.viewId} not found for viewFieldGroup ${viewFieldGroupEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return {
        ...viewFieldGroupEntityWithoutRelations,
        createdAt: viewFieldGroupEntity.createdAt.toISOString(),
        updatedAt: viewFieldGroupEntity.updatedAt.toISOString(),
        deletedAt: viewFieldGroupEntity.deletedAt?.toISOString() ?? null,
        universalIdentifier: viewFieldGroupEntityWithoutRelations.universalIdentifier,
        applicationUniversalIdentifier,
        viewUniversalIdentifier,
        viewFieldIds: viewFieldGroupEntity.viewFields?.map((viewField)=>viewField.id) ?? [],
        viewFieldUniversalIdentifiers: viewFieldGroupEntity.viewFields?.map((viewField)=>viewField.universalIdentifier) ?? []
    };
};

//# sourceMappingURL=from-view-field-group-entity-to-flat-view-field-group.util.js.map