"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isModelAllowedByWorkspace", {
    enumerable: true,
    get: function() {
        return isModelAllowedByWorkspace;
    }
});
const _utils = require("twenty-shared/utils");
const isModelAllowedByWorkspace = (modelId, workspace, recommendedModelIds)=>{
    if ((0, _utils.isAutoSelectModelId)(modelId)) {
        return true;
    }
    if (workspace.useRecommendedModels) {
        return recommendedModelIds?.has(modelId) ?? false;
    }
    return workspace.enabledAiModelIds.includes(modelId);
};

//# sourceMappingURL=is-model-allowed.util.js.map