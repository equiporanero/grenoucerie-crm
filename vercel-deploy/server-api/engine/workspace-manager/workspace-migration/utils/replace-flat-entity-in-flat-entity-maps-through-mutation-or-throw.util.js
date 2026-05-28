"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "replaceFlatEntityInFlatEntityMapsThroughMutationOrThrow", {
    enumerable: true,
    get: function() {
        return replaceFlatEntityInFlatEntityMapsThroughMutationOrThrow;
    }
});
const _addflatentitytoflatentitymapsthroughmutationorthrowutil = require("./add-flat-entity-to-flat-entity-maps-through-mutation-or-throw.util");
const _deleteflatentityfromflatentitymapsthroughmutationorthrowutil = require("./delete-flat-entity-from-flat-entity-maps-through-mutation-or-throw.util");
const replaceFlatEntityInFlatEntityMapsThroughMutationOrThrow = ({ flatEntity, flatEntityMapsToMutate })=>{
    (0, _deleteflatentityfromflatentitymapsthroughmutationorthrowutil.deleteFlatEntityFromFlatEntityMapsThroughMutationOrThrow)({
        flatEntityMapsToMutate,
        entityToDeleteId: flatEntity.id
    });
    (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
        flatEntity,
        flatEntityMapsToMutate
    });
};

//# sourceMappingURL=replace-flat-entity-in-flat-entity-maps-through-mutation-or-throw.util.js.map