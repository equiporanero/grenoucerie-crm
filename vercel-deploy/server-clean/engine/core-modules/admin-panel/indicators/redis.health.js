"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RedisHealthIndicator", {
    enumerable: true,
    get: function() {
        return RedisHealthIndicator;
    }
});
const _common = require("@nestjs/common");
const _terminus = require("@nestjs/terminus");
const _utils = require("twenty-shared/utils");
const _healtherrormessagesconstants = require("../constants/health-error-messages.constants");
const _healthchecktimeoututil = require("../utils/health-check-timeout.util");
const _healthstatemanagerutil = require("../utils/health-state-manager.util");
const _redisclientservice = require("../../redis-client/redis-client.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RedisHealthIndicator = class RedisHealthIndicator {
    async isHealthy() {
        const indicator = this.healthIndicatorService.check('redis');
        try {
            const [info, memory, clients, stats] = await (0, _healthchecktimeoututil.withHealthCheckTimeout)(Promise.all([
                this.redisClient.getClient().info(),
                this.redisClient.getClient().info('memory'),
                this.redisClient.getClient().info('clients'),
                this.redisClient.getClient().info('stats')
            ]), _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.REDIS_TIMEOUT);
            const parseInfo = (info)=>{
                const result = {};
                info.split('\r\n').forEach((line)=>{
                    const [key, value] = line.split(':');
                    if (key && value) {
                        result[key] = value;
                    }
                });
                return result;
            };
            const infoData = parseInfo(info);
            const memoryData = parseInfo(memory);
            const clientsData = parseInfo(clients);
            const statsData = parseInfo(stats);
            const details = {
                system: {
                    timestamp: new Date().toISOString(),
                    version: infoData.redis_version,
                    uptime: Math.round(parseInt(infoData.uptime_in_seconds) / 3600) + ' hours'
                },
                memory: {
                    used: memoryData.used_memory_human,
                    peak: memoryData.used_memory_peak_human,
                    fragmentation: parseFloat(memoryData.mem_fragmentation_ratio)
                },
                connections: {
                    current: parseInt(clientsData.connected_clients),
                    total: parseInt(statsData.total_connections_received),
                    rejected: parseInt(statsData.rejected_connections)
                },
                performance: {
                    opsPerSecond: parseInt(statsData.instantaneous_ops_per_sec),
                    hitRate: (0, _utils.isDefined)(statsData.keyspace_hits) && (0, _utils.isDefined)(statsData.keyspace_misses) ? (()=>{
                        const hits = parseInt(statsData.keyspace_hits);
                        const misses = parseInt(statsData.keyspace_misses);
                        const total = hits + misses;
                        return total > 0 ? Math.round(hits / total * 100) + '%' : '0%';
                    })() : '0%',
                    evictedKeys: parseInt(statsData.evicted_keys),
                    expiredKeys: parseInt(statsData.expired_keys)
                },
                replication: {
                    role: infoData.role,
                    connectedSlaves: parseInt(infoData.connected_slaves || '0')
                }
            };
            this.stateManager.updateState(details);
            return indicator.up({
                details
            });
        } catch (error) {
            const message = error.message === _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.REDIS_TIMEOUT ? _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.REDIS_TIMEOUT : _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.REDIS_CONNECTION_FAILED;
            const stateWithAge = this.stateManager.getStateWithAge();
            return indicator.down({
                message,
                details: {
                    system: {
                        timestamp: new Date().toISOString()
                    },
                    stateHistory: stateWithAge
                }
            });
        }
    }
    constructor(redisClient, healthIndicatorService){
        this.redisClient = redisClient;
        this.healthIndicatorService = healthIndicatorService;
        this.stateManager = new _healthstatemanagerutil.HealthStateManager();
    }
};
RedisHealthIndicator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _redisclientservice.RedisClientService === "undefined" ? Object : _redisclientservice.RedisClientService,
        typeof _terminus.HealthIndicatorService === "undefined" ? Object : _terminus.HealthIndicatorService
    ])
], RedisHealthIndicator);

//# sourceMappingURL=redis.health.js.map