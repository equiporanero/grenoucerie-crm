"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DatabaseHealthIndicator", {
    enumerable: true,
    get: function() {
        return DatabaseHealthIndicator;
    }
});
const _common = require("@nestjs/common");
const _terminus = require("@nestjs/terminus");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _utils = require("twenty-shared/utils");
const _healtherrormessagesconstants = require("../constants/health-error-messages.constants");
const _healthchecktimeoututil = require("../utils/health-check-timeout.util");
const _healthstatemanagerutil = require("../utils/health-state-manager.util");
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
let DatabaseHealthIndicator = class DatabaseHealthIndicator {
    async isHealthy() {
        const indicator = this.healthIndicatorService.check('database');
        try {
            const [[versionResult], [activeConnections], [maxConnections], [uptime], [databaseSize], tableStats, [cacheHitRatio], [deadlocks], [slowQueries]] = await (0, _healthchecktimeoututil.withHealthCheckTimeout)(Promise.all([
                this.dataSource.query('SELECT version()'),
                this.dataSource.query('SELECT count(*) as count FROM pg_stat_activity'),
                this.dataSource.query('SHOW max_connections'),
                this.dataSource.query('SELECT extract(epoch from current_timestamp - pg_postmaster_start_time()) as uptime'),
                this.dataSource.query('SELECT pg_size_pretty(pg_database_size(current_database())) as size'),
                this.dataSource.query(`
            SELECT schemaname, relname, n_live_tup, n_dead_tup, last_vacuum, last_autovacuum 
            FROM pg_stat_user_tables 
            ORDER BY n_live_tup DESC 
            LIMIT 10
          `),
                this.dataSource.query(`
            SELECT 
              sum(heap_blks_hit) * 100.0 / (sum(heap_blks_hit) + sum(heap_blks_read)) as ratio 
            FROM pg_statio_user_tables
          `),
                this.dataSource.query('SELECT deadlocks FROM pg_stat_database WHERE datname = current_database()'),
                this.dataSource.query(`
            SELECT count(*) as count 
            FROM pg_stat_activity 
            WHERE state = 'active' 
            AND query_start < now() - interval '1 minute'
          `)
            ]), _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.DATABASE_TIMEOUT);
            const details = {
                system: {
                    timestamp: new Date().toISOString(),
                    version: versionResult.version,
                    uptime: Math.round(uptime.uptime / 3600) + ' hours'
                },
                connections: {
                    active: parseInt(activeConnections.count),
                    max: parseInt(maxConnections.max_connections),
                    utilizationPercent: Math.round(parseInt(activeConnections.count) / parseInt(maxConnections.max_connections) * 100)
                },
                databaseSize: databaseSize.size,
                performance: {
                    cacheHitRatio: (0, _utils.isDefined)(cacheHitRatio.ratio) ? Math.round(parseFloat(cacheHitRatio.ratio)) + '%' : 'N/A',
                    deadlocks: parseInt(deadlocks.deadlocks),
                    slowQueries: parseInt(slowQueries.count)
                },
                top10Tables: tableStats
            };
            this.stateManager.updateState(details);
            return indicator.up({
                details
            });
        } catch (error) {
            const message = error.message === _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.DATABASE_TIMEOUT ? _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.DATABASE_TIMEOUT : _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.DATABASE_CONNECTION_FAILED;
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
    constructor(dataSource, healthIndicatorService){
        this.dataSource = dataSource;
        this.healthIndicatorService = healthIndicatorService;
        this.stateManager = new _healthstatemanagerutil.HealthStateManager();
    }
};
DatabaseHealthIndicator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectDataSource)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource,
        typeof _terminus.HealthIndicatorService === "undefined" ? Object : _terminus.HealthIndicatorService
    ])
], DatabaseHealthIndicator);

//# sourceMappingURL=database.health.js.map