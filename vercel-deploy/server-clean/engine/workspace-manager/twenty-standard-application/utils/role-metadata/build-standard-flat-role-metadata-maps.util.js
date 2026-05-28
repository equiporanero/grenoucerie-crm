"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildStandardFlatRoleMetadataMaps", {
    enumerable: true,
    get: function() {
        return buildStandardFlatRoleMetadataMaps;
    }
});
const _createemptyflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _createstandardflatrolemetadatautil = require("./create-standard-flat-role-metadata.util");
const buildStandardFlatRoleMetadataMaps = (args)=>{
    const allRoleMetadatas = Object.values(_createstandardflatrolemetadatautil.STANDARD_FLAT_ROLE_METADATA_BUILDERS_BY_ROLE_NAME).map((builder)=>builder(args));
    let flatRoleMetadataMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    for (const roleMetadata of allRoleMetadatas){
        flatRoleMetadataMaps = (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
            flatEntity: roleMetadata,
            flatEntityMaps: flatRoleMetadataMaps
        });
    }
    return flatRoleMetadataMaps;
};

//# sourceMappingURL=build-standard-flat-role-metadata-maps.util.js.map