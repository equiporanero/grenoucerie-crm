"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromRelationCreateFieldInputToFlatFieldMetadatas", {
    enumerable: true,
    get: function() {
        return fromRelationCreateFieldInputToFlatFieldMetadatas;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _fieldmetadataexception = require("../../field-metadata/field-metadata.exception");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _extractjunctiontargetsettingsfromsettingsutil = require("./extract-junction-target-settings-from-settings.util");
const _generatemorphorrelationflatfieldmetadatapairutil = require("./generate-morph-or-relation-flat-field-metadata-pair.util");
const _validaterelationcreationpayloadutil = require("../validators/utils/validate-relation-creation-payload.util");
const fromRelationCreateFieldInputToFlatFieldMetadatas = async ({ existingFlatObjectMetadataMaps, existingFlatFieldMetadataMaps, sourceFlatObjectMetadata, createFieldInput, flatApplication })=>{
    const rawCreationPayload = createFieldInput.relationCreationPayload;
    if (!(0, _utils.isDefined)(rawCreationPayload)) {
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
                    value: rawCreationPayload
                }
            ]
        };
    }
    const relationValidationResult = await (0, _validaterelationcreationpayloadutil.validateRelationCreationPayload)({
        existingFlatObjectMetadataMaps,
        relationCreationPayload: rawCreationPayload
    });
    if (relationValidationResult.status === 'fail') {
        return relationValidationResult;
    }
    const { relationCreationPayload, targetFlatObjectMetadata } = relationValidationResult.result;
    const { junctionTargetFieldId } = (0, _extractjunctiontargetsettingsfromsettingsutil.extractJunctionTargetSettingsFromSettings)(createFieldInput.settings);
    const junctionTargetFlatFieldMetadata = (0, _utils.isDefined)(junctionTargetFieldId) ? (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: junctionTargetFieldId,
        flatEntityMaps: existingFlatFieldMetadataMaps
    }) : undefined;
    const generateResult = (0, _generatemorphorrelationflatfieldmetadatapairutil.generateMorphOrRelationFlatFieldMetadataPair)({
        createFieldInput: {
            ...createFieldInput,
            relationCreationPayload
        },
        sourceFlatObjectMetadataJoinColumnName: (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
            name: createFieldInput.name
        }),
        sourceFlatObjectMetadata,
        targetFlatObjectMetadata,
        targetFlatFieldMetadataType: _types.FieldMetadataType.RELATION,
        flatApplication,
        junctionTargetFlatFieldMetadata
    });
    return {
        status: 'success',
        result: generateResult
    };
};

//# sourceMappingURL=from-relation-create-field-input-to-flat-field-metadatas.util.js.map