"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "handleFlatObjectMetadataUpdateSideEffect", {
    enumerable: true,
    get: function() {
        return handleFlatObjectMetadataUpdateSideEffect;
    }
});
const _utils = require("twenty-shared/utils");
const _recomputeindexafterflatobjectmetadatasingularnameupdateutil = require("./recompute-index-after-flat-object-metadata-singular-name-update.util");
const _recomputesearchvectorfieldafterlabelidentifierupdateutil = require("./recompute-search-vector-field-after-label-identifier-update.util");
const _recomputeviewfieldidentifierafterflatobjectidentifierupdateutil = require("./recompute-view-field-identifier-after-flat-object-identifier-update.util");
const _renamerelatedmorphfieldonobjectnamesupdateutil = require("./rename-related-morph-field-on-object-names-update.util");
const handleFlatObjectMetadataUpdateSideEffect = ({ flatIndexMaps, flatFieldMetadataMaps, flatObjectMetadataMaps, flatViewFieldMaps, flatViewMaps, fromFlatObjectMetadata, toFlatObjectMetadata })=>{
    const { morphRelatedFlatIndexesToUpdate, morphFlatFieldMetadatasToUpdate } = fromFlatObjectMetadata.nameSingular !== toFlatObjectMetadata.nameSingular || fromFlatObjectMetadata.namePlural !== toFlatObjectMetadata.namePlural ? (0, _renamerelatedmorphfieldonobjectnamesupdateutil.renameRelatedMorphFieldOnObjectNamesUpdate)({
        flatFieldMetadataMaps,
        fromFlatObjectMetadata,
        toFlatObjectMetadata,
        flatObjectMetadataMaps,
        flatIndexMaps
    }) : {
        morphRelatedFlatIndexesToUpdate: [],
        morphFlatFieldMetadatasToUpdate: []
    };
    const flatIndexMetadatasToUpdate = fromFlatObjectMetadata.nameSingular !== toFlatObjectMetadata.nameSingular ? (0, _recomputeindexafterflatobjectmetadatasingularnameupdateutil.recomputeIndexAfterFlatObjectMetadataSingularNameUpdate)({
        flatFieldMetadataMaps,
        existingFlatObjectMetadata: fromFlatObjectMetadata,
        flatIndexMaps,
        updatedSingularName: toFlatObjectMetadata.nameSingular
    }) : [];
    const { flatViewFieldsToCreate, flatViewFieldsToUpdate } = fromFlatObjectMetadata.labelIdentifierFieldMetadataId !== toFlatObjectMetadata.labelIdentifierFieldMetadataId && (0, _utils.isDefined)(toFlatObjectMetadata.labelIdentifierFieldMetadataId) && (0, _utils.isDefined)(fromFlatObjectMetadata.labelIdentifierFieldMetadataId) ? (0, _recomputeviewfieldidentifierafterflatobjectidentifierupdateutil.recomputeViewFieldIdentifierAfterFlatObjectIdentifierUpdate)({
        existingFlatObjectMetadata: fromFlatObjectMetadata,
        flatViewFieldMaps,
        flatViewMaps,
        flatFieldMetadataMaps,
        updatedLabelIdentifierFieldMetadataId: toFlatObjectMetadata.labelIdentifierFieldMetadataId
    }) : {
        flatViewFieldsToCreate: [],
        flatViewFieldsToUpdate: []
    };
    const sameObjectFlatFieldMetadatasToUpdate = [];
    if (toFlatObjectMetadata.isSearchable && (0, _utils.isDefined)(toFlatObjectMetadata.labelIdentifierFieldMetadataUniversalIdentifier) && fromFlatObjectMetadata.labelIdentifierFieldMetadataUniversalIdentifier !== toFlatObjectMetadata.labelIdentifierFieldMetadataUniversalIdentifier) {
        const updatedSearchVectorField = (0, _recomputesearchvectorfieldafterlabelidentifierupdateutil.recomputeSearchVectorFieldAfterLabelIdentifierUpdate)({
            existingFlatObjectMetadata: fromFlatObjectMetadata,
            flatFieldMetadataMaps,
            labelIdentifierFieldMetadataUniversalIdentifier: toFlatObjectMetadata.labelIdentifierFieldMetadataUniversalIdentifier
        });
        if ((0, _utils.isDefined)(updatedSearchVectorField)) {
            sameObjectFlatFieldMetadatasToUpdate.push(updatedSearchVectorField);
        }
    }
    return {
        flatIndexMetadatasToUpdate: [
            ...morphRelatedFlatIndexesToUpdate,
            ...flatIndexMetadatasToUpdate
        ],
        flatViewFieldsToCreate,
        flatViewFieldsToUpdate,
        otherObjectFlatFieldMetadatasToUpdate: morphFlatFieldMetadatasToUpdate,
        sameObjectFlatFieldMetadatasToUpdate
    };
};

//# sourceMappingURL=handle-flat-object-metadata-update-side-effect.util.js.map