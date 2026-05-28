"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isCompositeFieldDefaultValueCompatibleWithUniqueIndex", {
    enumerable: true,
    get: function() {
        return isCompositeFieldDefaultValueCompatibleWithUniqueIndex;
    }
});
const _nullifyemptycompositedefaultvalueutil = require("../../../../metadata-modules/flat-field-metadata/utils/nullify-empty-composite-default-value.util");
const _utils = require("twenty-shared/utils");
const isCompositeFieldDefaultValueCompatibleWithUniqueIndex = ({ fieldType, compositeProperties, defaultValue })=>{
    if (!(0, _utils.isDefined)(defaultValue)) {
        return true;
    }
    const normalizedDefaultValue = (0, _nullifyemptycompositedefaultvalueutil.nullifyEmptyCompositeDefaultValue)({
        defaultValue,
        fieldType
    });
    if (!(0, _utils.isDefined)(normalizedDefaultValue)) {
        return true;
    }
    const uniqueCompositeProperties = compositeProperties.filter((property)=>property.isIncludedInUniqueConstraint === true);
    return uniqueCompositeProperties.some((compositeProperty)=>{
        return !(0, _utils.isDefined)(normalizedDefaultValue[compositeProperty.name]);
    });
};

//# sourceMappingURL=is-composite-field-default-value-compatible-with-unique-index.util.js.map