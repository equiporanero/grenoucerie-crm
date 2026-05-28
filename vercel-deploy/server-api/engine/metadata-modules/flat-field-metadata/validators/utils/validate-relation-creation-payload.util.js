"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateRelationCreationPayload", {
    enumerable: true,
    get: function() {
        return validateRelationCreationPayload;
    }
});
const _utils = require("twenty-shared/utils");
const _fieldmetadataexception = require("../../../field-metadata/field-metadata.exception");
const _validaterelationcreationpayloadorthrowutil = require("../../../field-metadata/utils/validate-relation-creation-payload-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const validateRelationCreationPayload = async ({ existingFlatObjectMetadataMaps, relationCreationPayload: rawRelationCreationPayload })=>{
    const relationCreationPayload = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawRelationCreationPayload, [
        'targetFieldIcon',
        'targetFieldLabel',
        'targetObjectMetadataId',
        'type'
    ]);
    try {
        await (0, _validaterelationcreationpayloadorthrowutil.validateRelationCreationPayloadOrThrow)(relationCreationPayload);
    } catch (error) {
        if (error instanceof _fieldmetadataexception.FieldMetadataException) {
            return {
                status: 'fail',
                errors: [
                    {
                        code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_RELATION_MALFORMED,
                        message: error.message ?? `Relation creation payload is invalid`,
                        userFriendlyMessage: /*i18n*/ {
                            id: "AXZsy/",
                            message: "Invalid relation creation payload"
                        },
                        value: relationCreationPayload
                    }
                ]
            };
        } else {
            throw error;
        }
    }
    const targetFlatObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: relationCreationPayload.targetObjectMetadataId,
        flatEntityMaps: existingFlatObjectMetadataMaps
    });
    if (!(0, _utils.isDefined)(targetFlatObjectMetadata)) {
        return {
            status: 'fail',
            errors: [
                {
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_RELATION_MALFORMED,
                    message: `Object metadata relation target not found for relation creation payload`,
                    userFriendlyMessage: /*i18n*/ {
                        id: "6unt40",
                        message: "Object targeted by field to create not found"
                    },
                    value: relationCreationPayload
                }
            ]
        };
    }
    return {
        status: 'success',
        result: {
            relationCreationPayload,
            targetFlatObjectMetadata
        }
    };
};

//# sourceMappingURL=validate-relation-creation-payload.util.js.map