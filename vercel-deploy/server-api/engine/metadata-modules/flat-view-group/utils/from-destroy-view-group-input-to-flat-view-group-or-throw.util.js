"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDestroyViewGroupInputToFlatViewGroupOrThrow", {
    enumerable: true,
    get: function() {
        return fromDestroyViewGroupInputToFlatViewGroupOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _viewgroupexception = require("../../view-group/exceptions/view-group.exception");
const fromDestroyViewGroupInputToFlatViewGroupOrThrow = ({ destroyViewGroupInput, flatViewGroupMaps })=>{
    const { id: viewGroupId } = (0, _utils.extractAndSanitizeObjectStringFields)(destroyViewGroupInput, [
        'id'
    ]);
    const existingFlatViewGroupToDestroy = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewGroupId,
        flatEntityMaps: flatViewGroupMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewGroupToDestroy)) {
        throw new _viewgroupexception.ViewGroupException(_core.i18n._(/*i18n*/ {
            id: "34hWb7",
            message: "View group to destroy not found"
        }), _viewgroupexception.ViewGroupExceptionCode.VIEW_GROUP_NOT_FOUND);
    }
    return existingFlatViewGroupToDestroy;
};

//# sourceMappingURL=from-destroy-view-group-input-to-flat-view-group-or-throw.util.js.map