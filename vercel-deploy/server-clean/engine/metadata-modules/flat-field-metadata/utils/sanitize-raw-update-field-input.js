"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sanitizeRawUpdateFieldInput", {
    enumerable: true,
    get: function() {
        return sanitizeRawUpdateFieldInput;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _fieldmetadatastandardoverridespropertiesconstant = require("../../field-metadata/constants/field-metadata-standard-overrides-properties.constant");
const _fieldmetadataexception = require("../../field-metadata/field-metadata.exception");
const _flatfieldmetadataeditablepropertiesconstant = require("../constants/flat-field-metadata-editable-properties.constant");
const _iscompositefieldmetadatatypeutil = require("../../field-metadata/utils/is-composite-field-metadata-type.util");
const _nullifyemptycompositedefaultvalueutil = require("./nullify-empty-composite-default-value.util");
const _belongstotwentystandardapputil = require("../../utils/belongs-to-twenty-standard-app.util");
const sanitizeRawUpdateFieldInput = ({ existingFlatFieldMetadata, rawUpdateFieldInput, isSystemBuild })=>{
    const isStandardField = (0, _belongstotwentystandardapputil.belongsToTwentyStandardApp)(existingFlatFieldMetadata);
    const updatedEditableFieldProperties = (0, _utils.extractAndSanitizeObjectStringFields)(rawUpdateFieldInput, [
        ...new Set([
            ..._flatfieldmetadataeditablepropertiesconstant.FLAT_FIELD_METADATA_EDITABLE_PROPERTIES.standard,
            ..._flatfieldmetadataeditablepropertiesconstant.FLAT_FIELD_METADATA_EDITABLE_PROPERTIES.custom
        ])
    ]);
    updatedEditableFieldProperties.options = !(0, _utils.isDefined)(updatedEditableFieldProperties.options) ? updatedEditableFieldProperties.options : updatedEditableFieldProperties.options.map((option)=>({
            id: (0, _uuid.v4)(),
            ...option
        }));
    if (updatedEditableFieldProperties.defaultValue !== undefined && (0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(existingFlatFieldMetadata.type)) {
        updatedEditableFieldProperties.defaultValue = (0, _nullifyemptycompositedefaultvalueutil.nullifyEmptyCompositeDefaultValue)({
            defaultValue: updatedEditableFieldProperties.defaultValue,
            fieldType: existingFlatFieldMetadata.type
        });
    }
    if (!isStandardField || isSystemBuild) {
        return {
            updatedEditableFieldProperties,
            standardOverrides: null
        };
    }
    const invalidUpdatedProperties = Object.keys(updatedEditableFieldProperties).filter((property)=>!_flatfieldmetadataeditablepropertiesconstant.FLAT_FIELD_METADATA_EDITABLE_PROPERTIES.standard.includes(property));
    if (invalidUpdatedProperties.length > 0) {
        throw new _fieldmetadataexception.FieldMetadataException(`Cannot edit standard field metadata properties: ${invalidUpdatedProperties.join(', ')}`, _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_MUTATION_NOT_ALLOWED);
    }
    const standardOverrides = _fieldmetadatastandardoverridespropertiesconstant.FIELD_METADATA_STANDARD_OVERRIDES_PROPERTIES.reduce((standardOverrides, property)=>{
        const propertyValue = updatedEditableFieldProperties[property];
        const isPropertyUpdated = updatedEditableFieldProperties[property] !== undefined;
        if (!isPropertyUpdated) {
            return standardOverrides;
        }
        delete updatedEditableFieldProperties[property];
        if (propertyValue === existingFlatFieldMetadata[property]) {
            if ((0, _utils.isDefined)(standardOverrides) && Object.prototype.hasOwnProperty.call(standardOverrides, property)) {
                const { [property]: _, ...restOverrides } = standardOverrides;
                return restOverrides;
            }
            return standardOverrides;
        }
        return {
            ...standardOverrides,
            [property]: propertyValue
        };
    }, existingFlatFieldMetadata.standardOverrides);
    if ((0, _utils.isDefined)(standardOverrides) && Object.keys(standardOverrides).length === 0) {
        return {
            standardOverrides: null,
            updatedEditableFieldProperties
        };
    }
    return {
        standardOverrides,
        updatedEditableFieldProperties
    };
};

//# sourceMappingURL=sanitize-raw-update-field-input.js.map