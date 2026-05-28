"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MetricsModule", {
    enumerable: true,
    get: function() {
        return MetricsModule;
    }
});
const _common = require("@nestjs/common");
const _metricscacheservice = require("./metrics-cache.service");
const _metricsservice = require("./metrics.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MetricsModule = class MetricsModule {
};
MetricsModule = _ts_decorate([
    (0, _common.Module)({
        providers: [
            _metricsservice.MetricsService,
            _metricscacheservice.MetricsCacheService
        ],
        exports: [
            _metricsservice.MetricsService,
            _metricscacheservice.MetricsCacheService
        ]
    })
], MetricsModule);

//# sourceMappingURL=metrics.module.js.map