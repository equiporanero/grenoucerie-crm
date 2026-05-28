"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "replaceFlatEntityInFlatEntityMapsOrThrow", {
    enumerable: true,
    get: function() {
        return replaceFlatEntityInFlatEntityMapsOrThrow;
    }
});
const _addflatentitytoflatentitymapsorthrowutil = require("./add-flat-entity-to-flat-entity-maps-or-throw.util");
const _deleteflatentityfromflatentitymapsorthrowutil = require("./delete-flat-entity-from-flat-entity-maps-or-throw.util");
const replaceFlatEntityInFlatEntityMapsOrThrow = ({ flatEntity, flatEntityMaps })=>{
    const flatEntityMapsToReplace = (0, _deleteflatentityfromflatentitymapsorthrowutil.deleteFlatEntityFromFlatEntityMapsOrThrow)({
        flatEntityMaps,
        entityToDeleteId: flatEntity.id
    });
    return (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
        flatEntity,
        flatEntityMaps: flatEntityMapsToReplace
    });
};

//# sourceMappingURL=replace-flat-entity-in-flat-entity-maps-or-throw.util.js.map