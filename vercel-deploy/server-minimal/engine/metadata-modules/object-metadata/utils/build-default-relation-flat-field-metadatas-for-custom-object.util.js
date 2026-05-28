"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildDefaultRelationFlatFieldMetadatasForCustomObject", {
    enumerable: true,
    get: function() {
        return buildDefaultRelationFlatFieldMetadatasForCustomObject;
    }
});
const _metadata = require("twenty-shared/metadata");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _relationtypeinterface = require("../../field-metadata/interfaces/relation-type.interface");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _generatemorphorrelationflatfieldmetadatapairutil = require("../../flat-field-metadata/utils/generate-morph-or-relation-flat-field-metadata-pair.util");
const _objectmetadataexception = require("../object-metadata.exception");
const _standardobjecticons = require("../../../workspace-manager/workspace-migration/constant/standard-object-icons");
const morphIdByRelationObjectNameSingular = {
    timelineActivity: _metadata.STANDARD_OBJECTS.timelineActivity.morphIds.targetMorphId.morphId,
    attachment: _metadata.STANDARD_OBJECTS.attachment.morphIds.targetMorphId.morphId,
    noteTarget: _metadata.STANDARD_OBJECTS.noteTarget.morphIds.targetMorphId.morphId,
    taskTarget: _metadata.STANDARD_OBJECTS.taskTarget.morphIds.targetMorphId.morphId
};
const EMPTY_SOURCE_AND_TARGET_FLAT_FIELD_METADATAS_RECORD = {
    standardSourceFlatFieldMetadatas: [],
    standardTargetFlatFieldMetadatas: [],
    standardTargetFlatIndexMetadatas: []
};
const buildDefaultRelationFlatFieldMetadatasForCustomObject = ({ existingFlatObjectMetadataMaps, sourceFlatObjectMetadata, flatApplication })=>{
    const objectIdByNameSingular = Object.values(existingFlatObjectMetadataMaps.byUniversalIdentifier).reduce((acc, flatObject)=>{
        if (!(0, _utils.isDefined)(flatObject)) {
            return acc;
        }
        return {
            ...acc,
            [flatObject.nameSingular]: flatObject.id
        };
    }, {});
    const result = _metadata.DEFAULT_RELATIONS_OBJECTS_STANDARD_IDS.reduce((sourceAndTargetFlatFieldMetadatasRecord, objectMetadataNameSingular)=>{
        const isObjectMigratedToMorphRelations = objectMetadataNameSingular === 'timelineActivity' || objectMetadataNameSingular === 'attachment' || objectMetadataNameSingular === 'noteTarget' || objectMetadataNameSingular === 'taskTarget';
        const targetFlatObjectMetadataId = objectIdByNameSingular[objectMetadataNameSingular];
        if (!(0, _utils.isDefined)(targetFlatObjectMetadataId)) {
            throw new _objectmetadataexception.ObjectMetadataException(`Standard target object metadata id ${targetFlatObjectMetadataId} not found in cache`, _objectmetadataexception.ObjectMetadataExceptionCode.INTERNAL_SERVER_ERROR);
        }
        const targetFlatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityMaps: existingFlatObjectMetadataMaps,
            flatEntityId: targetFlatObjectMetadataId
        });
        const icon = _standardobjecticons.STANDARD_OBJECT_ICONS[targetFlatObjectMetadata.nameSingular] || 'IconBuildingSkyscraper';
        const morphFieldName = `target${(0, _utils.capitalize)(sourceFlatObjectMetadata.nameSingular)}`;
        const fieldName = isObjectMigratedToMorphRelations ? morphFieldName : sourceFlatObjectMetadata.nameSingular;
        const joinColumnName = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
            name: fieldName
        });
        const morphId = morphIdByRelationObjectNameSingular[objectMetadataNameSingular];
        const { flatFieldMetadatas, indexMetadatas } = (0, _generatemorphorrelationflatfieldmetadatapairutil.generateMorphOrRelationFlatFieldMetadataPair)({
            sourceFlatObjectMetadata,
            targetFlatObjectMetadata,
            targetFlatFieldMetadataType: isObjectMigratedToMorphRelations ? _types.FieldMetadataType.MORPH_RELATION : _types.FieldMetadataType.RELATION,
            flatApplication,
            sourceFlatObjectMetadataJoinColumnName: joinColumnName,
            morphId,
            targetFieldName: fieldName,
            createFieldInput: {
                icon: 'IconBuildingSkyscraper',
                type: _types.FieldMetadataType.RELATION,
                name: targetFlatObjectMetadata.namePlural,
                label: (0, _utils.capitalize)(targetFlatObjectMetadata.labelPlural),
                isSystem: false,
                relationCreationPayload: {
                    type: _relationtypeinterface.RelationType.ONE_TO_MANY,
                    targetObjectMetadataId: targetFlatObjectMetadata.id,
                    targetFieldLabel: (0, _utils.capitalize)(sourceFlatObjectMetadata.nameSingular),
                    targetFieldIcon: icon
                }
            }
        });
        return {
            standardSourceFlatFieldMetadatas: [
                ...sourceAndTargetFlatFieldMetadatasRecord.standardSourceFlatFieldMetadatas,
                flatFieldMetadatas[0]
            ],
            standardTargetFlatFieldMetadatas: [
                ...sourceAndTargetFlatFieldMetadatasRecord.standardTargetFlatFieldMetadatas,
                flatFieldMetadatas[1]
            ],
            standardTargetFlatIndexMetadatas: [
                ...sourceAndTargetFlatFieldMetadatasRecord.standardTargetFlatIndexMetadatas,
                ...indexMetadatas
            ]
        };
    }, EMPTY_SOURCE_AND_TARGET_FLAT_FIELD_METADATAS_RECORD);
    return result;
};

//# sourceMappingURL=build-default-relation-flat-field-metadatas-for-custom-object.util.js.map