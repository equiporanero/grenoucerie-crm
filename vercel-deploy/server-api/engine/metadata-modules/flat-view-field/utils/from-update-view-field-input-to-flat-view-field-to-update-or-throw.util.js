"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdateViewFieldInputToFlatViewFieldToUpdateOrThrow", {
    enumerable: true,
    get: function() {
        return fromUpdateViewFieldInputToFlatViewFieldToUpdateOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const _flatviewfieldeditablepropertiesconstant = require("../constants/flat-view-field-editable-properties.constant");
const _fromviewfieldoverridestouniversaloverridesutil = require("./from-view-field-overrides-to-universal-overrides.util");
const _iscalleroverridingentityutil = require("../../utils/is-caller-overriding-entity.util");
const _sanitizeoverridableentityinpututil = require("../../utils/sanitize-overridable-entity-input.util");
const _viewfieldexception = require("../../view-field/exceptions/view-field.exception");
const _mergeupdateinexistingrecordutil = require("../../../../utils/merge-update-in-existing-record.util");
const fromUpdateViewFieldInputToFlatViewFieldToUpdateOrThrow = ({ updateViewFieldInput: rawUpdateViewFieldInput, flatViewFieldMaps, flatViewFieldGroupMaps, callerApplicationUniversalIdentifier, workspaceCustomApplicationUniversalIdentifier })=>{
    const { id: viewFieldToUpdateId } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawUpdateViewFieldInput, [
        'id'
    ]);
    const existingFlatViewFieldToUpdate = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewFieldToUpdateId,
        flatEntityMaps: flatViewFieldMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewFieldToUpdate)) {
        throw new _viewfieldexception.ViewFieldException(_core.i18n._(/*i18n*/ {
            id: "Fpy/K1",
            message: "View field to update not found"
        }), _viewfieldexception.ViewFieldExceptionCode.VIEW_FIELD_NOT_FOUND);
    }
    const editableProperties = (0, _utils.extractAndSanitizeObjectStringFields)(rawUpdateViewFieldInput.update, _flatviewfieldeditablepropertiesconstant.FLAT_VIEW_FIELD_EDITABLE_PROPERTIES);
    const shouldOverride = (0, _iscalleroverridingentityutil.isCallerOverridingEntity)({
        callerApplicationUniversalIdentifier,
        entityApplicationUniversalIdentifier: existingFlatViewFieldToUpdate.applicationUniversalIdentifier,
        workspaceCustomApplicationUniversalIdentifier
    });
    const { overrides, updatedEditableProperties } = (0, _sanitizeoverridableentityinpututil.sanitizeOverridableEntityInput)({
        metadataName: 'viewField',
        existingFlatEntity: existingFlatViewFieldToUpdate,
        updatedEditableProperties: editableProperties,
        shouldOverride
    });
    const mergedRecord = (0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
        existing: existingFlatViewFieldToUpdate,
        properties: [
            ..._flatviewfieldeditablepropertiesconstant.FLAT_VIEW_FIELD_EDITABLE_PROPERTIES
        ],
        update: updatedEditableProperties
    });
    const flatViewFieldToUpdate = {
        ...mergedRecord,
        overrides
    };
    if (updatedEditableProperties.viewFieldGroupId !== undefined) {
        const { viewFieldGroupUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
            metadataName: 'viewField',
            foreignKeyValues: {
                viewFieldGroupId: mergedRecord.viewFieldGroupId
            },
            flatEntityMaps: {
                flatViewFieldGroupMaps
            }
        });
        flatViewFieldToUpdate.viewFieldGroupUniversalIdentifier = viewFieldGroupUniversalIdentifier;
    }
    if ((0, _utils.isDefined)(overrides)) {
        flatViewFieldToUpdate.universalOverrides = (0, _fromviewfieldoverridestouniversaloverridesutil.fromViewFieldOverridesToUniversalOverrides)({
            overrides,
            viewFieldGroupUniversalIdentifierById: flatViewFieldGroupMaps.universalIdentifierById
        });
    } else {
        flatViewFieldToUpdate.universalOverrides = null;
    }
    return flatViewFieldToUpdate;
};

//# sourceMappingURL=from-update-view-field-input-to-flat-view-field-to-update-or-throw.util.js.map