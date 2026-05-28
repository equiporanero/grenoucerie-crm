"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GeoMapService", {
    enumerable: true,
    get: function() {
        return GeoMapService;
    }
});
const _common = require("@nestjs/common");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _sanitizeautocompleteresultsutil = require("../utils/sanitize-autocomplete-results.util");
const _sanitizeplacedetailsresultsutil = require("../utils/sanitize-place-details-results.util");
const _securehttpclientservice = require("../../secure-http-client/secure-http-client.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GeoMapService = class GeoMapService {
    async getAutoCompleteAddress(address, token, country, isFieldCity) {
        if (!(0, _guards.isNonEmptyString)(address?.trim())) {
            return [];
        }
        let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(address)}&sessiontoken=${token}&key=${this.apiMapKey}`;
        if ((0, _guards.isNonEmptyString)(country)) {
            url += `&components=country:${country}`;
        }
        if ((0, _utils.isDefined)(isFieldCity) && isFieldCity === true) {
            url += `&types=(cities)`;
        }
        const httpClient = this.secureHttpClientService.getHttpClient();
        const result = await httpClient.get(url);
        if (result.data.status === 'OK') {
            return (0, _sanitizeautocompleteresultsutil.sanitizeAutocompleteResults)(result.data.predictions);
        }
        return [];
    }
    async getAddressDetails(placeId, token) {
        const httpClient = this.secureHttpClientService.getHttpClient();
        const result = await httpClient.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&sessiontoken=${token}&fields=address_components%2Cgeometry&key=${this.apiMapKey}`);
        if (result.data.status === 'OK') {
            return (0, _sanitizeplacedetailsresultsutil.sanitizePlaceDetailsResults)({
                addressComponents: result.data.result?.address_components,
                location: result.data.result?.geometry?.location
            });
        }
        return {};
    }
    constructor(twentyConfigService, secureHttpClientService){
        this.twentyConfigService = twentyConfigService;
        this.secureHttpClientService = secureHttpClientService;
        if (!this.twentyConfigService.get('IS_MAPS_AND_ADDRESS_AUTOCOMPLETE_ENABLED') || !this.twentyConfigService.get('GOOGLE_MAP_API_KEY')) {
            return;
        }
        this.apiMapKey = this.twentyConfigService.get('GOOGLE_MAP_API_KEY');
    }
};
GeoMapService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService
    ])
], GeoMapService);

//# sourceMappingURL=geo-map.service.js.map