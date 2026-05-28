"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDeleteViewFieldGroupInputToFlatViewFieldGroupOrThrow", {
    enumerable: true,
    get: function() {
        return fromDeleteViewFieldGroupInputToFlatViewFieldGroupOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _viewfieldgroupexception = require("../../view-field-group/exceptions/view-field-group.exception");
const fromDeleteViewFieldGroupInputToFlatViewFieldGroupOrThrow = ({ deleteViewFieldGroupInput: rawDeleteViewFieldGroupInput, flatViewFieldGroupMaps })=>{
    const { id: viewFieldGroupId } = (0, _utils.extractAndSanitizeObjectStringFields)(rawDeleteViewFieldGroupInput, [
        'id'
    ]);
    const existingFlatViewFieldGroupToDelete = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewFieldGroupId,
        flatEntityMaps: flatViewFieldGroupMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewFieldGroupToDelete)) {
        throw new _viewfieldgroupexception.ViewFieldGroupException(_core.i18n._(/*i18n*/ {
            id: "uO9NF0",
            message: "View field group to delete not found"
        }), _viewfieldgroupexception.ViewFieldGroupExceptionCode.VIEW_FIELD_GROUP_NOT_FOUND);
    }
    return {
        ...existingFlatViewFieldGroupToDelete,
        deletedAt: new Date().toISOString()
    };
};

//# sourceMappingURL=from-delete-view-field-group-input-to-flat-view-field-group-or-throw.util.js.map