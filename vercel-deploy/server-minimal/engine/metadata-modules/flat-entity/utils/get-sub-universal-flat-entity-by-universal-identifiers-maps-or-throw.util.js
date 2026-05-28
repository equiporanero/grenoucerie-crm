"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getSubUniversalFlatEntityByUniversalIdentifiersMapsOrThrow", {
    enumerable: true,
    get: function() {
        return getSubUniversalFlatEntityByUniversalIdentifiersMapsOrThrow;
    }
});
const _findflatentitybyuniversalidentifierorthrowutil = require("./find-flat-entity-by-universal-identifier-or-throw.util");
const _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil = require("../../../workspace-manager/workspace-migration/universal-flat-entity/utils/add-universal-flat-entity-to-universal-flat-entity-maps-through-mutation-or-throw.util");
const getSubUniversalFlatEntityByUniversalIdentifiersMapsOrThrow = ({ universalIdentifiers, universalFlatEntityMaps })=>{
    const subUniversalFlatEntityMaps = {
        byUniversalIdentifier: {}
    };
    for (const universalIdentifier of universalIdentifiers){
        const flatEntity = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            flatEntityMaps: universalFlatEntityMaps,
            universalIdentifier
        });
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: flatEntity,
            universalFlatEntityMapsToMutate: subUniversalFlatEntityMaps
        });
    }
    return subUniversalFlatEntityMaps;
};

//# sourceMappingURL=get-sub-universal-flat-entity-by-universal-identifiers-maps-or-throw.util.js.map