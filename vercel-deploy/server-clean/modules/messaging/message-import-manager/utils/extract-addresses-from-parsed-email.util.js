"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractAddressesFromParsedEmail", {
    enumerable: true,
    get: function() {
        return extractAddressesFromParsedEmail;
    }
});
const _sanitizestringutil = require("./sanitize-string.util");
const extractAddressesFromParsedEmail = (address)=>{
    if (!address) {
        return [];
    }
    const addresses = Array.isArray(address) ? address : [
        address
    ];
    const mailboxes = addresses.flatMap((addr)=>addr.address ? [
            addr
        ] : addr.group ?? []);
    return mailboxes.filter((mailbox)=>mailbox.address).map((mailbox)=>({
            address: mailbox.address,
            name: (0, _sanitizestringutil.sanitizeString)(mailbox.name || '')
        }));
};

//# sourceMappingURL=extract-addresses-from-parsed-email.util.js.map