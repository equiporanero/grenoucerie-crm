"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdateViewFieldGroupInputToFlatViewFieldGroupToUpdateOrThrow", {
    enumerable: true,
    get: function() {
        return fromUpdateViewFieldGroupInputToFlatViewFieldGroupToUpdateOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _flatviewfieldgroupeditablepropertiesconstant = require("../constants/flat-view-field-group-editable-properties.constant");
const _iscalleroverridingentityutil = require("../../utils/is-caller-overriding-entity.util");
const _sanitizeoverridableentityinpututil = require("../../utils/sanitize-overridable-entity-input.util");
const _viewfieldgroupexception = require("../../view-field-group/exceptions/view-field-group.exception");
const _mergeupdateinexistingrecordutil = require("../../../../utils/merge-update-in-existing-record.util");
const fromUpdateViewFieldGroupInputToFlatViewFieldGroupToUpdateOrThrow = ({ updateViewFieldGroupInput: rawUpdateViewFieldGroupInput, flatViewFieldGroupMaps, callerApplicationUniversalIdentifier, workspaceCustomApplicationUniversalIdentifier })=>{
    const { id: viewFieldGroupToUpdateId } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawUpdateViewFieldGroupInput, [
        'id'
    ]);
    const existingFlatViewFieldGroupToUpdate = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewFieldGroupToUpdateId,
        flatEntityMaps: flatViewFieldGroupMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewFieldGroupToUpdate)) {
        throw new _viewfieldgroupexception.ViewFieldGroupException(_core.i18n._(/*i18n*/ {
            id: "KpmBDs",
            message: "View field group to update not found"
        }), _viewfieldgroupexception.ViewFieldGroupExceptionCode.VIEW_FIELD_GROUP_NOT_FOUND);
    }
    const editableProperties = (0, _utils.extractAndSanitizeObjectStringFields)(rawUpdateViewFieldGroupInput.update, _flatviewfieldgroupeditablepropertiesconstant.FLAT_VIEW_FIELD_GROUP_EDITABLE_PROPERTIES);
    const shouldOverride = (0, _iscalleroverridingentityutil.isCallerOverridingEntity)({
        callerApplicationUniversalIdentifier,
        entityApplicationUniversalIdentifier: existingFlatViewFieldGroupToUpdate.applicationUniversalIdentifier,
        workspaceCustomApplicationUniversalIdentifier
    });
    const { overrides, updatedEditableProperties } = (0, _sanitizeoverridableentityinpututil.sanitizeOverridableEntityInput)({
        metadataName: 'viewFieldGroup',
        existingFlatEntity: existingFlatViewFieldGroupToUpdate,
        updatedEditableProperties: editableProperties,
        shouldOverride
    });
    return {
        ...(0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
            existing: existingFlatViewFieldGroupToUpdate,
            properties: [
                ..._flatviewfieldgroupeditablepropertiesconstant.FLAT_VIEW_FIELD_GROUP_EDITABLE_PROPERTIES
            ],
            update: updatedEditableProperties
        }),
        overrides
    };
};

//# sourceMappingURL=from-update-view-field-group-input-to-flat-view-field-group-to-update-or-throw.util.js.map