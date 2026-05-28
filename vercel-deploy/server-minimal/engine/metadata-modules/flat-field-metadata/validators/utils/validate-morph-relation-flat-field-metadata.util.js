"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateMorphRelationFlatFieldMetadata", {
    enumerable: true,
    get: function() {
        return validateMorphRelationFlatFieldMetadata;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _fieldmetadataexception = require("../../../field-metadata/field-metadata.exception");
const _findflatentitybyuniversalidentifierutil = require("../../../flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _isflatfieldmetadataoftypeutil = require("../../utils/is-flat-field-metadata-of-type.util");
const _validatemorphorrelationflatfieldmetadatautil = require("./validate-morph-or-relation-flat-field-metadata.util");
const validateMorphRelationFlatFieldMetadata = (args)=>{
    const { flatEntityToValidate: universalFlatFieldMetadataToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatFieldMetadataMaps }, remainingFlatEntityMapsToValidate } = args;
    const { relationTargetFieldMetadataUniversalIdentifier } = universalFlatFieldMetadataToValidate;
    const errors = [];
    errors.push(...(0, _validatemorphorrelationflatfieldmetadatautil.validateMorphOrRelationFlatFieldMetadata)(args));
    const targetUniversalFlatFieldMetadata = (remainingFlatEntityMapsToValidate ? (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
        universalIdentifier: relationTargetFieldMetadataUniversalIdentifier,
        flatEntityMaps: remainingFlatEntityMapsToValidate
    }) : undefined) ?? (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
        universalIdentifier: relationTargetFieldMetadataUniversalIdentifier,
        flatEntityMaps: flatFieldMetadataMaps
    });
    if ((0, _utils.isDefined)(targetUniversalFlatFieldMetadata) && !(0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(targetUniversalFlatFieldMetadata, _types.FieldMetadataType.RELATION)) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: 'A morph relation field can only target a RELATION field',
            userFriendlyMessage: /*i18n*/ {
                id: "iWv3nK",
                message: "Invalid relation field target"
            }
        });
    }
    const sourceObjectMetadataUniversalIdentifier = universalFlatFieldMetadataToValidate.objectMetadataUniversalIdentifier;
    const targetObjectMetadataUniversalIdentifier = universalFlatFieldMetadataToValidate.relationTargetObjectMetadataUniversalIdentifier;
    if (sourceObjectMetadataUniversalIdentifier === targetObjectMetadataUniversalIdentifier) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: 'Source object cannot be the target object',
            userFriendlyMessage: /*i18n*/ {
                id: "OmgwCE",
                message: "Source object cannot be the target object"
            }
        });
    }
    if (!(0, _utils.isDefined)(universalFlatFieldMetadataToValidate.morphId)) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: 'Morph relation field must have a morph id',
            userFriendlyMessage: /*i18n*/ {
                id: "Lcqv5g",
                message: "Morph relation field must have a morph id"
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-morph-relation-flat-field-metadata.util.js.map