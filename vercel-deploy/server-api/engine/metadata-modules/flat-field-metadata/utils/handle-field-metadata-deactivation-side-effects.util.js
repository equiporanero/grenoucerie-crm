"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "handleFieldMetadataDeactivationSideEffects", {
    enumerable: true,
    get: function() {
        return handleFieldMetadataDeactivationSideEffects;
    }
});
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findmanyflatentitybyuniversalidentifierinuniversalflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-universal-identifier-in-universal-flat-entity-maps-or-throw.util");
const handleFieldMetadataDeactivationSideEffects = ({ flatViewMaps, fromFlatFieldMetadata, flatViewFieldMaps, flatViewFilterMaps, flatViewGroupMaps })=>{
    const flatViewFiltersToDelete = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityIds: fromFlatFieldMetadata.viewFilterIds,
        flatEntityMaps: flatViewFilterMaps
    });
    const flatViewFieldsToDelete = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityIds: fromFlatFieldMetadata.viewFieldIds,
        flatEntityMaps: flatViewFieldMaps
    });
    const flatViewsAffected = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityIds: fromFlatFieldMetadata.mainGroupByFieldMetadataViewIds,
        flatEntityMaps: flatViewMaps
    });
    const flatViewGroups = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityIds: flatViewsAffected.flatMap((flatView)=>flatView.viewGroupIds),
        flatEntityMaps: flatViewGroupMaps
    });
    const uniqueViewUniversalIdentifiers = [
        ...new Set(flatViewGroups.map((vg)=>vg.viewUniversalIdentifier))
    ];
    const flatViewsWithViewGroups = (0, _findmanyflatentitybyuniversalidentifierinuniversalflatentitymapsorthrowutil.findManyFlatEntityByUniversalIdentifierInUniversalFlatEntityMapsOrThrow)({
        flatEntityMaps: flatViewMaps,
        universalIdentifiers: uniqueViewUniversalIdentifiers
    });
    const viewIdsFromViewGroups = flatViewsWithViewGroups.map((view)=>view.id);
    // Note: We assume a view only has view groups related to one field
    const viewIdsToDelete = [
        ...new Set([
            ...viewIdsFromViewGroups,
            ...fromFlatFieldMetadata.calendarViewIds,
            ...fromFlatFieldMetadata.mainGroupByFieldMetadataViewIds
        ])
    ];
    const flatViewsToDelete = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityIds: viewIdsToDelete,
        flatEntityMaps: flatViewMaps
    });
    const viewIdsToUpdate = fromFlatFieldMetadata.kanbanAggregateOperationViewIds.filter((viewId)=>!viewIdsToDelete.includes(viewId));
    const flatViewsToUpdate = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityIds: viewIdsToUpdate,
        flatEntityMaps: flatViewMaps
    }).map((flatView)=>({
            ...flatView,
            kanbanAggregateOperation: null,
            kanbanAggregateOperationFieldMetadataId: null,
            kanbanAggregateOperationFieldMetadataUniversalIdentifier: null
        }));
    return {
        flatViewsToUpdate,
        flatViewsToDelete,
        flatViewFieldsToDelete,
        flatViewFiltersToDelete
    };
};

//# sourceMappingURL=handle-field-metadata-deactivation-side-effects.util.js.map