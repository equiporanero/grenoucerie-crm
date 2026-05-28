"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FLAT_OBJECT_METADATA_MAPS_MOCKS", {
    enumerable: true,
    get: function() {
        return FLAT_OBJECT_METADATA_MAPS_MOCKS;
    }
});
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../../flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _allflatobjectmetadatasmock = require("./all-flat-object-metadatas.mock");
const FLAT_OBJECT_METADATA_MAPS_MOCKS = [
    ..._allflatobjectmetadatasmock.ALL_FLAT_OBJECT_METADATA_MOCKS
].reduce((flatObjectMaps, flatObjectMetadata)=>(0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
        flatEntity: flatObjectMetadata,
        flatEntityMaps: flatObjectMaps
    }), (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)());

//# sourceMappingURL=flat-object-metadata-maps.mock.js.map