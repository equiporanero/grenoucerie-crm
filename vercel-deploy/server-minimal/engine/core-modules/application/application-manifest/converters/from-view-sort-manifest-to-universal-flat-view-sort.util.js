"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromViewSortManifestToUniversalFlatViewSort", {
    enumerable: true,
    get: function() {
        return fromViewSortManifestToUniversalFlatViewSort;
    }
});
const fromViewSortManifestToUniversalFlatViewSort = ({ viewSortManifest, viewUniversalIdentifier, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: viewSortManifest.universalIdentifier,
        applicationUniversalIdentifier,
        fieldMetadataUniversalIdentifier: viewSortManifest.fieldMetadataUniversalIdentifier,
        viewUniversalIdentifier,
        direction: viewSortManifest.direction,
        createdAt: now,
        updatedAt: now,
        deletedAt: null
    };
};

//# sourceMappingURL=from-view-sort-manifest-to-universal-flat-view-sort.util.js.map