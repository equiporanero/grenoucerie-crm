"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateFlatObjectMetadataIdentifiers", {
    enumerable: true,
    get: function() {
        return validateFlatObjectMetadataIdentifiers;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _objectmetadataexception = require("../../../object-metadata/object-metadata.exception");
const validateFlatObjectMetadataIdentifiers = ({ universalFlatObjectMetadata, universalFlatFieldMetadataMaps })=>{
    const errors = [];
    const { labelIdentifierFieldMetadataUniversalIdentifier, imageIdentifierFieldMetadataUniversalIdentifier } = universalFlatObjectMetadata;
    // TODO should not be nullable
    if ((0, _utils.isDefined)(labelIdentifierFieldMetadataUniversalIdentifier)) {
        const universalFlatFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: labelIdentifierFieldMetadataUniversalIdentifier,
            flatEntityMaps: universalFlatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(universalFlatFieldMetadata)) {
            errors.push({
                code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
                message: 'labelIdentifierFieldMetadataUniversalIdentifier validation failed: related field metadata not found',
                userFriendlyMessage: /*i18n*/ {
                    id: "75hHpn",
                    message: "Field declared as label identifier not found"
                }
            });
        } else if (!(0, _utils.isLabelIdentifierFieldMetadataTypes)(universalFlatFieldMetadata.type)) {
            errors.push({
                code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
                message: 'labelIdentifierFieldMetadataUniversalIdentifier validation failed: field type not compatible',
                userFriendlyMessage: /*i18n*/ {
                    id: "QMSXe6",
                    message: "Field cannot be used as label identifier due to its type: should be of type UUID, text or full name"
                }
            });
        } else if (!(0, _utils.isSearchableFieldType)(universalFlatFieldMetadata.type)) {
            errors.push({
                code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
                message: 'labelIdentifierFieldMetadataUniversalIdentifier validation failed: field type not compatible',
                userFriendlyMessage: /*i18n*/ {
                    id: "e2V+x1",
                    message: "Field cannot be used as label identifier due to its type"
                }
            });
        }
    }
    if ((0, _utils.isDefined)(imageIdentifierFieldMetadataUniversalIdentifier)) {
        const relatedUniversalFlatFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: imageIdentifierFieldMetadataUniversalIdentifier,
            flatEntityMaps: universalFlatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(relatedUniversalFlatFieldMetadata)) {
            errors.push({
                code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
                message: 'imageIdentifierFieldMetadataUniversalIdentifier validation failed: related field metadata not found',
                userFriendlyMessage: /*i18n*/ {
                    id: "F6OLoA",
                    message: "Field declared as image identifier not found"
                }
            });
        }
    }
    return errors;
};

//# sourceMappingURL=validate-flat-object-metadata-identifiers.util.js.map