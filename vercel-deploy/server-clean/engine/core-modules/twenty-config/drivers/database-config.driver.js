"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DatabaseConfigDriver", {
    enumerable: true,
    get: function() {
        return DatabaseConfigDriver;
    }
});
const _common = require("@nestjs/common");
const _schedule = require("@nestjs/schedule");
const _configcacheservice = require("../cache/config-cache.service");
const _configvariables = require("../config-variables");
const _configvariablesrefreshcronintervalconstants = require("../constants/config-variables-refresh-cron-interval.constants");
const _configstorageservice = require("../storage/config-storage.service");
const _isenvonlyconfigvarutil = require("../utils/is-env-only-config-var.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DatabaseConfigDriver = class DatabaseConfigDriver {
    async onModuleInit() {
        try {
            this.logger.log('[INIT] Loading initial config variables from database');
            const loadedCount = await this.loadAllConfigVarsFromDb();
            this.logger.log(`[INIT] Config variables loaded: ${loadedCount} values found in DB, ${this.allPossibleConfigKeys.length - loadedCount} falling to env vars/defaults`);
        } catch (error) {
            this.logger.error('[INIT] Failed to load config variables from database, falling back to environment variables', error instanceof Error ? error.stack : error);
        // Don't rethrow to allow the application to continue
        // The driver's cache will be empty but the service will fall back to env vars
        }
    }
    get(key) {
        return this.configCache.get(key);
    }
    async set(key, value) {
        if ((0, _isenvonlyconfigvarutil.isEnvOnlyConfigVar)(key)) {
            throw new Error(`Cannot set environment-only variable: ${key}`);
        }
        await this.configStorage.set(key, value);
        this.configCache.set(key, value);
    }
    async update(key, value) {
        if ((0, _isenvonlyconfigvarutil.isEnvOnlyConfigVar)(key)) {
            throw new Error(`Cannot update environment-only variable: ${key}`);
        }
        await this.configStorage.set(key, value);
        this.configCache.set(key, value);
    }
    getCacheInfo() {
        return this.configCache.getCacheInfo();
    }
    async loadAllConfigVarsFromDb() {
        const configVars = await this.configStorage.loadAll();
        for (const [key, value] of configVars.entries()){
            this.configCache.set(key, value);
        }
        for (const key of this.allPossibleConfigKeys){
            if (!configVars.has(key)) {
                this.configCache.markKeyAsMissing(key);
            }
        }
        return configVars.size;
    }
    async delete(key) {
        if ((0, _isenvonlyconfigvarutil.isEnvOnlyConfigVar)(key)) {
            throw new Error(`Cannot delete environment-only variable: ${key}`);
        }
        await this.configStorage.delete(key);
        this.configCache.markKeyAsMissing(key);
    }
    /**
   * Refreshes all database-backed config variables.
   * This method runs on a schedule and fetches all configs in one database query,
   * then updates the cache with fresh values.
   */ async refreshAllCache() {
        try {
            const dbValues = await this.configStorage.loadAll();
            for (const [key, value] of dbValues.entries()){
                if (!(0, _isenvonlyconfigvarutil.isEnvOnlyConfigVar)(key)) {
                    this.configCache.set(key, value);
                }
            }
            for (const key of this.allPossibleConfigKeys){
                if (!dbValues.has(key)) {
                    this.configCache.markKeyAsMissing(key);
                }
            }
        } catch (error) {
            // Error is caught and logged but not rethrown to prevent the cron job from crashing
            this.logger.error('Failed to refresh config variables from database', error instanceof Error ? error.stack : error);
        }
    }
    constructor(configCache, configStorage){
        this.configCache = configCache;
        this.configStorage = configStorage;
        this.logger = new _common.Logger(DatabaseConfigDriver.name);
        const allKeys = Object.keys(new _configvariables.ConfigVariables());
        this.allPossibleConfigKeys = allKeys.filter((key)=>!(0, _isenvonlyconfigvarutil.isEnvOnlyConfigVar)(key));
        this.logger.debug('[INIT] Database config driver created, monitoring keys: ' + this.allPossibleConfigKeys.length);
    }
};
_ts_decorate([
    (0, _schedule.Cron)(_configvariablesrefreshcronintervalconstants.CONFIG_VARIABLES_REFRESH_CRON_INTERVAL),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], DatabaseConfigDriver.prototype, "refreshAllCache", null);
DatabaseConfigDriver = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _configcacheservice.ConfigCacheService === "undefined" ? Object : _configcacheservice.ConfigCacheService,
        typeof _configstorageservice.ConfigStorageService === "undefined" ? Object : _configstorageservice.ConfigStorageService
    ])
], DatabaseConfigDriver);

//# sourceMappingURL=database-config.driver.js.map