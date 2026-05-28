"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromViewFilterGroupManifestToUniversalFlatViewFilterGroup", {
    enumerable: true,
    get: function() {
        return fromViewFilterGroupManifestToUniversalFlatViewFilterGroup;
    }
});
const fromViewFilterGroupManifestToUniversalFlatViewFilterGroup = ({ viewFilterGroupManifest, viewUniversalIdentifier, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: viewFilterGroupManifest.universalIdentifier,
        applicationUniversalIdentifier,
        viewUniversalIdentifier,
        parentViewFilterGroupUniversalIdentifier: viewFilterGroupManifest.parentViewFilterGroupUniversalIdentifier ?? null,
        logicalOperator: viewFilterGroupManifest.logicalOperator,
        positionInViewFilterGroup: viewFilterGroupManifest.positionInViewFilterGroup ?? null,
        childViewFilterGroupUniversalIdentifiers: [],
        viewFilterUniversalIdentifiers: [],
        createdAt: now,
        updatedAt: now,
        deletedAt: null
    };
};

//# sourceMappingURL=from-view-filter-group-manifest-to-universal-flat-view-filter-group.util.js.map