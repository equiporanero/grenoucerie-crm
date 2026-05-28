"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "safeParseEmailAddressAddress", {
    enumerable: true,
    get: function() {
        return safeParseEmailAddressAddress;
    }
});
const _common = require("@nestjs/common");
const _addressparser = /*#__PURE__*/ _interop_require_default(require("addressparser"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const safeParseEmailAddressAddress = (address)=>{
    const logger = new _common.Logger(safeParseEmailAddressAddress.name);
    try {
        return (0, _addressparser.default)(address)[0].address;
    } catch (error) {
        logger.error(`Error parsing address: ${address}`, error);
        return undefined;
    }
};

//# sourceMappingURL=safe-parse-email-address-address.util.js.map