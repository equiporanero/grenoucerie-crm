"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromMorphRelationCreateFieldInputToFlatFieldMetadatas", {
    enumerable: true,
    get: function() {
        return fromMorphRelationCreateFieldInputToFlatFieldMetadatas;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _computemorphrelationflatfieldnameutil = require("../../field-metadata/utils/compute-morph-relation-flat-field-name.util");
const _fieldmetadataexception = require("../../field-metadata/field-metadata.exception");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _extractjunctiontargetsettingsfromsettingsutil = require("./extract-junction-target-settings-from-settings.util");
const _generatemorphorrelationflatfieldmetadatapairutil = require("./generate-morph-or-relation-flat-field-metadata-pair.util");
const _validatemorphrelationcreationpayloadutil = require("../validators/utils/validate-morph-relation-creation-payload.util");
const fromMorphRelationCreateFieldInputToFlatFieldMetadatas = async ({ createFieldInput, existingFlatObjectMetadataMaps, existingFlatFieldMetadataMaps, sourceFlatObjectMetadata, flatApplication })=>{
    const rawMorphCreationPayload = createFieldInput.morphRelationsCreationPayload;
    if (!(0, _utils.isDefined)(rawMorphCreationPayload) || !Array.isArray(rawMorphCreationPayload)) {
        return {
            status: 'fail',
            errors: [
                {
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
                    message: `Relation creation payload is required`,
                    userFriendlyMessage: /*i18n*/ {
                        id: "+bFtT5",
                        message: "Relation creation payload is required"
                    },
                    value: rawMorphCreationPayload
                }
            ]
        };
    }
    const morphRelationCreationPayloadValidation = await (0, _validatemorphrelationcreationpayloadutil.validateMorphRelationCreationPayload)({
        existingFlatObjectMetadataMaps,
        morphRelationCreationPayload: rawMorphCreationPayload,
        objectMetadataUniversalIdentifier: sourceFlatObjectMetadata.universalIdentifier
    });
    if (morphRelationCreationPayloadValidation.status === 'fail') {
        return morphRelationCreationPayloadValidation;
    }
    const { junctionTargetFieldId } = (0, _extractjunctiontargetsettingsfromsettingsutil.extractJunctionTargetSettingsFromSettings)(createFieldInput.settings);
    const junctionTargetFlatFieldMetadata = (0, _utils.isDefined)(junctionTargetFieldId) ? (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: junctionTargetFieldId,
        flatEntityMaps: existingFlatFieldMetadataMaps
    }) : undefined;
    const morphRelationCreationPayload = morphRelationCreationPayloadValidation.result;
    const morphId = (0, _uuid.v4)();
    const flatFieldsAndIndexes = morphRelationCreationPayload.reduce((acc, { relationCreationPayload, targetFlatObjectMetadata })=>{
        const currentMorphRelationFieldName = (0, _computemorphrelationflatfieldnameutil.computeMorphRelationFlatFieldName)({
            fieldName: createFieldInput.name,
            relationType: relationCreationPayload.type,
            targetObjectMetadataNameSingular: targetFlatObjectMetadata.nameSingular,
            targetObjectMetadataNamePlural: targetFlatObjectMetadata.namePlural
        });
        const sourceFlatObjectMetadataJoinColumnName = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
            name: currentMorphRelationFieldName
        });
        const { flatFieldMetadatas, indexMetadatas } = (0, _generatemorphorrelationflatfieldmetadatapairutil.generateMorphOrRelationFlatFieldMetadataPair)({
            createFieldInput: {
                ...createFieldInput,
                relationCreationPayload,
                name: currentMorphRelationFieldName
            },
            sourceFlatObjectMetadataJoinColumnName,
            sourceFlatObjectMetadata,
            targetFlatObjectMetadata,
            targetFlatFieldMetadataType: _types.FieldMetadataType.RELATION,
            morphId,
            flatApplication,
            junctionTargetFlatFieldMetadata
        });
        return {
            indexMetadatas: [
                ...acc.indexMetadatas,
                ...indexMetadatas
            ],
            flatFieldMetadatas: [
                ...acc.flatFieldMetadatas,
                ...flatFieldMetadatas
            ]
        };
    }, {
        indexMetadatas: [],
        flatFieldMetadatas: []
    });
    return {
        status: 'success',
        result: flatFieldsAndIndexes
    };
};

//# sourceMappingURL=from-morph-relation-create-field-input-to-flat-field-metadatas.util.js.map