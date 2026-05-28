"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "regroupEntitiesByRelatedEntityId", {
    enumerable: true,
    get: function() {
        return regroupEntitiesByRelatedEntityId;
    }
});
const _classvalidator = require("class-validator");
const regroupEntitiesByRelatedEntityId = ({ entities, foreignKey })=>{
    const entitiesByRelatedEntityId = new Map();
    for (const entity of entities){
        const currentRelatedEntityId = entity[foreignKey];
        if (!(0, _classvalidator.isDefined)(currentRelatedEntityId)) {
            continue;
        }
        if (!entitiesByRelatedEntityId.has(currentRelatedEntityId)) {
            entitiesByRelatedEntityId.set(currentRelatedEntityId, []);
        }
        entitiesByRelatedEntityId.get(currentRelatedEntityId).push(entity);
    }
    return entitiesByRelatedEntityId;
};

//# sourceMappingURL=regroup-entities-by-related-entity-id.js.map