"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "recomputeViewGroupsOnFlatFieldMetadataOptionsUpdate", {
    enumerable: true,
    get: function() {
        return recomputeViewGroupsOnFlatFieldMetadataOptionsUpdate;
    }
});
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _comparetwoflatfieldmetadataenumoptionsutil = require("./compare-two-flat-field-metadata-enum-options.util");
const _reduceflatviewgroupsbyviewuniversalidentifierutil = require("../../flat-view-group/utils/reduce-flat-view-groups-by-view-universal-identifier.util");
const recomputeViewGroupsOnFlatFieldMetadataOptionsUpdate = ({ flatViewMaps, flatViewGroupMaps, fromFlatFieldMetadata, toOptions })=>{
    const { deleted: deletedFieldMetadataOptions, updated: updatedFieldMetadataOptions, created: createdFieldMetadataOptions } = (0, _comparetwoflatfieldmetadataenumoptionsutil.compareTwoFlatFieldMetadataEnumOptions)({
        compareLabel: false,
        fromOptions: fromFlatFieldMetadata.options,
        toOptions
    });
    const flatViewsAffected = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityIds: fromFlatFieldMetadata.mainGroupByFieldMetadataViewIds,
        flatEntityMaps: flatViewMaps
    });
    const flatViewGroups = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityIds: flatViewsAffected.flatMap((flatView)=>flatView.viewGroupIds),
        flatEntityMaps: flatViewGroupMaps
    });
    if (flatViewGroups.length === 0) {
        return {
            flatViewGroupsToCreate: [],
            flatViewGroupsToDelete: [],
            flatViewGroupsToUpdate: []
        };
    }
    const workspaceId = fromFlatFieldMetadata.workspaceId;
    const flatViewGroupsToDelete = deletedFieldMetadataOptions.flatMap((option)=>flatViewGroups.filter((flatViewGroup)=>flatViewGroup.fieldValue === option.value));
    const flatViewGroupsToUpdate = updatedFieldMetadataOptions.flatMap(({ from: fromOption, to: toOption })=>flatViewGroups.flatMap((flatViewGroup)=>flatViewGroup.fieldValue === fromOption.value ? {
                ...flatViewGroup,
                fieldValue: toOption.value
            } : []));
    const remainingFlatViewGroups = flatViewGroups.filter((flatViewGroup)=>!flatViewGroupsToDelete.some((flatViewGroupToDelete)=>flatViewGroupToDelete.id === flatViewGroup.id));
    const viewGroupsByViewUniversalIdentifier = (0, _reduceflatviewgroupsbyviewuniversalidentifierutil.reduceFlatViewGroupsByViewUniversalIdentifier)({
        flatViewGroups: remainingFlatViewGroups
    });
    // Count visible view groups per view to enforce the limit
    const visibleViewGroupCountByViewUniversalIdentifier = remainingFlatViewGroups.reduce((acc, flatViewGroup)=>{
        if (flatViewGroup.isVisible) {
            acc[flatViewGroup.viewUniversalIdentifier] = (acc[flatViewGroup.viewUniversalIdentifier] ?? 0) + 1;
        }
        return acc;
    }, {});
    const viewUniversalIdentifiers = Object.keys(viewGroupsByViewUniversalIdentifier.flatViewGroupRecordByViewUniversalIdentifier);
    const createdAt = new Date().toISOString();
    const flatViewGroupsToCreate = createdFieldMetadataOptions.flatMap((option, createdOptionIndex)=>viewUniversalIdentifiers.map((viewUniversalIdentifier)=>{
            const viewGroupHighestPosition = viewGroupsByViewUniversalIdentifier.highestViewGroupPositionByViewUniversalIdentifier[viewUniversalIdentifier];
            if (!(0, _utils.isDefined)(viewGroupHighestPosition)) {
                throw new _flatentitymapsexception.FlatEntityMapsException('View universal identifier highest position not found, should never occur', _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
            }
            const currentVisibleCount = visibleViewGroupCountByViewUniversalIdentifier[viewUniversalIdentifier] ?? 0;
            const isVisible = currentVisibleCount < _constants.VIEW_GROUP_VISIBLE_OPTIONS_MAX;
            // Increment the count for future iterations if this group will be visible
            if (isVisible) {
                visibleViewGroupCountByViewUniversalIdentifier[viewUniversalIdentifier] = currentVisibleCount + 1;
            }
            const viewGroupId = (0, _uuid.v4)();
            const flatView = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
                flatEntityMaps: flatViewMaps,
                universalIdentifier: viewUniversalIdentifier
            });
            return {
                id: viewGroupId,
                fieldMetadataId: fromFlatFieldMetadata.id,
                viewId: flatView.id,
                viewUniversalIdentifier,
                workspaceId,
                createdAt: createdAt,
                updatedAt: createdAt,
                deletedAt: null,
                universalIdentifier: viewGroupId,
                isVisible,
                fieldValue: option.value,
                position: viewGroupHighestPosition + createdOptionIndex + 1,
                applicationId: fromFlatFieldMetadata.applicationId,
                applicationUniversalIdentifier: fromFlatFieldMetadata.applicationUniversalIdentifier
            };
        }));
    return {
        flatViewGroupsToCreate,
        flatViewGroupsToDelete,
        flatViewGroupsToUpdate
    };
};

//# sourceMappingURL=recompute-view-groups-on-flat-field-metadata-options-update.util.js.map