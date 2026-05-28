"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PieChartDataDTO", {
    enumerable: true,
    get: function() {
        return PieChartDataDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = require("graphql-type-json");
const _piechartdataitemdto = require("./pie-chart-data-item.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PieChartDataDTO = class PieChartDataDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _piechartdataitemdto.PieChartDataItemDTO
        ]),
    _ts_metadata("design:type", Array)
], PieChartDataDTO.prototype, "data", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], PieChartDataDTO.prototype, "showLegend", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], PieChartDataDTO.prototype, "showDataLabels", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], PieChartDataDTO.prototype, "showCenterMetric", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], PieChartDataDTO.prototype, "hasTooManyGroups", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON),
    _ts_metadata("design:type", typeof Record === "undefined" ? Object : Record)
], PieChartDataDTO.prototype, "formattedToRawLookup", void 0);
PieChartDataDTO = _ts_decorate([
    (0, _graphql.ObjectType)('PieChartData')
], PieChartDataDTO);

//# sourceMappingURL=pie-chart-data.dto.js.map