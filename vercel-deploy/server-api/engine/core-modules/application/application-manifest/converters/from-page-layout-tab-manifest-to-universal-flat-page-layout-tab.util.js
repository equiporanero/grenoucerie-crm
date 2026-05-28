"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromPageLayoutTabManifestToUniversalFlatPageLayoutTab", {
    enumerable: true,
    get: function() {
        return fromPageLayoutTabManifestToUniversalFlatPageLayoutTab;
    }
});
const _types = require("twenty-shared/types");
const fromPageLayoutTabManifestToUniversalFlatPageLayoutTab = ({ pageLayoutTabManifest, pageLayoutUniversalIdentifier, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: pageLayoutTabManifest.universalIdentifier,
        applicationUniversalIdentifier,
        title: pageLayoutTabManifest.title,
        position: pageLayoutTabManifest.position,
        pageLayoutUniversalIdentifier,
        icon: pageLayoutTabManifest.icon ?? null,
        layoutMode: pageLayoutTabManifest.layoutMode ?? _types.PageLayoutTabLayoutMode.GRID,
        isActive: true,
        widgetUniversalIdentifiers: [],
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
        overrides: null
    };
};

//# sourceMappingURL=from-page-layout-tab-manifest-to-universal-flat-page-layout-tab.util.js.map