"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get FLAT_VIEW_UPDATE_EMPTY_SIDE_EFFECTS () {
        return FLAT_VIEW_UPDATE_EMPTY_SIDE_EFFECTS;
    },
    get handleFlatViewUpdateSideEffect () {
        return handleFlatViewUpdateSideEffect;
    }
});
const _utils = require("twenty-shared/utils");
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _computeflatviewgroupsonviewcreateutil = require("../../flat-view-group/utils/compute-flat-view-groups-on-view-create.util");
const FLAT_VIEW_UPDATE_EMPTY_SIDE_EFFECTS = {
    flatViewGroupsToDelete: [],
    flatViewGroupsToCreate: []
};
const handleFlatViewUpdateSideEffect = ({ fromFlatView, toFlatView, flatViewGroupMaps, flatFieldMetadataMaps })=>{
    const sideEffectResult = structuredClone(FLAT_VIEW_UPDATE_EMPTY_SIDE_EFFECTS);
    const newMainGroupByFieldMetadataId = toFlatView.mainGroupByFieldMetadataId;
    const hasMainGroupByFieldMetadataIdChanged = fromFlatView.mainGroupByFieldMetadataId !== newMainGroupByFieldMetadataId;
    if (!hasMainGroupByFieldMetadataIdChanged) {
        return sideEffectResult;
    }
    if (fromFlatView.viewGroupIds.length > 0) {
        sideEffectResult.flatViewGroupsToDelete = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityIds: fromFlatView.viewGroupIds,
            flatEntityMaps: flatViewGroupMaps
        });
    }
    if (!(0, _utils.isDefined)(newMainGroupByFieldMetadataId)) {
        return sideEffectResult;
    }
    sideEffectResult.flatViewGroupsToCreate = (0, _computeflatviewgroupsonviewcreateutil.computeFlatViewGroupsOnViewCreate)({
        flatViewToCreateUniversalIdentifier: toFlatView.universalIdentifier,
        mainGroupByFieldMetadataId: newMainGroupByFieldMetadataId,
        flatFieldMetadataMaps
    });
    return sideEffectResult;
};

//# sourceMappingURL=handle-flat-view-update-side-effect.util.js.map