"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getPreviousVersion", {
    enumerable: true,
    get: function() {
        return getPreviousVersion;
    }
});
const _semver = require("semver");
const getPreviousVersion = ({ versions, currentVersion })=>{
    try {
        const semverVersions = versions.map((version)=>new _semver.SemVer(version)).sort((a, b)=>b.compare(a));
        const currentSemver = new _semver.SemVer(currentVersion);
        const previousVersion = semverVersions.find((version)=>version.compare(currentSemver) < 0);
        return previousVersion;
    } catch  {
        return undefined;
    }
};

//# sourceMappingURL=get-previous-version.js.map