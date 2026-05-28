"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "compareVersionMajorAndMinor", {
    enumerable: true,
    get: function() {
        return compareVersionMajorAndMinor;
    }
});
const _semver = /*#__PURE__*/ _interop_require_wildcard(require("semver"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function compareVersionMajorAndMinor(rawVersion1, rawVersion2) {
    const [version1, version2] = [
        rawVersion1,
        rawVersion2
    ].map((version)=>_semver.parse(version));
    if (version1 === null || version2 === null) {
        throw new Error(`Received invalid version: ${rawVersion1} ${rawVersion2}`);
    }
    const v1WithoutPatch = `${version1.major}.${version1.minor}.0`;
    const v2WithoutPatch = `${version2.major}.${version2.minor}.0`;
    const compareResult = _semver.compare(v1WithoutPatch, v2WithoutPatch);
    switch(compareResult){
        case -1:
            {
                return 'lower';
            }
        case 0:
            {
                return 'equal';
            }
        case 1:
            {
                return 'higher';
            }
        default:
            {
                throw new Error(`Should never occur, encountered an unexpected value from semver.compare ${compareResult}`);
            }
    }
}

//# sourceMappingURL=compare-version-minor-and-major.js.map