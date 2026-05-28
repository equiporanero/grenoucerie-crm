"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdateFieldInputToFlatFieldMetadata", {
    enumerable: true,
    get: function() {
        return fromUpdateFieldInputToFlatFieldMetadata;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _fieldmetadataexception = require("../../field-metadata/field-metadata.exception");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _computeflatfieldtoupdateandrelatedflatfieldtoupdateutil = require("./compute-flat-field-to-update-and-related-flat-field-to-update.util");
const _computeflatfieldtoupdatefrommorphrelationupdatepayloadutil = require("./compute-flat-field-to-update-from-morph-relation-update-payload.util");
const _handleflatfieldmetadataupdatesideeffectutil = require("./handle-flat-field-metadata-update-side-effect.util");
const _isflatfieldmetadataoftypeutil = require("./is-flat-field-metadata-of-type.util");
const fromUpdateFieldInputToFlatFieldMetadata = ({ flatApplication, flatIndexMaps, flatObjectMetadataMaps: existingFlatObjectMetadataMaps, flatFieldMetadataMaps, updateFieldInput: rawUpdateFieldInput, flatViewFilterMaps, flatViewGroupMaps, flatViewMaps, flatViewFieldMaps, isSystemBuild })=>{
    const updateFieldInputInformalProperties = (0, _utils.extractAndSanitizeObjectStringFields)(rawUpdateFieldInput, [
        'objectMetadataId',
        'id'
    ]);
    const existingFlatFieldMetadataToUpdate = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: updateFieldInputInformalProperties.id,
        flatEntityMaps: flatFieldMetadataMaps
    });
    if (!(0, _utils.isDefined)(existingFlatFieldMetadataToUpdate)) {
        return {
            status: 'fail',
            errors: [
                {
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_NOT_FOUND,
                    message: 'Field metadata to update not found',
                    userFriendlyMessage: /*i18n*/ {
                        id: "Ljqo/T",
                        message: "Field metadata to update not found"
                    }
                }
            ]
        };
    }
    const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: existingFlatFieldMetadataToUpdate.objectMetadataId,
        flatEntityMaps: existingFlatObjectMetadataMaps
    });
    if (!(0, _utils.isDefined)(flatObjectMetadata)) {
        return {
            status: 'fail',
            errors: [
                {
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.OBJECT_METADATA_NOT_FOUND,
                    message: 'Field to update object metadata not found',
                    userFriendlyMessage: /*i18n*/ {
                        id: "5cm5Hn",
                        message: "Field to update object metadata not found"
                    }
                }
            ]
        };
    }
    const { flatFieldMetadataFromTo, relatedFlatFieldMetadatasFromTo } = (0, _computeflatfieldtoupdateandrelatedflatfieldtoupdateutil.computeFlatFieldToUpdateAndRelatedFlatFieldToUpdate)({
        flatFieldMetadataMaps,
        flatObjectMetadata,
        fromFlatFieldMetadata: existingFlatFieldMetadataToUpdate,
        rawUpdateFieldInput,
        isSystemBuild
    });
    const { flatFieldMetadatasToCreate, flatIndexMetadatasToCreate } = (0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(flatFieldMetadataFromTo.toFlatFieldMetadata, _types.FieldMetadataType.MORPH_RELATION) ? (0, _computeflatfieldtoupdatefrommorphrelationupdatepayloadutil.computeFlatFieldToUpdateFromMorphRelationUpdatePayload)({
        flatApplication,
        morphRelationsUpdatePayload: rawUpdateFieldInput?.morphRelationsUpdatePayload,
        flatFieldMetadataMaps: flatFieldMetadataMaps,
        fieldMetadataToUpdate: flatFieldMetadataFromTo.toFlatFieldMetadata,
        flatObjectMetadataMaps: existingFlatObjectMetadataMaps
    }) : {
        flatFieldMetadatasToCreate: [],
        flatIndexMetadatasToCreate: []
    };
    const initialAccumulator = {
        ...structuredClone(_handleflatfieldmetadataupdatesideeffectutil.FLAT_FIELD_METADATA_UPDATE_EMPTY_SIDE_EFFECTS),
        flatFieldMetadatasToUpdate: [],
        flatFieldMetadatasToCreate: flatFieldMetadatasToCreate,
        flatIndexMetadatasToCreate: flatIndexMetadatasToCreate,
        errors: []
    };
    const { errors: sideEffectErrors, ...sideEffectFlatEntityOperations } = [
        flatFieldMetadataFromTo,
        ...relatedFlatFieldMetadatasFromTo
    ].reduce((accumulator, { fromFlatFieldMetadata, toFlatFieldMetadata })=>{
        const sideEffectResult = (0, _handleflatfieldmetadataupdatesideeffectutil.handleFlatFieldMetadataUpdateSideEffect)({
            flatViewFilterMaps,
            flatViewGroupMaps,
            flatObjectMetadataMaps: existingFlatObjectMetadataMaps,
            fromFlatFieldMetadata,
            flatFieldMetadataMaps,
            flatIndexMaps,
            toFlatFieldMetadata,
            flatViewMaps,
            flatViewFieldMaps,
            flatApplication
        });
        if (sideEffectResult.status === 'fail') {
            return {
                ...accumulator,
                errors: [
                    ...accumulator.errors,
                    ...sideEffectResult.errors
                ]
            };
        }
        const { flatViewGroupsToCreate, flatViewGroupsToDelete, flatViewGroupsToUpdate, flatIndexMetadatasToUpdate, flatViewFiltersToDelete, flatViewFiltersToUpdate, flatIndexMetadatasToCreate, flatIndexMetadatasToDelete, flatViewsToDelete, flatViewFieldsToDelete, flatViewsToUpdate, flatFieldMetadatasToUpdate: flatFieldMetadatasToUpdateFromSideEffect } = sideEffectResult.result;
        return {
            flatFieldMetadatasToUpdate: [
                ...accumulator.flatFieldMetadatasToUpdate,
                toFlatFieldMetadata,
                ...flatFieldMetadatasToUpdateFromSideEffect
            ],
            flatIndexMetadatasToUpdate: [
                ...accumulator.flatIndexMetadatasToUpdate,
                ...flatIndexMetadatasToUpdate
            ],
            flatFieldMetadatasToCreate: [
                ...accumulator.flatFieldMetadatasToCreate
            ],
            flatViewFiltersToDelete: [
                ...accumulator.flatViewFiltersToDelete,
                ...flatViewFiltersToDelete
            ],
            flatViewFiltersToUpdate: [
                ...accumulator.flatViewFiltersToUpdate,
                ...flatViewFiltersToUpdate
            ],
            flatViewGroupsToCreate: [
                ...accumulator.flatViewGroupsToCreate,
                ...flatViewGroupsToCreate
            ],
            flatViewGroupsToDelete: [
                ...accumulator.flatViewGroupsToDelete,
                ...flatViewGroupsToDelete
            ],
            flatViewGroupsToUpdate: [
                ...accumulator.flatViewGroupsToUpdate,
                ...flatViewGroupsToUpdate
            ],
            flatIndexMetadatasToDelete: [
                ...accumulator.flatIndexMetadatasToDelete,
                ...flatIndexMetadatasToDelete
            ],
            flatIndexMetadatasToCreate: [
                ...accumulator.flatIndexMetadatasToCreate,
                ...flatIndexMetadatasToCreate
            ],
            flatViewsToDelete: [
                ...accumulator.flatViewsToDelete,
                ...flatViewsToDelete
            ],
            flatViewFieldsToDelete: [
                ...accumulator.flatViewFieldsToDelete,
                ...flatViewFieldsToDelete
            ],
            flatViewsToUpdate: [
                ...accumulator.flatViewsToUpdate,
                ...flatViewsToUpdate
            ],
            errors: accumulator.errors
        };
    }, initialAccumulator);
    if (sideEffectErrors.length > 0) {
        return {
            status: 'fail',
            errors: sideEffectErrors
        };
    }
    return {
        status: 'success',
        result: sideEffectFlatEntityOperations
    };
};

//# sourceMappingURL=from-update-field-input-to-flat-field-metadata.util.js.map