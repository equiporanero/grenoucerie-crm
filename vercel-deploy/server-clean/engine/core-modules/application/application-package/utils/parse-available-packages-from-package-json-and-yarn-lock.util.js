"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseAvailablePackagesFromPackageJsonAndYarnLock", {
    enumerable: true,
    get: function() {
        return parseAvailablePackagesFromPackageJsonAndYarnLock;
    }
});
const PACKAGE_VERSION_REGEX = /^"(@?[^@]+(?:\/[^@]+)?)@.*?":\n\s+version:\s*(.+)$/gm;
const MAX_PACKAGE_VERSION_MATCHES = 1_000;
const parseAvailablePackagesFromPackageJsonAndYarnLock = (packageJsonContent, yarnLockContent)=>{
    const packageJson = JSON.parse(packageJsonContent);
    const versions = {};
    let match;
    let matchCount = 0;
    while(matchCount < MAX_PACKAGE_VERSION_MATCHES && (match = PACKAGE_VERSION_REGEX.exec(yarnLockContent)) !== null){
        matchCount += 1;
        const packageName = match[1];
        const version = match[2];
        if (packageJson.dependencies?.[packageName]) {
            versions[packageName] = version;
        }
    }
    return versions;
};

//# sourceMappingURL=parse-available-packages-from-package-json-and-yarn-lock.util.js.map