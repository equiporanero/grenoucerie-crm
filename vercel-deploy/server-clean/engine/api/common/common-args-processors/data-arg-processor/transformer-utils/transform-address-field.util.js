"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformAddressField", {
    enumerable: true,
    get: function() {
        return transformAddressField;
    }
});
const _guards = require("@sniptt/guards");
const _transformnumericfieldutil = require("./transform-numeric-field.util");
const _transformtextfieldutil = require("./transform-text-field.util");
const transformAddressField = (value)=>{
    if ((0, _guards.isNull)(value)) return null;
    return {
        addressStreet1: (0, _guards.isUndefined)(value.addressStreet1) ? undefined : (0, _transformtextfieldutil.transformTextField)(value.addressStreet1),
        addressStreet2: (0, _guards.isUndefined)(value.addressStreet2) ? undefined : (0, _transformtextfieldutil.transformTextField)(value.addressStreet2),
        addressCity: (0, _guards.isUndefined)(value.addressCity) ? undefined : (0, _transformtextfieldutil.transformTextField)(value.addressCity),
        addressState: (0, _guards.isUndefined)(value.addressState) ? undefined : (0, _transformtextfieldutil.transformTextField)(value.addressState),
        addressPostcode: (0, _guards.isUndefined)(value.addressPostcode) ? undefined : (0, _transformtextfieldutil.transformTextField)(value.addressPostcode),
        addressCountry: (0, _guards.isUndefined)(value.addressCountry) ? undefined : (0, _transformtextfieldutil.transformTextField)(value.addressCountry),
        addressLat: (0, _guards.isUndefined)(value.addressLat) ? undefined : (0, _transformnumericfieldutil.transformNumericField)(value.addressLat),
        addressLng: (0, _guards.isUndefined)(value.addressLng) ? undefined : (0, _transformnumericfieldutil.transformNumericField)(value.addressLng)
    };
};

//# sourceMappingURL=transform-address-field.util.js.map