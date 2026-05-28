"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QueueMetricsSeriesDTO", {
    enumerable: true,
    get: function() {
        return QueueMetricsSeriesDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _queuemetricsdatapointdto = require("./queue-metrics-data-point.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let QueueMetricsSeriesDTO = class QueueMetricsSeriesDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], QueueMetricsSeriesDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _queuemetricsdatapointdto.QueueMetricsDataPointDTO
        ]),
    _ts_metadata("design:type", Array)
], QueueMetricsSeriesDTO.prototype, "data", void 0);
QueueMetricsSeriesDTO = _ts_decorate([
    (0, _graphql.ObjectType)('QueueMetricsSeries')
], QueueMetricsSeriesDTO);

//# sourceMappingURL=queue-metrics-series.dto.js.map