"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sanitizeFile", {
    enumerable: true,
    get: function() {
        return sanitizeFile;
    }
});
const _dompurify = /*#__PURE__*/ _interop_require_default(require("dompurify"));
const _jsdom = require("jsdom");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const sanitizeFile = ({ file, ext, mimeType })=>{
    if (ext === 'svg' || mimeType === 'image/svg+xml') {
        const window = new _jsdom.JSDOM('').window;
        const purify = (0, _dompurify.default)(window);
        let fileString;
        if (typeof file === 'string') {
            fileString = file;
        } else if (Buffer.isBuffer(file)) {
            fileString = file.toString('utf-8');
        } else {
            fileString = Buffer.from(file).toString('utf-8');
        }
        return purify.sanitize(fileString);
    }
    return file;
};

//# sourceMappingURL=sanitize-file.utils.js.map