"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createEmptyAllFlatEntityMaps", {
    enumerable: true,
    get: function() {
        return createEmptyAllFlatEntityMaps;
    }
});
const _metadata = require("twenty-shared/metadata");
const _createemptyflatentitymapsconstant = require("./create-empty-flat-entity-maps.constant");
const _getmetadataflatentitymapskeyutil = require("../utils/get-metadata-flat-entity-maps-key.util");
const createEmptyAllFlatEntityMaps = ()=>Object.keys(_metadata.ALL_METADATA_NAME).reduce((acc, metadataName)=>({
            ...acc,
            [(0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(metadataName)]: (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)()
        }), {});

//# sourceMappingURL=create-empty-all-flat-entity-maps.constant.js.map