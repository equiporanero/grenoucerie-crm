"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get MAX_EXTRACTED_SIZE_BYTES () {
        return MAX_EXTRACTED_SIZE_BYTES;
    },
    get extractTarballSecurely () {
        return extractTarballSecurely;
    }
});
const _path = require("path");
const _tar = /*#__PURE__*/ _interop_require_wildcard(require("tar"));
const _applicationexception = require("../../application.exception");
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
const MAX_EXTRACTED_SIZE_BYTES = 500 * 1024 * 1024;
const extractTarballSecurely = async (tarballPath, targetDir)=>{
    let totalExtractedSize = 0;
    const resolvedTarget = (0, _path.resolve)(targetDir) + _path.sep;
    await _tar.extract({
        file: tarballPath,
        cwd: targetDir,
        filter: (entryPath, entry)=>{
            const resolvedEntry = (0, _path.resolve)(targetDir, entryPath);
            if (!resolvedEntry.startsWith(resolvedTarget)) {
                return false;
            }
            if ('type' in entry) {
                const entryType = entry.type;
                if (entryType === 'SymbolicLink' || entryType === 'Link') {
                    return false;
                }
            }
            totalExtractedSize += entry.size ?? 0;
            if (totalExtractedSize > MAX_EXTRACTED_SIZE_BYTES) {
                throw new _applicationexception.ApplicationException(`Extracted size exceeds ${MAX_EXTRACTED_SIZE_BYTES} bytes`, _applicationexception.ApplicationExceptionCode.TARBALL_EXTRACTION_FAILED);
            }
            return true;
        }
    });
};

//# sourceMappingURL=extract-tarball-securely.util.js.map