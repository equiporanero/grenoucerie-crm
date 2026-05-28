"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveRelationFromFlatFieldMetadata", {
    enumerable: true,
    get: function() {
        return resolveRelationFromFlatFieldMetadata;
    }
});
const _types = require("twenty-shared/types");
const _pickmorphgroupsurvivorutil = require("../../../dataloaders/utils/pick-morph-group-survivor.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findallothersmorphrelationflatfieldmetadatasorthrowutil = require("./find-all-others-morph-relation-flat-field-metadatas-or-throw.util");
const _frommorphorrelationflatfieldmetadatatorelationdtoutil = require("./from-morph-or-relation-flat-field-metadata-to-relation-dto.util");
const _isflatfieldmetadataoftypeutil = require("./is-flat-field-metadata-of-type.util");
const _ismorphorrelationflatfieldmetadatautil = require("./is-morph-or-relation-flat-field-metadata.util");
const _getmorphnamefrommorphfieldmetadatanameutil = require("../../flat-object-metadata/utils/get-morph-name-from-morph-field-metadata-name.util");
const resolveRelationFromFlatFieldMetadata = ({ sourceFlatFieldMetadata, flatFieldMetadataMaps, flatObjectMetadataMaps })=>{
    const sourceFlatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityId: sourceFlatFieldMetadata.objectMetadataId,
        flatEntityMaps: flatObjectMetadataMaps
    });
    const targetFlatFieldMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityId: sourceFlatFieldMetadata.relationTargetFieldMetadataId,
        flatEntityMaps: flatFieldMetadataMaps
    });
    if (!(0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(targetFlatFieldMetadata)) {
        return null;
    }
    const targetFlatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityId: targetFlatFieldMetadata.objectMetadataId,
        flatEntityMaps: flatObjectMetadataMaps
    });
    if ((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(targetFlatFieldMetadata, _types.FieldMetadataType.MORPH_RELATION)) {
        const morphNameFromMorphFieldMetadataName = (0, _getmorphnamefrommorphfieldmetadatanameutil.getMorphNameFromMorphFieldMetadataName)({
            morphRelationFlatFieldMetadata: targetFlatFieldMetadata,
            nameSingular: sourceFlatObjectMetadata.nameSingular,
            namePlural: sourceFlatObjectMetadata.namePlural
        });
        const allMorphFlatFieldMetadatas = [
            targetFlatFieldMetadata,
            ...(0, _findallothersmorphrelationflatfieldmetadatasorthrowutil.findAllOthersMorphRelationFlatFieldMetadatasOrThrow)({
                flatFieldMetadata: targetFlatFieldMetadata,
                flatFieldMetadataMaps,
                flatObjectMetadata: targetFlatObjectMetadata
            })
        ];
        const survivorMorphField = (0, _pickmorphgroupsurvivorutil.pickMorphGroupSurvivor)(allMorphFlatFieldMetadatas);
        return (0, _frommorphorrelationflatfieldmetadatatorelationdtoutil.fromMorphOrRelationFlatFieldMetadataToRelationDto)({
            sourceFlatFieldMetadata,
            sourceFlatObjectMetadata,
            targetFlatFieldMetadata: {
                ...survivorMorphField,
                name: morphNameFromMorphFieldMetadataName
            },
            targetFlatObjectMetadata
        });
    }
    return (0, _frommorphorrelationflatfieldmetadatatorelationdtoutil.fromMorphOrRelationFlatFieldMetadataToRelationDto)({
        sourceFlatFieldMetadata,
        targetFlatFieldMetadata,
        targetFlatObjectMetadata,
        sourceFlatObjectMetadata
    });
};

//# sourceMappingURL=resolve-relation-from-flat-field-metadata.util.js.map