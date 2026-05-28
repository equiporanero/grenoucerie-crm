"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdateViewSortInputToFlatViewSortToUpdateOrThrow", {
    enumerable: true,
    get: function() {
        return fromUpdateViewSortInputToFlatViewSortToUpdateOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _flatviewsorteditablepropertiesconstant = require("../constants/flat-view-sort-editable-properties.constant");
const _viewsortexception = require("../../view-sort/exceptions/view-sort.exception");
const _mergeupdateinexistingrecordutil = require("../../../../utils/merge-update-in-existing-record.util");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const fromUpdateViewSortInputToFlatViewSortToUpdateOrThrow = ({ updateViewSortInput: rawUpdateViewSortInput, flatViewSortMaps })=>{
    const { id: viewSortToUpdateId } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawUpdateViewSortInput, [
        'id'
    ]);
    const existingFlatViewSortToUpdate = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewSortToUpdateId,
        flatEntityMaps: flatViewSortMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewSortToUpdate)) {
        throw new _viewsortexception.ViewSortException(_core.i18n._(/*i18n*/ {
            id: "3zMs+f",
            message: "View sort not found"
        }), _viewsortexception.ViewSortExceptionCode.VIEW_SORT_NOT_FOUND);
    }
    const updatedEditableSortProperties = (0, _utils.extractAndSanitizeObjectStringFields)(rawUpdateViewSortInput.update, _flatviewsorteditablepropertiesconstant.FLAT_VIEW_SORT_EDITABLE_PROPERTIES);
    return (0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
        existing: existingFlatViewSortToUpdate,
        properties: _flatviewsorteditablepropertiesconstant.FLAT_VIEW_SORT_EDITABLE_PROPERTIES,
        update: updatedEditableSortProperties
    });
};

//# sourceMappingURL=from-update-view-sort-input-to-flat-view-sort-to-update-or-throw.util.js.map