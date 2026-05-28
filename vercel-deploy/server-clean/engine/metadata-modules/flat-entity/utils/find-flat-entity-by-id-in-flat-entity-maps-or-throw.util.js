"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findFlatEntityByIdInFlatEntityMapsOrThrow", {
    enumerable: true,
    get: function() {
        return findFlatEntityByIdInFlatEntityMapsOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../exceptions/flat-entity-maps.exception");
const findFlatEntityByIdInFlatEntityMapsOrThrow = ({ flatEntityMaps, flatEntityId })=>{
    const universalIdentifier = flatEntityMaps.universalIdentifierById[flatEntityId];
    if (!(0, _utils.isDefined)(universalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(_core.i18n._(/*i18n*/ {
            id: "LZf/L8",
            message: "Could not find flat entity in maps"
        }), _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const flatEntity = flatEntityMaps.byUniversalIdentifier[universalIdentifier];
    if (!(0, _utils.isDefined)(flatEntity)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(_core.i18n._(/*i18n*/ {
            id: "LZf/L8",
            message: "Could not find flat entity in maps"
        }), _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return flatEntity;
};

//# sourceMappingURL=find-flat-entity-by-id-in-flat-entity-maps-or-throw.util.js.map