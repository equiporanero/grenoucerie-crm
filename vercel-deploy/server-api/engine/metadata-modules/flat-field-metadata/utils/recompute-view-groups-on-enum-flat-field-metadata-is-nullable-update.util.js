"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "recomputeViewGroupsOnEnumFlatFieldMetadataIsNullableUpdate", {
    enumerable: true,
    get: function() {
        return recomputeViewGroupsOnEnumFlatFieldMetadataIsNullableUpdate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _reduceflatviewgroupsbyviewuniversalidentifierutil = require("../../flat-view-group/utils/reduce-flat-view-groups-by-view-universal-identifier.util");
const EMPTY_ENUM_FIELD_METADATA_IS_NULLABLE_UPDATE_SIDE_EFFECT_RESULT = {
    flatViewGroupsToCreate: [],
    flatViewGroupsToDelete: []
};
const recomputeViewGroupsOnEnumFlatFieldMetadataIsNullableUpdate = ({ flatViewMaps, flatViewGroupMaps: allFlatViewGroups, fromFlatFieldMetadata, toFlatFieldMetadata })=>{
    const sideEffectResult = structuredClone(EMPTY_ENUM_FIELD_METADATA_IS_NULLABLE_UPDATE_SIDE_EFFECT_RESULT);
    const flatViewsAffected = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityIds: fromFlatFieldMetadata.mainGroupByFieldMetadataViewIds,
        flatEntityMaps: flatViewMaps
    });
    const flatViewGroups = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityIds: flatViewsAffected.flatMap((flatView)=>flatView.viewGroupIds),
        flatEntityMaps: allFlatViewGroups
    });
    const { flatViewGroupRecordByViewUniversalIdentifier, highestViewGroupPositionByViewUniversalIdentifier } = (0, _reduceflatviewgroupsbyviewuniversalidentifierutil.reduceFlatViewGroupsByViewUniversalIdentifier)({
        flatViewGroups
    });
    for(const viewUniversalIdentifier in flatViewGroupRecordByViewUniversalIdentifier){
        const flatViewGroupsForView = Object.values(flatViewGroupRecordByViewUniversalIdentifier[viewUniversalIdentifier]);
        const emptyValueFlatViewGroup = flatViewGroupsForView.find((flatViewGroup)=>flatViewGroup.fieldValue === '');
        if (toFlatFieldMetadata.isNullable === true && !(0, _utils.isDefined)(emptyValueFlatViewGroup)) {
            const highestViewGroupPosition = highestViewGroupPositionByViewUniversalIdentifier[viewUniversalIdentifier];
            const viewGroupId = (0, _uuid.v4)();
            const createdAt = new Date().toISOString();
            const flatView = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
                flatEntityMaps: flatViewMaps,
                universalIdentifier: viewUniversalIdentifier
            });
            sideEffectResult.flatViewGroupsToCreate.push({
                id: viewGroupId,
                universalIdentifier: viewGroupId,
                fieldValue: '',
                position: highestViewGroupPosition + 1,
                applicationUniversalIdentifier: toFlatFieldMetadata.applicationUniversalIdentifier,
                viewUniversalIdentifier,
                isVisible: true,
                workspaceId: toFlatFieldMetadata.workspaceId,
                createdAt,
                updatedAt: createdAt,
                deletedAt: null,
                viewId: flatView.id,
                applicationId: toFlatFieldMetadata.applicationId
            });
        } else if ((0, _utils.isDefined)(emptyValueFlatViewGroup)) {
            sideEffectResult.flatViewGroupsToDelete.push(emptyValueFlatViewGroup);
        }
    }
    return sideEffectResult;
};

//# sourceMappingURL=recompute-view-groups-on-enum-flat-field-metadata-is-nullable-update.util.js.map