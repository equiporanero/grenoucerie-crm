"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "shouldInferDeletionFromMissingEntities", {
    enumerable: true,
    get: function() {
        return shouldInferDeletionFromMissingEntities;
    }
});
const shouldInferDeletionFromMissingEntities = ({ buildOptions, metadataName })=>{
    return buildOptions.inferDeletionFromMissingEntities === true || buildOptions.inferDeletionFromMissingEntities?.[metadataName] === true;
};

//# sourceMappingURL=should-infer-deletion-from-missing-entities.util.js.map