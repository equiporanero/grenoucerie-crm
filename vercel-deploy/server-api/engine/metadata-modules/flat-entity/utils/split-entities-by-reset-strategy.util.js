"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "splitEntitiesByResetStrategy", {
    enumerable: true,
    get: function() {
        return splitEntitiesByResetStrategy;
    }
});
const splitEntitiesByResetStrategy = ({ entities, workspaceCustomApplicationUniversalIdentifier, now })=>{
    const toHardDelete = [];
    const toReset = [];
    for (const entity of entities){
        if (entity.applicationUniversalIdentifier === workspaceCustomApplicationUniversalIdentifier) {
            toHardDelete.push(entity);
        } else {
            toReset.push({
                ...entity,
                isActive: true,
                overrides: null,
                ...'universalOverrides' in entity ? {
                    universalOverrides: null
                } : {},
                updatedAt: now
            });
        }
    }
    return {
        toHardDelete,
        toReset
    };
};

//# sourceMappingURL=split-entities-by-reset-strategy.util.js.map