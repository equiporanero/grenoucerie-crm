"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildFromToAllUniversalFlatEntityMaps", {
    enumerable: true,
    get: function() {
        return buildFromToAllUniversalFlatEntityMaps;
    }
});
const _metadata = require("twenty-shared/metadata");
const _getmetadataflatentitymapskeyutil = require("../../../../metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util");
const buildFromToAllUniversalFlatEntityMaps = ({ fromAllFlatEntityMaps, toAllUniversalFlatEntityMaps })=>{
    const fromToAllFlatEntityMaps = {};
    for (const metadataName of Object.values(_metadata.ALL_METADATA_NAME)){
        const flatEntityMapsKey = (0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(metadataName);
        const fromFlatEntityMaps = fromAllFlatEntityMaps[flatEntityMapsKey];
        const toFlatEntityMaps = toAllUniversalFlatEntityMaps[flatEntityMapsKey];
        const fromTo = {
            from: fromFlatEntityMaps,
            to: toFlatEntityMaps
        };
        // @ts-expect-error Metadata flat entity maps cache key and metadataName colliding
        fromToAllFlatEntityMaps[flatEntityMapsKey] = fromTo;
    }
    return fromToAllFlatEntityMaps;
};

//# sourceMappingURL=build-from-to-all-universal-flat-entity-maps.util.js.map