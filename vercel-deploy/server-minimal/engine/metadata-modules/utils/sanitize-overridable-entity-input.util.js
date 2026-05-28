"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sanitizeOverridableEntityInput", {
    enumerable: true,
    get: function() {
        return sanitizeOverridableEntityInput;
    }
});
const _lodashisequal = /*#__PURE__*/ _interop_require_default(require("lodash.isequal"));
const _utils = require("twenty-shared/utils");
const _alloverridablepropertiesbymetadatanameconstant = require("../flat-entity/constant/all-overridable-properties-by-metadata-name.constant");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const sanitizeOverridableEntityInput = ({ metadataName, existingFlatEntity, updatedEditableProperties, shouldOverride })=>{
    const existingOverrides = existingFlatEntity.overrides;
    if (!shouldOverride) {
        return {
            overrides: existingOverrides,
            updatedEditableProperties
        };
    }
    const sanitizedEditableProperties = {
        ...updatedEditableProperties
    };
    const overridableProperties = _alloverridablepropertiesbymetadatanameconstant.ALL_OVERRIDABLE_PROPERTIES_BY_METADATA_NAME[metadataName];
    const overrides = overridableProperties.reduce((acc, property)=>{
        const isPropertyUpdated = sanitizedEditableProperties[property] !== undefined;
        if (!isPropertyUpdated) {
            return acc;
        }
        const propertyValue = sanitizedEditableProperties[property];
        delete sanitizedEditableProperties[property];
        if ((0, _lodashisequal.default)(propertyValue, existingFlatEntity[property])) {
            if ((0, _utils.isDefined)(acc) && Object.prototype.hasOwnProperty.call(acc, property)) {
                const { [property]: _, ...restOverrides } = acc;
                return restOverrides;
            }
            return acc;
        }
        return {
            ...acc,
            [property]: propertyValue
        };
    }, existingOverrides);
    if ((0, _utils.isDefined)(overrides) && Object.keys(overrides).length === 0) {
        return {
            overrides: null,
            updatedEditableProperties: sanitizedEditableProperties
        };
    }
    return {
        overrides,
        updatedEditableProperties: sanitizedEditableProperties
    };
};

//# sourceMappingURL=sanitize-overridable-entity-input.util.js.map