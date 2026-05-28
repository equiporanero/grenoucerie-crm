"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreatePageLayoutWidgetInputToFlatPageLayoutWidgetToCreate", {
    enumerable: true,
    get: function() {
        return fromCreatePageLayoutWidgetInputToFlatPageLayoutWidgetToCreate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _buildflatpagelayoutwidgetcommonpropertiesutil = require("./build-flat-page-layout-widget-common-properties.util");
const _frompagelayoutwidgetconfigurationtouniversalconfigurationutil = require("./from-page-layout-widget-configuration-to-universal-configuration.util");
const _validatewidgetconfigurationinpututil = require("../../page-layout-widget/utils/validate-widget-configuration-input.util");
const fromCreatePageLayoutWidgetInputToFlatPageLayoutWidgetToCreate = ({ createPageLayoutWidgetInput: rawCreatePageLayoutWidgetInput, workspaceId, flatApplication, flatPageLayoutTabMaps, flatObjectMetadataMaps, flatFieldMetadataMaps, flatFrontComponentMaps, flatViewFieldGroupMaps, flatViewMaps })=>{
    const { pageLayoutTabId, ...createPageLayoutWidgetInput } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawCreatePageLayoutWidgetInput, [
        'pageLayoutTabId'
    ]);
    (0, _validatewidgetconfigurationinpututil.validateWidgetConfigurationInput)({
        configuration: createPageLayoutWidgetInput.configuration
    });
    const createdAt = new Date().toISOString();
    const pageLayoutWidgetId = (0, _uuid.v4)();
    const commonProperties = (0, _buildflatpagelayoutwidgetcommonpropertiesutil.buildFlatPageLayoutWidgetCommonProperties)({
        widgetInput: {
            pageLayoutTabId,
            title: createPageLayoutWidgetInput.title,
            type: createPageLayoutWidgetInput.type,
            objectMetadataId: createPageLayoutWidgetInput.objectMetadataId,
            gridPosition: createPageLayoutWidgetInput.gridPosition,
            position: createPageLayoutWidgetInput.position
        },
        flatPageLayoutTabMaps,
        flatObjectMetadataMaps
    });
    return {
        id: pageLayoutWidgetId,
        ...commonProperties,
        isActive: true,
        workspaceId,
        createdAt,
        updatedAt: createdAt,
        deletedAt: null,
        universalIdentifier: pageLayoutWidgetId,
        configuration: createPageLayoutWidgetInput.configuration,
        applicationId: flatApplication.id,
        applicationUniversalIdentifier: flatApplication.universalIdentifier,
        conditionalDisplay: null,
        conditionalAvailabilityExpression: null,
        overrides: null,
        universalOverrides: null,
        universalConfiguration: (0, _frompagelayoutwidgetconfigurationtouniversalconfigurationutil.fromPageLayoutWidgetConfigurationToUniversalConfiguration)({
            configuration: createPageLayoutWidgetInput.configuration,
            fieldMetadataUniversalIdentifierById: flatFieldMetadataMaps.universalIdentifierById,
            frontComponentUniversalIdentifierById: flatFrontComponentMaps.universalIdentifierById,
            viewFieldGroupUniversalIdentifierById: flatViewFieldGroupMaps.universalIdentifierById,
            viewUniversalIdentifierById: flatViewMaps.universalIdentifierById,
            shouldThrowOnMissingIdentifier: true
        })
    };
};

//# sourceMappingURL=from-create-page-layout-widget-input-to-flat-page-layout-widget-to-create.util.js.map