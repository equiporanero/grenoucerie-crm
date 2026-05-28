"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeObjectMetadataObjectTypeKey", {
    enumerable: true,
    get: function() {
        return computeObjectMetadataObjectTypeKey;
    }
});
const _utils = require("twenty-shared/utils");
const computeObjectMetadataObjectTypeKey = (objectMetadataNameSingular, kind)=>{
    return `${(0, _utils.pascalCase)(objectMetadataNameSingular)}${kind.toString()}`;
};

//# sourceMappingURL=compute-object-metadata-object-type-key.util.js.map