"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildRegistryCdnUrl", {
    enumerable: true,
    get: function() {
        return buildRegistryCdnUrl;
    }
});
const buildRegistryCdnUrl = (params)=>{
    return `${params.cdnBaseUrl}/${params.packageName}@${params.version}/${params.filePath}`;
};

//# sourceMappingURL=build-registry-cdn-url.util.js.map