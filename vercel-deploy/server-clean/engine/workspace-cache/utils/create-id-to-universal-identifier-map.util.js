"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createIdToUniversalIdentifierMap", {
    enumerable: true,
    get: function() {
        return createIdToUniversalIdentifierMap;
    }
});
const createIdToUniversalIdentifierMap = (entities)=>{
    const map = new Map();
    for (const entity of entities){
        map.set(entity.id, entity.universalIdentifier);
    }
    return map;
};

//# sourceMappingURL=create-id-to-universal-identifier-map.util.js.map