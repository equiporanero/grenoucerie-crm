"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFieldMetadataEntityToFlatFieldMetadata", {
    enumerable: true,
    get: function() {
        return fromFieldMetadataEntityToFlatFieldMetadata;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _isfieldmetadatasettingsoftypeutil = require("../../field-metadata/utils/is-field-metadata-settings-of-type.util");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _getmetadataentityrelationpropertiesutil = require("../../flat-entity/utils/get-metadata-entity-relation-properties.util");
const fromFieldMetadataEntityToFlatFieldMetadata = ({ entity: fieldMetadataEntity, fieldMetadataIdToUniversalIdentifierMap, objectMetadataIdToUniversalIdentifierMap, applicationIdToUniversalIdentifierMap })=>{
    const fieldMetadataWithoutRelations = (0, _utils.removePropertiesFromRecord)(fieldMetadataEntity, (0, _getmetadataentityrelationpropertiesutil.getMetadataEntityRelationProperties)('fieldMetadata'));
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(fieldMetadataEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${fieldMetadataEntity.applicationId} not found when building flat field metadata for field ${fieldMetadataEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const objectMetadataUniversalIdentifier = objectMetadataIdToUniversalIdentifierMap.get(fieldMetadataEntity.objectMetadataId);
    if (!(0, _utils.isDefined)(objectMetadataUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Object metadata with id ${fieldMetadataEntity.objectMetadataId} not found when building flat field metadata for field ${fieldMetadataEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    let relationTargetObjectMetadataUniversalIdentifier = null;
    if ((0, _utils.isDefined)(fieldMetadataEntity.relationTargetObjectMetadataId)) {
        relationTargetObjectMetadataUniversalIdentifier = objectMetadataIdToUniversalIdentifierMap.get(fieldMetadataEntity.relationTargetObjectMetadataId) ?? null;
        if (!(0, _utils.isDefined)(relationTargetObjectMetadataUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`Relation target object metadata with id ${fieldMetadataEntity.relationTargetObjectMetadataId} not found when building flat field metadata for field ${fieldMetadataEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    let relationTargetFieldMetadataUniversalIdentifier = null;
    if ((0, _utils.isDefined)(fieldMetadataEntity.relationTargetFieldMetadataId)) {
        relationTargetFieldMetadataUniversalIdentifier = fieldMetadataIdToUniversalIdentifierMap.get(fieldMetadataEntity.relationTargetFieldMetadataId) ?? null;
        if (!(0, _utils.isDefined)(relationTargetFieldMetadataUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`Relation target field metadata with id ${fieldMetadataEntity.relationTargetFieldMetadataId} not found when building flat field metadata for field ${fieldMetadataEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    const settings = fieldMetadataEntity.settings;
    const isRelationSettings = (0, _isfieldmetadatasettingsoftypeutil.isFieldMetadataSettingsOfType)(settings, _types.FieldMetadataType.RELATION) || (0, _isfieldmetadatasettingsoftypeutil.isFieldMetadataSettingsOfType)(settings, _types.FieldMetadataType.MORPH_RELATION);
    const settingsWithUniversalIdentifiers = isRelationSettings ? {
        ...settings,
        ...(0, _utils.isDefined)(settings.junctionTargetFieldId) && {
            junctionTargetFieldUniversalIdentifier: fieldMetadataIdToUniversalIdentifierMap.get(settings.junctionTargetFieldId)
        }
    } : settings;
    return {
        ...fieldMetadataWithoutRelations,
        universalIdentifier: fieldMetadataWithoutRelations.universalIdentifier,
        createdAt: fieldMetadataWithoutRelations.createdAt.toISOString(),
        updatedAt: fieldMetadataWithoutRelations.updatedAt.toISOString(),
        kanbanAggregateOperationViewIds: fieldMetadataEntity.kanbanAggregateOperationViews.map(({ id })=>id),
        calendarViewIds: fieldMetadataEntity.calendarViews.map(({ id })=>id),
        mainGroupByFieldMetadataViewIds: fieldMetadataEntity.mainGroupByFieldMetadataViews?.map(({ id })=>id) ?? [],
        viewFieldIds: fieldMetadataEntity.viewFields.map(({ id })=>id),
        viewFilterIds: fieldMetadataEntity.viewFilters.map(({ id })=>id),
        fieldPermissionIds: fieldMetadataEntity.fieldPermissions?.map(({ id })=>id) ?? [],
        applicationUniversalIdentifier,
        objectMetadataUniversalIdentifier,
        relationTargetObjectMetadataUniversalIdentifier,
        relationTargetFieldMetadataUniversalIdentifier,
        viewFieldUniversalIdentifiers: fieldMetadataEntity.viewFields.map(({ universalIdentifier })=>universalIdentifier),
        viewFilterUniversalIdentifiers: fieldMetadataEntity.viewFilters.map(({ universalIdentifier })=>universalIdentifier),
        kanbanAggregateOperationViewUniversalIdentifiers: fieldMetadataEntity.kanbanAggregateOperationViews.map(({ universalIdentifier })=>universalIdentifier),
        calendarViewUniversalIdentifiers: fieldMetadataEntity.calendarViews.map(({ universalIdentifier })=>universalIdentifier),
        mainGroupByFieldMetadataViewUniversalIdentifiers: fieldMetadataEntity.mainGroupByFieldMetadataViews?.map(({ universalIdentifier })=>universalIdentifier) ?? [],
        viewSortIds: fieldMetadataEntity.viewSorts?.map(({ id })=>id) ?? [],
        viewSortUniversalIdentifiers: fieldMetadataEntity.viewSorts?.map(({ universalIdentifier })=>universalIdentifier) ?? [],
        fieldPermissionUniversalIdentifiers: fieldMetadataEntity.fieldPermissions?.map(({ universalIdentifier })=>universalIdentifier) ?? [],
        universalSettings: settingsWithUniversalIdentifiers
    };
};

//# sourceMappingURL=from-field-metadata-entity-to-flat-field-metadata.util.js.map