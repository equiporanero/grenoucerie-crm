"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdateViewFilterGroupInputToFlatViewFilterGroupToUpdateOrThrow", {
    enumerable: true,
    get: function() {
        return fromUpdateViewFilterGroupInputToFlatViewFilterGroupToUpdateOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const _flatviewfiltergroupeditablepropertiesconstant = require("../constants/flat-view-filter-group-editable-properties.constant");
const _viewfiltergroupexception = require("../../view-filter-group/exceptions/view-filter-group.exception");
const _mergeupdateinexistingrecordutil = require("../../../../utils/merge-update-in-existing-record.util");
const fromUpdateViewFilterGroupInputToFlatViewFilterGroupToUpdateOrThrow = ({ updateViewFilterGroupInput: rawUpdateViewFilterGroupInput, flatViewFilterGroupMaps })=>{
    const { id: viewFilterGroupToUpdateId } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawUpdateViewFilterGroupInput, [
        'id'
    ]);
    const existingFlatViewFilterGroupToUpdate = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewFilterGroupToUpdateId,
        flatEntityMaps: flatViewFilterGroupMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewFilterGroupToUpdate)) {
        throw new _viewfiltergroupexception.ViewFilterGroupException('View filter group not found', _viewfiltergroupexception.ViewFilterGroupExceptionCode.VIEW_FILTER_GROUP_NOT_FOUND);
    }
    const updatedEditableFieldProperties = (0, _utils.extractAndSanitizeObjectStringFields)(rawUpdateViewFilterGroupInput, _flatviewfiltergroupeditablepropertiesconstant.FLAT_VIEW_FILTER_GROUP_EDITABLE_PROPERTIES);
    const flatViewFilterGroupToUpdate = (0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
        existing: existingFlatViewFilterGroupToUpdate,
        properties: _flatviewfiltergroupeditablepropertiesconstant.FLAT_VIEW_FILTER_GROUP_EDITABLE_PROPERTIES,
        update: updatedEditableFieldProperties
    });
    if (updatedEditableFieldProperties.parentViewFilterGroupId !== undefined) {
        const { parentViewFilterGroupUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
            metadataName: 'viewFilterGroup',
            foreignKeyValues: {
                parentViewFilterGroupId: flatViewFilterGroupToUpdate.parentViewFilterGroupId
            },
            flatEntityMaps: {
                flatViewFilterGroupMaps
            }
        });
        flatViewFilterGroupToUpdate.parentViewFilterGroupUniversalIdentifier = parentViewFilterGroupUniversalIdentifier;
    }
    return flatViewFilterGroupToUpdate;
};

//# sourceMappingURL=from-update-view-filter-group-input-to-flat-view-filter-group-to-update-or-throw.util.js.map