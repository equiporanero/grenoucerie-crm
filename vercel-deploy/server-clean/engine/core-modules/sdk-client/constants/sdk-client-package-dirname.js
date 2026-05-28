"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SDK_CLIENT_PACKAGE_DIRNAME", {
    enumerable: true,
    get: function() {
        return SDK_CLIENT_PACKAGE_DIRNAME;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _assetspath = require("../../../../constants/assets-path");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const IS_BUILT = __dirname.includes('/dist/') && process.env.NODE_ENV !== 'development';
const SDK_CLIENT_PACKAGE_DIRNAME = IS_BUILT ? _path.default.join(_assetspath.ASSET_PATH, 'twenty-client-sdk') : _path.default.resolve(require.resolve('twenty-client-sdk/core'), '..', '..');

//# sourceMappingURL=sdk-client-package-dirname.js.map