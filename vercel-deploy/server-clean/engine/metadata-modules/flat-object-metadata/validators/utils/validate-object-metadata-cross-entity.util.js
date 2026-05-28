"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateObjectMetadataCrossEntity", {
    enumerable: true,
    get: function() {
        return validateObjectMetadataCrossEntity;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _findmanyflatentitybyuniversalidentifierinuniversalflatentitymapsorthrowutil = require("../../../flat-entity/utils/find-many-flat-entity-by-universal-identifier-in-universal-flat-entity-maps-or-throw.util");
const _validateflatobjectmetadataidentifiersutil = require("./validate-flat-object-metadata-identifiers.util");
const _validateobjectmetadatasystemfieldsintegrityutil = require("./validate-object-metadata-system-fields-integrity.util");
const _getflatentityvalidationerrorutil = require("../../../../workspace-manager/workspace-migration/workspace-migration-builder/builders/utils/get-flat-entity-validation-error.util");
const validateObjectMetadataCrossEntity = ({ optimisticUniversalFlatMaps, orchestratorActionsReport })=>{
    const metadataValidationErrors = {
        objectMetadata: []
    };
    const createdObjectMetadatas = (0, _findmanyflatentitybyuniversalidentifierinuniversalflatentitymapsorthrowutil.findManyFlatEntityByUniversalIdentifierInUniversalFlatEntityMapsOrThrow)({
        universalIdentifiers: orchestratorActionsReport.objectMetadata.create.map((createObjectAction)=>createObjectAction.flatEntity.universalIdentifier),
        flatEntityMaps: optimisticUniversalFlatMaps.flatObjectMetadataMaps
    });
    for (const universalFlatObjectMetadata of createdObjectMetadatas){
        const createFailedFlatEntityValidations = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: universalFlatObjectMetadata.universalIdentifier,
                namePlural: universalFlatObjectMetadata.namePlural,
                nameSingular: universalFlatObjectMetadata.nameSingular
            },
            metadataName: 'objectMetadata',
            type: 'create'
        });
        createFailedFlatEntityValidations.errors.push(...(0, _validateobjectmetadatasystemfieldsintegrityutil.validateObjectMetadataSystemFieldsIntegrity)({
            universalFlatFieldMetadataMaps: optimisticUniversalFlatMaps.flatFieldMetadataMaps,
            universalFlatObjectMetadata
        }));
        createFailedFlatEntityValidations.errors.push(...(0, _validateflatobjectmetadataidentifiersutil.validateFlatObjectMetadataIdentifiers)({
            universalFlatObjectMetadata,
            universalFlatFieldMetadataMaps: optimisticUniversalFlatMaps.flatFieldMetadataMaps
        }));
        if (createFailedFlatEntityValidations.errors.length > 0) {
            metadataValidationErrors.objectMetadata.push(createFailedFlatEntityValidations);
        }
    }
    for (const objectMetadataUpdate of orchestratorActionsReport.objectMetadata.update){
        const updatedFlatObjectMetadata = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            flatEntityMaps: optimisticUniversalFlatMaps.flatObjectMetadataMaps,
            universalIdentifier: objectMetadataUpdate.universalIdentifier
        });
        const updateFailedFlatEntityValidations = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: updatedFlatObjectMetadata.universalIdentifier,
                namePlural: updatedFlatObjectMetadata.namePlural,
                nameSingular: updatedFlatObjectMetadata.nameSingular
            },
            metadataName: 'objectMetadata',
            type: 'update'
        });
        if ((0, _utils.isDefined)(objectMetadataUpdate.update.labelIdentifierFieldMetadataUniversalIdentifier)) {
            updateFailedFlatEntityValidations.errors.push(...(0, _validateflatobjectmetadataidentifiersutil.validateFlatObjectMetadataIdentifiers)({
                universalFlatObjectMetadata: updatedFlatObjectMetadata,
                universalFlatFieldMetadataMaps: optimisticUniversalFlatMaps.flatFieldMetadataMaps
            }));
        }
        if (updateFailedFlatEntityValidations.errors.length > 0) {
            metadataValidationErrors.objectMetadata.push(updateFailedFlatEntityValidations);
        }
    }
    return metadataValidationErrors;
};

//# sourceMappingURL=validate-object-metadata-cross-entity.util.js.map