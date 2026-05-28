"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BarChartDataDTO", {
    enumerable: true,
    get: function() {
        return BarChartDataDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = require("graphql-type-json");
const _barchartgroupmodeenum = require("../../../../engine/metadata-modules/page-layout-widget/enums/bar-chart-group-mode.enum");
const _barchartlayoutenum = require("../../../../engine/metadata-modules/page-layout-widget/enums/bar-chart-layout.enum");
const _barchartseriesdto = require("./bar-chart-series.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BarChartDataDTO = class BarChartDataDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _graphqltypejson.GraphQLJSON
        ]),
    _ts_metadata("design:type", Array)
], BarChartDataDTO.prototype, "data", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], BarChartDataDTO.prototype, "indexBy", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ]),
    _ts_metadata("design:type", Array)
], BarChartDataDTO.prototype, "keys", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _barchartseriesdto.BarChartSeriesDTO
        ]),
    _ts_metadata("design:type", Array)
], BarChartDataDTO.prototype, "series", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], BarChartDataDTO.prototype, "xAxisLabel", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], BarChartDataDTO.prototype, "yAxisLabel", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], BarChartDataDTO.prototype, "showLegend", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], BarChartDataDTO.prototype, "showDataLabels", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_barchartlayoutenum.BarChartLayout),
    _ts_metadata("design:type", typeof _barchartlayoutenum.BarChartLayout === "undefined" ? Object : _barchartlayoutenum.BarChartLayout)
], BarChartDataDTO.prototype, "layout", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_barchartgroupmodeenum.BarChartGroupMode),
    _ts_metadata("design:type", typeof _barchartgroupmodeenum.BarChartGroupMode === "undefined" ? Object : _barchartgroupmodeenum.BarChartGroupMode)
], BarChartDataDTO.prototype, "groupMode", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], BarChartDataDTO.prototype, "hasTooManyGroups", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON),
    _ts_metadata("design:type", typeof Record === "undefined" ? Object : Record)
], BarChartDataDTO.prototype, "formattedToRawLookup", void 0);
BarChartDataDTO = _ts_decorate([
    (0, _graphql.ObjectType)('BarChartData')
], BarChartDataDTO);

//# sourceMappingURL=bar-chart-data.dto.js.map