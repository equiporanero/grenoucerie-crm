"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "copyYarnInstall", {
    enumerable: true,
    get: function() {
        return copyYarnInstall;
    }
});
const _fs = require("fs");
const _path = require("path");
const _assetspath = require("../../../../../constants/assets-path");
const _yarnenginedirname = require("../../../application/application-package/constants/yarn-engine-dirname");
const YARN_INSTALL_FILE_PATH = (0, _path.resolve)(__dirname, (0, _path.join)(_assetspath.ASSET_PATH, 'engine/core-modules/logic-function/logic-function-drivers/constants/yarn-install'));
const copyYarnInstall = async (buildDirectory)=>{
    await _fs.promises.mkdir(buildDirectory, {
        recursive: true
    });
    await _fs.promises.cp(YARN_INSTALL_FILE_PATH, buildDirectory, {
        recursive: true
    });
    const yarnEngineDestination = (0, _path.join)(buildDirectory, 'yarn-engine');
    await _fs.promises.cp(_yarnenginedirname.YARN_ENGINE_DIRNAME, yarnEngineDestination, {
        recursive: true
    });
};

//# sourceMappingURL=copy-yarn-install.js.map