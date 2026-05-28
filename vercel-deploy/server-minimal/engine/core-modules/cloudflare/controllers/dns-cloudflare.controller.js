/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DnsCloudflareController", {
    enumerable: true,
    get: function() {
        return DnsCloudflareController;
    }
});
const _common = require("@nestjs/common");
const _express = require("express");
const _authrestapiexceptionfilter = require("../../auth/filters/auth-rest-api-exception.filter");
const _cloudflaresecretguard = require("../guards/cloudflare-secret.guard");
const _dnscloudflareservice = require("../services/dns-cloudflare.service");
const _dnsmanagerexceptionfilter = require("../../dns-manager/exceptions/dns-manager-exception-filter");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _publicendpointguard = require("../../../guards/public-endpoint.guard");
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
let DnsCloudflareController = class DnsCloudflareController {
    async customHostnameWebhooks(req) {
        const hostname = req.body?.data?.data?.hostname;
        const zoneIds = [
            this.twentyConfigService.get('CLOUDFLARE_PUBLIC_DOMAIN_ZONE_ID'),
            this.twentyConfigService.get('CLOUDFLARE_ZONE_ID')
        ];
        // since notification are not scoped to a zone, we need to check if the zone is in the list of zones
        if (!hostname || !zoneIds.includes(req.body?.data?.metadata?.zone.id)) {
            return;
        }
        try {
            await this.dnsCloudflareService.checkHostname(hostname);
        } catch  {
            return;
        }
    }
    constructor(dnsCloudflareService, twentyConfigService){
        this.dnsCloudflareService = dnsCloudflareService;
        this.twentyConfigService = twentyConfigService;
    }
};
_ts_decorate([
    (0, _common.Post)([
        'cloudflare/custom-hostname-webhooks',
        'webhooks/cloudflare'
    ]),
    (0, _common.UseGuards)(_cloudflaresecretguard.CloudflareSecretMatchGuard, _publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request
    ]),
    _ts_metadata("design:returntype", Promise)
], DnsCloudflareController.prototype, "customHostnameWebhooks", null);
DnsCloudflareController = _ts_decorate([
    (0, _common.Controller)(),
    (0, _common.UseFilters)(_authrestapiexceptionfilter.AuthRestApiExceptionFilter, _dnsmanagerexceptionfilter.DnsManagerExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _dnscloudflareservice.DnsCloudflareService === "undefined" ? Object : _dnscloudflareservice.DnsCloudflareService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], DnsCloudflareController);

//# sourceMappingURL=dns-cloudflare.controller.js.map