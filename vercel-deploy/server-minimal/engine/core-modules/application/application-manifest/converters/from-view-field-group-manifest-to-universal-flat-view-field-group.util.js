"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromViewFieldGroupManifestToUniversalFlatViewFieldGroup", {
    enumerable: true,
    get: function() {
        return fromViewFieldGroupManifestToUniversalFlatViewFieldGroup;
    }
});
const fromViewFieldGroupManifestToUniversalFlatViewFieldGroup = ({ viewFieldGroupManifest, viewUniversalIdentifier, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: viewFieldGroupManifest.universalIdentifier,
        applicationUniversalIdentifier,
        viewUniversalIdentifier,
        name: viewFieldGroupManifest.name ?? '',
        position: viewFieldGroupManifest.position,
        isVisible: viewFieldGroupManifest.isVisible ?? true,
        isActive: true,
        overrides: null,
        viewFieldUniversalIdentifiers: [],
        createdAt: now,
        updatedAt: now,
        deletedAt: null
    };
};

//# sourceMappingURL=from-view-field-group-manifest-to-universal-flat-view-field-group.util.js.map