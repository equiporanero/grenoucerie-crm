"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SecureHttpClientService", {
    enumerable: true,
    get: function() {
        return SecureHttpClientService;
    }
});
const _common = require("@nestjs/common");
const _axios = /*#__PURE__*/ _interop_require_default(require("axios"));
const _axiosretry = /*#__PURE__*/ _interop_require_default(require("axios-retry"));
const _utils = require("twenty-shared/utils");
const _axiosfetch = require("@lifeomic/axios-fetch");
const _createssrfsafeagentutil = require("./utils/create-ssrf-safe-agent.util");
const _resolveandvalidatehostnameutil = require("./utils/resolve-and-validate-hostname.util");
const _twentyconfigservice = require("../twenty-config/twenty-config.service");
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
const MAX_REDIRECTS = 5;
const ALLOWED_PROTOCOLS = new Set([
    'http:',
    'https:'
]);
let SecureHttpClientService = class SecureHttpClientService {
    // Returns an SSRF-protected HTTP client for external requests.
    // Protection is enforced at the connection level via custom agents
    // that validate resolved IPs, which covers redirects automatically.
    // When context is provided, outbound requests are logged with
    // workspace/user info for GuardDuty correlation.
    getHttpClient(config, context) {
        const { retries, shouldResetTimeout, ...axiosConfig } = config ?? {};
        const isSafeModeEnabled = this.twentyConfigService.get('OUTBOUND_HTTP_SAFE_MODE_ENABLED');
        const client = isSafeModeEnabled ? _axios.default.create({
            ...axiosConfig,
            httpAgent: (0, _createssrfsafeagentutil.createSsrfSafeAgent)('http'),
            httpsAgent: (0, _createssrfsafeagentutil.createSsrfSafeAgent)('https'),
            maxRedirects: Math.min(axiosConfig.maxRedirects ?? MAX_REDIRECTS, MAX_REDIRECTS)
        }) : _axios.default.create(axiosConfig);
        if ((0, _utils.isDefined)(retries) && retries > 0) {
            (0, _axiosretry.default)(client, {
                retries,
                shouldResetTimeout,
                retryCondition: (error)=>_axiosretry.default.isNetworkOrIdempotentRequestError(error) && error.code !== 'ECONNABORTED' && error.code !== 'ETIMEDOUT'
            });
        }
        if (isSafeModeEnabled) {
            client.interceptors.request.use((requestConfig)=>{
                const url = requestConfig.url || requestConfig.baseURL;
                if (url) {
                    const parsed = new URL(url, requestConfig.baseURL);
                    if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
                        throw new Error(`Protocol ${parsed.protocol} is not allowed. Only HTTP and HTTPS are permitted.`);
                    }
                }
                return requestConfig;
            });
        }
        if (context) {
            client.interceptors.request.use((requestConfig)=>{
                this.logger.log(`Outbound HTTP request: ${requestConfig.method?.toUpperCase()} ${requestConfig.url} ` + `[workspace=${context.workspaceId}, source=${context.source}` + `${context.userId ? `, user=${context.userId}` : ''}]`);
                return requestConfig;
            });
        }
        return client;
    }
    // Returns a plain HTTP client for requests to trusted internal URLs
    // (e.g., the server's own API endpoints). Not SSRF-protected.
    getInternalHttpClient(config) {
        return _axios.default.create(config);
    }
    createSsrfSafeFetch() {
        if (!this.isSafeModeEnabled()) {
            return globalThis.fetch;
        }
        return (0, _axiosfetch.buildAxiosFetch)(this.getHttpClient());
    }
    async getValidatedHost(hostnameOrUrl) {
        if (!this.isSafeModeEnabled()) {
            return hostnameOrUrl;
        }
        return (0, _resolveandvalidatehostnameutil.resolveAndValidateHostname)(hostnameOrUrl);
    }
    isSafeModeEnabled() {
        return this.twentyConfigService.get('OUTBOUND_HTTP_SAFE_MODE_ENABLED');
    }
    constructor(twentyConfigService){
        this.twentyConfigService = twentyConfigService;
        this.logger = new _common.Logger(SecureHttpClientService.name);
    }
};
SecureHttpClientService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], SecureHttpClientService);

//# sourceMappingURL=secure-http-client.service.js.map