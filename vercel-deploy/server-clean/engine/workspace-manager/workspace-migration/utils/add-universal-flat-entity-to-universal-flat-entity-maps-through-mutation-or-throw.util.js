"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow", {
    enumerable: true,
    get: function() {
        return addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow = ({ universalFlatEntity: flatEntity, universalFlatEntityMapsToMutate })=>{
    if ((0, _utils.isDefined)(universalFlatEntityMapsToMutate.byUniversalIdentifier[flatEntity.universalIdentifier])) {
        throw new _flatentitymapsexception.FlatEntityMapsException('addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow: flat entity to add already exists', _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_ALREADY_EXISTS);
    }
    universalFlatEntityMapsToMutate.byUniversalIdentifier[flatEntity.universalIdentifier] = flatEntity;
};

//# sourceMappingURL=add-universal-flat-entity-to-universal-flat-entity-maps-through-mutation-or-throw.util.js.map