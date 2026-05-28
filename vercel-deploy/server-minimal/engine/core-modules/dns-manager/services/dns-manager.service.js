/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DnsManagerService", {
    enumerable: true,
    get: function() {
        return DnsManagerService;
    }
});
const _common = require("@nestjs/common");
const _cloudflare = /*#__PURE__*/ _interop_require_default(require("cloudflare"));
const _utils = require("twenty-shared/utils");
const _dnsmanagerexception = require("../exceptions/dns-manager.exception");
const _dnsmanagervalidate = require("../validator/dns-manager.validate");
const _domainserverconfigservice = require("../../domain/domain-server-config/services/domain-server-config.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DnsManagerService = class DnsManagerService {
    async registerHostname(customDomain, options) {
        _dnsmanagervalidate.dnsManagerValidator.isCloudflareInstanceDefined(this.cloudflareClient);
        if ((0, _utils.isDefined)(await this.getHostnameId(customDomain, options))) {
            throw new _dnsmanagerexception.DnsManagerException('Hostname already registered', _dnsmanagerexception.DnsManagerExceptionCode.HOSTNAME_ALREADY_REGISTERED, {
                userFriendlyMessage: /*i18n*/ {
                    id: "2sIVDj",
                    message: "Domain is already registered"
                }
            });
        }
        return this.cloudflareClient.customHostnames.create({
            zone_id: this.getZoneId(options),
            hostname: customDomain,
            ssl: this.sslParams
        });
    }
    async getHostnameWithRecords(domain, options) {
        if (options?.isPublicDomain && !(0, _utils.isDefined)(this.domainServerConfigService.getPublicDomainUrl().hostname)) {
            throw new _dnsmanagerexception.DnsManagerException('Missing public domain URL', _dnsmanagerexception.DnsManagerExceptionCode.MISSING_PUBLIC_DOMAIN_URL, {
                userFriendlyMessage: /*i18n*/ {
                    id: "Capzni",
                    message: "Public domain URL is not defined. Please set the PUBLIC_DOMAIN_URL environment variable"
                }
            });
        }
        const customHostname = await this.getHostnameDetails(domain, options);
        if (!(0, _utils.isDefined)(customHostname)) {
            return undefined;
        }
        const { hostname, id, ssl } = customHostname;
        const statuses = this.getHostnameStatuses(customHostname);
        // @ts-expect-error - type definition doesn't reflect the real API
        const dcvRecords = ssl?.dcv_delegation_records?.[0];
        return {
            id: id,
            domain: hostname,
            records: [
                {
                    validationType: 'redirection',
                    type: 'cname',
                    status: statuses.redirection,
                    key: hostname,
                    value: options?.isPublicDomain ? this.domainServerConfigService.getPublicDomainUrl().hostname : this.domainServerConfigService.getBaseUrl().hostname
                },
                {
                    validationType: 'ssl',
                    type: 'cname',
                    status: statuses.ssl,
                    key: dcvRecords?.cname ?? `_acme-challenge.${hostname}`,
                    value: dcvRecords?.cname_target ?? `${hostname}.${this.twentyConfigService.get('CLOUDFLARE_DCV_DELEGATION_ID')}.dcv.cloudflare.com`
                }
            ]
        };
    }
    async updateHostname(fromHostname, toHostname, options) {
        _dnsmanagervalidate.dnsManagerValidator.isCloudflareInstanceDefined(this.cloudflareClient);
        const fromCustomHostnameId = await this.getHostnameId(fromHostname, options);
        if (fromCustomHostnameId) {
            await this.deleteHostname(fromCustomHostnameId, options);
        }
        return this.registerHostname(toHostname, options);
    }
    async refreshHostname(hostname, options) {
        _dnsmanagervalidate.dnsManagerValidator.isCloudflareInstanceDefined(this.cloudflareClient);
        const publicDomainWithRecords = await this.getHostnameWithRecords(hostname, options);
        (0, _utils.assertIsDefinedOrThrow)(publicDomainWithRecords);
        await this.cloudflareClient.customHostnames.edit(publicDomainWithRecords.id, {
            zone_id: this.getZoneId(options),
            ssl: this.sslParams
        });
        return publicDomainWithRecords;
    }
    async deleteHostnameSilently(hostname, options) {
        _dnsmanagervalidate.dnsManagerValidator.isCloudflareInstanceDefined(this.cloudflareClient);
        try {
            const customHostnameId = await this.getHostnameId(hostname, options);
            if (customHostnameId) {
                await this.deleteHostname(customHostnameId, options);
            }
        } catch  {
            return;
        }
    }
    async isHostnameWorking(hostname, options) {
        const hostnameDetails = await this.getHostnameDetails(hostname, options);
        if (!(0, _utils.isDefined)(hostnameDetails)) {
            return false;
        }
        const statuses = this.getHostnameStatuses(hostnameDetails);
        return statuses.redirection === 'success' && statuses.ssl === 'success';
    }
    get sslParams() {
        return {
            method: 'txt',
            type: 'dv',
            settings: {
                http2: 'on',
                min_tls_version: '1.2',
                tls_1_3: 'on',
                ciphers: [
                    'ECDHE-RSA-AES128-GCM-SHA256',
                    'AES128-SHA'
                ],
                early_hints: 'on'
            },
            bundle_method: 'ubiquitous',
            wildcard: false
        };
    }
    getZoneId(options) {
        return options?.isPublicDomain ? this.twentyConfigService.get('CLOUDFLARE_PUBLIC_DOMAIN_ZONE_ID') : this.twentyConfigService.get('CLOUDFLARE_ZONE_ID');
    }
    async getHostnameDetails(hostname, options) {
        _dnsmanagervalidate.dnsManagerValidator.isCloudflareInstanceDefined(this.cloudflareClient);
        const customHostnames = await this.cloudflareClient.customHostnames.list({
            zone_id: this.getZoneId(options),
            hostname: hostname
        });
        if (customHostnames.result.length === 0) {
            return undefined;
        }
        if (customHostnames.result.length === 1) {
            return customHostnames.result[0];
        }
        // should never happen. error 5xx
        const hostnameCount = customHostnames.result.length;
        const domainName = hostname;
        throw new _dnsmanagerexception.DnsManagerException('More than one custom hostname found in cloudflare', _dnsmanagerexception.DnsManagerExceptionCode.MULTIPLE_HOSTNAMES_FOUND, {
            userFriendlyMessage: /*i18n*/ {
                id: "iEZavm",
                message: "{hostnameCount} hostnames found for domain '{domainName}'. Expect 1",
                values: {
                    hostnameCount: hostnameCount,
                    domainName: domainName
                }
            }
        });
    }
    async getHostnameId(hostname, options) {
        const customHostname = await this.getHostnameDetails(hostname, options);
        if (!(0, _utils.isDefined)(customHostname)) {
            return undefined;
        }
        return customHostname.id;
    }
    getHostnameStatuses(customHostname) {
        const { ssl, verification_errors, created_at } = customHostname;
        return {
            // wait 10s before starting the real check
            redirection: created_at && new Date().getTime() - new Date(created_at).getTime() < 1000 * 10 ? 'pending' : verification_errors?.[0] === 'custom hostname does not CNAME to this zone.' ? 'error' : 'success',
            ssl: !ssl.status || ssl.status.startsWith('pending') ? 'pending' : ssl.status === 'active' ? 'success' : ssl.status
        };
    }
    async deleteHostname(customHostnameId, options) {
        _dnsmanagervalidate.dnsManagerValidator.isCloudflareInstanceDefined(this.cloudflareClient);
        await this.cloudflareClient.customHostnames.delete(customHostnameId, {
            zone_id: this.getZoneId(options)
        });
    }
    constructor(twentyConfigService, domainServerConfigService){
        this.twentyConfigService = twentyConfigService;
        this.domainServerConfigService = domainServerConfigService;
        if (this.twentyConfigService.get('CLOUDFLARE_API_KEY')) {
            this.cloudflareClient = new _cloudflare.default({
                apiToken: this.twentyConfigService.get('CLOUDFLARE_API_KEY')
            });
        }
    }
};
DnsManagerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _domainserverconfigservice.DomainServerConfigService === "undefined" ? Object : _domainserverconfigservice.DomainServerConfigService
    ])
], DnsManagerService);

//# sourceMappingURL=dns-manager.service.js.map