"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateMorphRelationCreationPayload", {
    enumerable: true,
    get: function() {
        return validateMorphRelationCreationPayload;
    }
});
const _classvalidator = require("class-validator");
const _standarderrormessageconstant = require("../../../../api/common/common-query-runners/errors/standard-error-message.constant");
const _fieldmetadataexception = require("../../../field-metadata/field-metadata.exception");
const _validaterelationcreationpayloadutil = require("./validate-relation-creation-payload.util");
const validateMorphRelationCreationPayload = async ({ existingFlatObjectMetadataMaps, morphRelationCreationPayload, objectMetadataUniversalIdentifier })=>{
    if (morphRelationCreationPayload.length === 0) {
        return {
            status: 'fail',
            errors: [
                {
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_RELATION_MALFORMED,
                    message: 'Morph relation creation payloads are empty',
                    userFriendlyMessage: /*i18n*/ {
                        id: "IlaQdj",
                        message: "At least one relation is required"
                    }
                }
            ]
        };
    }
    const allRelationType = [
        ...new Set(morphRelationCreationPayload.map((relationCreationPayload)=>relationCreationPayload.type))
    ];
    if (allRelationType.length > 1) {
        return {
            status: 'fail',
            errors: [
                {
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_RELATION_MALFORMED,
                    message: 'Morph relation creation payloads must have the same relation type',
                    userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                }
            ]
        };
    }
    const allRelatedObjectMetadataIds = morphRelationCreationPayload.map((relationCreationPayload)=>relationCreationPayload.targetObjectMetadataId);
    const allRelatedObjectMetadataIdsSet = [
        ...new Set(allRelatedObjectMetadataIds)
    ];
    if (allRelatedObjectMetadataIdsSet.includes(objectMetadataUniversalIdentifier)) {
        return {
            status: 'fail',
            errors: [
                {
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_RELATION_MALFORMED,
                    message: 'Morph relation creation payloads must not target source object metadata',
                    userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                }
            ]
        };
    }
    if (allRelatedObjectMetadataIds.length !== allRelatedObjectMetadataIdsSet.length) {
        return {
            status: 'fail',
            errors: [
                {
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_RELATION_MALFORMED,
                    message: 'Morph relation creation payloads must have only relation to the same object metadata',
                    userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                }
            ]
        };
    }
    const relationCreationPayloadReport = {
        success: [],
        failed: []
    };
    for (const rawRelationCreationPayload of morphRelationCreationPayload){
        const relationValidationResult = await (0, _validaterelationcreationpayloadutil.validateRelationCreationPayload)({
            existingFlatObjectMetadataMaps,
            relationCreationPayload: rawRelationCreationPayload
        });
        if (relationValidationResult.status === 'fail') {
            relationCreationPayloadReport.failed.push(relationValidationResult);
            continue;
        }
        const { relationCreationPayload, targetFlatObjectMetadata } = relationValidationResult.result;
        relationCreationPayloadReport.success.push({
            status: 'success',
            result: {
                relationCreationPayload,
                targetFlatObjectMetadata
            }
        });
    }
    if (relationCreationPayloadReport.failed.length > 0) {
        return {
            status: 'fail',
            errors: [
                {
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_RELATION_MALFORMED,
                    message: 'Morph relation input transpilation failed',
                    userFriendlyMessage: /*i18n*/ {
                        id: "sDfyvM",
                        message: "Invalid morph relation input"
                    },
                    value: relationCreationPayloadReport.failed.flatMap((failedTranspilation)=>failedTranspilation.errors.map((error)=>error.value)).filter(_classvalidator.isDefined)
                }
            ]
        };
    }
    return {
        status: 'success',
        result: relationCreationPayloadReport.success.map((relationCreationPayloadValidation)=>relationCreationPayloadValidation.result)
    };
};

//# sourceMappingURL=validate-morph-relation-creation-payload.util.js.map