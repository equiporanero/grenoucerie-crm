"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateFlatFieldMetadataNameAvailability", {
    enumerable: true,
    get: function() {
        return validateFlatFieldMetadataNameAvailability;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _fieldmetadataexception = require("../../../field-metadata/field-metadata.exception");
const _computecolumnnameutil = require("../../../field-metadata/utils/compute-column-name.util");
const _iscompositefieldmetadatatypeutil = require("../../../field-metadata/utils/is-composite-field-metadata-type.util");
const _findmanyflatentitybyuniversalidentifierinuniversalflatentitymapsutil = require("../../../flat-entity/utils/find-many-flat-entity-by-universal-identifier-in-universal-flat-entity-maps.util");
const _getobjectfieldnamesandjoincolumnnamesutil = require("../../utils/get-object-field-names-and-join-column-names.util");
const _iscallertwentystandardapputil = require("../../../utils/is-caller-twenty-standard-app.util");
const getReservedCompositeFieldNames = (objectUniversalFlatFieldMetadatas)=>{
    return objectUniversalFlatFieldMetadatas.flatMap((universalFlatFieldMetadata)=>{
        if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(universalFlatFieldMetadata.type)) {
            const base = universalFlatFieldMetadata.name;
            const compositeType = _types.compositeTypeDefinitions.get(universalFlatFieldMetadata.type);
            if (!(0, _utils.isDefined)(compositeType)) {
                return [];
            }
            return compositeType.properties.map((property)=>(0, _computecolumnnameutil.computeCompositeColumnName)(base, property));
        }
        return [];
    });
};
const validateFlatFieldMetadataNameAvailability = ({ name, universalFlatFieldMetadataMaps, universalFlatObjectMetadata, buildOptions })=>{
    const errors = [];
    const objectUniversalFlatFieldMetadatas = (0, _findmanyflatentitybyuniversalidentifierinuniversalflatentitymapsutil.findManyFlatEntityByUniversalIdentifierInUniversalFlatEntityMaps)({
        flatEntityMaps: universalFlatFieldMetadataMaps,
        universalIdentifiers: universalFlatObjectMetadata.fieldUniversalIdentifiers
    });
    const reservedCompositeFieldsNames = getReservedCompositeFieldNames(objectUniversalFlatFieldMetadatas);
    if (!(0, _iscallertwentystandardapputil.isCallerTwentyStandardApp)(buildOptions) && reservedCompositeFieldsNames.includes(name)) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.RESERVED_KEYWORD,
            message: `Name "${name}" is reserved composite field name`,
            value: name,
            userFriendlyMessage: /*i18n*/ {
                id: "2m6Fru",
                message: 'Name "{name}" is not available',
                values: {
                    name: name
                }
            }
        });
    }
    const { objectFieldNamesAndJoinColumnNames } = (0, _getobjectfieldnamesandjoincolumnnamesutil.getObjectFieldNamesAndJoinColumnNames)({
        universalFlatFieldMetadataMaps,
        universalFlatObjectMetadata
    });
    if (objectFieldNamesAndJoinColumnNames.fieldNames.includes(name)) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.NOT_AVAILABLE,
            value: name,
            message: `Name "${name}" is not available as it is already used by another field`,
            userFriendlyMessage: /*i18n*/ {
                id: "U8mbyw",
                message: 'Name "{name}" is not available as it is already used by another field',
                values: {
                    name: name
                }
            }
        });
    }
    if (objectFieldNamesAndJoinColumnNames.joinColumnNames.includes(name)) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.NOT_AVAILABLE,
            value: name,
            message: `Name "${name}" is not available as it is already used by another join column name`,
            userFriendlyMessage: /*i18n*/ {
                id: "dBDpp2",
                message: 'Name "{name}" is not available as it is already used by join column name',
                values: {
                    name: name
                }
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-flat-field-metadata-name-availability.util.js.map