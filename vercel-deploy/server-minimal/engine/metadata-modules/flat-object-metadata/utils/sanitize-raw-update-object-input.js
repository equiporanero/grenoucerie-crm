"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sanitizeRawUpdateObjectInput", {
    enumerable: true,
    get: function() {
        return sanitizeRawUpdateObjectInput;
    }
});
const _utils = require("twenty-shared/utils");
const _flatobjectmetadataeditablepropertiesconstant = require("../constants/flat-object-metadata-editable-properties.constant");
const _objectmetadatastandardoverridespropertiesconstant = require("../../object-metadata/constants/object-metadata-standard-overrides-properties.constant");
const _objectmetadataexception = require("../../object-metadata/object-metadata.exception");
const _belongstotwentystandardapputil = require("../../utils/belongs-to-twenty-standard-app.util");
const sanitizeRawUpdateObjectInput = ({ existingFlatObjectMetadata, rawUpdateObjectInput })=>{
    const isStandardObject = (0, _belongstotwentystandardapputil.belongsToTwentyStandardApp)(existingFlatObjectMetadata);
    const updatedEditableObjectProperties = (0, _utils.extractAndSanitizeObjectStringFields)(rawUpdateObjectInput.update, [
        ...new Set([
            ..._flatobjectmetadataeditablepropertiesconstant.FLAT_OBJECT_METADATA_EDITABLE_PROPERTIES.standard,
            ..._flatobjectmetadataeditablepropertiesconstant.FLAT_OBJECT_METADATA_EDITABLE_PROPERTIES.custom
        ])
    ]);
    if (!isStandardObject) {
        return {
            updatedEditableObjectProperties,
            standardOverrides: null
        };
    }
    const invalidUpdatedProperties = Object.keys(updatedEditableObjectProperties).filter((property)=>!_flatobjectmetadataeditablepropertiesconstant.FLAT_OBJECT_METADATA_EDITABLE_PROPERTIES.standard.includes(property));
    if (invalidUpdatedProperties.length > 0) {
        throw new _objectmetadataexception.ObjectMetadataException(`Cannot edit standard object metadata properties: ${invalidUpdatedProperties.join(', ')}`, _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT);
    }
    const standardOverrides = _objectmetadatastandardoverridespropertiesconstant.OBJECT_METADATA_STANDARD_OVERRIDES_PROPERTIES.reduce((standardOverrides, property)=>{
        const propertyValue = updatedEditableObjectProperties[property];
        const isPropertyUpdated = updatedEditableObjectProperties[property] !== undefined;
        if (!isPropertyUpdated) {
            return standardOverrides;
        }
        delete updatedEditableObjectProperties[property];
        if (propertyValue === existingFlatObjectMetadata[property]) {
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
    }, existingFlatObjectMetadata.standardOverrides);
    if ((0, _utils.isDefined)(standardOverrides) && Object.keys(standardOverrides).length === 0) {
        return {
            standardOverrides: null,
            updatedEditableObjectProperties
        };
    }
    return {
        standardOverrides,
        updatedEditableObjectProperties
    };
};

//# sourceMappingURL=sanitize-raw-update-object-input.js.map