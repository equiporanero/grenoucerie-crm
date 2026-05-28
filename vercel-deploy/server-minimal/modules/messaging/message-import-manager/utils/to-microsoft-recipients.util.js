"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "toMicrosoftRecipients", {
    enumerable: true,
    get: function() {
        return toMicrosoftRecipients;
    }
});
const toMicrosoftRecipients = (addresses)=>{
    if (!addresses) return [];
    const addressArray = Array.isArray(addresses) ? addresses : [
        addresses
    ];
    return addressArray.map((address)=>({
            emailAddress: {
                address
            }
        }));
};

//# sourceMappingURL=to-microsoft-recipients.util.js.map