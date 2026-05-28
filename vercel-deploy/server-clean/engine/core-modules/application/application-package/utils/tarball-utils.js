"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolvePackageContentDir", {
    enumerable: true,
    get: function() {
        return resolvePackageContentDir;
    }
});
const _fs = require("fs");
const _path = require("path");
const resolvePackageContentDir = async (extractDir)=>{
    const packageSubdir = (0, _path.join)(extractDir, 'package');
    try {
        const stat = await _fs.promises.stat(packageSubdir);
        if (stat.isDirectory()) {
            return packageSubdir;
        }
    } catch  {
    // no package/ subdirectory — contents are at root
    }
    return extractDir;
};

//# sourceMappingURL=tarball-utils.js.map