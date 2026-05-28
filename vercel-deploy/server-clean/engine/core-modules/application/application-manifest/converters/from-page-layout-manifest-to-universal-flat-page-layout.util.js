"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromPageLayoutManifestToUniversalFlatPageLayout", {
    enumerable: true,
    get: function() {
        return fromPageLayoutManifestToUniversalFlatPageLayout;
    }
});
const _pagelayouttypeenum = require("../../../../metadata-modules/page-layout/enums/page-layout-type.enum");
const fromPageLayoutManifestToUniversalFlatPageLayout = ({ pageLayoutManifest, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: pageLayoutManifest.universalIdentifier,
        applicationUniversalIdentifier,
        name: pageLayoutManifest.name,
        type: pageLayoutManifest.type ?? _pagelayouttypeenum.PageLayoutType.RECORD_PAGE,
        objectMetadataUniversalIdentifier: pageLayoutManifest.objectUniversalIdentifier ?? null,
        defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier: pageLayoutManifest.defaultTabToFocusOnMobileAndSidePanelUniversalIdentifier ?? null,
        tabUniversalIdentifiers: [],
        createdAt: now,
        updatedAt: now,
        deletedAt: null
    };
};

//# sourceMappingURL=from-page-layout-manifest-to-universal-flat-page-layout.util.js.map