"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdateObjectInputToFlatObjectMetadataAndRelatedFlatEntities", {
    enumerable: true,
    get: function() {
        return fromUpdateObjectInputToFlatObjectMetadataAndRelatedFlatEntities;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _flatobjectmetadataeditablepropertiesconstant = require("../constants/flat-object-metadata-editable-properties.constant");
const _handleflatobjectmetadataupdatesideeffectutil = require("./handle-flat-object-metadata-update-side-effect.util");
const _sanitizerawupdateobjectinput = require("./sanitize-raw-update-object-input");
const _objectmetadataexception = require("../../object-metadata/object-metadata.exception");
const _belongstotwentystandardapputil = require("../../utils/belongs-to-twenty-standard-app.util");
const _mergeupdateinexistingrecordutil = require("../../../../utils/merge-update-in-existing-record.util");
const fromUpdateObjectInputToFlatObjectMetadataAndRelatedFlatEntities = ({ flatObjectMetadataMaps: existingFlatObjectMetadataMaps, updateObjectInput: rawUpdateObjectInput, flatIndexMaps, flatFieldMetadataMaps, flatViewFieldMaps, flatViewMaps })=>{
    const { id: objectMetadataIdToUpdate } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawUpdateObjectInput, [
        'id'
    ]);
    const existingFlatObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityMaps: existingFlatObjectMetadataMaps,
        flatEntityId: objectMetadataIdToUpdate
    });
    if (!(0, _utils.isDefined)(existingFlatObjectMetadata)) {
        throw new _objectmetadataexception.ObjectMetadataException('Object to update not found', _objectmetadataexception.ObjectMetadataExceptionCode.OBJECT_METADATA_NOT_FOUND);
    }
    const isStandardObject = (0, _belongstotwentystandardapputil.belongsToTwentyStandardApp)(existingFlatObjectMetadata);
    const { standardOverrides, updatedEditableObjectProperties } = (0, _sanitizerawupdateobjectinput.sanitizeRawUpdateObjectInput)({
        existingFlatObjectMetadata,
        rawUpdateObjectInput
    });
    const toFlatObjectMetadata = {
        ...(0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
            existing: existingFlatObjectMetadata,
            properties: _flatobjectmetadataeditablepropertiesconstant.FLAT_OBJECT_METADATA_EDITABLE_PROPERTIES[isStandardObject ? 'standard' : 'custom'],
            update: updatedEditableObjectProperties
        }),
        standardOverrides
    };
    if ((0, _utils.isDefined)(updatedEditableObjectProperties.labelIdentifierFieldMetadataId)) {
        const flatFieldMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityMaps: flatFieldMetadataMaps,
            flatEntityId: updatedEditableObjectProperties.labelIdentifierFieldMetadataId
        });
        toFlatObjectMetadata.labelIdentifierFieldMetadataUniversalIdentifier = flatFieldMetadata?.universalIdentifier;
    }
    const { flatIndexMetadatasToUpdate, flatViewFieldsToCreate, flatViewFieldsToUpdate, otherObjectFlatFieldMetadatasToUpdate, sameObjectFlatFieldMetadatasToUpdate } = (0, _handleflatobjectmetadataupdatesideeffectutil.handleFlatObjectMetadataUpdateSideEffect)({
        fromFlatObjectMetadata: existingFlatObjectMetadata,
        toFlatObjectMetadata,
        flatFieldMetadataMaps,
        flatObjectMetadataMaps: existingFlatObjectMetadataMaps,
        flatIndexMaps,
        flatViewFieldMaps,
        flatViewMaps
    });
    return {
        flatIndexMetadatasToUpdate,
        flatObjectMetadataToUpdate: toFlatObjectMetadata,
        flatViewFieldsToCreate,
        flatViewFieldsToUpdate,
        otherObjectFlatFieldMetadatasToUpdate,
        sameObjectFlatFieldMetadatasToUpdate
    };
};

//# sourceMappingURL=from-update-object-input-to-flat-object-metadata-and-related-flat-entities.util.js.map