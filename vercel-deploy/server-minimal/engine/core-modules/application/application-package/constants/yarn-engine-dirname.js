"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "YARN_ENGINE_DIRNAME", {
    enumerable: true,
    get: function() {
        return YARN_ENGINE_DIRNAME;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _assetspath = require("../../../../../constants/assets-path");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const YARN_ENGINE_DIRNAME = _path.default.resolve(__dirname, _path.default.join(_assetspath.ASSET_PATH, 'engine/core-modules/application/application-package/constants/yarn-engine'));

//# sourceMappingURL=yarn-engine-dirname.js.map