"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatAddressObjectAsParticipants", {
    enumerable: true,
    get: function() {
        return formatAddressObjectAsParticipants;
    }
});
const _utils = require("twenty-shared/utils");
const removeSpacesAndLowerCase = (email)=>{
    return email.replace(/\s/g, '').toLowerCase();
};
const formatAddressObjectAsParticipants = (addressObjects, role)=>{
    const participants = addressObjects.map((addressObject)=>{
        const address = addressObject.address;
        if (!(0, _utils.isDefined)(address)) {
            return null;
        }
        if (!address.includes('@')) {
            return null;
        }
        return {
            role,
            handle: removeSpacesAndLowerCase(address),
            displayName: addressObject.name || ''
        };
    });
    return participants.filter(_utils.isDefined);
};

//# sourceMappingURL=format-address-object-as-participants.util.js.map