"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeObjectMetadataInputTypeKey", {
    enumerable: true,
    get: function() {
        return computeObjectMetadataInputTypeKey;
    }
});
const _utils = require("twenty-shared/utils");
const computeObjectMetadataInputTypeKey = (objectMetadataNameSingular, kind)=>{
    return `${(0, _utils.pascalCase)(objectMetadataNameSingular)}${kind.toString()}Input`;
};

//# sourceMappingURL=compute-object-metadata-input-type.util.js.map