"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "safeParseEmailAddress", {
    enumerable: true,
    get: function() {
        return safeParseEmailAddress;
    }
});
const _safeparseemailaddressaddressutil = require("./safe-parse-email-address-address.util");
const safeParseEmailAddress = (emailAddress)=>{
    return {
        address: (0, _safeparseemailaddressaddressutil.safeParseEmailAddressAddress)(emailAddress.address) || '',
        name: emailAddress.name
    };
};

//# sourceMappingURL=safe-parse-email-address.util.js.map