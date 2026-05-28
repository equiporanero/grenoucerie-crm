"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveMorphRelationsFromFlatFieldMetadata", {
    enumerable: true,
    get: function() {
        return resolveMorphRelationsFromFlatFieldMetadata;
    }
});
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findallothersmorphrelationflatfieldmetadatasorthrowutil = require("./find-all-others-morph-relation-flat-field-metadatas-or-throw.util");
const _frommorphorrelationflatfieldmetadatatorelationdtoutil = require("./from-morph-or-relation-flat-field-metadata-to-relation-dto.util");
const _ismorphorrelationflatfieldmetadatautil = require("./is-morph-or-relation-flat-field-metadata.util");
const _getmorphnamefrommorphfieldmetadatanameutil = require("../../flat-object-metadata/utils/get-morph-name-from-morph-field-metadata-name.util");
const resolveMorphRelationsFromFlatFieldMetadata = ({ morphFlatFieldMetadata, flatFieldMetadataMaps, flatObjectMetadataMaps })=>{
    const sourceFlatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityMaps: flatObjectMetadataMaps,
        flatEntityId: morphFlatFieldMetadata.objectMetadataId
    });
    const relatedMorphFlatFieldMetadatas = (0, _findallothersmorphrelationflatfieldmetadatasorthrowutil.findAllOthersMorphRelationFlatFieldMetadatasOrThrow)({
        flatFieldMetadata: morphFlatFieldMetadata,
        flatFieldMetadataMaps,
        flatObjectMetadata: sourceFlatObjectMetadata
    });
    const allMorphFlatFieldMetadatas = [
        morphFlatFieldMetadata,
        ...relatedMorphFlatFieldMetadatas
    ];
    return allMorphFlatFieldMetadatas.flatMap((sourceFlatFieldMetadata)=>{
        const targetFlatFieldMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: sourceFlatFieldMetadata.relationTargetFieldMetadataId,
            flatEntityMaps: flatFieldMetadataMaps
        });
        if (!(0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(targetFlatFieldMetadata)) {
            return [];
        }
        const targetFlatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: sourceFlatFieldMetadata.relationTargetObjectMetadataId,
            flatEntityMaps: flatObjectMetadataMaps
        });
        const morphNameFromMorphFieldMetadataName = (0, _getmorphnamefrommorphfieldmetadatanameutil.getMorphNameFromMorphFieldMetadataName)({
            morphRelationFlatFieldMetadata: sourceFlatFieldMetadata,
            nameSingular: targetFlatObjectMetadata.nameSingular,
            namePlural: targetFlatObjectMetadata.namePlural
        });
        return (0, _frommorphorrelationflatfieldmetadatatorelationdtoutil.fromMorphOrRelationFlatFieldMetadataToRelationDto)({
            sourceFlatFieldMetadata: {
                ...sourceFlatFieldMetadata,
                name: morphNameFromMorphFieldMetadataName
            },
            targetFlatFieldMetadata,
            targetFlatObjectMetadata,
            sourceFlatObjectMetadata
        });
    });
};

//# sourceMappingURL=resolve-morph-relations-from-flat-field-metadata.util.js.map