"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findManyFlatEntityByUniversalIdentifierInUniversalFlatEntityMaps", {
    enumerable: true,
    get: function() {
        return findManyFlatEntityByUniversalIdentifierInUniversalFlatEntityMaps;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("./find-flat-entity-by-universal-identifier.util");
const findManyFlatEntityByUniversalIdentifierInUniversalFlatEntityMaps = ({ flatEntityMaps, universalIdentifiers })=>universalIdentifiers.map((universalIdentifier)=>(0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps,
            universalIdentifier
        })).filter(_utils.isDefined);

//# sourceMappingURL=find-many-flat-entity-by-universal-identifier-in-universal-flat-entity-maps.util.js.map