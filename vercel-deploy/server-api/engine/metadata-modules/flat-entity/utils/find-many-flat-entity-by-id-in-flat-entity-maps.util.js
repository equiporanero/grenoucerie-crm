"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findManyFlatEntityByIdInFlatEntityMaps", {
    enumerable: true,
    get: function() {
        return findManyFlatEntityByIdInFlatEntityMaps;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("./find-flat-entity-by-id-in-flat-entity-maps.util");
const findManyFlatEntityByIdInFlatEntityMaps = ({ flatEntityMaps, flatEntityIds })=>{
    return flatEntityIds.map((flatEntityId)=>(0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId,
            flatEntityMaps
        })).filter(_utils.isDefined);
};

//# sourceMappingURL=find-many-flat-entity-by-id-in-flat-entity-maps.util.js.map