"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getFlatFieldsFromFlatObjectMetadata", {
    enumerable: true,
    get: function() {
        return getFlatFieldsFromFlatObjectMetadata;
    }
});
const _findmanyflatentitybyidinflatentitymapsutil = require("../../../../metadata-modules/flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps.util");
const getFlatFieldsFromFlatObjectMetadata = (flatObjectMetadata, flatFieldMetadataMaps)=>{
    return (0, _findmanyflatentitybyidinflatentitymapsutil.findManyFlatEntityByIdInFlatEntityMaps)({
        flatEntityIds: flatObjectMetadata.fieldIds,
        flatEntityMaps: flatFieldMetadataMaps
    });
};

//# sourceMappingURL=get-flat-fields-for-flat-object-metadata.util.js.map