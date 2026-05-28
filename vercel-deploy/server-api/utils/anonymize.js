"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "anonymize", {
    enumerable: true,
    get: function() {
        return anonymize;
    }
});
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const anonymize = (input)=>{
    // md5 shorter than sha-256 and collisions are not a security risk in this use-case
    return _crypto.default.createHash('md5').update(input).digest('hex');
};

//# sourceMappingURL=anonymize.js.map