"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateMorphOrRelationFlatFieldJoinColumName", {
    enumerable: true,
    get: function() {
        return validateMorphOrRelationFlatFieldJoinColumName;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _fieldmetadataexception = require("../../../field-metadata/field-metadata.exception");
const _findflatentitybyuniversalidentifierutil = require("../../../flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _validateflatfieldmetadatanameavailabilityutil = require("./validate-flat-field-metadata-name-availability.util");
const validateMorphOrRelationFlatFieldJoinColumName = ({ universalFlatFieldMetadata, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatFieldMetadataMaps, flatObjectMetadataMaps }, buildOptions })=>{
    const errors = [];
    if (!(0, _utils.isDefined)(universalFlatFieldMetadata.universalSettings?.relationType)) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: `Relation field "${universalFlatFieldMetadata.name}" is missing relationType in universalSettings. Expected MANY_TO_ONE or ONE_TO_MANY.`
        });
        return errors;
    }
    switch(universalFlatFieldMetadata.universalSettings.relationType){
        case _types.RelationType.MANY_TO_ONE:
            {
                if (!(0, _utils.isDefined)(universalFlatFieldMetadata.universalSettings.joinColumnName)) {
                    errors.push({
                        code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
                        message: 'Many to one field metadata should carry the join column name in its settings'
                    });
                    return errors;
                }
                const universalFlatObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                    universalIdentifier: universalFlatFieldMetadata.objectMetadataUniversalIdentifier,
                    flatEntityMaps: flatObjectMetadataMaps
                });
                if (!(0, _utils.isDefined)(universalFlatObjectMetadata)) {
                    errors.push({
                        code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
                        message: 'Could not find relation field parent flat object'
                    });
                    return errors;
                }
                errors.push(...(0, _validateflatfieldmetadatanameavailabilityutil.validateFlatFieldMetadataNameAvailability)({
                    name: universalFlatFieldMetadata.universalSettings.joinColumnName,
                    universalFlatFieldMetadataMaps: flatFieldMetadataMaps,
                    universalFlatObjectMetadata,
                    buildOptions
                }));
                break;
            }
        case _types.RelationType.ONE_TO_MANY:
            {
                if ((0, _utils.isDefined)(universalFlatFieldMetadata.universalSettings.joinColumnName)) {
                    errors.push({
                        code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
                        message: 'One to many field metadata should not carry the join column name in its settings'
                    });
                }
                break;
            }
        default:
            {
                (0, _utils.assertUnreachable)(universalFlatFieldMetadata.universalSettings.relationType);
            }
    }
    return errors;
};

//# sourceMappingURL=validate-morph-or-relation-flat-field-join-column-name.util.js.map