"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateMessageId", {
    enumerable: true,
    get: function() {
        return generateMessageId;
    }
});
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const UNIT_SEPARATOR = '\u001F';
function generateMessageId(msg, context = '') {
    return _crypto.default.createHash('sha256').update(msg + UNIT_SEPARATOR + (context || '')).digest('base64').slice(0, 6);
}

//# sourceMappingURL=generateMessageId.js.map