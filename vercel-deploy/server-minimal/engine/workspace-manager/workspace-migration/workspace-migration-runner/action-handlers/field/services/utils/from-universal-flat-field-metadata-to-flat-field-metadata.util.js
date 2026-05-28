"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUniversalFlatFieldMetadataToFlatFieldMetadata", {
    enumerable: true,
    get: function() {
        return fromUniversalFlatFieldMetadataToFlatFieldMetadata;
    }
});
const _utils = require("twenty-shared/utils");
const _resetuniversalflatentityforeignkeyaggregatorsutil = require("../../../../../universal-flat-entity/utils/reset-universal-flat-entity-foreign-key-aggregators.util");
const _findfieldmetadataidincreatefieldcontextutil = require("./find-field-metadata-id-in-create-field-context.util");
const _fromuniversalsettingstoflatfieldmetadatasettingsutil = require("./from-universal-settings-to-flat-field-metadata-settings.util");
const fromUniversalFlatFieldMetadataToFlatFieldMetadata = ({ universalFlatFieldMetadata, allFieldIdToBeCreatedInActionByUniversalIdentifierMap, allFlatEntityMaps, objectMetadataId: optionalObjectMetadataId, context: { flatApplication: { id: applicationId }, workspaceId } })=>{
    const { universalIdentifier, applicationUniversalIdentifier, objectMetadataUniversalIdentifier, relationTargetFieldMetadataUniversalIdentifier, relationTargetObjectMetadataUniversalIdentifier, universalSettings, ...restProperties } = universalFlatFieldMetadata;
    const generatedId = allFieldIdToBeCreatedInActionByUniversalIdentifierMap.get(universalIdentifier);
    if (!(0, _utils.isDefined)(generatedId)) {
        throw new Error(`Generated ID not found for universal identifier: ${universalIdentifier}`);
    }
    const objectMetadataId = optionalObjectMetadataId ?? allFlatEntityMaps.flatObjectMetadataMaps.byUniversalIdentifier[objectMetadataUniversalIdentifier]?.id ?? null;
    if (!(0, _utils.isDefined)(objectMetadataId)) {
        throw new Error(`Object metadata not found for universal identifier: ${objectMetadataUniversalIdentifier}`);
    }
    let relationTargetFieldMetadataId = null;
    if ((0, _utils.isDefined)(relationTargetFieldMetadataUniversalIdentifier)) {
        relationTargetFieldMetadataId = (0, _findfieldmetadataidincreatefieldcontextutil.findFieldMetadataIdInCreateFieldContext)({
            universalIdentifier: relationTargetFieldMetadataUniversalIdentifier,
            allFieldIdToBeCreatedInActionByUniversalIdentifierMap,
            flatFieldMetadataMaps: allFlatEntityMaps.flatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(relationTargetFieldMetadataId)) {
            throw new Error(`Relation target field metadata not found for universal identifier: ${relationTargetFieldMetadataUniversalIdentifier}`);
        }
    }
    let relationTargetObjectMetadataId = null;
    if ((0, _utils.isDefined)(relationTargetObjectMetadataUniversalIdentifier)) {
        relationTargetObjectMetadataId = allFlatEntityMaps.flatObjectMetadataMaps.byUniversalIdentifier[relationTargetObjectMetadataUniversalIdentifier]?.id ?? null;
        if (!(0, _utils.isDefined)(relationTargetObjectMetadataId)) {
            throw new Error(`Relation target object metadata not found for universal identifier: ${relationTargetObjectMetadataUniversalIdentifier}`);
        }
    }
    const settings = (0, _fromuniversalsettingstoflatfieldmetadatasettingsutil.fromUniversalSettingsToFlatFieldMetadataSettings)({
        universalSettings,
        allFieldIdToBeCreatedInActionByUniversalIdentifierMap,
        flatFieldMetadataMaps: allFlatEntityMaps.flatFieldMetadataMaps
    });
    const emptyUniversalForeignKeyAggregators = (0, _resetuniversalflatentityforeignkeyaggregatorsutil.getUniversalFlatEntityEmptyForeignKeyAggregators)({
        metadataName: 'fieldMetadata'
    });
    return {
        ...restProperties,
        settings,
        universalSettings,
        id: generatedId,
        workspaceId,
        applicationId,
        universalIdentifier,
        objectMetadataId,
        objectMetadataUniversalIdentifier,
        relationTargetFieldMetadataId,
        relationTargetFieldMetadataUniversalIdentifier: relationTargetFieldMetadataUniversalIdentifier ?? null,
        relationTargetObjectMetadataId,
        relationTargetObjectMetadataUniversalIdentifier: relationTargetObjectMetadataUniversalIdentifier ?? null,
        applicationUniversalIdentifier,
        // Empty aggregator arrays for newly created entities
        viewFieldIds: [],
        viewFilterIds: [],
        fieldPermissionIds: [],
        calendarViewIds: [],
        mainGroupByFieldMetadataViewIds: [],
        kanbanAggregateOperationViewIds: [],
        viewSortIds: [],
        ...emptyUniversalForeignKeyAggregators
    };
};

//# sourceMappingURL=from-universal-flat-field-metadata-to-flat-field-metadata.util.js.map