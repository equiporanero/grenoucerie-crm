"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromViewFilterManifestToUniversalFlatViewFilter", {
    enumerable: true,
    get: function() {
        return fromViewFilterManifestToUniversalFlatViewFilter;
    }
});
const fromViewFilterManifestToUniversalFlatViewFilter = ({ viewFilterManifest, viewUniversalIdentifier, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: viewFilterManifest.universalIdentifier,
        applicationUniversalIdentifier,
        fieldMetadataUniversalIdentifier: viewFilterManifest.fieldMetadataUniversalIdentifier,
        viewUniversalIdentifier,
        viewFilterGroupUniversalIdentifier: viewFilterManifest.viewFilterGroupUniversalIdentifier ?? null,
        operand: viewFilterManifest.operand,
        value: viewFilterManifest.value,
        subFieldName: viewFilterManifest.subFieldName ?? null,
        relationTargetFieldMetadataUniversalIdentifier: null,
        positionInViewFilterGroup: viewFilterManifest.positionInViewFilterGroup ?? null,
        createdAt: now,
        updatedAt: now,
        deletedAt: null
    };
};

//# sourceMappingURL=from-view-filter-manifest-to-universal-flat-view-filter.util.js.map