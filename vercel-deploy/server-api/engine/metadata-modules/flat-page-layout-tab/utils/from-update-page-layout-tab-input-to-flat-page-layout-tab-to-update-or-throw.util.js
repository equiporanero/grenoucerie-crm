"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdatePageLayoutTabInputToFlatPageLayoutTabToUpdateOrThrow", {
    enumerable: true,
    get: function() {
        return fromUpdatePageLayoutTabInputToFlatPageLayoutTabToUpdateOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _flatpagelayouttabeditablepropertiesconstant = require("../constants/flat-page-layout-tab-editable-properties.constant");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _pagelayouttabexception = require("../../page-layout-tab/exceptions/page-layout-tab.exception");
const _iscalleroverridingentityutil = require("../../utils/is-caller-overriding-entity.util");
const _sanitizeoverridableentityinpututil = require("../../utils/sanitize-overridable-entity-input.util");
const _mergeupdateinexistingrecordutil = require("../../../../utils/merge-update-in-existing-record.util");
const fromUpdatePageLayoutTabInputToFlatPageLayoutTabToUpdateOrThrow = ({ updatePageLayoutTabInput: rawUpdatePageLayoutTabInput, flatPageLayoutTabMaps, callerApplicationUniversalIdentifier, workspaceCustomApplicationUniversalIdentifier })=>{
    const { id: pageLayoutTabToUpdateId } = (0, _utils.extractAndSanitizeObjectStringFields)(rawUpdatePageLayoutTabInput, [
        'id'
    ]);
    const existingFlatPageLayoutTabToUpdate = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: pageLayoutTabToUpdateId,
        flatEntityMaps: flatPageLayoutTabMaps
    });
    if (!(0, _utils.isDefined)(existingFlatPageLayoutTabToUpdate)) {
        throw new _pagelayouttabexception.PageLayoutTabException(_core.i18n._(/*i18n*/ {
            id: "m8tBqi",
            message: "Page layout tab to update not found"
        }), _pagelayouttabexception.PageLayoutTabExceptionCode.PAGE_LAYOUT_TAB_NOT_FOUND);
    }
    const editableProperties = (0, _utils.extractAndSanitizeObjectStringFields)(rawUpdatePageLayoutTabInput.update, _flatpagelayouttabeditablepropertiesconstant.FLAT_PAGE_LAYOUT_TAB_EDITABLE_PROPERTIES);
    const shouldOverride = (0, _iscalleroverridingentityutil.isCallerOverridingEntity)({
        callerApplicationUniversalIdentifier,
        entityApplicationUniversalIdentifier: existingFlatPageLayoutTabToUpdate.applicationUniversalIdentifier,
        workspaceCustomApplicationUniversalIdentifier
    });
    const { overrides, updatedEditableProperties } = (0, _sanitizeoverridableentityinpututil.sanitizeOverridableEntityInput)({
        metadataName: 'pageLayoutTab',
        existingFlatEntity: existingFlatPageLayoutTabToUpdate,
        updatedEditableProperties: editableProperties,
        shouldOverride
    });
    return {
        ...(0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
            existing: existingFlatPageLayoutTabToUpdate,
            properties: [
                ..._flatpagelayouttabeditablepropertiesconstant.FLAT_PAGE_LAYOUT_TAB_EDITABLE_PROPERTIES
            ],
            update: updatedEditableProperties
        }),
        overrides
    };
};

//# sourceMappingURL=from-update-page-layout-tab-input-to-flat-page-layout-tab-to-update-or-throw.util.js.map