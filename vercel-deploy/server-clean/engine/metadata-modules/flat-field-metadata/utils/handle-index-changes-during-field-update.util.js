"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "handleIndexChangesDuringFieldUpdate", {
    enumerable: true,
    get: function() {
        return handleIndexChangesDuringFieldUpdate;
    }
});
const _utils = require("twenty-shared/utils");
const _fieldmetadataexception = require("../../field-metadata/field-metadata.exception");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findfieldrelatedindexutil = require("./find-field-related-index.util");
const _generateindexforflatfieldmetadatautil = require("./generate-index-for-flat-field-metadata.util");
const _ismorphorrelationflatfieldmetadatautil = require("./is-morph-or-relation-flat-field-metadata.util");
const _recomputeindexonflatfieldmetadatanameupdateutil = require("./recompute-index-on-flat-field-metadata-name-update.util");
const FIELD_METADATA_UPDATE_INDEX_SIDE_EFFECT = {
    flatIndexMetadatasToUpdate: [],
    flatIndexMetadatasToDelete: [],
    flatIndexMetadatasToCreate: []
};
const handleIndexChangesDuringFieldUpdate = ({ fromFlatFieldMetadata, toFlatFieldMetadata, flatIndexMaps, flatObjectMetadataMaps, flatFieldMetadataMaps, flatApplication })=>{
    if (!hasIndexRelevantChanges({
        fromFlatFieldMetadata,
        toFlatFieldMetadata
    })) {
        return {
            status: 'success',
            result: FIELD_METADATA_UPDATE_INDEX_SIDE_EFFECT
        };
    }
    const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityMaps: flatObjectMetadataMaps,
        flatEntityId: fromFlatFieldMetadata.objectMetadataId
    });
    const relatedIndexes = (0, _findfieldrelatedindexutil.findFieldRelatedIndexes)({
        flatFieldMetadata: fromFlatFieldMetadata,
        flatObjectMetadata,
        flatIndexMaps
    });
    if (relatedIndexes.length === 0) {
        return handleNoExistingIndexes({
            toFlatFieldMetadata,
            flatObjectMetadata
        });
    }
    return handleExistingIndexes({
        toFlatFieldMetadata,
        fromFlatFieldMetadata,
        relatedIndexes,
        flatObjectMetadata,
        flatFieldMetadataMaps,
        flatApplication
    });
};
const hasIndexRelevantChanges = ({ fromFlatFieldMetadata, toFlatFieldMetadata })=>fromFlatFieldMetadata.name !== toFlatFieldMetadata.name || fromFlatFieldMetadata.isUnique !== toFlatFieldMetadata.isUnique;
const handleNoExistingIndexes = ({ toFlatFieldMetadata, flatObjectMetadata })=>{
    if (!toFlatFieldMetadata.isUnique) {
        return {
            status: 'success',
            result: FIELD_METADATA_UPDATE_INDEX_SIDE_EFFECT
        };
    }
    const newIndex = (0, _generateindexforflatfieldmetadatautil.generateIndexForFlatFieldMetadata)({
        flatFieldMetadata: toFlatFieldMetadata,
        flatObjectMetadata
    });
    return {
        status: 'success',
        result: {
            ...FIELD_METADATA_UPDATE_INDEX_SIDE_EFFECT,
            flatIndexMetadatasToCreate: [
                newIndex
            ]
        }
    };
};
const handleExistingIndexes = ({ fromFlatFieldMetadata, toFlatFieldMetadata, relatedIndexes, flatObjectMetadata, flatFieldMetadataMaps, flatApplication })=>{
    if (toFlatFieldMetadata.isUnique === false && !(0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(fromFlatFieldMetadata)) {
        const expectedUniqueIndex = (0, _generateindexforflatfieldmetadatautil.generateIndexForFlatFieldMetadata)({
            flatFieldMetadata: {
                ...fromFlatFieldMetadata,
                isUnique: true
            },
            flatObjectMetadata
        });
        const uniqueIndexToDelete = relatedIndexes.find((index)=>index.name === expectedUniqueIndex.name);
        if ((0, _utils.isDefined)(uniqueIndexToDelete) && ((0, _utils.isDefined)(uniqueIndexToDelete.applicationId) && uniqueIndexToDelete.applicationId !== flatApplication.id || !uniqueIndexToDelete.isCustom)) {
            return {
                status: 'fail',
                errors: [
                    {
                        code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
                        message: 'Cannot delete unique index that have not been created by the workspace custom application',
                        userFriendlyMessage: /*i18n*/ {
                            id: "mWk3X+",
                            message: "Cannot delete unique index that have not been created by the workspace custom application"
                        }
                    }
                ]
            };
        }
        return {
            status: 'success',
            result: {
                ...FIELD_METADATA_UPDATE_INDEX_SIDE_EFFECT,
                flatIndexMetadatasToDelete: uniqueIndexToDelete ? [
                    uniqueIndexToDelete
                ] : []
            }
        };
    }
    const updatedIndexes = (0, _recomputeindexonflatfieldmetadatanameupdateutil.recomputeIndexOnFlatFieldMetadataNameUpdate)({
        flatFieldMetadataMaps,
        flatObjectMetadata,
        fromFlatFieldMetadata,
        toFlatFieldMetadata: {
            name: toFlatFieldMetadata.name,
            isUnique: toFlatFieldMetadata.isUnique
        },
        relatedFlatIndexMetadata: relatedIndexes
    });
    return {
        status: 'success',
        result: {
            ...FIELD_METADATA_UPDATE_INDEX_SIDE_EFFECT,
            flatIndexMetadatasToUpdate: updatedIndexes
        }
    };
};

//# sourceMappingURL=handle-index-changes-during-field-update.util.js.map