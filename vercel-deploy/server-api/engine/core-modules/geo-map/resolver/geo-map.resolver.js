"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GeoMapResolver", {
    enumerable: true,
    get: function() {
        return GeoMapResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _autocompleteresultdto = require("../dtos/autocomplete-result.dto");
const _placedetailsresultdto = require("../dtos/place-details-result.dto");
const _geomapservice = require("../services/geo-map.service");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let GeoMapResolver = class GeoMapResolver {
    async getAutoCompleteAddress(address, token, country, isFieldCity) {
        return this.geoMapService.getAutoCompleteAddress(address, token, country, isFieldCity);
    }
    async getAddressDetails(placeId, token) {
        return this.geoMapService.getAddressDetails(placeId, token);
    }
    constructor(geoMapService){
        this.geoMapService = geoMapService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _autocompleteresultdto.AutocompleteResultDTO
        ]),
    _ts_param(0, (0, _graphql.Args)('address')),
    _ts_param(1, (0, _graphql.Args)('token')),
    _ts_param(2, (0, _graphql.Args)('country', {
        nullable: true
    })),
    _ts_param(3, (0, _graphql.Args)('isFieldCity', {
        nullable: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        String,
        Boolean
    ]),
    _ts_metadata("design:returntype", Promise)
], GeoMapResolver.prototype, "getAutoCompleteAddress", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_placedetailsresultdto.PlaceDetailsResultDTO),
    _ts_param(0, (0, _graphql.Args)('placeId')),
    _ts_param(1, (0, _graphql.Args)('token')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], GeoMapResolver.prototype, "getAddressDetails", null);
GeoMapResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _nopermissionguard.NoPermissionGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _geomapservice.GeoMapService === "undefined" ? Object : _geomapservice.GeoMapService
    ])
], GeoMapResolver);

//# sourceMappingURL=geo-map.resolver.js.map