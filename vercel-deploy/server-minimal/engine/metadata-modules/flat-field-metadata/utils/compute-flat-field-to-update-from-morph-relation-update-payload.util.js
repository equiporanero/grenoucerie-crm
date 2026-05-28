"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeFlatFieldToUpdateFromMorphRelationUpdatePayload", {
    enumerable: true,
    get: function() {
        return computeFlatFieldToUpdateFromMorphRelationUpdatePayload;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _computemorphrelationflatfieldnameutil = require("../../field-metadata/utils/compute-morph-relation-flat-field-name.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _extractjunctiontargetsettingsfromsettingsutil = require("./extract-junction-target-settings-from-settings.util");
const _generatemorphorrelationflatfieldmetadatapairutil = require("./generate-morph-or-relation-flat-field-metadata-pair.util");
const _getmorphnamefrommorphfieldmetadatanameutil = require("../../flat-object-metadata/utils/get-morph-name-from-morph-field-metadata-name.util");
const computeFlatFieldToUpdateFromMorphRelationUpdatePayload = ({ flatApplication, flatFieldMetadataMaps, morphRelationsUpdatePayload, fieldMetadataToUpdate, flatObjectMetadataMaps })=>{
    const flatFieldMetadatasToCreate = [];
    const flatIndexMetadatasToCreate = [];
    if (!(0, _utils.isDefined)(morphRelationsUpdatePayload)) {
        return {
            flatFieldMetadatasToCreate,
            flatIndexMetadatasToCreate
        };
    }
    const sourceObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityId: fieldMetadataToUpdate.objectMetadataId,
        flatEntityMaps: flatObjectMetadataMaps
    });
    const morphRelationsCommonLabel = fieldMetadataToUpdate.label;
    const initialFlatFieldMetadataTargetObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityId: fieldMetadataToUpdate.relationTargetObjectMetadataId,
        flatEntityMaps: flatObjectMetadataMaps
    });
    const morphNameWithoutObjectName = (0, _getmorphnamefrommorphfieldmetadatanameutil.getMorphNameFromMorphFieldMetadataName)({
        morphRelationFlatFieldMetadata: {
            name: fieldMetadataToUpdate.name,
            universalSettings: fieldMetadataToUpdate.universalSettings
        },
        nameSingular: initialFlatFieldMetadataTargetObjectMetadata.nameSingular,
        namePlural: initialFlatFieldMetadataTargetObjectMetadata.namePlural
    });
    const initialTargetFieldMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityId: fieldMetadataToUpdate.relationTargetFieldMetadataId,
        flatEntityMaps: flatFieldMetadataMaps
    });
    const commonTargetFieldLabel = initialTargetFieldMetadata.label;
    const commonTargetFieldName = initialTargetFieldMetadata.name;
    const { junctionTargetFieldId } = (0, _extractjunctiontargetsettingsfromsettingsutil.extractJunctionTargetSettingsFromSettings)(fieldMetadataToUpdate.settings);
    const junctionTargetFlatFieldMetadata = (0, _utils.isDefined)(junctionTargetFieldId) ? (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: junctionTargetFieldId,
        flatEntityMaps: flatFieldMetadataMaps
    }) : undefined;
    morphRelationsUpdatePayload.forEach((morphRelationUpdatePayload)=>{
        const { targetObjectMetadataId } = morphRelationUpdatePayload;
        const newTargetObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: targetObjectMetadataId,
            flatEntityMaps: flatObjectMetadataMaps
        });
        const computedMorphName = (0, _computemorphrelationflatfieldnameutil.computeMorphRelationFlatFieldName)({
            fieldName: morphNameWithoutObjectName,
            relationType: fieldMetadataToUpdate.settings.relationType,
            targetObjectMetadataNameSingular: newTargetObjectMetadata.nameSingular,
            targetObjectMetadataNamePlural: newTargetObjectMetadata.namePlural
        });
        const { flatFieldMetadatas, indexMetadatas } = (0, _generatemorphorrelationflatfieldmetadatapairutil.generateMorphOrRelationFlatFieldMetadataPair)({
            createFieldInput: {
                type: _types.FieldMetadataType.MORPH_RELATION,
                name: computedMorphName,
                label: morphRelationsCommonLabel,
                relationCreationPayload: {
                    type: fieldMetadataToUpdate.settings.relationType,
                    targetObjectMetadataId,
                    targetFieldLabel: commonTargetFieldLabel,
                    targetFieldIcon: fieldMetadataToUpdate.icon ?? 'Icon123'
                }
            },
            sourceFlatObjectMetadata: sourceObjectMetadata,
            targetFlatObjectMetadata: newTargetObjectMetadata,
            targetFlatFieldMetadataType: _types.FieldMetadataType.RELATION,
            flatApplication,
            sourceFlatObjectMetadataJoinColumnName: (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                name: computedMorphName
            }),
            morphId: fieldMetadataToUpdate.morphId,
            targetFieldName: commonTargetFieldName,
            junctionTargetFlatFieldMetadata
        });
        flatFieldMetadatasToCreate.push(...flatFieldMetadatas);
        flatIndexMetadatasToCreate.push(...indexMetadatas);
    });
    return {
        flatFieldMetadatasToCreate,
        flatIndexMetadatasToCreate
    };
};

//# sourceMappingURL=compute-flat-field-to-update-from-morph-relation-update-payload.util.js.map