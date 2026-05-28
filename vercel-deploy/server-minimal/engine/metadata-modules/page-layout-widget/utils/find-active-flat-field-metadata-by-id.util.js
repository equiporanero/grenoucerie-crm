"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findActiveFlatFieldMetadataById", {
    enumerable: true,
    get: function() {
        return findActiveFlatFieldMetadataById;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const findActiveFlatFieldMetadataById = (fieldId, flatFieldMetadataMaps)=>{
    if (!(0, _utils.isDefined)(fieldId)) return null;
    const field = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: fieldId,
        flatEntityMaps: flatFieldMetadataMaps
    });
    if (!(0, _utils.isDefined)(field) || !field.isActive) return null;
    return field;
};

//# sourceMappingURL=find-active-flat-field-metadata-by-id.util.js.map