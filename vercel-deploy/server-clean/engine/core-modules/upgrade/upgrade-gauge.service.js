"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpgradeGaugeService", {
    enumerable: true,
    get: function() {
        return UpgradeGaugeService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _metricsservice = require("../metrics/metrics.service");
const _upgradestatusservice = require("./services/upgrade-status.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const HEALTH_TO_GAUGE_VALUE = {
    [_types.UpgradeHealthEnum.UP_TO_DATE]: 1,
    [_types.UpgradeHealthEnum.BEHIND]: 0,
    [_types.UpgradeHealthEnum.FAILED]: -1
};
const HEALTH_UNKNOWN = -2;
const UPGRADE_STATUS_TTL_MS = 60_000;
let UpgradeGaugeService = class UpgradeGaugeService {
    onModuleInit() {
        this.metricsService.createObservableGauge({
            metricName: 'twenty_upgrade_instance_health',
            options: {
                description: 'Instance upgrade health (1 = up-to-date, 0 = behind, -1 = failed, -2 = unknown)'
            },
            callback: async ()=>{
                const upgradeStatus = await this.getCachedUpgradeStatus();
                if (!upgradeStatus) {
                    return HEALTH_UNKNOWN;
                }
                return HEALTH_TO_GAUGE_VALUE[upgradeStatus.instanceUpgradeStatus.health] ?? HEALTH_UNKNOWN;
            },
            cacheValue: true
        });
        this.metricsService.createObservableGauge({
            metricName: 'twenty_upgrade_workspaces_behind_total',
            options: {
                description: 'Number of workspaces behind on upgrade commands'
            },
            callback: async ()=>{
                const upgradeStatus = await this.getCachedUpgradeStatus();
                return upgradeStatus?.workspacesBehind.length ?? 0;
            },
            cacheValue: true
        });
        this.metricsService.createObservableGauge({
            metricName: 'twenty_upgrade_workspaces_failed_total',
            options: {
                description: 'Number of workspaces with a failed upgrade command'
            },
            callback: async ()=>{
                const upgradeStatus = await this.getCachedUpgradeStatus();
                return upgradeStatus?.workspacesFailed.length ?? 0;
            },
            cacheValue: true
        });
        this.metricsService.createObservableGauge({
            metricName: 'twenty_upgrade_workspaces_up_to_date_total',
            options: {
                description: 'Number of workspaces up-to-date on upgrade commands'
            },
            callback: async ()=>{
                const upgradeStatus = await this.getCachedUpgradeStatus();
                return upgradeStatus?.upToDateWorkspaceCount ?? 0;
            },
            cacheValue: true
        });
        this.metricsService.createInfoGauge({
            metricName: 'twenty_upgrade_instance',
            options: {
                description: 'Inferred instance version (semver-ish, derived from the last applied upgrade migration), carried as the `version` attribute'
            },
            attributesCallback: async ()=>{
                const upgradeStatus = await this.getCachedUpgradeStatus();
                return {
                    version: upgradeStatus?.instanceUpgradeStatus.inferredVersion ?? 'unknown'
                };
            }
        });
    }
    async getCachedUpgradeStatus() {
        if (this.cachedUpgradeStatus && Date.now() < this.cachedUpgradeStatusExpiresAt) {
            return this.cachedUpgradeStatus;
        }
        if (this.inflightUpgradeStatusPromise) {
            return this.inflightUpgradeStatusPromise.catch(()=>null);
        }
        this.inflightUpgradeStatusPromise = this.upgradeStatusService.getInstanceAndAllWorkspacesStatus();
        try {
            this.cachedUpgradeStatus = await this.inflightUpgradeStatusPromise;
            this.cachedUpgradeStatusExpiresAt = Date.now() + UPGRADE_STATUS_TTL_MS;
            return this.cachedUpgradeStatus;
        } catch (error) {
            this.logger.error('Failed to fetch upgrade status for gauges', error);
            return null;
        } finally{
            this.inflightUpgradeStatusPromise = null;
        }
    }
    constructor(metricsService, upgradeStatusService){
        this.metricsService = metricsService;
        this.upgradeStatusService = upgradeStatusService;
        this.logger = new _common.Logger(UpgradeGaugeService.name);
        this.cachedUpgradeStatus = null;
        this.cachedUpgradeStatusExpiresAt = 0;
        this.inflightUpgradeStatusPromise = null;
    }
};
UpgradeGaugeService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService,
        typeof _upgradestatusservice.UpgradeStatusService === "undefined" ? Object : _upgradestatusservice.UpgradeStatusService
    ])
], UpgradeGaugeService);

//# sourceMappingURL=upgrade-gauge.service.js.map