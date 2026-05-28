"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "copyExecutor", {
    enumerable: true,
    get: function() {
        return copyExecutor;
    }
});
const _fs = require("fs");
const _path = require("path");
const _assetspath = require("../../../../../constants/assets-path");
const EXECUTOR_FILE_PATH = (0, _path.resolve)(__dirname, (0, _path.join)(_assetspath.ASSET_PATH, `engine/core-modules/logic-function/logic-function-drivers/constants/executor`));
const copyExecutor = async (buildDirectory)=>{
    await _fs.promises.mkdir(buildDirectory, {
        recursive: true
    });
    await _fs.promises.cp(EXECUTOR_FILE_PATH, buildDirectory, {
        recursive: true
    });
};

//# sourceMappingURL=copy-executor.js.map