"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createStandardPageLayoutWidgetFlatMetadata", {
    enumerable: true,
    get: function() {
        return createStandardPageLayoutWidgetFlatMetadata;
    }
});
const _utils = require("twenty-shared/utils");
const _standardpagelayoutconstant = require("../../constants/standard-page-layout.constant");
const _twentystandardapplications = require("../../constants/twenty-standard-applications");
const createStandardPageLayoutWidgetFlatMetadata = ({ context: { layoutName, tabTitle, widgetName, title, type, gridPosition, position, configuration, universalConfiguration, objectMetadataId, conditionalDisplay, conditionalAvailabilityExpression }, workspaceId, twentyStandardApplicationId, standardPageLayoutMetadataRelatedEntityIds, objectMetadataUniversalIdentifier, now })=>{
    const layoutIds = standardPageLayoutMetadataRelatedEntityIds[layoutName];
    const layout = _standardpagelayoutconstant.STANDARD_PAGE_LAYOUTS[layoutName];
    const tabDefinition = layout.tabs[tabTitle];
    const widgetDef = tabDefinition.widgets[widgetName];
    if (!(0, _utils.isDefined)(widgetDef)) {
        throw new Error(`Invalid configuration ${layoutName} ${tabTitle} ${widgetName}`);
    }
    const tabIds = layoutIds.tabs[tabTitle];
    const widgetIds = tabIds.widgets[widgetName];
    return {
        id: widgetIds.id,
        universalIdentifier: widgetDef.universalIdentifier,
        applicationId: twentyStandardApplicationId,
        applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier,
        workspaceId,
        pageLayoutTabId: tabIds.id,
        pageLayoutTabUniversalIdentifier: tabDefinition.universalIdentifier,
        title,
        type,
        gridPosition,
        position,
        configuration,
        universalConfiguration,
        objectMetadataId,
        objectMetadataUniversalIdentifier,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
        conditionalDisplay: conditionalDisplay ?? null,
        conditionalAvailabilityExpression: conditionalAvailabilityExpression ?? null,
        overrides: null,
        universalOverrides: null
    };
};

//# sourceMappingURL=create-standard-page-layout-widget-flat-metadata.util.js.map