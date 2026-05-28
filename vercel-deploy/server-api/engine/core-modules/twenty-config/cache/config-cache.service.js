"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConfigCacheService", {
    enumerable: true,
    get: function() {
        return ConfigCacheService;
    }
});
const _common = require("@nestjs/common");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ConfigCacheService = class ConfigCacheService {
    get(key) {
        const entry = this.foundConfigValuesCache.get(key);
        if (!entry) {
            return undefined;
        }
        return entry.value;
    }
    isKeyKnownMissing(key) {
        return this.knownMissingKeysCache.has(key);
    }
    set(key, value) {
        this.foundConfigValuesCache.set(key, {
            value
        });
        this.knownMissingKeysCache.delete(key);
    }
    markKeyAsMissing(key) {
        this.knownMissingKeysCache.add(key);
        this.foundConfigValuesCache.delete(key);
    }
    clear(key) {
        this.foundConfigValuesCache.delete(key);
        this.knownMissingKeysCache.delete(key);
    }
    clearAll() {
        this.foundConfigValuesCache.clear();
        this.knownMissingKeysCache.clear();
    }
    getCacheInfo() {
        return {
            foundConfigValues: this.foundConfigValuesCache.size,
            knownMissingKeys: this.knownMissingKeysCache.size,
            cacheKeys: Array.from(this.foundConfigValuesCache.keys())
        };
    }
    onModuleDestroy() {
        this.clearAll();
    }
    getAllKeys() {
        const foundKeys = Array.from(this.foundConfigValuesCache.keys());
        const missingKeys = Array.from(this.knownMissingKeysCache);
        return [
            ...new Set([
                ...foundKeys,
                ...missingKeys
            ])
        ];
    }
    /**
   * Helper method for testing edge cases
   */ addToMissingKeysForTesting(key) {
        this.knownMissingKeysCache.add(key);
    }
    constructor(){
        this.foundConfigValuesCache = new Map();
        this.knownMissingKeysCache = new Set();
    }
};
ConfigCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], ConfigCacheService);

//# sourceMappingURL=config-cache.service.js.map