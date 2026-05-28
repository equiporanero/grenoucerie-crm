"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractVersionMajorMinorPatch", {
    enumerable: true,
    get: function() {
        return extractVersionMajorMinorPatch;
    }
});
const _semver = /*#__PURE__*/ _interop_require_default(require("semver"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const extractVersionMajorMinorPatch = (version)=>{
    const parsed = _semver.default.parse(version);
    if (parsed === null) {
        return null;
    }
    return `${parsed.major}.${parsed.minor}.${parsed.patch}`;
};

//# sourceMappingURL=extract-version-major-minor-patch.js.map