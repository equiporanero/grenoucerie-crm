"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromNavigationMenuItemManifestToUniversalFlatNavigationMenuItem", {
    enumerable: true,
    get: function() {
        return fromNavigationMenuItemManifestToUniversalFlatNavigationMenuItem;
    }
});
const fromNavigationMenuItemManifestToUniversalFlatNavigationMenuItem = ({ navigationMenuItemManifest, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: navigationMenuItemManifest.universalIdentifier,
        applicationUniversalIdentifier,
        type: navigationMenuItemManifest.type,
        name: navigationMenuItemManifest.name ?? null,
        icon: navigationMenuItemManifest.icon ?? null,
        color: navigationMenuItemManifest.color ?? null,
        position: navigationMenuItemManifest.position,
        viewUniversalIdentifier: navigationMenuItemManifest.viewUniversalIdentifier ?? null,
        link: navigationMenuItemManifest.link ?? null,
        folderUniversalIdentifier: navigationMenuItemManifest.folderUniversalIdentifier ?? null,
        targetObjectMetadataUniversalIdentifier: navigationMenuItemManifest.targetObjectUniversalIdentifier ?? null,
        pageLayoutUniversalIdentifier: navigationMenuItemManifest.pageLayoutUniversalIdentifier ?? null,
        targetRecordId: null,
        userWorkspaceId: null,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=from-navigation-menu-item-manifest-to-universal-flat-navigation-menu-item.util.js.map