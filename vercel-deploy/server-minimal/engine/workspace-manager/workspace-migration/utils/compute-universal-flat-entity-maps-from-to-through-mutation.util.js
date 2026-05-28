"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeUniversalFlatEntityMapsFromToThroughMutation", {
    enumerable: true,
    get: function() {
        return computeUniversalFlatEntityMapsFromToThroughMutation;
    }
});
const _getsubuniversalflatentitybyuniversalidentifiersmapsorthrowutil = require("../../../metadata-modules/flat-entity/utils/get-sub-universal-flat-entity-by-universal-identifiers-maps-or-throw.util");
const _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil = require("../universal-flat-entity/utils/add-universal-flat-entity-to-universal-flat-entity-maps-through-mutation-or-throw.util");
const _deleteuniversalflatentityfromuniversalflatentitymapsthroughmutationorthrowutil = require("../universal-flat-entity/utils/delete-universal-flat-entity-from-universal-flat-entity-maps-through-mutation-or-throw.util");
const _replaceuniversalflatentityinuniversalflatentitymapsthroughmutationorthrowutil = require("../universal-flat-entity/utils/replace-universal-flat-entity-in-universal-flat-entity-maps-through-mutation-or-throw.util");
const computeUniversalFlatEntityMapsFromToThroughMutation = ({ flatEntityMaps, flatEntityToCreate, flatEntityToDelete, flatEntityToUpdate })=>{
    const fromFlatEntityMaps = (0, _getsubuniversalflatentitybyuniversalidentifiersmapsorthrowutil.getSubUniversalFlatEntityByUniversalIdentifiersMapsOrThrow)({
        universalIdentifiers: [
            ...flatEntityToDelete,
            ...flatEntityToUpdate
        ].map(({ universalIdentifier })=>universalIdentifier),
        universalFlatEntityMaps: flatEntityMaps
    });
    const toFlatEntityMaps = structuredClone(fromFlatEntityMaps);
    for (const flatEntity of flatEntityToDelete){
        (0, _deleteuniversalflatentityfromuniversalflatentitymapsthroughmutationorthrowutil.deleteUniversalFlatEntityFromUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalIdentifierToDelete: flatEntity.universalIdentifier,
            universalFlatEntityMapsToMutate: toFlatEntityMaps
        });
    }
    for (const flatEntity of flatEntityToUpdate){
        (0, _replaceuniversalflatentityinuniversalflatentitymapsthroughmutationorthrowutil.replaceUniversalFlatEntityInUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: flatEntity,
            universalFlatEntityMapsToMutate: toFlatEntityMaps
        });
    }
    for (const flatEntity of flatEntityToCreate){
        (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: flatEntity,
            universalFlatEntityMapsToMutate: toFlatEntityMaps
        });
    }
    return {
        from: fromFlatEntityMaps,
        to: toFlatEntityMaps
    };
};

//# sourceMappingURL=compute-universal-flat-entity-maps-from-to-through-mutation.util.js.map