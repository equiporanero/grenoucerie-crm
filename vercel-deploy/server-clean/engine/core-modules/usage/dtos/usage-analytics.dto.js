/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsageAnalyticsDTO", {
    enumerable: true,
    get: function() {
        return UsageAnalyticsDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _usagebreakdownitemdto = require("./usage-breakdown-item.dto");
const _usagetimeseriesdto = require("./usage-time-series.dto");
const _usageuserdailydto = require("./usage-user-daily.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UsageAnalyticsDTO = class UsageAnalyticsDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _usagebreakdownitemdto.UsageBreakdownItemDTO
        ]),
    _ts_metadata("design:type", Array)
], UsageAnalyticsDTO.prototype, "usageByUser", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _usagebreakdownitemdto.UsageBreakdownItemDTO
        ]),
    _ts_metadata("design:type", Array)
], UsageAnalyticsDTO.prototype, "usageByOperationType", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _usagebreakdownitemdto.UsageBreakdownItemDTO
        ]),
    _ts_metadata("design:type", Array)
], UsageAnalyticsDTO.prototype, "usageByModel", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _usagetimeseriesdto.UsageTimeSeriesDTO
        ]),
    _ts_metadata("design:type", Array)
], UsageAnalyticsDTO.prototype, "timeSeries", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UsageAnalyticsDTO.prototype, "periodStart", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UsageAnalyticsDTO.prototype, "periodEnd", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_usageuserdailydto.UsageUserDailyDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _usageuserdailydto.UsageUserDailyDTO === "undefined" ? Object : _usageuserdailydto.UsageUserDailyDTO)
], UsageAnalyticsDTO.prototype, "userDailyUsage", void 0);
UsageAnalyticsDTO = _ts_decorate([
    (0, _graphql.ObjectType)('UsageAnalytics')
], UsageAnalyticsDTO);

//# sourceMappingURL=usage-analytics.dto.js.map