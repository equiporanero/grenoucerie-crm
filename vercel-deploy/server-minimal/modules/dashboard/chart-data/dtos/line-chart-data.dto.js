"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LineChartDataDTO", {
    enumerable: true,
    get: function() {
        return LineChartDataDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = require("graphql-type-json");
const _linechartseriesdto = require("./line-chart-series.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let LineChartDataDTO = class LineChartDataDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _linechartseriesdto.LineChartSeriesDTO
        ]),
    _ts_metadata("design:type", Array)
], LineChartDataDTO.prototype, "series", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], LineChartDataDTO.prototype, "xAxisLabel", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], LineChartDataDTO.prototype, "yAxisLabel", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], LineChartDataDTO.prototype, "showLegend", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], LineChartDataDTO.prototype, "showDataLabels", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], LineChartDataDTO.prototype, "hasTooManyGroups", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON),
    _ts_metadata("design:type", typeof Record === "undefined" ? Object : Record)
], LineChartDataDTO.prototype, "formattedToRawLookup", void 0);
LineChartDataDTO = _ts_decorate([
    (0, _graphql.ObjectType)('LineChartData')
], LineChartDataDTO);

//# sourceMappingURL=line-chart-data.dto.js.map