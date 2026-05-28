"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeCompositeFieldInputTypeKey", {
    enumerable: true,
    get: function() {
        return computeCompositeFieldInputTypeKey;
    }
});
const _utils = require("twenty-shared/utils");
const computeCompositeFieldInputTypeKey = (fieldType, kind)=>{
    const name = (0, _utils.pascalCase)(fieldType.toString().toLowerCase());
    return `${(0, _utils.pascalCase)(name)}${kind.toString()}Input`;
};

//# sourceMappingURL=compute-composite-field-input-type-key.util.js.map