"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteFlatEntityFromFlatEntityMapsThroughMutationOrThrow", {
    enumerable: true,
    get: function() {
        return deleteFlatEntityFromFlatEntityMapsThroughMutationOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const deleteFlatEntityFromFlatEntityMapsThroughMutationOrThrow = ({ flatEntityMapsToMutate, entityToDeleteId })=>{
    const universalIdentifierToDelete = flatEntityMapsToMutate.universalIdentifierById[entityToDeleteId];
    if (!(0, _utils.isDefined)(universalIdentifierToDelete)) {
        throw new _flatentitymapsexception.FlatEntityMapsException('deleteFlatEntityFromFlatEntityMapsThroughMutationOrThrow: entity to delete not found', _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const entityToDelete = flatEntityMapsToMutate.byUniversalIdentifier[universalIdentifierToDelete];
    delete flatEntityMapsToMutate.byUniversalIdentifier[universalIdentifierToDelete];
    delete flatEntityMapsToMutate.universalIdentifierById[entityToDeleteId];
    if ((0, _utils.isDefined)(entityToDelete?.applicationId)) {
        const universalIdentifiers = flatEntityMapsToMutate.universalIdentifiersByApplicationId[entityToDelete.applicationId];
        if ((0, _utils.isDefined)(universalIdentifiers)) {
            const index = universalIdentifiers.indexOf(universalIdentifierToDelete);
            if (index !== -1) {
                universalIdentifiers.splice(index, 1);
            }
            if (universalIdentifiers.length === 0) {
                delete flatEntityMapsToMutate.universalIdentifiersByApplicationId[entityToDelete.applicationId];
            }
        }
    }
};

//# sourceMappingURL=delete-flat-entity-from-flat-entity-maps-through-mutation-or-throw.util.js.map