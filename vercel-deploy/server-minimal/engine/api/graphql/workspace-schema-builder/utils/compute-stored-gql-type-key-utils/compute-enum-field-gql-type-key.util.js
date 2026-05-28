"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeEnumFieldGqlTypeKey", {
    enumerable: true,
    get: function() {
        return computeEnumFieldGqlTypeKey;
    }
});
const _utils = require("twenty-shared/utils");
const computeEnumFieldGqlTypeKey = (objectMetadataName, fieldMetadataName)=>{
    return `${(0, _utils.pascalCase)(objectMetadataName)}${(0, _utils.pascalCase)(fieldMetadataName)}Enum`;
};

//# sourceMappingURL=compute-enum-field-gql-type-key.util.js.map