"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDeleteViewFieldInputToFlatViewFieldOrThrow", {
    enumerable: true,
    get: function() {
        return fromDeleteViewFieldInputToFlatViewFieldOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _viewfieldexception = require("../../view-field/exceptions/view-field.exception");
const fromDeleteViewFieldInputToFlatViewFieldOrThrow = ({ deleteViewFieldInput: rawDeleteViewFieldInput, flatViewFieldMaps })=>{
    const { id: viewFieldId } = (0, _utils.extractAndSanitizeObjectStringFields)(rawDeleteViewFieldInput, [
        'id'
    ]);
    const existingFlatViewFieldToDelete = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewFieldId,
        flatEntityMaps: flatViewFieldMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewFieldToDelete)) {
        throw new _viewfieldexception.ViewFieldException(_core.i18n._(/*i18n*/ {
            id: "XJlyZS",
            message: "View field to delete not found"
        }), _viewfieldexception.ViewFieldExceptionCode.VIEW_FIELD_NOT_FOUND);
    }
    return {
        ...existingFlatViewFieldToDelete,
        deletedAt: new Date().toISOString()
    };
};

//# sourceMappingURL=from-delete-view-field-input-to-flat-view-field-or-throw.util.js.map