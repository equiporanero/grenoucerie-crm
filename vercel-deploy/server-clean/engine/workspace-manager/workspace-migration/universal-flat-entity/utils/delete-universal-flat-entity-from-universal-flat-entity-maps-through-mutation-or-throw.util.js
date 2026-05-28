"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteUniversalFlatEntityFromUniversalFlatEntityMapsThroughMutationOrThrow", {
    enumerable: true,
    get: function() {
        return deleteUniversalFlatEntityFromUniversalFlatEntityMapsThroughMutationOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const deleteUniversalFlatEntityFromUniversalFlatEntityMapsThroughMutationOrThrow = ({ universalFlatEntityMapsToMutate, universalIdentifierToDelete })=>{
    const entityToDelete = universalFlatEntityMapsToMutate.byUniversalIdentifier[universalIdentifierToDelete];
    if (!(0, _utils.isDefined)(entityToDelete)) {
        throw new _flatentitymapsexception.FlatEntityMapsException('deleteUniversalFlatEntityFromUniversalFlatEntityMapsThroughMutationOrThrow: entity to delete not found', _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    delete universalFlatEntityMapsToMutate.byUniversalIdentifier[universalIdentifierToDelete];
};

//# sourceMappingURL=delete-universal-flat-entity-from-universal-flat-entity-maps-through-mutation-or-throw.util.js.map