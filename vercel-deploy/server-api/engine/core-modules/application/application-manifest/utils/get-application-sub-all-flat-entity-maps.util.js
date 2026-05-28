"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getApplicationSubAllFlatEntityMaps", {
    enumerable: true,
    get: function() {
        return getApplicationSubAllFlatEntityMaps;
    }
});
const _metadata = require("twenty-shared/metadata");
const _createemptyallflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-all-flat-entity-maps.constant");
const _getmetadataflatentitymapskeyutil = require("../../../../metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util");
const _getsubflatentitymapsbyapplicationidsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/get-sub-flat-entity-maps-by-application-ids-or-throw.util");
const getApplicationSubAllFlatEntityMaps = ({ applicationIds, fromAllFlatEntityMaps })=>{
    const emptyAllFlatEntityMaps = (0, _createemptyallflatentitymapsconstant.createEmptyAllFlatEntityMaps)();
    for (const metadataName of Object.values(_metadata.ALL_METADATA_NAME)){
        const flatEntityMapsKey = (0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(metadataName);
        const fromFlatEntityMaps = fromAllFlatEntityMaps[flatEntityMapsKey];
        const applicationSubFlatEntityMaps = (0, _getsubflatentitymapsbyapplicationidsorthrowutil.getSubFlatEntityMapsByApplicationIdsOrThrow)({
            applicationIds,
            flatEntityMaps: fromFlatEntityMaps
        });
        // @ts-expect-error Metadata flat entity maps cache key and metadataName colliding
        emptyAllFlatEntityMaps[flatEntityMapsKey] = applicationSubFlatEntityMaps;
    }
    return emptyAllFlatEntityMaps;
};

//# sourceMappingURL=get-application-sub-all-flat-entity-maps.util.js.map