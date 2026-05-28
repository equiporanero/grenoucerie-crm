"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getLogicFunctionSeedProjectFiles", {
    enumerable: true,
    get: function() {
        return getLogicFunctionSeedProjectFiles;
    }
});
const _promises = /*#__PURE__*/ _interop_require_default(require("node:fs/promises"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _assetspath = require("../../../../../constants/assets-path");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getAllFiles = async (rootDir, dir = rootDir, files = [])=>{
    const dirEntries = await _promises.default.readdir(dir, {
        withFileTypes: true
    });
    for (const entry of dirEntries){
        const fullPath = _path.default.join(dir, entry.name);
        if (entry.isDirectory()) {
            await getAllFiles(rootDir, fullPath, files);
        } else {
            files.push({
                path: _path.default.relative(rootDir, dir),
                name: entry.name,
                content: await _promises.default.readFile(fullPath)
            });
        }
    }
    return files;
};
const getLogicFunctionSeedProjectFiles = async ()=>{
    const seedProjectPath = _path.default.join(_assetspath.ASSET_PATH, 'engine/core-modules/logic-function/logic-function-resource/constants/seed-project');
    return getAllFiles(seedProjectPath);
};

//# sourceMappingURL=get-logic-function-seed-project-files.util.js.map