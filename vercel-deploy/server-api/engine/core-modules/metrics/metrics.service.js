"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MetricsService", {
    enumerable: true,
    get: function() {
        return MetricsService;
    }
});
const _common = require("@nestjs/common");
const _api = require("@opentelemetry/api");
const _utils = require("twenty-shared/utils");
const _cachestoragedecorator = require("../cache-storage/decorators/cache-storage.decorator");
const _cachestorageservice = require("../cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../cache-storage/types/cache-storage-namespace.enum");
const _metricscacheservice = require("./metrics-cache.service");
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
const METER_NAME = 'twenty-server';
const METRICS_CACHE_TTL = 60 * 1000; // 1 minute
let MetricsService = class MetricsService {
    getMeter() {
        return _api.metrics.getMeter(METER_NAME);
    }
    createObservableGauge({ metricName, options, callback, cacheValue = false }) {
        const gauge = this.getMeter().createObservableGauge(metricName, options);
        gauge.addCallback(async (observableResult)=>{
            if (cacheValue) {
                const cachedResult = await this.healthCacheStorage.get(metricName);
                if ((0, _utils.isDefined)(cachedResult)) {
                    observableResult.observe(cachedResult);
                    return;
                }
            }
            try {
                const result = await callback();
                observableResult.observe(result);
                if (cacheValue) {
                    await this.healthCacheStorage.set(metricName, result, METRICS_CACHE_TTL);
                }
            } catch (error) {
                this.logger.error(`Failed to collect gauge metric ${metricName}`, error);
            }
        });
        return gauge;
    }
    createInfoGauge({ metricName, options, attributesCallback }) {
        const normalizedName = metricName.endsWith('_info') ? metricName : `${metricName}_info`;
        const gauge = this.getMeter().createObservableGauge(normalizedName, options);
        gauge.addCallback(async (observableResult)=>{
            try {
                const attributes = await attributesCallback();
                observableResult.observe(1, attributes);
            } catch (error) {
                this.logger.error(`Failed to collect info gauge ${normalizedName}`, error);
            }
        });
        return gauge;
    }
    async incrementCounterForEvent({ key, eventId, attributes, shouldStoreInCache = true, debugLog }) {
        const counter = this.getMeter().createCounter(key);
        counter.add(1, attributes);
        if (shouldStoreInCache && eventId) {
            try {
                await this.metricsCacheService.updateCounter(key, [
                    eventId
                ]);
            } catch (error) {
                this.logger.error(`Failed to update metrics cache for ${key}`, error);
            }
        }
        if ((0, _utils.isDefined)(debugLog)) {
            this.logger.debug(debugLog);
        }
    }
    async incrementCounterForEvents({ key, eventIds, attributes, shouldStoreInCache = true }) {
        const counter = this.getMeter().createCounter(key);
        counter.add(eventIds.length, attributes);
        if (shouldStoreInCache) {
            await this.metricsCacheService.updateCounter(key, eventIds);
        }
    }
    incrementCounterBy({ key, amount, attributes }) {
        this.getMeter().createCounter(key).add(amount, attributes);
    }
    recordHistogram({ key, value, unit, attributes }) {
        this.getMeter().createHistogram(key, {
            unit
        }).record(value, attributes);
    }
    async groupMetrics(metrics) {
        const groupedMetrics = {};
        const date = Date.now();
        for (const metric of metrics){
            groupedMetrics[metric.name] = await this.metricsCacheService.computeCount({
                key: metric.cacheKey,
                date
            });
        }
        return groupedMetrics;
    }
    constructor(metricsCacheService, healthCacheStorage){
        this.metricsCacheService = metricsCacheService;
        this.healthCacheStorage = healthCacheStorage;
        this.logger = new _common.Logger(MetricsService.name);
    }
};
MetricsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.EngineHealth)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _metricscacheservice.MetricsCacheService === "undefined" ? Object : _metricscacheservice.MetricsCacheService,
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService
    ])
], MetricsService);

//# sourceMappingURL=metrics.service.js.map