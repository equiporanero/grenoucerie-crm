"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MarketplaceService", {
    enumerable: true,
    get: function() {
        return MarketplaceService;
    }
});
const _common = require("@nestjs/common");
const _axios = /*#__PURE__*/ _interop_require_default(require("axios"));
const _zod = require("zod");
const _buildregistrycdnurlutil = require("./utils/build-registry-cdn-url.util");
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
const registrySearchResultSchema = _zod.z.object({
    objects: _zod.z.array(_zod.z.object({
        package: _zod.z.object({
            name: _zod.z.string(),
            version: _zod.z.string(),
            description: _zod.z.string().optional(),
            keywords: _zod.z.array(_zod.z.string()).optional(),
            author: _zod.z.object({
                name: _zod.z.string().optional()
            }).optional(),
            links: _zod.z.object({
                homepage: _zod.z.string().optional(),
                npm: _zod.z.string().optional()
            }).optional()
        })
    }))
});
let MarketplaceService = class MarketplaceService {
    async fetchManifestFromRegistryCdn(packageName, version) {
        const cdnBaseUrl = this.twentyConfigService.get('APP_REGISTRY_CDN_URL');
        const url = (0, _buildregistrycdnurlutil.buildRegistryCdnUrl)({
            cdnBaseUrl,
            packageName,
            version,
            filePath: 'manifest.json'
        });
        try {
            const { data } = await _axios.default.get(url, {
                headers: {
                    'User-Agent': 'Twenty-Marketplace'
                },
                timeout: 5_000
            });
            if (!data?.application) {
                return null;
            }
            return data;
        } catch  {
            this.logger.debug(`Could not fetch manifest from CDN for ${packageName}@${version}`);
            return null;
        }
    }
    async fetchReadmeFromRegistryCdn(packageName, version) {
        const cdnBaseUrl = this.twentyConfigService.get('APP_REGISTRY_CDN_URL');
        const url = (0, _buildregistrycdnurlutil.buildRegistryCdnUrl)({
            cdnBaseUrl,
            packageName,
            version,
            filePath: 'README.md'
        });
        try {
            const { data } = await _axios.default.get(url, {
                headers: {
                    'User-Agent': 'Twenty-Marketplace'
                },
                timeout: 5_000,
                responseType: 'text'
            });
            if (!data || data.trim().length === 0) {
                return null;
            }
            return data;
        } catch  {
            this.logger.debug(`Could not fetch README from CDN for ${packageName}@${version}`);
            return null;
        }
    }
    async fetchAppsFromRegistry() {
        const registryUrl = this.twentyConfigService.get('APP_REGISTRY_URL');
        try {
            const { data } = await _axios.default.get(`${registryUrl}/-/v1/search?text=keywords:twenty-app&size=250`, {
                headers: {
                    'User-Agent': 'Twenty-Marketplace'
                },
                timeout: 10_000
            });
            const parsed = registrySearchResultSchema.safeParse(data);
            if (!parsed.success) {
                this.logger.warn(`Unexpected registry search response shape: ${parsed.error.message}`);
                return [];
            }
            return parsed.data.objects.map((result)=>{
                const { name, version, description, author, links } = result.package;
                return {
                    name,
                    version,
                    description: description ?? '',
                    author: author?.name ?? 'Unknown',
                    websiteUrl: links?.homepage ?? links?.npm
                };
            });
        } catch (error) {
            this.logger.warn(`Failed to fetch apps from registry ${registryUrl}: ${error instanceof Error ? error.message : String(error)}`);
            return [];
        }
    }
    constructor(twentyConfigService){
        this.twentyConfigService = twentyConfigService;
        this.logger = new _common.Logger(MarketplaceService.name);
    }
};
MarketplaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], MarketplaceService);

//# sourceMappingURL=marketplace.service.js.map