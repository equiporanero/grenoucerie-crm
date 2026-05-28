"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "safeParseEmailAddresses", {
    enumerable: true,
    get: function() {
        return safeParseEmailAddresses;
    }
});
const _addressparser = /*#__PURE__*/ _interop_require_default(require("addressparser"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const safeParseEmailAddresses = (header)=>{
    try {
        return (0, _addressparser.default)(header).filter((parsed)=>parsed.address).map((parsed)=>({
                address: parsed.address,
                name: parsed.name ?? ''
            }));
    } catch  {
        return [];
    }
};

//# sourceMappingURL=safe-parse-email-addresses.util.js.map