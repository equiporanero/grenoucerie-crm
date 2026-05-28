"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getParsedNameFromEmailLocalPart", {
    enumerable: true,
    get: function() {
        return getParsedNameFromEmailLocalPart;
    }
});
const _guards = require("@sniptt/guards");
const getParsedNameFromEmailLocalPart = (localPart)=>{
    const [withoutPlusAddressTag = ''] = localPart.split('+');
    const parts = withoutPlusAddressTag.split('.').filter(_guards.isNonEmptyString);
    return {
        firstName: parts[0] ?? '',
        lastName: parts.slice(1).join(' ')
    };
};

//# sourceMappingURL=get-parsed-name-from-email-local-part.util.js.map