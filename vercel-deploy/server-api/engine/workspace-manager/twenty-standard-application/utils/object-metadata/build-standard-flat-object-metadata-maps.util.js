"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildStandardFlatObjectMetadataMaps", {
    enumerable: true,
    get: function() {
        return buildStandardFlatObjectMetadataMaps;
    }
});
const _createemptyflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _createstandardflatobjectmetadatautil = require("./create-standard-flat-object-metadata.util");
const buildStandardFlatObjectMetadataMaps = (args)=>{
    const allObjectMetadatas = Object.values(_createstandardflatobjectmetadatautil.STANDARD_FLAT_OBJECT_METADATA_BUILDERS_BY_OBJECT_NAME).map((builder)=>builder(args));
    let flatObjectMetadataMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    for (const objectMetadata of allObjectMetadatas){
        flatObjectMetadataMaps = (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
            flatEntity: objectMetadata,
            flatEntityMaps: flatObjectMetadataMaps
        });
    }
    return flatObjectMetadataMaps;
};

//# sourceMappingURL=build-standard-flat-object-metadata-maps.util.js.map