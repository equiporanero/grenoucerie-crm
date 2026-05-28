"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateObjectMetadataSystemFieldsIntegrity", {
    enumerable: true,
    get: function() {
        return validateObjectMetadataSystemFieldsIntegrity;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _partialsystemflatfieldmetadatasconstant = require("../../../object-metadata/constants/partial-system-flat-field-metadatas.constant");
const _objectmetadataexception = require("../../../object-metadata/object-metadata.exception");
const _builduniversalflatobjectfieldbynameandjoincolumnmapsutil = require("../../../../workspace-manager/workspace-migration/workspace-migration-builder/utils/build-universal-flat-object-field-by-name-and-join-column-maps.util");
const validateObjectMetadataSystemFieldsIntegrity = ({ universalFlatFieldMetadataMaps, universalFlatObjectMetadata })=>{
    const errors = [];
    const { fieldUniversalIdentifierByName } = (0, _builduniversalflatobjectfieldbynameandjoincolumnmapsutil.buildUniversalFlatObjectFieldByNameAndJoinColumnMaps)({
        flatFieldMetadataMaps: universalFlatFieldMetadataMaps,
        flatObjectMetadata: universalFlatObjectMetadata
    });
    for (const expectedSystemField of Object.values(_partialsystemflatfieldmetadatasconstant.PARTIAL_SYSTEM_FLAT_FIELD_METADATAS)){
        const matchingFieldUniversalIdentifier = fieldUniversalIdentifierByName[expectedSystemField.name];
        const expectedFieldName = expectedSystemField.name;
        if (!(0, _utils.isDefined)(matchingFieldUniversalIdentifier)) {
            errors.push({
                code: _objectmetadataexception.ObjectMetadataExceptionCode.MISSING_SYSTEM_FIELD,
                message: `System field ${expectedFieldName} is missing`,
                userFriendlyMessage: /*i18n*/ {
                    id: "1gOTOh",
                    message: "System field {expectedFieldName} is missing",
                    values: {
                        expectedFieldName: expectedFieldName
                    }
                },
                value: expectedFieldName
            });
        } else {
            const universalFlatFieldMetadata = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
                flatEntityMaps: universalFlatFieldMetadataMaps,
                universalIdentifier: matchingFieldUniversalIdentifier
            });
            const propertiesToValidate = [
                'type',
                'isSystem'
            ];
            for (const property of propertiesToValidate){
                const expectedValue = expectedSystemField[property];
                const actualValue = universalFlatFieldMetadata[property];
                if (actualValue !== expectedValue) {
                    errors.push({
                        code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_SYSTEM_FIELD,
                        message: `System field ${expectedFieldName} has invalid ${property}: expected ${String(expectedValue)}, got ${String(actualValue)}`,
                        userFriendlyMessage: /*i18n*/ {
                            id: "Bhmfez",
                            message: "System field {expectedFieldName} has invalid {property}",
                            values: {
                                expectedFieldName: expectedFieldName,
                                property: property
                            }
                        },
                        value: actualValue
                    });
                }
            }
        }
    }
    return errors;
};

//# sourceMappingURL=validate-object-metadata-system-fields-integrity.util.js.map