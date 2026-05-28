"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "handleEnumFlatFieldMetadataUpdateSideEffects", {
    enumerable: true,
    get: function() {
        return handleEnumFlatFieldMetadataUpdateSideEffects;
    }
});
const _recomputeviewfiltersonflatfieldmetadataoptionsupdateutil = require("./recompute-view-filters-on-flat-field-metadata-options-update.util");
const _recomputeviewgroupsonenumflatfieldmetadataisnullableupdateutil = require("./recompute-view-groups-on-enum-flat-field-metadata-is-nullable-update.util");
const _recomputeviewgroupsonflatfieldmetadataoptionsupdateutil = require("./recompute-view-groups-on-flat-field-metadata-options-update.util");
const EMPTY_ENUM_FIELD_METADATA_SIDE_EFFECT_RESULT = {
    flatViewFiltersToDelete: [],
    flatViewFiltersToUpdate: [],
    flatViewGroupsToCreate: [],
    flatViewGroupsToDelete: [],
    flatViewGroupsToUpdate: []
};
const handleEnumFlatFieldMetadataUpdateSideEffects = ({ fromFlatFieldMetadata, toFlatFieldMetadata, flatViewFilterMaps, flatViewGroupMaps, flatViewMaps })=>{
    const sideEffectResult = structuredClone(EMPTY_ENUM_FIELD_METADATA_SIDE_EFFECT_RESULT);
    if (JSON.stringify(fromFlatFieldMetadata.options) !== JSON.stringify(toFlatFieldMetadata.options)) {
        const optionsPropertyUpdate = toFlatFieldMetadata.options;
        const { flatViewFiltersToDelete, flatViewFiltersToUpdate } = (0, _recomputeviewfiltersonflatfieldmetadataoptionsupdateutil.recomputeViewFiltersOnFlatFieldMetadataOptionsUpdate)({
            flatViewFilterMaps,
            fromFlatFieldMetadata,
            toOptions: optionsPropertyUpdate
        });
        sideEffectResult.flatViewFiltersToDelete.push(...flatViewFiltersToDelete);
        sideEffectResult.flatViewFiltersToUpdate.push(...flatViewFiltersToUpdate);
        const { flatViewGroupsToCreate, flatViewGroupsToDelete, flatViewGroupsToUpdate } = (0, _recomputeviewgroupsonflatfieldmetadataoptionsupdateutil.recomputeViewGroupsOnFlatFieldMetadataOptionsUpdate)({
            flatViewMaps,
            flatViewGroupMaps,
            fromFlatFieldMetadata,
            toOptions: optionsPropertyUpdate
        });
        sideEffectResult.flatViewGroupsToCreate.push(...flatViewGroupsToCreate);
        sideEffectResult.flatViewGroupsToDelete.push(...flatViewGroupsToDelete);
        sideEffectResult.flatViewGroupsToUpdate.push(...flatViewGroupsToUpdate);
    }
    if (fromFlatFieldMetadata.isNullable !== toFlatFieldMetadata.isNullable) {
        const { flatViewGroupsToCreate, flatViewGroupsToDelete } = (0, _recomputeviewgroupsonenumflatfieldmetadataisnullableupdateutil.recomputeViewGroupsOnEnumFlatFieldMetadataIsNullableUpdate)({
            flatViewMaps,
            flatViewGroupMaps,
            fromFlatFieldMetadata,
            toFlatFieldMetadata
        });
        sideEffectResult.flatViewGroupsToCreate.push(...flatViewGroupsToCreate);
        sideEffectResult.flatViewGroupsToDelete.push(...flatViewGroupsToDelete);
    }
    return sideEffectResult;
};

//# sourceMappingURL=handle-enum-flat-field-metadata-update-side-effects.util.js.map