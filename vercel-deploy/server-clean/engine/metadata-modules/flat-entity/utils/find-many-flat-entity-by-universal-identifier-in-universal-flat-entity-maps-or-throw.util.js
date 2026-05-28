"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findManyFlatEntityByUniversalIdentifierInUniversalFlatEntityMapsOrThrow", {
    enumerable: true,
    get: function() {
        return findManyFlatEntityByUniversalIdentifierInUniversalFlatEntityMapsOrThrow;
    }
});
const _findflatentitybyuniversalidentifierorthrowutil = require("./find-flat-entity-by-universal-identifier-or-throw.util");
const findManyFlatEntityByUniversalIdentifierInUniversalFlatEntityMapsOrThrow = ({ flatEntityMaps, universalIdentifiers })=>universalIdentifiers.map((universalIdentifier)=>(0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            flatEntityMaps,
            universalIdentifier
        }));

//# sourceMappingURL=find-many-flat-entity-by-universal-identifier-in-universal-flat-entity-maps-or-throw.util.js.map