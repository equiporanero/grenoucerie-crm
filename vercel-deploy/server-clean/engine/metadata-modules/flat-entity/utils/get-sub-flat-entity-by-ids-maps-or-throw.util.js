"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getSubFlatEntityByIdsMapsOrThrow", {
    enumerable: true,
    get: function() {
        return getSubFlatEntityByIdsMapsOrThrow;
    }
});
const _createemptyflatentitymapsconstant = require("../constant/create-empty-flat-entity-maps.constant");
const _findflatentitybyidinflatentitymapsorthrowutil = require("./find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _addflatentitytoflatentitymapsthroughmutationorthrowutil = require("../../../workspace-manager/workspace-migration/utils/add-flat-entity-to-flat-entity-maps-through-mutation-or-throw.util");
const getSubFlatEntityByIdsMapsOrThrow = ({ flatEntityIds, flatEntityMaps })=>{
    const flatEntityMapsToMutate = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    flatEntityIds.forEach((flatEntityId)=>{
        const flatEntity = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId,
            flatEntityMaps
        });
        (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
            flatEntity,
            flatEntityMapsToMutate
        });
    });
    return flatEntityMapsToMutate;
};

//# sourceMappingURL=get-sub-flat-entity-by-ids-maps-or-throw.util.js.map