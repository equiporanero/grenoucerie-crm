"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addUniversalFlatEntityToUniversalFlatEntityMapsOrThrow", {
    enumerable: true,
    get: function() {
        return addUniversalFlatEntityToUniversalFlatEntityMapsOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const addUniversalFlatEntityToUniversalFlatEntityMapsOrThrow = ({ universalFlatEntity, universalFlatEntityMaps })=>{
    if ((0, _utils.isDefined)(universalFlatEntityMaps.byUniversalIdentifier[universalFlatEntity.universalIdentifier])) {
        throw new _flatentitymapsexception.FlatEntityMapsException('addUniversalFlatEntityToUniversalFlatEntityMapsOrThrow: flat entity to add already exists', _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_ALREADY_EXISTS);
    }
    return {
        byUniversalIdentifier: {
            ...universalFlatEntityMaps.byUniversalIdentifier,
            [universalFlatEntity.universalIdentifier]: universalFlatEntity
        }
    };
};

//# sourceMappingURL=add-universal-flat-entity-to-universal-flat-entity-maps-or-throw.util.js.map