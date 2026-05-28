"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromViewFieldManifestToUniversalFlatViewField", {
    enumerable: true,
    get: function() {
        return fromViewFieldManifestToUniversalFlatViewField;
    }
});
const fromViewFieldManifestToUniversalFlatViewField = ({ viewFieldManifest, viewUniversalIdentifier, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: viewFieldManifest.universalIdentifier,
        applicationUniversalIdentifier,
        fieldMetadataUniversalIdentifier: viewFieldManifest.fieldMetadataUniversalIdentifier,
        viewUniversalIdentifier,
        viewFieldGroupUniversalIdentifier: viewFieldManifest.viewFieldGroupUniversalIdentifier ?? null,
        isVisible: viewFieldManifest.isVisible ?? true,
        isActive: true,
        size: viewFieldManifest.size ?? 0,
        position: viewFieldManifest.position,
        aggregateOperation: viewFieldManifest.aggregateOperation ?? null,
        universalOverrides: null,
        createdAt: now,
        updatedAt: now,
        deletedAt: null
    };
};

//# sourceMappingURL=from-view-field-manifest-to-universal-flat-view-field.util.js.map