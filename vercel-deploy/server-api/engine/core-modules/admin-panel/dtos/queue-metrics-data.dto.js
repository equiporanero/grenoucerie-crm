"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QueueMetricsDataDTO", {
    enumerable: true,
    get: function() {
        return QueueMetricsDataDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _queuemetricsseriesdto = require("./queue-metrics-series.dto");
const _queuemetricstimerangeenum = require("../enums/queue-metrics-time-range.enum");
const _workerqueuemetricstype = require("../types/worker-queue-metrics.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let QueueMetricsDataDTO = class QueueMetricsDataDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], QueueMetricsDataDTO.prototype, "queueName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], QueueMetricsDataDTO.prototype, "workers", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_queuemetricstimerangeenum.QueueMetricsTimeRange),
    _ts_metadata("design:type", typeof _queuemetricstimerangeenum.QueueMetricsTimeRange === "undefined" ? Object : _queuemetricstimerangeenum.QueueMetricsTimeRange)
], QueueMetricsDataDTO.prototype, "timeRange", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_workerqueuemetricstype.WorkerQueueMetrics, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], QueueMetricsDataDTO.prototype, "details", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _queuemetricsseriesdto.QueueMetricsSeriesDTO
        ]),
    _ts_metadata("design:type", Array)
], QueueMetricsDataDTO.prototype, "data", void 0);
QueueMetricsDataDTO = _ts_decorate([
    (0, _graphql.ObjectType)('QueueMetricsData')
], QueueMetricsDataDTO);

//# sourceMappingURL=queue-metrics-data.dto.js.map