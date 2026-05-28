"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeFlatFieldMetadataRelatedFlatFieldMetadata", {
    enumerable: true,
    get: function() {
        return computeFlatFieldMetadataRelatedFlatFieldMetadata;
    }
});
const _types = require("twenty-shared/types");
const _findflatfieldmetadatasrelatedtomorphrelationorthrowutil = require("./find-flat-field-metadatas-related-to-morph-relation-or-throw.util");
const _findrelationflatfieldmetadatastargetflatfieldmetadataorthrowutil = require("./find-relation-flat-field-metadatas-target-flat-field-metadata-or-throw.util");
const _isflatfieldmetadataoftypeutil = require("./is-flat-field-metadata-of-type.util");
const computeFlatFieldMetadataRelatedFlatFieldMetadata = ({ flatFieldMetadata, flatObjectMetadata, flatFieldMetadataMaps })=>{
    if ((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(flatFieldMetadata, _types.FieldMetadataType.RELATION)) {
        return [
            (0, _findrelationflatfieldmetadatastargetflatfieldmetadataorthrowutil.findRelationFlatFieldMetadataTargetFlatFieldMetadataOrThrow)({
                flatFieldMetadata,
                flatFieldMetadataMaps
            })
        ];
    }
    if ((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(flatFieldMetadata, _types.FieldMetadataType.MORPH_RELATION)) {
        const { morphRelationFlatFieldMetadatas, relationFlatFieldMetadatas } = (0, _findflatfieldmetadatasrelatedtomorphrelationorthrowutil.findFlatFieldMetadatasRelatedToMorphRelationOrThrow)({
            flatFieldMetadata,
            flatFieldMetadataMaps,
            flatObjectMetadata
        });
        return [
            ...morphRelationFlatFieldMetadatas,
            ...relationFlatFieldMetadatas
        ];
    }
    return [];
};

//# sourceMappingURL=compute-flat-field-metadata-related-flat-field-metadata.util.js.map