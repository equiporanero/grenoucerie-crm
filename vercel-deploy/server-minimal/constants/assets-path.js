"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ASSET_PATH", {
    enumerable: true,
    get: function() {
        return ASSET_PATH;
    }
});
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// If the code is built through the testing module, assets are not output to the dist/assets directory.
const IS_BUILT_THROUGH_TESTING_MODULE = !__dirname.includes('/dist/');
const ASSET_PATH = IS_BUILT_THROUGH_TESTING_MODULE ? _path.default.resolve(__dirname, `../`) : _path.default.resolve(__dirname, `../assets`);

//# sourceMappingURL=assets-path.js.map