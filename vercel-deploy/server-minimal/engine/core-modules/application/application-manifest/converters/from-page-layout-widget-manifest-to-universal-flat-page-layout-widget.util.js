"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromPageLayoutWidgetManifestToUniversalFlatPageLayoutWidget", {
    enumerable: true,
    get: function() {
        return fromPageLayoutWidgetManifestToUniversalFlatPageLayoutWidget;
    }
});
const _constants = require("twenty-shared/constants");
const fromPageLayoutWidgetManifestToUniversalFlatPageLayoutWidget = ({ pageLayoutWidgetManifest, pageLayoutTabUniversalIdentifier, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: pageLayoutWidgetManifest.universalIdentifier,
        applicationUniversalIdentifier,
        pageLayoutTabUniversalIdentifier,
        title: pageLayoutWidgetManifest.title,
        isActive: true,
        type: pageLayoutWidgetManifest.type,
        objectMetadataUniversalIdentifier: pageLayoutWidgetManifest.objectUniversalIdentifier ?? null,
        conditionalDisplay: pageLayoutWidgetManifest.conditionalDisplay ?? null,
        gridPosition: pageLayoutWidgetManifest.gridPosition ?? {
            row: 0,
            column: 0,
            rowSpan: _constants.DEFAULT_WIDGET_SIZE.default.h,
            columnSpan: _constants.DEFAULT_WIDGET_SIZE.default.w
        },
        position: null,
        universalConfiguration: pageLayoutWidgetManifest.configuration,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
        conditionalAvailabilityExpression: null,
        universalOverrides: null
    };
};

//# sourceMappingURL=from-page-layout-widget-manifest-to-universal-flat-page-layout-widget.util.js.map