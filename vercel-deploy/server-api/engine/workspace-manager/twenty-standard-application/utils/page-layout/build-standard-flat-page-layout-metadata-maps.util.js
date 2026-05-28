"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildStandardFlatPageLayoutMetadataMaps", {
    enumerable: true,
    get: function() {
        return buildStandardFlatPageLayoutMetadataMaps;
    }
});
const _createemptyflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _standardflatpagelayoutbuildersconstant = require("./standard-flat-page-layout-builders.constant");
const buildStandardFlatPageLayoutMetadataMaps = (args)=>{
    const allPageLayoutMetadatas = Object.values(_standardflatpagelayoutbuildersconstant.STANDARD_FLAT_PAGE_LAYOUT_BUILDERS_BY_LAYOUT_NAME).map((builder)=>builder(args));
    let flatPageLayoutMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    for (const pageLayoutMetadata of allPageLayoutMetadatas){
        flatPageLayoutMaps = (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
            flatEntity: pageLayoutMetadata,
            flatEntityMaps: flatPageLayoutMaps
        });
    }
    return flatPageLayoutMaps;
};

//# sourceMappingURL=build-standard-flat-page-layout-metadata-maps.util.js.map