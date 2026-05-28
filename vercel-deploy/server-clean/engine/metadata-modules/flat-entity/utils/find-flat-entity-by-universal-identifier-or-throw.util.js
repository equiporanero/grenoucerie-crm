"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findFlatEntityByUniversalIdentifierOrThrow", {
    enumerable: true,
    get: function() {
        return findFlatEntityByUniversalIdentifierOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../exceptions/flat-entity-maps.exception");
const _findflatentitybyuniversalidentifierutil = require("./find-flat-entity-by-universal-identifier.util");
const findFlatEntityByUniversalIdentifierOrThrow = ({ flatEntityMaps, universalIdentifier })=>{
    const flatEntity = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
        flatEntityMaps,
        universalIdentifier
    });
    if (!(0, _utils.isDefined)(flatEntity)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Could not find flat entity with universal identifier ${universalIdentifier}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return flatEntity;
};

//# sourceMappingURL=find-flat-entity-by-universal-identifier-or-throw.util.js.map