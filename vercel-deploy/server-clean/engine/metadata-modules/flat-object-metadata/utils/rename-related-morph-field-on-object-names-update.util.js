"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renameRelatedMorphFieldOnObjectNamesUpdate", {
    enumerable: true,
    get: function() {
        return renameRelatedMorphFieldOnObjectNamesUpdate;
    }
});
const _types = require("twenty-shared/types");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _computemorphrelationflatfieldnameutil = require("../../field-metadata/utils/compute-morph-relation-flat-field-name.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findfieldrelatedindexutil = require("../../flat-field-metadata/utils/find-field-related-index.util");
const _recomputeindexonflatfieldmetadatanameupdateutil = require("../../flat-field-metadata/utils/recompute-index-on-flat-field-metadata-name-update.util");
const _getflatobjectmetadatamanytoonetargetmorphrelationflatfieldmetadatasorthrowutil = require("./get-flat-object-metadata-many-to-one-target-morph-relation-flat-field-metadatas-or-throw.util");
const _getmorphnamefrommorphfieldmetadatanameutil = require("./get-morph-name-from-morph-field-metadata-name.util");
const updateMorphFlatFieldName = ({ fromMorphFlatFieldMetadata, fromRelationTargetFlatObjectMetadata, toRelationTargetFlatObjectMetadata })=>{
    const isManyToOneRelationType = fromMorphFlatFieldMetadata.universalSettings.relationType === _types.RelationType.MANY_TO_ONE;
    const initialMorphRelationFieldName = (0, _getmorphnamefrommorphfieldmetadatanameutil.getMorphNameFromMorphFieldMetadataName)({
        morphRelationFlatFieldMetadata: fromMorphFlatFieldMetadata,
        nameSingular: fromRelationTargetFlatObjectMetadata.nameSingular,
        namePlural: fromRelationTargetFlatObjectMetadata.namePlural
    });
    const newMorphFieldName = (0, _computemorphrelationflatfieldnameutil.computeMorphRelationFlatFieldName)({
        fieldName: initialMorphRelationFieldName,
        relationType: fromMorphFlatFieldMetadata.universalSettings.relationType,
        targetObjectMetadataNameSingular: toRelationTargetFlatObjectMetadata.nameSingular,
        targetObjectMetadataNamePlural: toRelationTargetFlatObjectMetadata.namePlural
    });
    const newJoinColumnName = isManyToOneRelationType ? (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
        name: newMorphFieldName
    }) : undefined;
    return {
        ...fromMorphFlatFieldMetadata,
        name: newMorphFieldName,
        universalSettings: {
            ...fromMorphFlatFieldMetadata.universalSettings,
            joinColumnName: newJoinColumnName
        }
    };
};
const renameRelatedMorphFieldOnObjectNamesUpdate = ({ fromFlatObjectMetadata, toFlatObjectMetadata, flatFieldMetadataMaps, flatObjectMetadataMaps, flatIndexMaps })=>{
    const objectFlatFieldMetadatas = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityMaps: flatFieldMetadataMaps,
        flatEntityIds: fromFlatObjectMetadata.fieldIds
    });
    const allMorphRelationFlatFieldMetadatas = (0, _getflatobjectmetadatamanytoonetargetmorphrelationflatfieldmetadatasorthrowutil.getFlatObjectMetadataTargetMorphRelationFlatFieldMetadatasOrThrow)({
        flatFieldMetadataMaps,
        objectFlatFieldMetadatas
    });
    const initialAccumulator = {
        morphRelatedFlatIndexesToUpdate: [],
        morphFlatFieldMetadatasToUpdate: []
    };
    return allMorphRelationFlatFieldMetadatas.reduce((acc, fromMorphFlatFieldMetadata)=>{
        const morphFlatFieldMetadataTo = updateMorphFlatFieldName({
            fromMorphFlatFieldMetadata,
            fromRelationTargetFlatObjectMetadata: fromFlatObjectMetadata,
            toRelationTargetFlatObjectMetadata: toFlatObjectMetadata
        });
        const morphFieldParentFlatObject = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: fromMorphFlatFieldMetadata.objectMetadataId,
            flatEntityMaps: flatObjectMetadataMaps
        });
        const relatedIndexes = (0, _findfieldrelatedindexutil.findFieldRelatedIndexes)({
            flatFieldMetadata: fromMorphFlatFieldMetadata,
            flatObjectMetadata: morphFieldParentFlatObject,
            flatIndexMaps
        });
        const flatIndexesToUpdate = (0, _recomputeindexonflatfieldmetadatanameupdateutil.recomputeIndexOnFlatFieldMetadataNameUpdate)({
            flatFieldMetadataMaps,
            flatObjectMetadata: morphFieldParentFlatObject,
            fromFlatFieldMetadata: fromMorphFlatFieldMetadata,
            toFlatFieldMetadata: {
                name: morphFlatFieldMetadataTo.name,
                isUnique: morphFlatFieldMetadataTo.isUnique
            },
            relatedFlatIndexMetadata: relatedIndexes
        });
        return {
            ...acc,
            morphRelatedFlatIndexesToUpdate: [
                ...acc.morphRelatedFlatIndexesToUpdate,
                ...flatIndexesToUpdate
            ],
            morphFlatFieldMetadatasToUpdate: [
                ...acc.morphFlatFieldMetadatasToUpdate,
                morphFlatFieldMetadataTo
            ]
        };
    }, initialAccumulator);
};

//# sourceMappingURL=rename-related-morph-field-on-object-names-update.util.js.map