"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MarketplaceCatalogSyncService", {
    enumerable: true,
    get: function() {
        return MarketplaceCatalogSyncService;
    }
});
const _common = require("@nestjs/common");
const _applicationregistrationservice = require("../application-registration/application-registration.service");
const _applicationregistrationsourcetypeenum = require("../application-registration/enums/application-registration-source-type.enum");
const _marketplaceservice = require("./marketplace.service");
const _buildregistrycdnurlutil = require("./utils/build-registry-cdn-url.util");
const _resolvemanifestasseturlsutil = require("./utils/resolve-manifest-asset-urls.util");
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
let MarketplaceCatalogSyncService = class MarketplaceCatalogSyncService {
    async syncCatalog() {
        await this.syncRegistryApps();
        this.logger.log('Marketplace catalog sync completed');
    }
    async syncRegistryApps() {
        const packages = await this.marketplaceService.fetchAppsFromRegistry();
        for (const pkg of packages){
            try {
                const fetchedManifest = await this.marketplaceService.fetchManifestFromRegistryCdn(pkg.name, pkg.version);
                if (!fetchedManifest) {
                    this.logger.debug(`Skipping ${pkg.name}: no manifest found on CDN`);
                    continue;
                }
                const universalIdentifier = fetchedManifest.application.universalIdentifier;
                const aboutDescription = fetchedManifest.application.aboutDescription ?? await this.marketplaceService.fetchReadmeFromRegistryCdn(pkg.name, pkg.version);
                const manifest = aboutDescription ? {
                    ...fetchedManifest,
                    application: {
                        ...fetchedManifest.application,
                        aboutDescription
                    }
                } : fetchedManifest;
                const cdnBaseUrl = this.twentyConfigService.get('APP_REGISTRY_CDN_URL');
                const manifestWithResolvedUrls = (0, _resolvemanifestasseturlsutil.resolveManifestAssetUrls)(manifest, (filePath)=>(0, _buildregistrycdnurlutil.buildRegistryCdnUrl)({
                        cdnBaseUrl,
                        packageName: pkg.name,
                        version: pkg.version,
                        filePath
                    }));
                await this.applicationRegistrationService.upsertFromCatalog({
                    universalIdentifier,
                    name: manifest.application.displayName ?? pkg.name,
                    sourceType: _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.NPM,
                    sourcePackage: pkg.name,
                    latestAvailableVersion: pkg.version ?? null,
                    manifest: manifestWithResolvedUrls
                });
            } catch (error) {
                this.logger.error(`Failed to sync registry app "${pkg.name}": ${error instanceof Error ? error.message : String(error)}`);
            }
        }
    }
    constructor(applicationRegistrationService, marketplaceService, twentyConfigService){
        this.applicationRegistrationService = applicationRegistrationService;
        this.marketplaceService = marketplaceService;
        this.twentyConfigService = twentyConfigService;
        this.logger = new _common.Logger(MarketplaceCatalogSyncService.name);
    }
};
MarketplaceCatalogSyncService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _applicationregistrationservice.ApplicationRegistrationService === "undefined" ? Object : _applicationregistrationservice.ApplicationRegistrationService,
        typeof _marketplaceservice.MarketplaceService === "undefined" ? Object : _marketplaceservice.MarketplaceService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], MarketplaceCatalogSyncService);

//# sourceMappingURL=marketplace-catalog-sync.service.js.map