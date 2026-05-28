"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sanitizePlaceDetailsResults", {
    enumerable: true,
    get: function() {
        return sanitizePlaceDetailsResults;
    }
});
const _utils = require("twenty-shared/utils");
const hasType = (addressComponent, type)=>addressComponent.types.includes(type);
const sanitizePlaceDetailsResults = ({ addressComponents, location })=>{
    if (!(0, _utils.isNonEmptyArray)(addressComponents)) return {};
    const address = {};
    for (const addressComponent of addressComponents){
        if (hasType(addressComponent, 'street_number')) {
            address.street = addressComponent.long_name + ' ' + (address.street ?? '');
            continue;
        }
        if (hasType(addressComponent, 'route')) {
            address.street = (address.street ?? '') + addressComponent.long_name;
            continue;
        }
        if (hasType(addressComponent, 'postal_code')) {
            address.postcode = addressComponent.long_name + (address.postcode ?? '');
            continue;
        }
        if (hasType(addressComponent, 'postal_code_suffix')) {
            address.postcode = (address.postcode ?? '') + '-' + addressComponent.long_name;
            continue;
        }
        if (hasType(addressComponent, 'locality')) {
            address.city = addressComponent.long_name;
            continue;
        }
        if (hasType(addressComponent, 'postal_town') || hasType(addressComponent, 'administrative_area_level_3')) {
            if (!address.city) {
                address.city = addressComponent.long_name;
            }
            continue;
        }
        if (hasType(addressComponent, 'administrative_area_level_1')) {
            address.state = addressComponent.long_name;
            continue;
        }
        if (hasType(addressComponent, 'administrative_area_level_2')) {
            if (!address.state) {
                address.state = addressComponent.long_name;
            }
            continue;
        }
        if (hasType(addressComponent, 'country')) {
            address.country = addressComponent.short_name;
        }
    }
    address.location = location;
    return address;
};

//# sourceMappingURL=sanitize-place-details-results.util.js.map