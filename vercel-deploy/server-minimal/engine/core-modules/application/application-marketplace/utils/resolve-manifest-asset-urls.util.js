"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveManifestAssetUrls", {
    enumerable: true,
    get: function() {
        return resolveManifestAssetUrls;
    }
});
const isAbsoluteUrl = (url)=>url.startsWith('http://') || url.startsWith('https://');
const resolveManifestAssetUrls = (manifest, urlBuilder)=>{
    const resolveUrl = (url)=>isAbsoluteUrl(url) ? url : urlBuilder(url);
    return {
        ...manifest,
        application: {
            ...manifest.application,
            logoUrl: manifest.application.logoUrl ? resolveUrl(manifest.application.logoUrl) : undefined,
            screenshots: (manifest.application.screenshots ?? []).map(resolveUrl)
        }
    };
};

//# sourceMappingURL=resolve-manifest-asset-urls.util.js.map