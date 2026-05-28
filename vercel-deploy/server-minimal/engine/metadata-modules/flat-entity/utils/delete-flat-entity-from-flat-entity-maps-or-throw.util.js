"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteFlatEntityFromFlatEntityMapsOrThrow", {
    enumerable: true,
    get: function() {
        return deleteFlatEntityFromFlatEntityMapsOrThrow;
    }
});
const _lodashisempty = /*#__PURE__*/ _interop_require_default(require("lodash.isempty"));
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../exceptions/flat-entity-maps.exception");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const deleteFlatEntityFromFlatEntityMapsOrThrow = ({ flatEntityMaps, entityToDeleteId })=>{
    const universalIdentifierToDelete = flatEntityMaps.universalIdentifierById[entityToDeleteId];
    if (!(0, _utils.isDefined)(universalIdentifierToDelete)) {
        throw new _flatentitymapsexception.FlatEntityMapsException('deleteFlatEntityFromFlatEntityMapsOrThrow: entity to delete not found', _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const updatedUniversalIdentifierByIdEntries = Object.entries(flatEntityMaps.universalIdentifierById).filter(([id])=>id !== entityToDeleteId);
    const updatedUniversalIdentifiersByApplicationIdEntries = Object.entries(flatEntityMaps.universalIdentifiersByApplicationId).map(([applicationId, universalIdentifiers])=>{
        const stillPresentUniversalIdentifiers = universalIdentifiers?.filter((universalIdentifier)=>universalIdentifier !== universalIdentifierToDelete);
        if (!(0, _utils.isDefined)(stillPresentUniversalIdentifiers) || (0, _lodashisempty.default)(stillPresentUniversalIdentifiers)) {
            return undefined;
        }
        return [
            applicationId,
            stillPresentUniversalIdentifiers
        ];
    }).filter(_utils.isDefined);
    return {
        byUniversalIdentifier: (0, _utils.removePropertiesFromRecord)(flatEntityMaps.byUniversalIdentifier, [
            universalIdentifierToDelete
        ]),
        universalIdentifierById: Object.fromEntries(updatedUniversalIdentifierByIdEntries),
        universalIdentifiersByApplicationId: Object.fromEntries(updatedUniversalIdentifiersByApplicationIdEntries)
    };
};

//# sourceMappingURL=delete-flat-entity-from-flat-entity-maps-or-throw.util.js.map