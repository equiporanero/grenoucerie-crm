"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildStandardFlatViewGroupMetadataMaps", {
    enumerable: true,
    get: function() {
        return buildStandardFlatViewGroupMetadataMaps;
    }
});
const _createemptyflatentitymapsconstant = require("../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _addflatentitytoflatentitymapsorthrowutil = require("../../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _computestandardopportunityviewgroupsutil = require("./compute-standard-opportunity-view-groups.util");
const _computestandardtaskviewgroupsutil = require("./compute-standard-task-view-groups.util");
const STANDARD_FLAT_VIEW_GROUP_METADATA_BUILDERS_BY_OBJECT_NAME = {
    opportunity: _computestandardopportunityviewgroupsutil.computeStandardOpportunityViewGroups,
    task: _computestandardtaskviewgroupsutil.computeStandardTaskViewGroups
};
const buildStandardFlatViewGroupMetadataMaps = (args)=>{
    const allViewGroupMetadatas = Object.keys(STANDARD_FLAT_VIEW_GROUP_METADATA_BUILDERS_BY_OBJECT_NAME).flatMap((objectName)=>{
        const builder = STANDARD_FLAT_VIEW_GROUP_METADATA_BUILDERS_BY_OBJECT_NAME[objectName];
        const result = builder({
            ...args,
            objectName
        });
        return Object.values(result);
    });
    let flatViewGroupMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
    for (const viewGroupMetadata of allViewGroupMetadatas){
        flatViewGroupMaps = (0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
            flatEntity: viewGroupMetadata,
            flatEntityMaps: flatViewGroupMaps
        });
    }
    return flatViewGroupMaps;
};

//# sourceMappingURL=build-standard-flat-view-group-metadata-maps.util.js.map