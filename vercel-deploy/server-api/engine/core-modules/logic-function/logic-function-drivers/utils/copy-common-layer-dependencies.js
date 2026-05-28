"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "copyCommonLayerDependencies", {
    enumerable: true,
    get: function() {
        return copyCommonLayerDependencies;
    }
});
const _fs = require("fs");
const _path = require("path");
const _commonlayerdependenciesdirname = require("../constants/common-layer-dependencies-dirname");
const _copyyarnengineandbuilddependencies = require("../../../application/application-package/utils/copy-yarn-engine-and-build-dependencies");
const copyCommonLayerDependencies = async (buildDirectory)=>{
    const nodejsDir = (0, _path.join)(buildDirectory, 'nodejs');
    await _fs.promises.mkdir(nodejsDir, {
        recursive: true
    });
    await _fs.promises.cp(_commonlayerdependenciesdirname.COMMON_LAYER_DEPENDENCIES_DIRNAME, nodejsDir, {
        recursive: true
    });
    await (0, _copyyarnengineandbuilddependencies.copyYarnEngineAndBuildDependencies)(nodejsDir);
};

//# sourceMappingURL=copy-common-layer-dependencies.js.map