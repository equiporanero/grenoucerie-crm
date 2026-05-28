"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createZipFile", {
    enumerable: true,
    get: function() {
        return createZipFile;
    }
});
const _fs = /*#__PURE__*/ _interop_require_default(require("fs"));
const _promises = require("node:stream/promises");
const _archiver = /*#__PURE__*/ _interop_require_default(require("archiver"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const createZipFile = async (sourceDir, outPath)=>{
    const output = _fs.default.createWriteStream(outPath);
    const archive = (0, _archiver.default)('zip', {
        zlib: {
            level: 9
        }
    });
    const p = (0, _promises.pipeline)(archive, output);
    archive.directory(sourceDir, false);
    void archive.finalize();
    return p;
};

//# sourceMappingURL=create-zip-file.js.map