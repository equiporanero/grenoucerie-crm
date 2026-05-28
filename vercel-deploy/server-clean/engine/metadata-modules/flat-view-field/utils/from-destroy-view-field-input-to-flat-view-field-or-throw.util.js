"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDestroyViewFieldInputToFlatViewFieldOrThrow", {
    enumerable: true,
    get: function() {
        return fromDestroyViewFieldInputToFlatViewFieldOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _viewfieldexception = require("../../view-field/exceptions/view-field.exception");
const fromDestroyViewFieldInputToFlatViewFieldOrThrow = ({ destroyViewFieldInput, flatViewFieldMaps })=>{
    const { id: viewFieldId } = (0, _utils.extractAndSanitizeObjectStringFields)(destroyViewFieldInput, [
        'id'
    ]);
    const existingFlatViewFieldToDestroy = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewFieldId,
        flatEntityMaps: flatViewFieldMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewFieldToDestroy)) {
        throw new _viewfieldexception.ViewFieldException(_core.i18n._(/*i18n*/ {
            id: "DXyYuh",
            message: "View field to destroy not found"
        }), _viewfieldexception.ViewFieldExceptionCode.VIEW_FIELD_NOT_FOUND);
    }
    return existingFlatViewFieldToDestroy;
};

//# sourceMappingURL=from-destroy-view-field-input-to-flat-view-field-or-throw.util.js.map