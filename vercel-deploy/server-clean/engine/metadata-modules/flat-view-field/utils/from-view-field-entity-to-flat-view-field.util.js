"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromViewFieldEntityToFlatViewField", {
    enumerable: true,
    get: function() {
        return fromViewFieldEntityToFlatViewField;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _getmetadataentityrelationpropertiesutil = require("../../flat-entity/utils/get-metadata-entity-relation-properties.util");
const _fromviewfieldoverridestouniversaloverridesutil = require("./from-view-field-overrides-to-universal-overrides.util");
const fromViewFieldEntityToFlatViewField = ({ entity: viewFieldEntity, applicationIdToUniversalIdentifierMap, fieldMetadataIdToUniversalIdentifierMap, viewIdToUniversalIdentifierMap, viewFieldGroupIdToUniversalIdentifierMap })=>{
    const viewFieldEntityWithoutRelations = (0, _utils.removePropertiesFromRecord)(viewFieldEntity, (0, _getmetadataentityrelationpropertiesutil.getMetadataEntityRelationProperties)('viewField'));
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(viewFieldEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${viewFieldEntity.applicationId} not found for viewField ${viewFieldEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const fieldMetadataUniversalIdentifier = fieldMetadataIdToUniversalIdentifierMap.get(viewFieldEntity.fieldMetadataId);
    if (!(0, _utils.isDefined)(fieldMetadataUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`FieldMetadata with id ${viewFieldEntity.fieldMetadataId} not found for viewField ${viewFieldEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const viewUniversalIdentifier = viewIdToUniversalIdentifierMap.get(viewFieldEntity.viewId);
    if (!(0, _utils.isDefined)(viewUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`View with id ${viewFieldEntity.viewId} not found for viewField ${viewFieldEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    let viewFieldGroupUniversalIdentifier = null;
    if ((0, _utils.isDefined)(viewFieldEntity.viewFieldGroupId)) {
        viewFieldGroupUniversalIdentifier = viewFieldGroupIdToUniversalIdentifierMap.get(viewFieldEntity.viewFieldGroupId) ?? null;
        if (!(0, _utils.isDefined)(viewFieldGroupUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`ViewFieldGroup with id ${viewFieldEntity.viewFieldGroupId} not found for viewField ${viewFieldEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    const viewFieldGroupUniversalIdentifierById = Object.fromEntries(viewFieldGroupIdToUniversalIdentifierMap.entries());
    const universalOverrides = (0, _utils.isDefined)(viewFieldEntity.overrides) ? (0, _fromviewfieldoverridestouniversaloverridesutil.fromViewFieldOverridesToUniversalOverrides)({
        overrides: viewFieldEntity.overrides,
        viewFieldGroupUniversalIdentifierById,
        shouldThrowOnMissingIdentifier: false
    }) : null;
    return {
        ...viewFieldEntityWithoutRelations,
        createdAt: viewFieldEntity.createdAt.toISOString(),
        updatedAt: viewFieldEntity.updatedAt.toISOString(),
        deletedAt: viewFieldEntity.deletedAt?.toISOString() ?? null,
        universalIdentifier: viewFieldEntityWithoutRelations.universalIdentifier,
        applicationUniversalIdentifier,
        fieldMetadataUniversalIdentifier,
        viewUniversalIdentifier,
        viewFieldGroupUniversalIdentifier,
        universalOverrides
    };
};

//# sourceMappingURL=from-view-field-entity-to-flat-view-field.util.js.map