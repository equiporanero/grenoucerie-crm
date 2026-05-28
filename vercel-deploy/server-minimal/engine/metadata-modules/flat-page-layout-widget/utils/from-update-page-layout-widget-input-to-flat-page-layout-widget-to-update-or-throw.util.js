"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdatePageLayoutWidgetInputToFlatPageLayoutWidgetToUpdateOrThrow", {
    enumerable: true,
    get: function() {
        return fromUpdatePageLayoutWidgetInputToFlatPageLayoutWidgetToUpdateOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const _flatpagelayoutwidgeteditablepropertiesconstant = require("../constants/flat-page-layout-widget-editable-properties.constant");
const _frompagelayoutwidgetconfigurationtouniversalconfigurationutil = require("./from-page-layout-widget-configuration-to-universal-configuration.util");
const _frompagelayoutwidgetoverridestouniversaloverridesutil = require("./from-page-layout-widget-overrides-to-universal-overrides.util");
const _pagelayoutwidgetexception = require("../../page-layout-widget/exceptions/page-layout-widget.exception");
const _validatewidgetconfigurationinpututil = require("../../page-layout-widget/utils/validate-widget-configuration-input.util");
const _iscalleroverridingentityutil = require("../../utils/is-caller-overriding-entity.util");
const _sanitizeoverridableentityinpututil = require("../../utils/sanitize-overridable-entity-input.util");
const _mergeupdateinexistingrecordutil = require("../../../../utils/merge-update-in-existing-record.util");
const fromUpdatePageLayoutWidgetInputToFlatPageLayoutWidgetToUpdateOrThrow = ({ updatePageLayoutWidgetInput: rawUpdatePageLayoutWidgetInput, flatPageLayoutWidgetMaps, flatObjectMetadataMaps, flatFieldMetadataMaps, flatFrontComponentMaps, flatViewFieldGroupMaps, flatViewMaps, flatPageLayoutTabMaps, callerApplicationUniversalIdentifier, workspaceCustomApplicationUniversalIdentifier })=>{
    const { id: pageLayoutWidgetToUpdateId } = (0, _utils.extractAndSanitizeObjectStringFields)(rawUpdatePageLayoutWidgetInput, [
        'id'
    ]);
    const existingFlatPageLayoutWidgetToUpdate = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: pageLayoutWidgetToUpdateId,
        flatEntityMaps: flatPageLayoutWidgetMaps
    });
    if (!(0, _utils.isDefined)(existingFlatPageLayoutWidgetToUpdate)) {
        throw new _pagelayoutwidgetexception.PageLayoutWidgetException(_core.i18n._(/*i18n*/ {
            id: "yCsIxc",
            message: "Page layout widget to update not found"
        }), _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.PAGE_LAYOUT_WIDGET_NOT_FOUND);
    }
    const editableProperties = (0, _utils.extractAndSanitizeObjectStringFields)(rawUpdatePageLayoutWidgetInput.update, _flatpagelayoutwidgeteditablepropertiesconstant.FLAT_PAGE_LAYOUT_WIDGET_EDITABLE_PROPERTIES);
    if (Object.prototype.hasOwnProperty.call(editableProperties, 'configuration')) {
        (0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
            configuration: editableProperties.configuration
        });
    }
    const shouldOverride = (0, _iscalleroverridingentityutil.isCallerOverridingEntity)({
        callerApplicationUniversalIdentifier,
        entityApplicationUniversalIdentifier: existingFlatPageLayoutWidgetToUpdate.applicationUniversalIdentifier,
        workspaceCustomApplicationUniversalIdentifier
    });
    const { overrides, updatedEditableProperties } = (0, _sanitizeoverridableentityinpututil.sanitizeOverridableEntityInput)({
        metadataName: 'pageLayoutWidget',
        existingFlatEntity: existingFlatPageLayoutWidgetToUpdate,
        updatedEditableProperties: editableProperties,
        shouldOverride
    });
    const flatPageLayoutWidgetToUpdate = {
        ...(0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
            existing: existingFlatPageLayoutWidgetToUpdate,
            properties: _flatpagelayoutwidgeteditablepropertiesconstant.FLAT_PAGE_LAYOUT_WIDGET_EDITABLE_PROPERTIES,
            update: updatedEditableProperties
        }),
        overrides
    };
    if (updatedEditableProperties.pageLayoutTabId !== undefined) {
        const { pageLayoutTabUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
            metadataName: 'pageLayoutWidget',
            foreignKeyValues: {
                pageLayoutTabId: flatPageLayoutWidgetToUpdate.pageLayoutTabId
            },
            flatEntityMaps: {
                flatPageLayoutTabMaps
            }
        });
        flatPageLayoutWidgetToUpdate.pageLayoutTabUniversalIdentifier = pageLayoutTabUniversalIdentifier;
    }
    if (updatedEditableProperties.objectMetadataId !== undefined) {
        const { objectMetadataUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
            metadataName: 'pageLayoutWidget',
            foreignKeyValues: {
                objectMetadataId: flatPageLayoutWidgetToUpdate.objectMetadataId
            },
            flatEntityMaps: {
                flatObjectMetadataMaps
            }
        });
        flatPageLayoutWidgetToUpdate.objectMetadataUniversalIdentifier = objectMetadataUniversalIdentifier;
    }
    if ((0, _utils.isDefined)(updatedEditableProperties.configuration)) {
        flatPageLayoutWidgetToUpdate.universalConfiguration = (0, _frompagelayoutwidgetconfigurationtouniversalconfigurationutil.fromPageLayoutWidgetConfigurationToUniversalConfiguration)({
            configuration: flatPageLayoutWidgetToUpdate.configuration,
            fieldMetadataUniversalIdentifierById: flatFieldMetadataMaps.universalIdentifierById,
            frontComponentUniversalIdentifierById: flatFrontComponentMaps.universalIdentifierById,
            viewFieldGroupUniversalIdentifierById: flatViewFieldGroupMaps.universalIdentifierById,
            viewUniversalIdentifierById: flatViewMaps.universalIdentifierById
        });
    }
    if ((0, _utils.isDefined)(overrides)) {
        flatPageLayoutWidgetToUpdate.universalOverrides = (0, _frompagelayoutwidgetoverridestouniversaloverridesutil.fromPageLayoutWidgetOverridesToUniversalOverrides)({
            overrides,
            pageLayoutTabUniversalIdentifierById: flatPageLayoutTabMaps.universalIdentifierById
        });
    } else {
        flatPageLayoutWidgetToUpdate.universalOverrides = null;
    }
    return flatPageLayoutWidgetToUpdate;
};

//# sourceMappingURL=from-update-page-layout-widget-input-to-flat-page-layout-widget-to-update-or-throw.util.js.map