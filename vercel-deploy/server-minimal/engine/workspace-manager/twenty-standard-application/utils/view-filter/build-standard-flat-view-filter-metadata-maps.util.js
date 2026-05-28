"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildStandardFlatViewFilterMetadataMaps", {
    enumerable: true,
    get: function() {
        return buildStandardFlatViewFilterMetadataMaps;
    }
});
const _createemptyflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _computestandardtaskviewfiltersutil = require("./compute-standard-task-view-filters.util");
const STANDARD_FLAT_VIEW_FILTER_METADATA_BUILDERS_BY_OBJECT_NAME = {
    task: _computestandardtaskviewfiltersutil.computeStandardTaskViewFilters
};
const buildStandardFlatViewFilterMetadataMaps = (args)=>{
    const allViewFilterMetadatas = Object.keys(STANDARD_FLAT_VIEW_FILTER_METADATA_BUILDERS_BY_OBJECT_NAME).flatMap((objectName)=>{
        const builder = STANDARD_FLAT_VIEW_FILTER_METADATA_BUILDERS_BY_OBJECT_NAME[objectName];
        const result = builder({
            ...args,
            objectName
        });
        return Object.values(result);
    });
    let flatViewFilterMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    for (const viewFilterMetadata of allViewFilterMetadatas){
        flatViewFilterMaps = (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
            flatEntity: viewFilterMetadata,
            flatEntityMaps: flatViewFilterMaps
        });
    }
    return flatViewFilterMaps;
};

//# sourceMappingURL=build-standard-flat-view-filter-metadata-maps.util.js.map