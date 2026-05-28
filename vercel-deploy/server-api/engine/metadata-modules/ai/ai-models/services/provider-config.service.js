"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ProviderConfigService", {
    enumerable: true,
    get: function() {
        return ProviderConfigService;
    }
});
const _common = require("@nestjs/common");
const _twentyconfigservice = require("../../../../core-modules/twenty-config/twenty-config.service");
const _defaultaicatalogservice = require("./default-ai-catalog.service");
const _extractconfigvariablenameutil = require("../utils/extract-config-variable-name.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ProviderConfigService = class ProviderConfigService {
    getCatalogProviderNames() {
        return new Set(Object.keys(this.defaultAiCatalogService.getDefaultAiCatalog()));
    }
    getResolvedProviders() {
        const rawCatalog = this.defaultAiCatalogService.getDefaultAiCatalog();
        // Only resolve {{VAR}} templates in the committed catalog — never in
        // user-supplied custom providers, to prevent config variable exfiltration.
        const catalog = this.resolveTemplates(rawCatalog);
        const custom = this.twentyConfigService.get('AI_PROVIDERS');
        return {
            ...catalog,
            ...custom
        };
    }
    resolveTemplates(providers) {
        const result = {};
        for (const [name, config] of Object.entries(providers)){
            result[name] = this.resolveProviderTemplates(config);
        }
        return result;
    }
    resolveProviderTemplates(config) {
        return {
            ...config,
            baseUrl: this.resolveTemplate(config.baseUrl),
            apiKey: this.resolveTemplate(config.apiKey),
            accessKeyId: this.resolveTemplate(config.accessKeyId),
            secretAccessKey: this.resolveTemplate(config.secretAccessKey)
        };
    }
    resolveTemplate(value) {
        if (!value) {
            return value;
        }
        const varName = (0, _extractconfigvariablenameutil.extractConfigVariableName)(value);
        if (!varName) {
            return value;
        }
        // Registered config variables first (supports admin panel / DB overrides),
        // then fall back to process.env for vars not in ConfigVariables
        // (e.g. when CI replaces the catalog with custom provider entries).
        try {
            const resolved = this.twentyConfigService.get(varName);
            if (resolved) {
                return resolved;
            }
        } catch  {
        // Not a registered config variable — fall through to env
        }
        return process.env[varName] || undefined;
    }
    constructor(twentyConfigService, defaultAiCatalogService){
        this.twentyConfigService = twentyConfigService;
        this.defaultAiCatalogService = defaultAiCatalogService;
    }
};
ProviderConfigService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _defaultaicatalogservice.DefaultAiCatalogService === "undefined" ? Object : _defaultaicatalogservice.DefaultAiCatalogService
    ])
], ProviderConfigService);

//# sourceMappingURL=provider-config.service.js.map