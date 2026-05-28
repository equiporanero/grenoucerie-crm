"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findManyFlatEntityByIdInFlatEntityMapsOrThrow", {
    enumerable: true,
    get: function() {
        return findManyFlatEntityByIdInFlatEntityMapsOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _getsubflatentitybyidsmapsorthrowutil = require("./get-sub-flat-entity-by-ids-maps-or-throw.util");
const findManyFlatEntityByIdInFlatEntityMapsOrThrow = ({ flatEntityMaps, flatEntityIds })=>{
    const subFlatEntityMaps = (0, _getsubflatentitybyidsmapsorthrowutil.getSubFlatEntityByIdsMapsOrThrow)({
        flatEntityIds,
        flatEntityMaps
    });
    return Object.values(subFlatEntityMaps.byUniversalIdentifier).filter(_utils.isDefined);
};

//# sourceMappingURL=find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util.js.map