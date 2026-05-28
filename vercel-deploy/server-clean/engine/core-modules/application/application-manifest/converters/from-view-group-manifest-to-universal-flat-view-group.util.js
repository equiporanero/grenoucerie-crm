"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromViewGroupManifestToUniversalFlatViewGroup", {
    enumerable: true,
    get: function() {
        return fromViewGroupManifestToUniversalFlatViewGroup;
    }
});
const fromViewGroupManifestToUniversalFlatViewGroup = ({ viewGroupManifest, viewUniversalIdentifier, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: viewGroupManifest.universalIdentifier,
        applicationUniversalIdentifier,
        viewUniversalIdentifier,
        fieldValue: viewGroupManifest.fieldValue,
        isVisible: viewGroupManifest.isVisible ?? true,
        position: viewGroupManifest.position,
        createdAt: now,
        updatedAt: now,
        deletedAt: null
    };
};

//# sourceMappingURL=from-view-group-manifest-to-universal-flat-view-group.util.js.map