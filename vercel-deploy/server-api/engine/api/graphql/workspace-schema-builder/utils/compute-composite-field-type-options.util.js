"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeCompositeFieldTypeOptions", {
    enumerable: true,
    get: function() {
        return computeCompositeFieldTypeOptions;
    }
});
const _types = require("twenty-shared/types");
function computeCompositeFieldTypeOptions(property) {
    return {
        nullable: !property.isRequired,
        isArray: property.type === _types.FieldMetadataType.MULTI_SELECT || property.isArray
    };
}

//# sourceMappingURL=compute-composite-field-type-options.util.js.map