"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DatabaseGaugeService", {
    enumerable: true,
    get: function() {
        return DatabaseGaugeService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _metricsservice = require("../../engine/core-modules/metrics/metrics.service");
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
let DatabaseGaugeService = class DatabaseGaugeService {
    onModuleInit() {
        this.metricsService.createObservableGauge({
            metricName: 'twenty_database_up',
            options: {
                description: 'Whether the database is reachable (1 = up, 0 = down)'
            },
            callback: async ()=>{
                return this.isDatabaseUp();
            },
            cacheValue: true
        });
    }
    async isDatabaseUp() {
        try {
            await this.dataSource.query('SELECT 1');
            return 1;
        } catch (error) {
            this.logger.error('Database health check failed', error);
            return 0;
        }
    }
    constructor(dataSource, metricsService){
        this.dataSource = dataSource;
        this.metricsService = metricsService;
        this.logger = new _common.Logger(DatabaseGaugeService.name);
    }
};
DatabaseGaugeService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectDataSource)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource,
        typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService
    ])
], DatabaseGaugeService);

//# sourceMappingURL=database-gauge.service.js.map