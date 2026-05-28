"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFrontComponentManifestToUniversalFlatFrontComponent", {
    enumerable: true,
    get: function() {
        return fromFrontComponentManifestToUniversalFlatFrontComponent;
    }
});
const fromFrontComponentManifestToUniversalFlatFrontComponent = ({ frontComponentManifest, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: frontComponentManifest.universalIdentifier,
        applicationUniversalIdentifier,
        name: frontComponentManifest.name ?? frontComponentManifest.componentName,
        description: frontComponentManifest.description ?? null,
        sourceComponentPath: frontComponentManifest.sourceComponentPath,
        builtComponentPath: frontComponentManifest.builtComponentPath,
        componentName: frontComponentManifest.componentName,
        builtComponentChecksum: frontComponentManifest.builtComponentChecksum,
        isHeadless: frontComponentManifest.isHeadless ?? false,
        usesSdkClient: frontComponentManifest.usesSdkClient ?? false,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=from-front-component-manifest-to-universal-flat-front-component.util.js.map