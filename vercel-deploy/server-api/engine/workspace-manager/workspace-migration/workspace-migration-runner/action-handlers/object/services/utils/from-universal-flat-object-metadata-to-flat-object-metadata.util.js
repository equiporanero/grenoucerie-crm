"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUniversalFlatObjectMetadataToFlatObjectMetadata", {
    enumerable: true,
    get: function() {
        return fromUniversalFlatObjectMetadataToFlatObjectMetadata;
    }
});
const _utils = require("twenty-shared/utils");
const _resetuniversalflatentityforeignkeyaggregatorsutil = require("../../../../../universal-flat-entity/utils/reset-universal-flat-entity-foreign-key-aggregators.util");
const findFieldMetadataIdInCreateObjectContext = ({ universalIdentifier, allFieldIdToBeCreatedInActionByUniversalIdentifierMap, flatFieldMetadataMaps })=>{
    const generatedId = allFieldIdToBeCreatedInActionByUniversalIdentifierMap.get(universalIdentifier);
    if ((0, _utils.isDefined)(generatedId)) {
        return generatedId;
    }
    const existingField = flatFieldMetadataMaps.byUniversalIdentifier[universalIdentifier];
    return existingField?.id ?? null;
};
const fromUniversalFlatObjectMetadataToFlatObjectMetadata = ({ universalFlatObjectMetadata, generatedId, allFlatEntityMaps, allFieldIdToBeCreatedInActionByUniversalIdentifierMap, context: { flatApplication: { id: applicationId }, workspaceId } })=>{
    const { universalIdentifier, applicationUniversalIdentifier, labelIdentifierFieldMetadataUniversalIdentifier, imageIdentifierFieldMetadataUniversalIdentifier, ...restProperties } = universalFlatObjectMetadata;
    let labelIdentifierFieldMetadataId = null;
    if ((0, _utils.isDefined)(labelIdentifierFieldMetadataUniversalIdentifier)) {
        labelIdentifierFieldMetadataId = findFieldMetadataIdInCreateObjectContext({
            universalIdentifier: labelIdentifierFieldMetadataUniversalIdentifier,
            allFieldIdToBeCreatedInActionByUniversalIdentifierMap,
            flatFieldMetadataMaps: allFlatEntityMaps.flatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(labelIdentifierFieldMetadataId)) {
            throw new Error(`Label identifier field metadata not found for universal identifier: ${labelIdentifierFieldMetadataUniversalIdentifier}`);
        }
    }
    let imageIdentifierFieldMetadataId = null;
    if ((0, _utils.isDefined)(imageIdentifierFieldMetadataUniversalIdentifier)) {
        imageIdentifierFieldMetadataId = findFieldMetadataIdInCreateObjectContext({
            universalIdentifier: imageIdentifierFieldMetadataUniversalIdentifier,
            allFieldIdToBeCreatedInActionByUniversalIdentifierMap,
            flatFieldMetadataMaps: allFlatEntityMaps.flatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(imageIdentifierFieldMetadataId)) {
            throw new Error(`Image identifier field metadata not found for universal identifier: ${imageIdentifierFieldMetadataUniversalIdentifier}`);
        }
    }
    const emptyUniversalForeignKeyAggregators = (0, _resetuniversalflatentityforeignkeyaggregatorsutil.getUniversalFlatEntityEmptyForeignKeyAggregators)({
        metadataName: 'objectMetadata'
    });
    return {
        ...restProperties,
        id: generatedId,
        workspaceId,
        applicationId,
        universalIdentifier,
        applicationUniversalIdentifier,
        labelIdentifierFieldMetadataId,
        labelIdentifierFieldMetadataUniversalIdentifier,
        targetTableName: 'DEPRECATED',
        imageIdentifierFieldMetadataId,
        imageIdentifierFieldMetadataUniversalIdentifier,
        // Empty aggregator arrays for newly created entities
        fieldIds: [],
        viewIds: [],
        indexMetadataIds: [],
        objectPermissionIds: [],
        fieldPermissionIds: [],
        ...emptyUniversalForeignKeyAggregators
    };
};

//# sourceMappingURL=from-universal-flat-object-metadata-to-flat-object-metadata.util.js.map