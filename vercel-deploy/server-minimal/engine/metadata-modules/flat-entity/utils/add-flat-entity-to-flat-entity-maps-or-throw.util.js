"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addFlatEntityToFlatEntityMapsOrThrow", {
    enumerable: true,
    get: function() {
        return addFlatEntityToFlatEntityMapsOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../exceptions/flat-entity-maps.exception");
const addFlatEntityToFlatEntityMapsOrThrow = ({ flatEntity, flatEntityMaps })=>{
    if ((0, _utils.isDefined)(flatEntityMaps.byUniversalIdentifier[flatEntity.universalIdentifier])) {
        throw new _flatentitymapsexception.FlatEntityMapsException('addFlatEntityToFlatEntityMapsOrThrow: flat entity to add already exists', _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_ALREADY_EXISTS);
    }
    return {
        byUniversalIdentifier: {
            ...flatEntityMaps.byUniversalIdentifier,
            [flatEntity.universalIdentifier]: flatEntity
        },
        universalIdentifierById: {
            ...flatEntityMaps.universalIdentifierById,
            [flatEntity.id]: flatEntity.universalIdentifier
        },
        universalIdentifiersByApplicationId: {
            ...flatEntityMaps.universalIdentifiersByApplicationId,
            ...(0, _utils.isDefined)(flatEntity.applicationId) ? {
                [flatEntity.applicationId]: Array.from(new Set([
                    ...flatEntityMaps.universalIdentifiersByApplicationId?.[flatEntity.applicationId] ?? [],
                    flatEntity.universalIdentifier
                ]))
            } : {}
        }
    };
};

//# sourceMappingURL=add-flat-entity-to-flat-entity-maps-or-throw.util.js.map