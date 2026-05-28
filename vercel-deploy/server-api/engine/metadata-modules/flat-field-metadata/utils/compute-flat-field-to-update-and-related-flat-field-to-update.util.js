"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeFlatFieldToUpdateAndRelatedFlatFieldToUpdate", {
    enumerable: true,
    get: function() {
        return computeFlatFieldToUpdateAndRelatedFlatFieldToUpdate;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _isfieldmetadatasettingsoftypeutil = require("../../field-metadata/utils/is-field-metadata-settings-of-type.util");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _flatfieldmetadataeditablepropertiesconstant = require("../constants/flat-field-metadata-editable-properties.constant");
const _flatfieldmetadatamorphrelationeditablepropertiesonsiblingmorphrelationupdateconstant = require("../constants/flat-field-metadata-morph-relation-editable-properties-on-sibling-morph-relation-update.constant");
const _flatfieldmetadatarelationeditablepropertiesonsiblingmorphorrelationupdateconstant = require("../constants/flat-field-metadata-relation-editable-properties-on-sibling-morph-or-relation-update.constant");
const _findflatfieldmetadatasrelatedtomorphrelationorthrowutil = require("./find-flat-field-metadatas-related-to-morph-relation-or-throw.util");
const _findrelationflatfieldmetadatastargetflatfieldmetadataorthrowutil = require("./find-relation-flat-field-metadatas-target-flat-field-metadata-or-throw.util");
const _isflatfieldmetadataoftypeutil = require("./is-flat-field-metadata-of-type.util");
const _sanitizerawupdatefieldinput = require("./sanitize-raw-update-field-input");
const _belongstotwentystandardapputil = require("../../utils/belongs-to-twenty-standard-app.util");
const _mergeupdateinexistingrecordutil = require("../../../../utils/merge-update-in-existing-record.util");
const computeFlatFieldToUpdateAndRelatedFlatFieldToUpdate = ({ fromFlatFieldMetadata, rawUpdateFieldInput, flatFieldMetadataMaps, flatObjectMetadata, isSystemBuild })=>{
    const { standardOverrides, updatedEditableFieldProperties } = (0, _sanitizerawupdatefieldinput.sanitizeRawUpdateFieldInput)({
        existingFlatFieldMetadata: fromFlatFieldMetadata,
        rawUpdateFieldInput,
        isSystemBuild
    });
    const isStandardField = (0, _belongstotwentystandardapputil.belongsToTwentyStandardApp)(fromFlatFieldMetadata);
    const toFlatFieldMetadata = {
        ...(0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
            existing: fromFlatFieldMetadata,
            properties: _flatfieldmetadataeditablepropertiesconstant.FLAT_FIELD_METADATA_EDITABLE_PROPERTIES[isStandardField && !isSystemBuild ? 'standard' : 'custom'],
            update: updatedEditableFieldProperties
        }),
        standardOverrides
    };
    if (updatedEditableFieldProperties.settings !== undefined) {
        const updatedSettings = toFlatFieldMetadata.settings;
        const isRelationSettings = (0, _isfieldmetadatasettingsoftypeutil.isFieldMetadataSettingsOfType)(updatedSettings, _types.FieldMetadataType.RELATION) || (0, _isfieldmetadatasettingsoftypeutil.isFieldMetadataSettingsOfType)(updatedSettings, _types.FieldMetadataType.MORPH_RELATION);
        if (isRelationSettings && (0, _utils.isDefined)(updatedSettings?.junctionTargetFieldId)) {
            const junctionFlatFieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: updatedSettings.junctionTargetFieldId,
                flatEntityMaps: flatFieldMetadataMaps
            });
            if (!(0, _utils.isDefined)(junctionFlatFieldMetadata)) {
                throw new _flatentitymapsexception.FlatEntityMapsException(`Field metadata universal identifier not found for id: ${updatedSettings.junctionTargetFieldId}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.RELATION_UNIVERSAL_IDENTIFIER_NOT_FOUND);
            }
            toFlatFieldMetadata.universalSettings = {
                ...updatedSettings,
                junctionTargetFieldUniversalIdentifier: junctionFlatFieldMetadata.universalIdentifier
            };
        } else {
            toFlatFieldMetadata.universalSettings = updatedSettings;
        }
    }
    if ((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(fromFlatFieldMetadata, _types.FieldMetadataType.RELATION)) {
        const relatedFlatFieldMetadataFrom = (0, _findrelationflatfieldmetadatastargetflatfieldmetadataorthrowutil.findRelationFlatFieldMetadataTargetFlatFieldMetadataOrThrow)({
            flatFieldMetadata: fromFlatFieldMetadata,
            flatFieldMetadataMaps
        });
        const relatedFlatFieldMetadataTo = (0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
            existing: relatedFlatFieldMetadataFrom,
            properties: _flatfieldmetadatarelationeditablepropertiesonsiblingmorphorrelationupdateconstant.FLAT_FIELD_METADATA_RELATION_EDITABLE_PROPERTIES_ON_SIBLING_MORPH_OR_RELATION_UPDATE_CONSTANT,
            update: updatedEditableFieldProperties
        });
        return {
            flatFieldMetadataFromTo: {
                fromFlatFieldMetadata,
                toFlatFieldMetadata
            },
            relatedFlatFieldMetadatasFromTo: [
                {
                    fromFlatFieldMetadata: relatedFlatFieldMetadataFrom,
                    toFlatFieldMetadata: relatedFlatFieldMetadataTo
                }
            ]
        };
    }
    if ((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(fromFlatFieldMetadata, _types.FieldMetadataType.MORPH_RELATION)) {
        const { morphRelationFlatFieldMetadatas, relationFlatFieldMetadatas } = (0, _findflatfieldmetadatasrelatedtomorphrelationorthrowutil.findFlatFieldMetadatasRelatedToMorphRelationOrThrow)({
            flatFieldMetadata: fromFlatFieldMetadata,
            flatFieldMetadataMaps,
            flatObjectMetadata
        });
        const relatedMorphRelationFlatFieldMetdataTo = morphRelationFlatFieldMetadatas.map((relatedFlatFieldMetadataFrom)=>{
            const relatedMorphPropertiesToUpdateTo = _flatfieldmetadatamorphrelationeditablepropertiesonsiblingmorphrelationupdateconstant.FLAT_FIELD_METADATA_MORPH_RELATION_EDITABLE_PROPERTIES_ON_SIBLING_MORPH_RELATION_UPDATE_CONSTANT[isStandardField && !isSystemBuild ? 'standard' : 'custom'];
            const relatedFlatFieldMetadataTo = {
                ...(0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
                    existing: relatedFlatFieldMetadataFrom,
                    properties: relatedMorphPropertiesToUpdateTo,
                    update: updatedEditableFieldProperties
                }),
                standardOverrides
            };
            return {
                fromFlatFieldMetadata: relatedFlatFieldMetadataFrom,
                toFlatFieldMetadata: relatedFlatFieldMetadataTo
            };
        });
        const relatedRelationFlatFieldMetadataTo = relationFlatFieldMetadatas.map((relatedFlatFieldMetadataFrom)=>{
            const relatedFlatFieldMetadataTo = (0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
                existing: relatedFlatFieldMetadataFrom,
                properties: _flatfieldmetadatarelationeditablepropertiesonsiblingmorphorrelationupdateconstant.FLAT_FIELD_METADATA_RELATION_EDITABLE_PROPERTIES_ON_SIBLING_MORPH_OR_RELATION_UPDATE_CONSTANT,
                update: updatedEditableFieldProperties
            });
            return {
                fromFlatFieldMetadata: relatedFlatFieldMetadataFrom,
                toFlatFieldMetadata: relatedFlatFieldMetadataTo
            };
        });
        return {
            flatFieldMetadataFromTo: {
                fromFlatFieldMetadata,
                toFlatFieldMetadata
            },
            relatedFlatFieldMetadatasFromTo: [
                ...relatedMorphRelationFlatFieldMetdataTo,
                ...relatedRelationFlatFieldMetadataTo
            ]
        };
    }
    return {
        flatFieldMetadataFromTo: {
            fromFlatFieldMetadata,
            toFlatFieldMetadata
        },
        relatedFlatFieldMetadatasFromTo: []
    };
};

//# sourceMappingURL=compute-flat-field-to-update-and-related-flat-field-to-update.util.js.map