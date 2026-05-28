"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "replaceUniversalFlatEntityInUniversalFlatEntityMapsThroughMutationOrThrow", {
    enumerable: true,
    get: function() {
        return replaceUniversalFlatEntityInUniversalFlatEntityMapsThroughMutationOrThrow;
    }
});
const _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil = require("./add-universal-flat-entity-to-universal-flat-entity-maps-through-mutation-or-throw.util");
const _deleteuniversalflatentityfromuniversalflatentitymapsthroughmutationorthrowutil = require("./delete-universal-flat-entity-from-universal-flat-entity-maps-through-mutation-or-throw.util");
const replaceUniversalFlatEntityInUniversalFlatEntityMapsThroughMutationOrThrow = ({ universalFlatEntity, universalFlatEntityMapsToMutate })=>{
    (0, _deleteuniversalflatentityfromuniversalflatentitymapsthroughmutationorthrowutil.deleteUniversalFlatEntityFromUniversalFlatEntityMapsThroughMutationOrThrow)({
        universalFlatEntityMapsToMutate,
        universalIdentifierToDelete: universalFlatEntity.universalIdentifier
    });
    (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
        universalFlatEntity,
        universalFlatEntityMapsToMutate
    });
};

//# sourceMappingURL=replace-universal-flat-entity-in-universal-flat-entity-maps-through-mutation-or-throw.util.js.map