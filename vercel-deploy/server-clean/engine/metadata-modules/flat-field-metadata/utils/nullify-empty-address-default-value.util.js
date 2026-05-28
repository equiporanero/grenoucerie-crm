"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "nullifyEmptyAddressDefaultValue", {
    enumerable: true,
    get: function() {
        return nullifyEmptyAddressDefaultValue;
    }
});
const _utils = require("twenty-shared/utils");
const _isnullequivalenttextdefaultvalueutil = require("./is-null-equivalent-text-default-value.util");
const nullifyEmptyAddressDefaultValue = (defaultValue)=>{
    if (!(0, _utils.isDefined)(defaultValue)) {
        return null;
    }
    const v = defaultValue;
    const addressStreet1 = (0, _isnullequivalenttextdefaultvalueutil.isNullEquivalentTextDefaultValue)(v.addressStreet1) ? null : v.addressStreet1 ?? null;
    const addressStreet2 = (0, _isnullequivalenttextdefaultvalueutil.isNullEquivalentTextDefaultValue)(v.addressStreet2) ? null : v.addressStreet2 ?? null;
    const addressCity = (0, _isnullequivalenttextdefaultvalueutil.isNullEquivalentTextDefaultValue)(v.addressCity) ? null : v.addressCity ?? null;
    const addressState = (0, _isnullequivalenttextdefaultvalueutil.isNullEquivalentTextDefaultValue)(v.addressState) ? null : v.addressState ?? null;
    const addressCountry = (0, _isnullequivalenttextdefaultvalueutil.isNullEquivalentTextDefaultValue)(v.addressCountry) ? null : v.addressCountry ?? null;
    const addressPostcode = (0, _isnullequivalenttextdefaultvalueutil.isNullEquivalentTextDefaultValue)(v.addressPostcode) ? null : v.addressPostcode ?? null;
    const addressLat = v.addressLat ?? null;
    const addressLng = v.addressLng ?? null;
    if (addressStreet1 === null && addressStreet2 === null && addressCity === null && addressState === null && addressCountry === null && addressPostcode === null && addressLat === null && addressLng === null) {
        return null;
    }
    return {
        addressStreet1,
        addressStreet2,
        addressCity,
        addressState,
        addressCountry,
        addressPostcode,
        addressLat,
        addressLng
    };
};

//# sourceMappingURL=nullify-empty-address-default-value.util.js.map