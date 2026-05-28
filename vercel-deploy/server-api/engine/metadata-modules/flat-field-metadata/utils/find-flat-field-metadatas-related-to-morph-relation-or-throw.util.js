"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findFlatFieldMetadatasRelatedToMorphRelationOrThrow", {
    enumerable: true,
    get: function() {
        return findFlatFieldMetadatasRelatedToMorphRelationOrThrow;
    }
});
const _findallothersmorphrelationflatfieldmetadatasorthrowutil = require("./find-all-others-morph-relation-flat-field-metadatas-or-throw.util");
const _findrelationflatfieldmetadatastargetflatfieldmetadataorthrowutil = require("./find-relation-flat-field-metadatas-target-flat-field-metadata-or-throw.util");
const findFlatFieldMetadatasRelatedToMorphRelationOrThrow = ({ flatFieldMetadataMaps, flatFieldMetadata: morphRelationFlatFieldMetadata, flatObjectMetadata })=>{
    const morphRelationFlatFieldMetadatas = (0, _findallothersmorphrelationflatfieldmetadatasorthrowutil.findAllOthersMorphRelationFlatFieldMetadatasOrThrow)({
        flatFieldMetadata: morphRelationFlatFieldMetadata,
        flatFieldMetadataMaps,
        flatObjectMetadata
    });
    const relationFlatFieldMetadatas = [
        morphRelationFlatFieldMetadata,
        ...morphRelationFlatFieldMetadatas
    ].map((flatFieldMetadata)=>(0, _findrelationflatfieldmetadatastargetflatfieldmetadataorthrowutil.findRelationFlatFieldMetadataTargetFlatFieldMetadataOrThrow)({
            flatFieldMetadata,
            flatFieldMetadataMaps
        }));
    return {
        morphRelationFlatFieldMetadatas,
        relationFlatFieldMetadatas
    };
};

//# sourceMappingURL=find-flat-field-metadatas-related-to-morph-relation-or-throw.util.js.map