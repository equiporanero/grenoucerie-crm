"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildAllUniversalIdentifierMap", {
    enumerable: true,
    get: function() {
        return buildAllUniversalIdentifierMap;
    }
});
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const _getmetadataflatentitymapskeyutil = require("../../../metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util");
const buildAllUniversalIdentifierMap = (allFlatEntityMaps)=>{
    const universalIdentifierMap = new Map();
    for (const metadataName of Object.values(_metadata.ALL_METADATA_NAME)){
        const flatEntityMapsKey = (0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(metadataName);
        const flatEntityMaps = allFlatEntityMaps[flatEntityMapsKey];
        if (!(0, _utils.isDefined)(flatEntityMaps)) {
            continue;
        }
        for (const [universalIdentifier, entity] of Object.entries(flatEntityMaps.byUniversalIdentifier)){
            if ((0, _utils.isDefined)(entity)) {
                universalIdentifierMap.set(universalIdentifier, {
                    metadataName,
                    applicationUniversalIdentifier: entity.applicationUniversalIdentifier
                });
            }
        }
    }
    return universalIdentifierMap;
};

//# sourceMappingURL=build-all-universal-identifier-map.util.js.map