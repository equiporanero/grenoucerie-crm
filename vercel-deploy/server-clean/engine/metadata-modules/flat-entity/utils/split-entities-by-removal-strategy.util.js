"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "splitEntitiesByRemovalStrategy", {
    enumerable: true,
    get: function() {
        return splitEntitiesByRemovalStrategy;
    }
});
const splitEntitiesByRemovalStrategy = ({ entitiesToRemove, workspaceCustomApplicationUniversalIdentifier, now })=>{
    const toHardDelete = [];
    const toDeactivate = [];
    for (const entity of entitiesToRemove){
        if (entity.applicationUniversalIdentifier === workspaceCustomApplicationUniversalIdentifier) {
            toHardDelete.push(entity);
        } else {
            toDeactivate.push({
                ...entity,
                isActive: false,
                updatedAt: now
            });
        }
    }
    return {
        toHardDelete,
        toDeactivate
    };
};

//# sourceMappingURL=split-entities-by-removal-strategy.util.js.map