"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildCompositeModelId", {
    enumerable: true,
    get: function() {
        return buildCompositeModelId;
    }
});
const COMPOSITE_SEPARATOR = '/';
const buildCompositeModelId = (providerName, modelName)=>{
    if (providerName === modelName.split(COMPOSITE_SEPARATOR)[0]) {
        return modelName;
    }
    return `${providerName}${COMPOSITE_SEPARATOR}${modelName}`;
};

//# sourceMappingURL=composite-model-id.util.js.map