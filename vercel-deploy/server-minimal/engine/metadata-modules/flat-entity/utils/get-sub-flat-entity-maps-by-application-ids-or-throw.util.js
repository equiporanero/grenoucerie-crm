"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getSubFlatEntityMapsByApplicationIdsOrThrow", {
    enumerable: true,
    get: function() {
        return getSubFlatEntityMapsByApplicationIdsOrThrow;
    }
});
const _findflatentitiesbyapplicationidutil = require("./find-flat-entities-by-application-id.util");
const _getsubflatentitybyidsmapsorthrowutil = require("./get-sub-flat-entity-by-ids-maps-or-throw.util");
const getSubFlatEntityMapsByApplicationIdsOrThrow = ({ applicationIds, flatEntityMaps })=>{
    const allFlatEntityIds = applicationIds.flatMap((applicationId)=>{
        const entities = (0, _findflatentitiesbyapplicationidutil.findFlatEntitiesByApplicationId)({
            applicationId,
            flatEntityMaps
        });
        return entities.map((entity)=>entity.id);
    });
    const uniqueFlatEntityIds = [
        ...new Set(allFlatEntityIds)
    ];
    return (0, _getsubflatentitybyidsmapsorthrowutil.getSubFlatEntityByIdsMapsOrThrow)({
        flatEntityIds: uniqueFlatEntityIds,
        flatEntityMaps
    });
};

//# sourceMappingURL=get-sub-flat-entity-maps-by-application-ids-or-throw.util.js.map