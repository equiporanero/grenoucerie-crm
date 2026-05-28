"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDeleteViewGroupInputToFlatViewGroupOrThrow", {
    enumerable: true,
    get: function() {
        return fromDeleteViewGroupInputToFlatViewGroupOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _viewgroupexception = require("../../view-group/exceptions/view-group.exception");
const fromDeleteViewGroupInputToFlatViewGroupOrThrow = ({ deleteViewGroupInput: rawDeleteViewGroupInput, flatViewGroupMaps })=>{
    const { id: viewGroupId } = (0, _utils.extractAndSanitizeObjectStringFields)(rawDeleteViewGroupInput, [
        'id'
    ]);
    const existingFlatViewGroupToDelete = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewGroupId,
        flatEntityMaps: flatViewGroupMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewGroupToDelete)) {
        throw new _viewgroupexception.ViewGroupException(_core.i18n._(/*i18n*/ {
            id: "JdAvYa",
            message: "View group to delete not found"
        }), _viewgroupexception.ViewGroupExceptionCode.VIEW_GROUP_NOT_FOUND);
    }
    return {
        ...existingFlatViewGroupToDelete,
        deletedAt: new Date().toISOString()
    };
};

//# sourceMappingURL=from-delete-view-group-input-to-flat-view-group-or-throw.util.js.map