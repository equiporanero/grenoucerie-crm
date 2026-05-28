"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findFlatEntitiesByApplicationId", {
    enumerable: true,
    get: function() {
        return findFlatEntitiesByApplicationId;
    }
});
const _utils = require("twenty-shared/utils");
const findFlatEntitiesByApplicationId = ({ applicationId, flatEntityMaps })=>{
    const universalIdentifiers = flatEntityMaps.universalIdentifiersByApplicationId[applicationId];
    if (!(0, _utils.isDefined)(universalIdentifiers)) {
        return [];
    }
    return universalIdentifiers.map((universalId)=>{
        const entity = flatEntityMaps.byUniversalIdentifier[universalId];
        if (!(0, _utils.isDefined)(entity)) {
            return undefined;
        }
        if (entity.applicationId !== applicationId) {
            return undefined;
        }
        return entity;
    }).filter(_utils.isDefined);
};

//# sourceMappingURL=find-flat-entities-by-application-id.util.js.map