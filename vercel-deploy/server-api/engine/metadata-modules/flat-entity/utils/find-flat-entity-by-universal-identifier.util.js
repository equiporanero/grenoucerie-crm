"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findFlatEntityByUniversalIdentifier", {
    enumerable: true,
    get: function() {
        return findFlatEntityByUniversalIdentifier;
    }
});
const findFlatEntityByUniversalIdentifier = ({ flatEntityMaps, universalIdentifier })=>{
    return flatEntityMaps.byUniversalIdentifier[universalIdentifier];
};

//# sourceMappingURL=find-flat-entity-by-universal-identifier.util.js.map