"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeCompositeFieldEnumTypeKey", {
    enumerable: true,
    get: function() {
        return computeCompositeFieldEnumTypeKey;
    }
});
const _utils = require("twenty-shared/utils");
const computeCompositeFieldEnumTypeKey = (fieldMetadataType, compositePropertyName)=>{
    return `${(0, _utils.pascalCase)(fieldMetadataType)}${(0, _utils.pascalCase)(compositePropertyName)}Enum`;
};

//# sourceMappingURL=compute-composite-field-enum-type-key.util.js.map