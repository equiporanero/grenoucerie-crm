"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatApplicationToApplicationDto", {
    enumerable: true,
    get: function() {
        return fromFlatApplicationToApplicationDto;
    }
});
const fromFlatApplicationToApplicationDto = ({ canBeUninstalled, description, id, logo, name, packageJsonChecksum, packageJsonFileId, yarnLockChecksum, yarnLockFileId, availablePackages, universalIdentifier, version, settingsCustomTabFrontComponentId })=>{
    return {
        canBeUninstalled,
        description: description ?? undefined,
        id,
        logo: logo ?? undefined,
        name,
        objects: [],
        packageJsonChecksum: packageJsonChecksum ?? undefined,
        packageJsonFileId: packageJsonFileId ?? undefined,
        yarnLockChecksum: yarnLockChecksum ?? undefined,
        yarnLockFileId: yarnLockFileId ?? undefined,
        availablePackages: availablePackages ?? {},
        universalIdentifier,
        version: version ?? undefined,
        settingsCustomTabFrontComponentId: settingsCustomTabFrontComponentId ?? undefined
    };
};

//# sourceMappingURL=from-flat-application-to-application-dto.util.js.map