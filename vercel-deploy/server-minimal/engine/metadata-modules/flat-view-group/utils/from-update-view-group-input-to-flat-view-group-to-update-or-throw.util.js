"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdateViewGroupInputToFlatViewGroupToUpdateOrThrow", {
    enumerable: true,
    get: function() {
        return fromUpdateViewGroupInputToFlatViewGroupToUpdateOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _flatviewgroupeditablepropertiesconstant = require("../constants/flat-view-group-editable-properties.constant");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _viewgroupexception = require("../../view-group/exceptions/view-group.exception");
const _mergeupdateinexistingrecordutil = require("../../../../utils/merge-update-in-existing-record.util");
const fromUpdateViewGroupInputToFlatViewGroupToUpdateOrThrow = ({ updateViewGroupInput: rawUpdateViewGroupInput, flatViewGroupMaps })=>{
    const { id: viewGroupToUpdateId, update } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawUpdateViewGroupInput, [
        'id'
    ]);
    const existingFlatViewGroupToUpdate = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewGroupToUpdateId,
        flatEntityMaps: flatViewGroupMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewGroupToUpdate)) {
        throw new _viewgroupexception.ViewGroupException(_core.i18n._(/*i18n*/ {
            id: "UP/TXo",
            message: "View group to update not found"
        }), _viewgroupexception.ViewGroupExceptionCode.VIEW_GROUP_NOT_FOUND);
    }
    const updatedEditableGroupProperties = (0, _utils.extractAndSanitizeObjectStringFields)(update, _flatviewgroupeditablepropertiesconstant.FLAT_VIEW_GROUP_EDITABLE_PROPERTIES);
    return (0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
        existing: existingFlatViewGroupToUpdate,
        properties: _flatviewgroupeditablepropertiesconstant.FLAT_VIEW_GROUP_EDITABLE_PROPERTIES,
        update: updatedEditableGroupProperties
    });
};

//# sourceMappingURL=from-update-view-group-input-to-flat-view-group-to-update-or-throw.util.js.map