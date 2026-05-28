"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "copyBuilder", {
    enumerable: true,
    get: function() {
        return copyBuilder;
    }
});
const _fs = require("fs");
const _path = require("path");
const _assetspath = require("../../../../../constants/assets-path");
const BUILDER_FILE_PATH = (0, _path.resolve)(__dirname, (0, _path.join)(_assetspath.ASSET_PATH, 'engine/core-modules/logic-function/logic-function-drivers/constants/builder'));
const copyBuilder = async (buildDirectory)=>{
    await _fs.promises.mkdir(buildDirectory, {
        recursive: true
    });
    await _fs.promises.cp(BUILDER_FILE_PATH, buildDirectory, {
        recursive: true
    });
};

//# sourceMappingURL=copy-builder.js.map