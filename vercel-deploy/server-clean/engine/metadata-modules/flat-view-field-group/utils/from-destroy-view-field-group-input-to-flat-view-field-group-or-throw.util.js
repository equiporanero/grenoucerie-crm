"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDestroyViewFieldGroupInputToFlatViewFieldGroupOrThrow", {
    enumerable: true,
    get: function() {
        return fromDestroyViewFieldGroupInputToFlatViewFieldGroupOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _viewfieldgroupexception = require("../../view-field-group/exceptions/view-field-group.exception");
const fromDestroyViewFieldGroupInputToFlatViewFieldGroupOrThrow = ({ destroyViewFieldGroupInput, flatViewFieldGroupMaps })=>{
    const { id: viewFieldGroupId } = (0, _utils.extractAndSanitizeObjectStringFields)(destroyViewFieldGroupInput, [
        'id'
    ]);
    const existingFlatViewFieldGroupToDestroy = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewFieldGroupId,
        flatEntityMaps: flatViewFieldGroupMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewFieldGroupToDestroy)) {
        throw new _viewfieldgroupexception.ViewFieldGroupException(_core.i18n._(/*i18n*/ {
            id: "Durlx6",
            message: "View field group to destroy not found"
        }), _viewfieldgroupexception.ViewFieldGroupExceptionCode.VIEW_FIELD_GROUP_NOT_FOUND);
    }
    return existingFlatViewFieldGroupToDestroy;
};

//# sourceMappingURL=from-destroy-view-field-group-input-to-flat-view-field-group-or-throw.util.js.map